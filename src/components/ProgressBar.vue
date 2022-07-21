<template>
  <div class="progress-bar">
    <div class="bar">
      <div class="bar-fill" />
    </div>
    <div class="badge" v-if="label !== undefined">
      <span class="circle" />
      {{ label }}
      <UiBadge>{{ badgeLabel ?? progressWithUnit }}</UiBadge>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import UiBadge from "@/components/ui/UiBadge.vue";

interface Props {
  badgeLabel?: string | number;
  label?: string;
  maxValue?: number;
  value: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxValue: 100,
});

const progressWithUnit = computed(() => {
  const progress = Math.round((props.value / props.maxValue) * 100);
  return `${progress}%`;
});
</script>

<style lang="postcss" scoped>
.badge {
  margin: 1rem 0;
  text-align: right;
}

.bar {
  background-color: var(--color-blue-scale-400);
  border-radius: 0.4rem;
  height: 1.2rem;
  margin: 1rem 0;
  overflow: hidden;
}

.bar-fill {
  animation: progress 1s ease-out forwards;
  background-color: var(--color-extra-blue-d20);
  height: 1.2rem;
  width: v-bind(progressWithUnit);
}

.circle {
  background-color: var(--color-extra-blue-d20);
  border-radius: 1rem;
  display: inline-block;
  height: 10px;
  width: 10px;
}

@keyframes progress {
  0% {
    width: 0;
  }
}
</style>
