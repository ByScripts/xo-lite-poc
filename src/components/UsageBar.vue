<template>
  <p class="title">{{ title }} <span>Top 5</span></p>
  <ProgressBar
    v-for="(item, index) in sortedTop5"
    :key="index"
    :max-value="maxValue"
    :value="item.value"
    :label="item.label"
    :badge-value="item.badgeValue"
  />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import ProgressBar from "@/components/ProgressBar.vue";

const props = defineProps<{
  data: Array<{
    value: number;
    label?: string;
    badgeValue?: string;
  }>;
  title?: string;
  maxValue?: number;
}>();

const sortedTop5 = computed(() => {
  let _data = props.data;
  _data = _data.sort((item, next) => next.value - item.value).slice(0, 5);
  return _data;
});
</script>

<style scoped>
.title {
  color: var(--color-extra-blue-base);
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid var(--color-extra-blue-base);
  margin-bottom: 2rem;
}
</style>

<style>
.progress-bar-component:nth-of-type(1) .progress-bar-fill,
.progress-bar-component:nth-of-type(1) .circle {
  background-color: var(--color-extra-blue-d60);
}
.progress-bar-component:nth-of-type(2) .progress-bar-fill,
.progress-bar-component:nth-of-type(2) .circle {
  background-color: var(--color-extra-blue-d40);
}
.progress-bar-component:nth-of-type(3) .progress-bar-fill,
.progress-bar-component:nth-of-type(3) .circle {
  background-color: var(--color-extra-blue-d20);
}
.progress-bar-component:nth-of-type(4) .progress-bar-fill,
.progress-bar-component:nth-of-type(4) .circle {
  background-color: var(--color-extra-blue-l20);
}
.progress-bar-component:nth-of-type(5) .progress-bar-fill,
.progress-bar-component:nth-of-type(5) .circle {
  background-color: var(--color-extra-blue-l20);
}
</style>
