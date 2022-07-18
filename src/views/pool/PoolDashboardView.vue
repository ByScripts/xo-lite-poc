<template>
  <div class="pool-dashboard-view">
    <PoolDashboardStatus class="item" />

    <AppCard style="min-width: 40rem">
      <AppTitle type="h4">Storage usage</AppTitle>
      <ProgressBar :value="65" style="margin: 1rem 0" />
      <ProgressBar :value="50" style="margin: 1rem 0" />
      <ProgressBar :value="40" style="margin: 1rem 0" />
      <ProgressBar :value="22" style="margin: 1rem 0" />
    </AppCard>

    <AppCard>
      <AppBadge>38/64 GB</AppBadge>
    </AppCard>

    <!-- Remove this AppCard when "UsageBar" is ready to be merged-->
    <AppCard style="min-width: 40rem">
      <AppTitle type="h4">Usage component</AppTitle>
      <UsageBar
        :data="[
          { color: '#FF9F2D', value: 25.4, legend: 'R620-L1' },
          { color: '#F74141', value: 17.7, legend: 'R620-L2' },
          { color: '#168FFF', value: 12.6, legend: 'R620-L3' },
          { color: '#17CB49', value: 8.8, legend: 'R620-L4' },
          { color: '#B7B7B7', value: 6, legend: 'xcp-ng-ran-test runx prod' },
          { color: '#707070', value: 1.8, legend: 'xcp-ng-sbzcntme' },
        ]"
      />
    </AppCard>
    <!-- -->
  </div>
</template>

<script lang="ts" setup>
import AppBadge from "@/components/AppBadge.vue";
import AppCard from "@/components/AppCard.vue";
import AppTitle from "@/components/AppTitle.vue";
import ProgressBar from "@/components/ProgressBar.vue";
import UsageBar from "@/components/UsageBar.vue";
import PoolDashboardStatus from "@/components/pool/dashboard/PoolDashboardStatus.vue";
</script>

<style lang="postcss" scoped>
.pool-dashboard-view {
  display: flex;
  padding: 2rem;
  gap: 2rem;
}

.item {
  min-width: 37rem;
}
</style>
