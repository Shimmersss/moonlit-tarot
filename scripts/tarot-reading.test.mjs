import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import {
  buildInstantReading,
  orientationLabel,
  questionProblem,
  readingTone,
  spreadProblem,
  validatePicks,
} from "../src/utils/tarotReading.js";
import { fanLayout, spreadSlotLayout } from "../src/utils/tarotLayout.js";
import { THEME_FAMILIES, createThemeResolver, fallbackThemeId, themeResonance } from "../src/utils/tarotThemes.js";

const catalogue = JSON.parse(await readFile(new URL("../src/data/tarotReading.json", import.meta.url), "utf8"));
const variants = JSON.parse(await readFile(new URL("../src/data/moonlitVariants.json", import.meta.url), "utf8")).cards;
const resolveTheme = createThemeResolver(variants);
const BANNED = /婚恋|相亲|伴侣|MBTI|人格|会客厅/;

test("catalogue covers the 22 major arcana with both orientations", () => {
  assert.equal(catalogue.version, "tarot-reading-v1");
  assert.equal(catalogue.cards.length, 22);
  catalogue.cards.forEach((card, index) => {
    const base = variants.find(variant => variant.variantId === `${card.cardId}-theme-01`);
    assert.equal(card.cardId, `major-${String(index).padStart(2, "0")}`);
    assert.equal(card.name, base.name);
    assert.equal(card.sourceId, base.sourceId);
    for (const orientation of ["upright", "reversed"]) {
      const face = card[orientation];
      assert.ok(face.keywords.length >= 3 && face.keywords.length <= 4, `${card.name} ${orientation} keywords`);
      assert.ok([...face.meaning].length >= 40 && [...face.meaning].length <= 120, `${card.name} ${orientation} meaning length`);
      assert.ok([...face.advice].length >= 10 && [...face.advice].length <= 40, `${card.name} ${orientation} advice length`);
    }
    assert.notEqual(card.upright.meaning, card.reversed.meaning);
  });
  assert.doesNotMatch(JSON.stringify(catalogue), BANNED);
});

test("spreads match the agreed positions", () => {
  assert.deepEqual(catalogue.spreads.map(spread => [spread.id, spread.cardCount]), [["single", 1], ["triangle", 3], ["choice", 5]]);
  assert.deepEqual(catalogue.spreads[1].positions.map(position => position.id), ["past", "present", "future"]);
  assert.deepEqual(catalogue.spreads[2].positions.map(position => position.id),
    ["now", "optionA-now", "optionB-now", "optionA-future", "optionB-future"]);
  for (const spread of catalogue.spreads) {
    assert.equal(spread.positions.length, spread.cardCount);
    const ids = new Set(spread.positions.map(position => position.id));
    spread.links.flat().forEach(id => assert.ok(ids.has(id), `${spread.id} link ${id}`));
  }
  assert.deepEqual(catalogue.topics.map(topic => topic.id), ["general", "career", "wealth", "relations", "growth"]);
});

test("form validation", () => {
  assert.match(questionProblem(catalogue, { question: "我该如何", topicId: "nope" }), /方向/);
  assert.match(questionProblem(catalogue, { question: "嗯", topicId: "general" }), /具体/);
  assert.equal(questionProblem(catalogue, { question: "这个项目下一步该怎么推进？", topicId: "career" }), "");
  assert.match(spreadProblem(catalogue, { spreadId: "choice", optionA: "留下", optionB: "" }), /两个选项/);
  assert.match(spreadProblem(catalogue, { spreadId: "choice", optionA: "留下", optionB: "留下" }), /不同/);
  assert.equal(spreadProblem(catalogue, { spreadId: "choice", optionA: "留下", optionB: "换个城市" }), "");
  assert.equal(spreadProblem(catalogue, { spreadId: "triangle" }), "");
  assert.ok(validatePicks([0, 7, 21], 3));
  assert.ok(!validatePicks([0, 0, 21], 3));
  assert.ok(!validatePicks([0, 22, 1], 3));
  assert.ok(!validatePicks([0, 1], 3));
});

