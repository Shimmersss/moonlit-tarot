<template>
  <main class="tarot-page">
    <CelestialBackdrop :aura="flow.aura.value" />
    <div class="tarot-shell">
      <section class="tarot-hero" aria-labelledby="tarot-title">
        <div class="hero-copy">
          <p class="tarot-eyebrow">MOONLIT DIVINATION · MAJOR ARCANA</p>
          <h1 id="tarot-title">月下占卜</h1>
          <p class="hero-lead">静心提问，洗牌、切牌，再从二十二张大阿卡纳中亲手抽出你的牌。正位与逆位，都是月光给出的回声。</p>
          <ul class="hero-tags">
            <li>22 张大阿卡纳</li>
            <li>正位 · 逆位</li>
            <li>单张 · 圣三角 · 二择一</li>
          </ul>
        </div>
        <div class="hero-sigil">
          <AstrolabeSigil :active="flow.phase.value === 'shuffling'" />
          <div class="hero-cards" aria-hidden="true">
            <span v-for="(card, index) in heroCards" :key="card.variantId" class="hero-card" :style="{ '--i': index, '--aura': themeFamily(card.themeId).aura }">
              <img :src="card.image" alt="" decoding="async" />
            </span>
          </div>
        </div>
      </section>

      <p v-if="pageError" class="tarot-notice error" role="alert">{{ pageError }}</p>

      <section class="ritual tarot-panel" aria-labelledby="ritual-title">
        <ol class="ritual-steps" aria-label="占卜步骤">
          <li v-for="(step, index) in RITUAL_STEPS" :key="step.key" :class="{ done: index < flow.stepIndex.value, current: index === flow.stepIndex.value }" :aria-current="index === flow.stepIndex.value ? 'step' : undefined">
            <span class="step-star" aria-hidden="true"></span><span class="step-label">{{ step.label }}</span>
          </li>
        </ol>

        <header class="ritual-heading">
          <p class="tarot-eyebrow">{{ currentStep.eyebrow }}</p>
          <h2 id="ritual-title" ref="ritualTitle" tabindex="-1">{{ currentStep.title }}</h2>
          <p>{{ currentStep.hint }}</p>
        </header>

        <p v-if="flow.error.value" class="tarot-notice error ritual-error" role="alert">{{ flow.error.value }}</p>
        <p v-if="loading" class="ritual-loading" role="status">正在点亮星盘…</p>

        <QuestionOrb
          v-else-if="flow.phase.value === 'question'"
          v-model:question="flow.form.question"
          v-model:topic-id="flow.form.topicId"
          :catalogue="catalogue"
          :problem="flow.problem.value"
          @next="flow.toSpread"
        />
        <SpreadPicker
          v-else-if="flow.phase.value === 'spread'"
          v-model:spread-id="flow.form.spreadId"
          v-model:option-a="flow.form.optionA"
          v-model:option-b="flow.form.optionB"
          :catalogue="catalogue"
          :problem="flow.problem.value"
          :busy="flow.busy.value"
          @back="flow.backToQuestion"
          @next="flow.beginShuffle"
        />
        <ShuffleRitual v-else-if="flow.phase.value === 'shuffling'" :ready="flow.drawReady.value" @done="flow.finishShuffle" />
        <div v-else-if="flow.spread.value" class="ritual-table">
          <blockquote class="ritual-question">
            「{{ flow.question.value }}」
            <small>{{ flow.spread.value.name }} · {{ flow.topic.value.label }}</small>
          </blockquote>
          <SpreadBoard
            :spread="flow.spread.value"
            :cards="flow.boardCards.value"
            :filled="flow.picks.value.length"
            :revealed="flow.revealed.value"
            :interactive="flow.phase.value !== 'picking'"
            :fly-from="flow.flyFrom.value"
            :complete="flow.phase.value === 'reading'"
            @reveal="flow.reveal"
          />
          <Transition name="tarot-fade">
            <CardFan
              v-if="flow.phase.value === 'picking'"
              :picks-required="flow.spread.value.cardCount"
              :picked="flow.picks.value"
              :disabled="flow.busy.value"
              @pick="flow.pick"
            />
          </Transition>
          <p v-if="flow.phase.value === 'picking' && flow.busy.value" class="ritual-loading" role="status">牌阵已定，正在取回你的牌…</p>
          <div v-if="flow.phase.value === 'revealing'" class="stage-actions centered">
            <button class="tarot-button primary" type="button" @click="flow.revealNext">翻开下一张</button>
            <button class="tarot-button quiet" type="button" @click="flow.revealAll">全部翻开</button>
          </div>
          <InstantReading
            v-if="flow.phase.value === 'reading' && flow.reading.value"
            :reading="flow.reading.value"
            :disclaimer="catalogue.disclaimer"
            :busy="saving"
            @save="saveReport"
            @restart="flow.restart"
          />
        </div>
      </section>

      <ReadingArchive
        :archive="archive"
        :expanded="archiveExpanded"
        @toggle="archiveExpanded = !archiveExpanded"
        @page="changeArchivePage"
        @delete-all="deleteAllData"
      />

      <TarotDeckGallery :catalogue="catalogue" />
    </div>

  </main>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { deleteReadingData, getReportArchive, saveTarotReport } from "@/api/localStore";
