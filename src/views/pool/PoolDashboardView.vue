<template>
  <div class="pool-dashboard-view">
    <PoolDashboardStatus class="item" />

    <UiCard style="min-width: 40rem">
      <UiTitle type="h4">Storage usage</UiTitle>
      <ProgressBar :value="65" style="margin: 1rem 0" />
      <ProgressBar :value="50" style="margin: 1rem 0" />
      <ProgressBar :value="40" style="margin: 1rem 0" />
      <ProgressBar :value="22" style="margin: 1rem 0" />
      <p>{{ stats?.endTimestamp }}</p>
      <button @click="a">log</button>
    </UiCard>

    <UiCard>
      <UiBadge>38/64 GB</UiBadge>
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
import ProgressBar from "@/components/ProgressBar.vue";
import PoolDashboardStatus from "@/components/pool/dashboard/PoolDashboardStatus.vue";
import UiBadge from "@/components/ui/UiBadge.vue";
import UiCard from "@/components/ui/UiCard.vue";
import UiTitle from "@/components/ui/UiTitle.vue";
import useFetchStats from "@/composables/fetch-stats-composable";
import { Granularity, type HostStats, type VmStats } from "@/libs/xapi-stats";
import { useHostStore } from "@/stores/host.store";

const hosts = useHostStore().allRecords;

const a = () => {
  console.log(stats.value)
  console.log(vmStats.value);
};
const { stats: vmStats } = useFetchStats<VmStats>(
  "vm",
  "1d381a66-d1cb-bb7e-50a1-feeab58b293d",
  Granularity.Seconds
);
const { stats } = useFetchStats<HostStats>(
  "host",
  hosts?.[0]?.uuid,
  Granularity.Seconds
);
</script>

<style lang="postcss" scoped>
.pool-dashboard-view {
  display: flex;
  gap: 2rem;
}

.item {
  min-width: 37rem;
}
</style>
