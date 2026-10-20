<template>
  <a class="skip-link" href="#app-content">跳到正文</a>
  <header class="app-bar">
    <router-link class="brand" to="/tarot-reading" aria-label="月下塔罗首页">
      <svg viewBox="0 0 64 64" aria-hidden="true"><path d="M38 14a18 18 0 1 0 12 30A16 16 0 0 1 38 14z" fill="currentColor" /></svg>
      <span>月下塔罗</span>
    </router-link>
    <nav aria-label="主导航">
      <router-link v-for="item in links" :key="item.to" :to="item.to" class="nav-link">{{ item.label }}</router-link>
    </nav>
  </header>
  <div id="app-content" tabindex="-1">
    <router-view />
  </div>
  <footer class="app-footer">
    <p>代码 MIT · 美术素材 CC BY-NC-SA 4.0 · 记录只保存在你的浏览器里</p>
    <p>塔罗内容仅供娱乐与自我反思，不构成任何医疗、法律或财务建议。</p>
  </footer>
</template>

<script setup>
const links = [
  { to: "/tarot-reading", label: "占卜" },
  { to: "/moonlit-draw", label: "抽卡" },
  { to: "/moonlit-collection", label: "收藏库" },
];
</script>

<style scoped>
.skip-link { position: absolute; left: 12px; top: -48px; z-index: 20; padding: 8px 12px; border-radius: 8px; background: #f1d28c; color: #171628; font-weight: 700; }
.skip-link:focus { top: 10px; }
.app-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  min-height: 56px;
  padding: 0 max(16px, calc((100vw - 1180px) / 2));
  border-bottom: 1px solid #d2ae6633;
  background: #070b18e6;
  backdrop-filter: blur(10px);
}
.brand { display: inline-flex; align-items: center; gap: 8px; color: #f6e2b0; font: 500 18px/1 "Moonlit Serif", serif; letter-spacing: .08em; text-decoration: none; white-space: nowrap; }
.brand svg { width: 22px; height: 22px; color: #f1d28c; }
nav { display: flex; gap: 4px; }
.nav-link { padding: 8px 12px; border-radius: 99px; color: #c3c8d8; font-size: 14px; text-decoration: none; white-space: nowrap; }
.nav-link:hover { color: #fff1cc; }
.nav-link.router-link-active { background: #d3ae6622; color: #ffe9b9; }
.brand:focus-visible, .nav-link:focus-visible { outline: 2px solid #f1d18b; outline-offset: 2px; }
#app-content:focus { outline: none; }
.app-footer { padding: 22px 16px 28px; border-top: 1px solid #d2ae6622; background: #070b18; color: #8d93a8; font-size: 12px; line-height: 1.7; text-align: center; }
.app-footer p { margin: 0; }
@media (max-width: 420px) {
  .app-bar { gap: 8px; }
  .brand span { font-size: 16px; }
  .nav-link { padding: 7px 9px; font-size: 13px; }
}
@media (max-width: 340px) {
  .brand span { display: none; }
}
</style>