import { RITUAL_STEPS, useReadingFlow } from "./useReadingFlow";
import { sampleThemedCards } from "@/data/tarotThemeLibrary";
import { themeFamily } from "@/utils/tarotThemes";
import CelestialBackdrop from "@/components/tarot/CelestialBackdrop.vue";
import AstrolabeSigil from "@/components/tarot/AstrolabeSigil.vue";
import QuestionOrb from "@/components/tarot/QuestionOrb.vue";
import SpreadPicker from "@/components/tarot/SpreadPicker.vue";
import ShuffleRitual from "@/components/tarot/ShuffleRitual.vue";
import SpreadBoard from "@/components/tarot/SpreadBoard.vue";
import CardFan from "@/components/tarot/CardFan.vue";
import InstantReading from "@/components/tarot/InstantReading.vue";
import ReadingArchive from "@/components/tarot/ReadingArchive.vue";
import TarotDeckGallery from "@/components/tarot/TarotDeckGallery.vue";
import "@/styles/tarot-reading.scss";

const router = useRouter();
const flow = useReadingFlow();
const catalogue = flow.catalogue;

const loading = ref(true), pageError = ref(""), saving = ref(false), archiveExpanded = ref(false);
const ritualTitle = ref(null);
const archive = reactive({ items: [], page: 1, pageSize: 10, total: 0, totalPages: 0 });

// Three cards from the 110-theme library drift beside the astrolabe; a new trio on every visit.
const heroCards = sampleThemedCards(3);
const currentStep = computed(() => RITUAL_STEPS[Math.max(0, flow.stepIndex.value)]);

async function loadArchive(page = archive.page) {
  const response = await getReportArchive(page, archive.pageSize);
  Object.assign(archive, response.data || {});
}

async function saveReport() {
  if (saving.value || !flow.draw.value) return;
  saving.value = true;
  pageError.value = "";
  try {
    const response = await saveTarotReport(flow.draw.value.drawId);
    flow.restart();
    await router.push(`/tarot-reading/report/${response.data.id}`);
  } catch (e) {
    pageError.value = e.message || "报告保存失败，请重试";
  } finally {
    saving.value = false;
  }
}

async function changeArchivePage(page) {
  try { await loadArchive(page); } catch (e) { pageError.value = e.message || "记录分页加载失败"; }
}

async function deleteAllData() {
  if (!window.confirm("确定删除全部占卜记录与进行中的牌阵吗？此操作不可恢复。")) return;
  try {
    await deleteReadingData();
    flow.restart();
    await loadArchive(1);
  } catch (e) {
    pageError.value = e.message || "删除失败";
  }
}

// Move focus to the new step heading so keyboard and screen-reader users follow the ritual.
watch(() => flow.phase.value, async (now, before) => {
  if (!before || loading.value) return;
  await nextTick();
  ritualTitle.value?.focus({ preventScroll: now === "reading" });
});

onMounted(async () => {
  try {
    await Promise.all([flow.restore(), loadArchive(1)]);
  } catch (e) {
    pageError.value = e.message || "星盘暂时没有回应，请刷新重试";
  } finally {
    loading.value = false;
  }
});
</script>

