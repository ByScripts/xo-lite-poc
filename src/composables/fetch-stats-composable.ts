import { type Ref, onMounted, onUnmounted, ref } from "vue";
import type { Granularity, XapiStatsResponse } from "@/libs/xapi-stats";
import { useXenApiStore } from "@/stores/xen-api.store";

export default function useFetchStats<T>(
  type: "host" | "vm",
  id: string,
  granularity: Granularity
) {
  const stats = ref();

  const xapiStats = useXenApiStore().getXapiStats();
  const fetch = type === "host" ? xapiStats.getHostStats : xapiStats.getVmStats;

  let watch = false;

  onMounted(async () => {
    watch = true;
    while (watch) {
      await fetchStats();
    }
  });

  onUnmounted(() => {
    watch = false;
  });

  const fetchStats = async () => {
    const _stats = await fetch(id, granularity);
    stats.value = _stats;
    await delay(_stats.interval * 1000);
  };

  return { stats } as { stats: Ref<XapiStatsResponse<T>> };
}

async function delay(ms: number) {
  return await new Promise((resolve) => setTimeout(resolve, ms));
}
