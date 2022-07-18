<template>
  <div class="progress-bar">
    <BarFill color="transparent" :max-value="maxValue" :value="value" />
  </div>
</template>

<script lang="ts" setup>
import BarFill from "@/components/BarFill.vue";

interface Props {
  value: number;
  maxValue?: number;
}

defineProps<Props>();
</script>

<style lang="postcss" scoped>
.progress-bar {
  overflow: hidden;
  height: 1.2rem;
  border-radius: 0.4rem;
  display: flex;
  background-color: var(--color-blue-scale-400);
}

.bar-fill {
  background-color: var(--color-extra-blue-d20);
}
</style>
