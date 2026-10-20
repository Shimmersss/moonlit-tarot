<template>
  <form class="question-orb" @submit.prevent="$emit('next')">
    <div class="orb-column" aria-hidden="true">
      <div class="orb" :style="{ '--charge': charge }">
        <span class="orb-glow"></span>
        <span class="orb-core"></span>
        <span class="orb-ring"></span>
      </div>
      <p class="breath-hint">{{ breathText }}</p>
    </div>

    <div class="question-fields">
      <fieldset class="topic-field">
        <legend>想问哪个方向？</legend>
        <div class="topic-chips">
          <label v-for="topic in catalogue.topics" :key="topic.id" :class="{ selected: topicId === topic.id }">
            <input type="radio" name="tarot-topic" :value="topic.id" :checked="topicId === topic.id" @change="$emit('update:topicId', topic.id)" />
            <span>{{ topic.label }}</span>
            <small>{{ topic.hint }}</small>
          </label>
        </div>
      </fieldset>

      <label class="question-field">
        <span class="field-label">把问题交给月光</span>
        <textarea
          :value="question"
          rows="3"
          :maxlength="catalogue.limits.questionMax"
          placeholder="例如：接下来三个月，我在这个项目上最需要留意什么？"
          @input="$emit('update:question', $event.target.value)"
        ></textarea>
        <span class="field-meta"><span>请勿填写联系方式、证件号等个人信息</span><span>{{ length }} / {{ catalogue.limits.questionMax }}</span></span>
      </label>

      <details class="tips">
        <summary>如何问一个好问题</summary>
        <ul><li v-for="tip in catalogue.questionTips" :key="tip">{{ tip }}</li></ul>
      </details>

      <p v-if="problem" class="field-problem" role="status">{{ problem }}</p>
      <div class="stage-actions">
        <button class="tarot-button primary" type="submit">选择牌阵 <span aria-hidden="true">→</span></button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from "vue";

const props = defineProps({
  catalogue: { type: Object, required: true },
  question: { type: String, default: "" },
  topicId: { type: String, default: "" },
  problem: { type: String, default: "" },
});
defineEmits(["update:question", "update:topicId", "next"]);

const length = computed(() => [...props.question.trim()].length);
const charge = computed(() => Math.min(1, length.value / 36).toFixed(2));
const breathCycle = ["吸气 · 想着你的问题", "停留 · 让它变得清晰", "呼气 · 放下预设的答案"];
const breathIndex = ref(0);
const breathText = computed(() => breathCycle[breathIndex.value]);
let timer = 0;

onMounted(() => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  // Matches the 6s orb keyframes: two seconds per phrase.
  timer = window.setInterval(() => { breathIndex.value = (breathIndex.value + 1) % breathCycle.length; }, 2000);
});
onBeforeUnmount(() => window.clearInterval(timer));
</script>

<style scoped>
.question-orb {
  display: grid;
  grid-template-columns: minmax(180px, 250px) minmax(0, 1fr);
  gap: 36px;
  align-items: start;
}

.orb-column { display: grid; justify-items: center; gap: 14px; padding-top: 12px; }
.orb { --charge: 0; position: relative; width: min(220px, 100%); aspect-ratio: 1; }
.orb span { position: absolute; border-radius: 50%; }
.orb-glow {
  inset: -18%;
  background: radial-gradient(circle, #f3d48a55, #9c8cff22 45%, transparent 70%);
  opacity: calc(.35 + var(--charge) * .65);
  animation: orb-breathe 6s ease-in-out infinite;
}
.orb-core {
  inset: 14%;
  background: radial-gradient(circle at 38% 32%, #fffaf0, #d9c3ff 28%, #6b5aa8 62%, #1b1f43 100%);
  box-shadow: inset -12px -16px 30px #0d102a, inset 6px 8px 22px #ffffff40;
  animation: orb-breathe 6s ease-in-out infinite;
}
.orb-ring {
  inset: 4%;
  border: 1px solid #e7c98366;
  border-top-color: #f6dfa4;
  animation: orb-spin 14s linear infinite;
}
.breath-hint { min-height: 1.5em; margin: 0; color: #cdbf9f; font-size: 13px; letter-spacing: .08em; text-align: center; }

@keyframes orb-breathe { 0%, 100% { transform: scale(.94); } 33%, 50% { transform: scale(1.04); } }
@keyframes orb-spin { to { transform: rotate(360deg); } }

.question-fields { display: grid; gap: 20px; min-width: 0; }
.topic-field { margin: 0; padding: 0; border: 0; min-width: 0; }
.topic-field legend, .field-label { margin-bottom: 11px; color: #f6e7c4; font-weight: 700; }
.topic-chips { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 9px; }
.topic-chips label {
  position: relative;
  display: grid;
  gap: 4px;
  padding: 12px 14px;
  border: 1px solid #8d7a5866;
  border-radius: 12px;
  background: #ffffff07;
  cursor: pointer;
  transition: border-color .2s ease, background-color .2s ease, transform .2s ease;
}
.topic-chips label:hover { transform: translateY(-2px); }
.topic-chips label.selected { border-color: #e2c07b; background: #e2c07b1c; }
.topic-chips label:focus-within { outline: 2px solid #f1d18b; outline-offset: 2px; }
.topic-chips input { position: absolute; opacity: 0; pointer-events: none; }
.topic-chips span { color: #fff4dc; font-weight: 700; }
.topic-chips small { color: #aeb3c6; font-size: 12px; line-height: 1.5; }

.question-field { display: grid; gap: 0; }
textarea {
  width: 100%;
  box-sizing: border-box;
  min-height: 96px;
  padding: 14px 15px;
  border: 1px solid #b8975c88;
  border-radius: 12px;
  background: #0b1124cc;
  color: #fff8e8;
  font: inherit;
  line-height: 1.7;
  resize: vertical;
}
textarea::placeholder { color: #8d93a8; }
textarea:focus { outline: 2px solid #f1d18b; outline-offset: 1px; border-color: transparent; }
.field-meta { display: flex; justify-content: space-between; gap: 12px; margin-top: 7px; color: #9ca2b6; font-size: 12px; }

.tips { color: #c7cbd8; font-size: 13px; }
.tips summary { width: fit-content; color: #e7c886; cursor: pointer; }
.tips ul { margin: 10px 0 0; padding-left: 20px; line-height: 1.8; }
.field-problem { margin: 0; color: #f2b9a8; font-size: 13px; }

@media (max-width: 760px) {
  .question-orb { grid-template-columns: 1fr; gap: 18px; }
  .orb { width: 132px; }
  .field-meta { flex-direction: column; gap: 2px; }
}

@media (prefers-reduced-motion: reduce) {
  .orb-glow, .orb-core, .orb-ring { animation: none; }
  .topic-chips label { transition: none; }
}
</style>
