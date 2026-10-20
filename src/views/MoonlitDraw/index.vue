<template>
  <main class="moonlit-demo-page"><div class="moonlit-shell">
    <section class="moonlit-hero" aria-labelledby="draw-title"><p class="moonlit-kicker">A SINGLE CARD · UNDER THE MOON</p><h1 id="draw-title">月下抽卡</h1><p>110 款主题卡独立抽取，每个主题都有自己的寓意。抽到的卡会收进当前浏览器里的收藏库。</p><div class="moonlit-actions"><router-link class="moonlit-button secondary" to="/moonlit-collection">查看收藏库</router-link><router-link class="moonlit-button quiet" to="/tarot-reading">前往月下占卜</router-link></div></section>
    <section class="moonlit-panel draw-stage" aria-labelledby="draw-stage-title" aria-live="polite">
      <template v-if="!result"><p class="moonlit-kicker">TONIGHT'S INVITATION</p><h2 id="draw-stage-title">让一张独立主题卡落到掌心</h2><div class="draw-card-back" aria-hidden="true"><b>✦</b><span>MOONLIT</span></div><div class="draw-methods single-method"><article class="draw-method"><h3>月下单抽</h3><p>110 款主题等概率；重复卡累计张数，每个主题都可以直接抽到。</p><button class="moonlit-button" :disabled="drawing" @click="startDraw">{{ drawing ? '正在抽取…' : '抽一张' }}</button></article></div></template>
      <template v-else-if="pending"><p class="moonlit-kicker">THE CARD IS WAITING</p><h2 id="draw-stage-title">点一下，揭开牌面</h2><button class="draw-card-back reveal-button" aria-label="揭示抽到的主题卡" @click="revealDemoResult"><b>✦</b><span>点击揭示</span></button><button class="moonlit-button quiet" @click="revealDemoResult">跳过动画并揭示</button></template>
      <template v-else-if="resultCard"><p class="moonlit-kicker">{{ result.resultType === 'first' ? 'FIRST ENCOUNTER' : 'A FAMILIAR CARD' }}</p><h2 id="draw-stage-title">{{ result.resultType === 'first' ? '收藏了一张新主题卡' : '同一主题，再次相遇' }}</h2><MoonlitCardArtwork :card="resultCard" /><p class="result-badge">{{ resultCard.name }} · {{ resultCard.themeName }} · {{ result.count }} 张</p><p>{{ resultCard.meaning }}</p><div class="moonlit-actions" style="justify-content:center"><button class="moonlit-button" @click="clearDemoResult">再抽一次</button><router-link class="moonlit-button secondary" :to="`/moonlit-collection?card=${resultCard.id}`">去收藏库查看</router-link></div></template>
      <p v-if="error" class="draw-error" role="alert">{{ error }}</p>
    </section>
  </div></main>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import MoonlitCardArtwork from '@/components/card/MoonlitCardArtwork.vue'
import { clearDemoResult, moonlitDemo, cardForResult, revealDemoResult, syncMoonlitCollection } from '@/data/moonlitCollectionDemo'
import { drawMoonlitCard, getCollection } from '@/api/localStore'
import '@/styles/moonlit-demo.scss'
const drawing=ref(false), error=ref('')
const result=computed(()=>moonlitDemo.result), pending=computed(()=>result.value?.status==='pending'), resultCard=computed(()=>cardForResult(result.value))
onMounted(async()=>{try{syncMoonlitCollection((await getCollection()).data)}catch(e){error.value=e.message||'收藏读取失败'}})
async function startDraw(){if(drawing.value)return;drawing.value=true;error.value='';try{const item=(await drawMoonlitCard()).data;moonlitDemo.result={...item,status:'pending'};moonlitDemo.collection[item.variantId]=Number(item.count)}catch(e){error.value=e.message||'抽卡失败'}finally{drawing.value=false}}
</script>
<style scoped>.single-method{grid-template-columns:minmax(0,520px);justify-content:center}.reveal-button{cursor:pointer;color:#dfbf7d}</style>
