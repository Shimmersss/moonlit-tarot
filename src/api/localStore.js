// In-browser stand-in for a backend: draws, saved readings and the card collection live in
// localStorage, so the app runs as a static site. Every function resolves like an API call
// ({ data }) and rejects with { status, message }, which keeps the views ready for a real server.
import catalogue from "@/data/tarotReading.json";
import variants from "@/data/moonlitVariants.json";
import { buildInstantReading, findSpread, findTopic, TAROT_READING_VERSION, validatePicks } from "@/utils/tarotReading";
import { resolveTheme } from "@/data/tarotThemeLibrary";
import { THEME_FAMILIES } from "@/utils/tarotThemes";

const STORE_KEY = "moonlit-tarot-v1";
const DRAW_TTL_MS = 24 * 3600e3;
const MAX_REPORTS = 200;
let memory = null; // used when localStorage is unavailable (private mode, blocked site data)

function fresh() {
  return { draw: null, hiddenOrder: [], reports: [], collection: {} };
}

function load() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return { ...fresh(), ...JSON.parse(raw) };
  } catch { /* fall through to the in-memory copy */ }
  return memory ? structuredClone(memory) : fresh();
}

function save(state) {
  memory = structuredClone(state);
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); }
  catch { /* quota or private mode: this session keeps the in-memory copy */ }
}

const ok = data => Promise.resolve({ data: structuredClone(data) });
function fail(status, message) {
  const error = new Error(message);
  error.status = status;
  return Promise.reject(error);
}

function randomInt(max) {
  const value = new Uint32Array(1);
  crypto.getRandomValues(value);
  return value[0] % max;
}

function uuid() {
  if (crypto.randomUUID) return crypto.randomUUID();
  return Array.from(crypto.getRandomValues(new Uint8Array(16)), byte => byte.toString(16).padStart(2, "0")).join("");
}

function dropExpiredDraw(state) {
  if (state.draw && new Date(state.draw.expiresAt).getTime() <= Date.now()) {
    state.draw = null;
    state.hiddenOrder = [];
  }
  return state;
}

// ---- divination ---------------------------------------------------------------------------

export function getCurrentDraw() {
  const state = dropExpiredDraw(load());
  save(state);
  return ok({ draw: state.draw });
}

/** Shuffles a fresh 22-card deck; card order, orientation and theme stay hidden until picked. */
export function createTarotDraw({ spreadId, topicId, question, optionA = "", optionB = "" }) {
  const state = load();
  const spread = findSpread(catalogue, spreadId);
  if (!spread) return fail(400, "牌阵无效");
  const hiddenOrder = catalogue.cards.map(card => ({
    cardId: card.cardId,
    orientation: randomInt(2) ? "reversed" : "upright",
    themeId: THEME_FAMILIES[randomInt(THEME_FAMILIES.length)].themeId,
  }));
  for (let i = hiddenOrder.length - 1; i > 0; i -= 1) {
    const j = randomInt(i + 1);
    [hiddenOrder[i], hiddenOrder[j]] = [hiddenOrder[j], hiddenOrder[i]];
  }
  const now = new Date();
  state.hiddenOrder = hiddenOrder;
  state.draw = {
    drawId: uuid(), catalogueVersion: catalogue.version, deckVersion: catalogue.deckVersion,
    spreadId, topicId: findTopic(catalogue, topicId).id, question: question.trim(),
    options: spread.requiresOptions ? { optionA: optionA.trim(), optionB: optionB.trim() } : null,
    state: "shuffled", fanSize: catalogue.cards.length, picksRequired: spread.cardCount, picks: null, cards: [],
    drawnAt: now.toISOString(), expiresAt: new Date(now.getTime() + DRAW_TTL_MS).toISOString(),
  };
  save(state);
  return ok(state.draw);
}

export function pickTarotCards(drawId, requested) {
  const positions = Array.from(requested || []);
  const state = dropExpiredDraw(load());
  const draw = state.draw;
  if (!draw || draw.drawId !== drawId) return fail(404, "牌阵不存在或已过期");
  if (!validatePicks(positions, draw.picksRequired, draw.fanSize)) return fail(400, "选牌位置无效");
  if (draw.picks) {
    if (JSON.stringify(draw.picks) !== JSON.stringify(positions)) return fail(409, "这组牌已经选定");
    return ok(draw);
  }
  const spread = findSpread(catalogue, draw.spreadId);
  draw.picks = positions;
  draw.state = "picked";
  draw.cards = positions.map((fanIndex, order) => {
    const hidden = state.hiddenOrder[fanIndex];
    const card = catalogue.cards.find(item => item.cardId === hidden.cardId);
    const position = spread.positions[order];
    const theme = resolveTheme({ cardId: card.cardId, themeId: hidden.themeId });
    return {
      order, position: position.id, positionLabel: position.label, fanIndex, cardId: card.cardId, sourceId: card.sourceId,
      name: card.name, orientation: hidden.orientation, themeId: theme.themeId, variantId: theme.variantId, themeName: theme.themeName,
    };
  });
  save(state);
  return ok(draw);
}