test("instant reading uses reversed text and builds the choice comparison", () => {
  const draw = {
    spreadId: "choice", topicId: "career", question: "留在现在的团队还是换方向？",
    options: { optionA: "留下", optionB: "换方向" },
    cards: [
      { position: "now", cardId: "major-09", orientation: "upright" },
      { position: "optionA-now", cardId: "major-04", orientation: "reversed" },
      { position: "optionB-now", cardId: "major-00", orientation: "upright" },
      { position: "optionA-future", cardId: "major-10", orientation: "reversed" },
      { position: "optionB-future", cardId: "major-17", orientation: "upright" },
    ],
  };
  const reading = buildInstantReading({ catalogue, draw });
  assert.equal(reading.cards.length, 5);
  assert.equal(reading.cards[1].meaning, catalogue.cards[4].reversed.meaning);
  assert.equal(reading.cards[1].orientationLabel, "逆位");
  assert.equal(reading.comparison.optionA.label, "留下");
  assert.equal(reading.comparison.optionB.future.card.name, "星星");
  assert.equal(reading.tone.key, "mixed");
  assert.equal(reading.focus.position.id, "now");
  assert.equal(orientationLabel("upright"), "正位");
  assert.equal(readingTone([{ orientation: "reversed" }]).key, "inward");
  const triangle = buildInstantReading({ catalogue, draw: { spreadId: "triangle", topicId: "growth", question: "如何安顿情绪", cards: [
    { position: "past", cardId: "major-13", orientation: "upright" },
    { position: "present", cardId: "major-18", orientation: "reversed" },
    { position: "future", cardId: "major-19", orientation: "reversed" },
  ] } });
  assert.equal(triangle.tone.key, "tangled");
  assert.equal(triangle.comparison, null);
  assert.equal(buildInstantReading({ catalogue, draw: { spreadId: "single", cards: [] } }), null);
});

test("fan keeps every card reachable at desktop, 390px and 320px", () => {
  // Content widths after the page gutters and panel padding at each viewport.
  for (const width of [1124, 760, 759, 420, 419, 334, 276]) {
    const layout = fanLayout(22, width);
    assert.equal(layout.items.length, 22);
    assert.ok(layout.exposed >= 30, `width ${width} exposes ${layout.exposed}px`);
    layout.items.forEach(item => {
      assert.ok(item.x - layout.cardWidth / 2 >= 0 && item.x + layout.cardWidth / 2 <= width, `card ${item.index} fits ${width}`);
    });
  }
  assert.equal(fanLayout(22, 1124).rows, 1);
  assert.equal(fanLayout(22, 334).rows, 4);
});

test("spread boards keep slots inside the board", () => {
  for (const spread of catalogue.spreads) {
    for (const width of [640, 334, 276]) {
      const board = spreadSlotLayout(spread, width);
      board.slots.forEach(slot => {
        assert.ok(slot.left >= 0 && slot.left + board.cardWidth <= width, `${spread.id} ${slot.id} x at ${width}`);
        assert.ok(slot.top >= 0 && slot.top + board.cardHeight <= board.height, `${spread.id} ${slot.id} y at ${width}`);
      });
    }
  }
});

test("every drawn card can manifest in each of its five moonlit themes", async () => {
  assert.deepEqual(THEME_FAMILIES.map(family => family.themeId), ["theme-01", "theme-02", "theme-03", "theme-04", "theme-05"]);
  for (const card of catalogue.cards) {
    for (const family of THEME_FAMILIES) {
      const theme = resolveTheme({ cardId: card.cardId, themeId: family.themeId });
      assert.equal(theme.variantId, `${card.cardId}-${family.themeId}`);
      assert.match(theme.cover, /^\/tarot\/flashcards\/covers\/major-\d{2}-theme-0[1-5]\.jpg$/);
      assert.match(theme.lineart, /^\/tarot\/flashcards\/v20261009\/major-\d{2}\/theme-0[1-5]\/assets\/lineart\.png$/);
      assert.ok(theme.themeName && theme.meaning, `${theme.variantId} has a name and meaning`);
      await access(new URL(`../public${theme.cover}`, import.meta.url));
      await access(new URL(`../public${theme.lineart}`, import.meta.url));
    }
  }
});

test("themes fall back deterministically and resonate when a series repeats", () => {
  assert.equal(fallbackThemeId("draw-1", "past"), fallbackThemeId("draw-1", "past"));
  const spread = new Set(Array.from({ length: 40 }, (_, index) => fallbackThemeId(`draw-${index}`, "past")));
  assert.ok(spread.size >= 4, "fallback uses most of the five themes");
  assert.equal(resolveTheme({ cardId: "major-18", position: "past" }, "draw-1").themeId, fallbackThemeId("draw-1", "past"));
  assert.equal(resolveTheme({ cardId: "major-18", themeId: "theme-99" }, "seed").variantId.startsWith("major-18-theme-0"), true);

  const draw = { drawId: "d1", spreadId: "triangle", topicId: "growth", question: "如何安顿情绪", cards: [
    { position: "past", cardId: "major-13", orientation: "upright", themeId: "theme-02" },
    { position: "present", cardId: "major-18", orientation: "reversed", themeId: "theme-02" },
    { position: "future", cardId: "major-19", orientation: "upright", themeId: "theme-05" },
  ] };
  const reading = buildInstantReading({ catalogue, draw, resolveTheme });
  assert.equal(reading.cards[0].theme.variantId, "major-13-theme-02");
  assert.equal(reading.cards[0].image, reading.cards[0].theme.cover);
  assert.equal(reading.resonance.family.label, "潮汐");
  assert.equal(reading.resonance.count, 2);
  assert.equal(themeResonance([reading.cards[0].theme, reading.cards[2].theme]), null);
  assert.equal(buildInstantReading({ catalogue, draw }).cards[0].theme, null);
});