<style scoped lang="scss">
.tarot-hero {
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(220px, 330px);
  gap: 30px;
  align-items: center;
  padding: 48px 54px;
  border: 1px solid #d2ae6655;
  border-radius: 28px;
  background: radial-gradient(circle at 80% 30%, #6e5aa63d, transparent 45%), linear-gradient(125deg, #0f1631e6, #2a2142e6);
  box-shadow: 0 26px 80px #0007;
  overflow: clip;
}
.hero-copy h1 {
  margin: 0;
  color: #fff6e0;
  font: 500 clamp(40px, 6vw, 64px)/1.1 "Moonlit Serif", serif;
  letter-spacing: .08em;
  background: linear-gradient(100deg, #fff6e0 30%, #f6d58b 45%, #fff6e0 60%);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: title-shimmer 9s ease-in-out infinite;
}
@keyframes title-shimmer { 0%, 100% { background-position: 100% 0; } 50% { background-position: 0 0; } }
.hero-lead { max-width: 560px; margin: 18px 0 0; color: #cfd2df; font-size: 16px; line-height: 1.9; }
.hero-tags { display: flex; flex-wrap: wrap; gap: 8px; margin: 24px 0 0; padding: 0; list-style: none; }
.hero-tags li { padding: 6px 12px; border: 1px solid #dcb87855; border-radius: 99px; color: #f3dfb7; font-size: 12px; }
.hero-sigil { position: relative; width: 100%; max-width: 330px; justify-self: end; }
.hero-cards { position: absolute; left: 50%; bottom: -6%; width: 0; height: 0; }
.hero-card {
  --tilt: calc((var(--i) - 1) * 18deg);
  position: absolute;
  left: -44px;
  bottom: 0;
  width: 88px;
  aspect-ratio: 2 / 3;
  overflow: hidden;
  border: 1px solid #f2d79a99;
  border-radius: 8px;
  background: #10172b;
  box-shadow: 0 0 22px var(--aura), 0 10px 24px #0009;
  transform-origin: 50% 160%;
  transform: rotate(var(--tilt));
  animation: hero-card-float 7s ease-in-out infinite;
  animation-delay: calc(var(--i) * -2.3s);
}
.hero-card img { display: block; width: 100%; height: 100%; object-fit: cover; transform: scale(1.08); }
@keyframes hero-card-float {
  0%, 100% { transform: rotate(var(--tilt)) translateY(0); }
  50% { transform: rotate(calc(var(--tilt) * 1.15)) translateY(-10px); }
}

.ritual { display: grid; gap: 22px; overflow: clip; }
.ritual-steps { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); margin: 0; padding: 0; list-style: none; }
.ritual-steps li { position: relative; display: grid; justify-items: center; gap: 8px; color: #7d8398; font-size: 12px; letter-spacing: .1em; }
.ritual-steps li::before {
  content: "";
  position: absolute;
  top: 7px;
  left: calc(-50% + 9px);
  width: calc(100% - 18px);
  height: 1px;
  background: linear-gradient(90deg, #e0be7833, #e0be7833);
}
.ritual-steps li:first-child::before { display: none; }
.ritual-steps li.done::before, .ritual-steps li.current::before { background: linear-gradient(90deg, #e0be78, #e0be78aa); }
.step-star {
  width: 15px;
  height: 15px;
  clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%);
  background: #4a4f66;
  transition: background-color .4s ease, transform .4s ease;
}
.ritual-steps li.done { color: #c9b385; }
.ritual-steps li.done .step-star { background: #c9a35c; }
.ritual-steps li.current { color: #fff1cc; }
.ritual-steps li.current .step-star { background: #fff1cc; transform: scale(1.35); animation: step-pulse 2.4s ease-in-out infinite; }
@keyframes step-pulse { 50% { transform: scale(1.1); opacity: .7; } }

.ritual-heading { text-align: center; }
.ritual-heading h2 { margin: 0; color: #fff4dc; font: 500 clamp(24px, 3.4vw, 32px)/1.3 "Moonlit Serif", serif; }
.ritual-heading h2:focus { outline: none; }
.ritual-heading h2:focus-visible { outline: 2px solid #f1d18b; outline-offset: 6px; border-radius: 4px; }
.ritual-heading p:not(.tarot-eyebrow) { margin: 8px auto 0; max-width: 560px; color: #aab0c4; font-size: 14px; line-height: 1.7; }
.ritual-error { text-align: center; }
.ritual-loading { margin: 0; color: #e7d3a5; text-align: center; letter-spacing: .08em; }
.ritual-table { display: grid; gap: 26px; }
.ritual-question {
  margin: 0 auto;
  max-width: 680px;
  color: #f1e3c2;
  font: 500 18px/1.7 "Moonlit Serif", serif;
  text-align: center;
}
.ritual-question small { display: block; margin-top: 4px; color: #9ea4b8; font: 600 12px/1.4 system-ui, sans-serif; letter-spacing: .12em; }

.tarot-fade-enter-active, .tarot-fade-leave-active { transition: opacity .45s ease, transform .45s ease; }
.tarot-fade-enter-from, .tarot-fade-leave-to { opacity: 0; transform: translateY(18px); }

@media (max-width: 860px) {
  .tarot-hero { grid-template-columns: 1fr; padding: 34px 26px; }
  .hero-sigil { position: absolute; right: -70px; top: -50px; width: 240px; opacity: .45; pointer-events: none; }
  .hero-copy { position: relative; z-index: 1; }
  .hero-cards { display: none; }
}
@media (max-width: 600px) {
  .tarot-hero { padding: 28px 20px; border-radius: 20px; }
  .hero-lead { font-size: 14px; }
  .ritual-steps li { font-size: 11px; letter-spacing: .02em; }
  .ritual-question { font-size: 16px; }
}
@media (max-width: 360px) {
  .step-label { font-size: 10px; }
  .hero-sigil { width: 190px; right: -60px; }
}
@media (prefers-reduced-motion: reduce) {
  .hero-copy h1, .ritual-steps li.current .step-star, .hero-card { animation: none; }
  .tarot-fade-enter-active, .tarot-fade-leave-active { transition: none; }
}
</style>

