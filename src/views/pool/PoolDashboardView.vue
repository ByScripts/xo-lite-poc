<template>
  <div class="pool-dashboard-view">
    <PoolDashboardStatus class="item" />

    <UiCard style="min-width: 40rem">
      <UiTitle type="h4">RAM usage</UiTitle>
      <UsageBar
        title="Hosts"
        :data="[
          {
            value: 65,
            label: 'R620-L1',
            badgeValue: '38/64 GB',
          },
          {
            value: 48,
            label: 'R620-L2',
            badgeValue: '61/128 GB',
          },
          {
            value: 23,
            label: 'R620-L3',
            badgeValue: '118/512 GB',
          },
          {
            value: 12,
            label: 'R620-L4',
            badgeValue: '4/32 GB',
          },
          {
            value: 6,
            label: 'R620-L5',
            badgeValue: '60/1000 GB',
          },
        ]"
      />
    </UiCard>
  </div>
</template>

<script lang="ts" setup>
import ProgressBar from "@/components/ProgressBar.vue";
import UsageBar from "@/components/UsageBar.vue";
import PoolDashboardStatus from "@/components/pool/dashboard/PoolDashboardStatus.vue";
import UiBadge from "@/components/ui/UiBadge.vue";
import UiCard from "@/components/ui/UiCard.vue";
import UiTitle from "@/components/ui/UiTitle.vue";
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
