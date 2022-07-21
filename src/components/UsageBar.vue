<template>
  <div class="header">
    <slot name="header" />
  </div>
  <ProgressBar
    v-for="(item, index) in items"
    :key="index"
    :value="item.value"
    :max-value="item.maxValue"
    :label="item.label"
    :badge-label="item.badgeLabel"
  />
  <div class="footer">
    <slot
      name="footer"
      :total-value="totalValue"
      :average-percent="averagePercent"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ProgressBar from "@/components/ProgressBar.vue";

interface Data {
  value: number;
  label?: string;
  badgeLabel?: string;
  maxValue?: number;
}

interface Props {
  data: Data[];
}

const props = defineProps<Props>();

const items = computed(() =>
  props.data
    .map((item) => ({
      ...item,
      percent: Math.round((item.value / (item.maxValue ?? 100)) * 100),
    }))
    .sort((item, nextItem) => nextItem.percent - item.percent)
);

const averagePercent = computed(
  () =>
    items.value.reduce((total, item) => total + item.percent, 0) /
    items.value.length
);

const totalValue = computed(() =>
  items.value.reduce((total, item) => total + item.value, 0)
);
</script>

<style scoped>
.header {
  color: var(--color-extra-blue-base);
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-extra-blue-base);
  margin-bottom: 2rem;
  font-size: 16px;
  font-weight: 700;
}
.footer {
  display: flex;
  justify-content: space-between;
  font-weight: 700;
  font-size: 14px;
  color: var(--color-blue-scale-300);
}

.progress-bar {
  &:nth-of-type(2) :deep(.bar-fill),
  &:nth-of-type(2) :deep(.circle) {
    background-color: var(--color-extra-blue-d60);
  }
  &:nth-of-type(3) :deep(.bar-fill),
  &:nth-of-type(3) :deep(.circle) {
    background-color: var(--color-extra-blue-d40);
  }
  &:nth-of-type(4) :deep(.bar-fill),
  &:nth-of-type(4) :deep(.circle) {
    background-color: var(--color-extra-blue-d20);
  }
  & :deep(.bar-fill),
  & :deep(.circle) {
    background-color: var(--color-extra-blue-l20);
  }
}
</style>
