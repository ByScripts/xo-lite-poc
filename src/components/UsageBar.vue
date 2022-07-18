<template>
  <div>
    <div class="progress-bar">
      <BarFill
        v-for="(item, index) in data"
        :color="item.color"
        :key="index"
        :max-value="maxValue"
        :value="item.value"
      />
    </div>
    <div class="legend-container">
      <span v-for="(item, index) in data" :key="index">
        <span class="circle" :style="{ backgroundColor: item.color }" />
        {{ item.legend }}
        <AppBadge> {{ ((item.value / maxValue) * 100).toFixed(1) }}% </AppBadge>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppBadge from "@/components/AppBadge.vue";
import BarFill from "@/components/BarFill.vue";

interface Props {
  data: Array<{
    color: string;
    value: number;
    legend?: string;
  }>;
  maxValue?: number;
}

withDefaults(defineProps<Props>(), {
  maxValue: 100,
});
</script>

<style lang="postcss" scoped>
.progress-bar {
  background-color: var(--color-blue-scale-400);
  border-radius: 0.4rem;
  display: flex;
  height: 1.2rem;
  margin: 10px;
  overflow: hidden;
}

.circle {
  background-color: red;
  border-radius: 1rem;
  display: inline-block;
  height: 10px;
  margin: 0 0 0 10px;
  width: 10px;
}

.legend-container {
  display: flex;
  flex-direction: column;
}
</style>
