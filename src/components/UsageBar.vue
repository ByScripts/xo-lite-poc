<template>
  <div class="header">
    <slot name="header" />
  </div>
  <ProgressBar
    v-for="(item, index) in items"
    :badge-label="item.badgeLabel"
    :key="index"
    :label="item.label"
    :max-value="item.maxValue"
    :value="item.value"
  />
  <div class="footer">
    <slot
      name="footer"
      :average-percent="averagePercent"
      :total-value="totalValue"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ProgressBar from "@/components/ProgressBar.vue";

interface Data {
  badgeLabel?: string;
  label?: string;
  maxValue?: number;
  value: number;
}

interface Props {
  data: Data[];
  title?: string;
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

<style scoped lang="postcss">
.header {
  border-bottom: 1px solid var(--color-extra-blue-base);
  color: var(--color-extra-blue-base);
  display: flex;
  font-size: 16px;
  font-weight: 700;
  justify-content: space-between;
  margin-bottom: 2rem;
}
.footer {
  color: var(--color-blue-scale-300);
  display: flex;
  font-weight: 700;
  font-size: 14px;
  justify-content: space-between;
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
  &:deep(.bar-fill),
  &:deep(.circle) {
    background-color: var(--color-extra-blue-l20);
  }
}
</style>
