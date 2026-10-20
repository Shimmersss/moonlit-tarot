<template>
  <main class="tarot-page">
    <CelestialBackdrop />
    <div class="tarot-shell">
      <p v-if="error" class="tarot-notice error" role="alert">
        {{ error }} <router-link class="tarot-text-button" to="/tarot-reading">返回月下占卜</router-link>
      </p>
      <p v-else-if="loading" class="tarot-notice" role="status">正在展开占卜报告…</p>
      <TarotReadingReport v-else-if="report" :report="report" @delete="deleteReport" />
    </div>
  </main>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { deleteReport as removeReport, getReport } from "@/api/localStore";
import CelestialBackdrop from "@/components/tarot/CelestialBackdrop.vue";
import TarotReadingReport from "./TarotReadingReport.vue";
import "@/styles/tarot-reading.scss";

const route = useRoute();
const router = useRouter();
const loading = ref(true), error = ref(""), report = ref(null);

onMounted(async () => {
  try {
    const response = await getReport(route.params.reportId);
    report.value = response.data;
  } catch (e) {
    error.value = e.message || "报告加载失败";
  } finally {
    loading.value = false;
  }
});

async function deleteReport() {
  if (!window.confirm("确定删除这份报告吗？删除后无法恢复。")) return;
  try {
    await removeReport(route.params.reportId);
    await router.push("/tarot-reading");
  } catch (e) {
    error.value = e.message || "删除失败";
  }
}
</script>
