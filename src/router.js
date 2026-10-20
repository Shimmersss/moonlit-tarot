import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/", redirect: "/tarot-reading" },
  { path: "/tarot-reading", name: "TarotReading", component: () => import("@/views/TarotReading/index.vue"), meta: { title: "月下占卜" } },
  { path: "/tarot-reading/report/:reportId", name: "TarotReadingReport", component: () => import("@/views/TarotReading/ReportView.vue"), meta: { title: "占卜报告" } },
  { path: "/moonlit-collection", name: "MoonlitCollection", component: () => import("@/views/MoonlitCollection/index.vue"), meta: { title: "月下收藏库" } },
  { path: "/moonlit-draw", name: "MoonlitDraw", component: () => import("@/views/MoonlitDraw/index.vue"), meta: { title: "月下抽卡" } },
  { path: "/:pathMatch(.*)*", redirect: "/tarot-reading" },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior: (to, from, saved) => saved || { top: 0 },
});

router.afterEach(to => {
  document.title = to.meta.title ? `${to.meta.title} · 月下塔罗` : "月下塔罗";
});

export default router;
