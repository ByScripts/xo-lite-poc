<template>
  <div class="bar-fill" />
</template>

<script lang="ts" setup>
import { computed } from "vue";

interface Props {
  value: number;
  color: string;
  maxValue?: number;
}

const props = withDefaults(defineProps<Props>(), {
  maxValue: 100,
});

const progressWithUnit = computed(
  () => `${Math.round((props.value / props.maxValue) * 100)}%`
);
</script>

<style lang="postcss" scoped>
.bar-fill {
  animation: progress 1s ease-out forwards;
  background-color: v-bind(color);
  display: inline-block;
  width: v-bind(progressWithUnit);
}

@keyframes progress {
  0% {
    width: 0;
  }
}
</style>
