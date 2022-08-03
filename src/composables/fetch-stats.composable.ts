import { type Ref, ref } from "vue";
import { promiseTimeout, useIntervalFn } from "@vueuse/core";
import type { GRANULARITY, XapiStatsResponse } from "@/libs/xapi-stats";
import { useXenApiStore } from "@/stores/xen-api.store";

export default function useFetchStats<T>(
  type: "host" | "vm",
  id: string,
  granularity: GRANULARITY
) {
  const stats = ref();
  const xapiStats = useXenApiStore().getXapiStats();
  const fetch = type === "host" ? xapiStats.getHostStats : xapiStats.getVmStats;

  const fetchStats = async () => {
    stats.value = await fetch(id, granularity);
    await promiseTimeout(stats.value.interval * 1000);
  };
  useIntervalFn(fetchStats);

  return { stats } as { stats: Ref<XapiStatsResponse<T>> | undefined };
}