/** Turns the revealed draw into a saved report and clears the table for the next question. */
export function saveTarotReport(drawId) {
  const state = load();
  if (!state.draw || state.draw.drawId !== drawId || state.draw.state !== "picked") return fail(409, "请先完成选牌");
  const report = composeReport(state.draw);
  state.reports = [report, ...state.reports].slice(0, MAX_REPORTS);
  state.draw = null;
  state.hiddenOrder = [];
  save(state);
  return ok(report);
}

export function getReportArchive(page = 1, pageSize = 10) {
  const { reports } = load();
  const total = reports.length, totalPages = total ? Math.ceil(total / pageSize) : 0;
  const current = Math.min(Math.max(1, page), Math.max(1, totalPages));
  const items = reports.slice((current - 1) * pageSize, current * pageSize).map(report => ({
    id: report.id, reportVersion: report.reportVersion, title: report.reading.title,
    subtitle: `${report.spread.name} · ${report.topic.label}`, createdAt: report.createdAt,
  }));
  return ok({ items, page: current, pageSize, total, totalPages });
}

export function getReport(reportId) {
  const report = load().reports.find(item => item.id === reportId);
  return report ? ok(report) : fail(404, "报告不存在或已被删除");
}

export function deleteReport(reportId) {
  const state = load();
  state.reports = state.reports.filter(item => item.id !== reportId);
  save(state);
  return ok({ deleted: true });
}

/** Clears readings and the unfinished draw; the card collection is kept. */
export function deleteReadingData() {
  const state = load();
  save({ ...fresh(), collection: state.collection });
  return ok({ deleted: true });
}

function composeReport(draw) {
  const reading = buildInstantReading({ catalogue, draw, resolveTheme });
  const cards = reading.cards.map(item => ({
    position: item.position.id, positionLabel: item.position.label, cardId: item.card.cardId, name: item.card.name,
    orientation: item.orientation, keywords: item.keywords, meaning: item.meaning, advice: item.advice,
    themeId: item.theme.themeId, variantId: item.theme.variantId, themeName: item.theme.themeName, themeMeaning: item.theme.meaning,
  }));
  const focus = reading.focus;
  const comparison = reading.comparison;
  const side = path => `${path.label}：现状是${path.now.card.name}${path.now.orientationLabel}（${path.now.keywords.slice(0, 2).join("、")}），发展指向${path.future.card.name}${path.future.orientationLabel}（${path.future.keywords.slice(0, 2).join("、")}）。`;
  return {
    id: uuid(), reportVersion: TAROT_READING_VERSION, catalogueVersion: catalogue.version, deckVersion: catalogue.deckVersion,
    spread: { id: reading.spread.id, name: reading.spread.name, positions: reading.spread.positions },
    topic: { id: reading.topic.id, label: reading.topic.label }, question: draw.question, options: draw.options, cards,
    reading: {
      title: `${focus.card.name}${focus.orientationLabel}的${reading.tone.label || "指引"}`,
      overview: reading.summary,
      cards: reading.cards.map(item => ({
        position: item.position.id, cardId: item.card.cardId, orientation: item.orientation,
        interpretation: `在「${item.position.label}」的位置上，${item.card.name}以「${item.theme.themeName}」主题${item.orientationLabel}显现：${item.meaning}`,
        advice: item.advice,
      })),
      synthesis: `${reading.tone.text}把这些牌连起来看，可以先从「${focus.position.label}」位置的${focus.card.name}着手：${focus.advice}`,
      ...(comparison ? { comparison: {
        optionA: side(comparison.optionA),
        optionB: side(comparison.optionB),
        contrast: "两条路各有可借的力与需要留意的结，决定时请结合实际条件。",
      } } : {}),
      guidance: {
        actions: [...new Set(reading.cards.map(item => item.advice))].slice(0, 2).concat("写下此刻的感受，过一段时间再回看。"),
        reflection: "这次占卜里，哪一句话让你停顿得最久？",
      },
      caution: "",
    },
    createdAt: new Date().toISOString(),
  };
}

// ---- moonlit collection -------------------------------------------------------------------

export function getCollection() {
  const { collection } = load();
  return ok({ collection: Object.entries(collection).map(([variantId, count]) => ({ variantId, count })) });
}

/** Draws one of the 110 themed cards with equal odds; duplicates only add to the count. */
export function drawMoonlitCard() {
  const state = load();
  const card = variants.cards[randomInt(variants.cards.length)];
  const count = Number(state.collection[card.variantId] || 0) + 1;
  state.collection[card.variantId] = count;
  save(state);
  return ok({ variantId: card.variantId, cardId: card.cardId, themeId: card.themeId, count, resultType: count === 1 ? "first" : "repeat" });
}

export function resetCollection() {
  const state = load();
  state.collection = {};
  save(state);
  return ok({ deleted: true });
}
