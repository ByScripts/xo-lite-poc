<template>
  <FormWidget :before="filterIcon">
    <select v-model="selectedFilter">
      <option
        :value="{ filter: undefined, property: undefined }"
        v-if="!selectedFilter.property"
      >
        - Property -
      </option>
      <option
        v-for="(availableFilter, property) in availableFilters"
        :key="property"
        :value="{ filter: availableFilter, property }"
      >
        {{ availableFilter.label ?? property }}
      </option>
    </select>
  </FormWidget>

  <FormWidget v-if="selectedFilter.filter">
    <select v-model="selectedComparison">
      <option
        v-for="comparison in comparisons"
        :key="comparison.pattern"
        :value="comparison"
      >
        {{ comparison.label }}
      </option>
    </select>
  </FormWidget>

  <FormWidget
    v-if="isFilterTakingValue"
    :after="selectedComparison?.after"
    :before="selectedComparison?.before"
    style="flex: 1"
  >
    <input v-model="filterValue" />
  </FormWidget>
</template>

<script lang="ts" setup>
import { computed, watch } from "vue";
import type {
  Filter,
  FilterComparison,
  Filters,
  SelectedFilter,
} from "@/types/filter";
import { useVModel } from "@vueuse/core";
import FormWidget from "@/components/FormWidget.vue";
import { escapeRegExp, getFilterIcon } from "@/libs/utils";

const props = defineProps<{
  availableFilters: Filters;
  selectedComparison: FilterComparison;
  selectedFilter: SelectedFilter;
  filterValue: string;
}>();

const emit = defineEmits<{
  (event: "update:selectedFilter", value: Filter): void;
  (event: "update:selectedComparison", value?: FilterComparison): void;
  (event: "update:filterValue", value: string): void;
}>();

const selectedFilter = useVModel(props, "selectedFilter", emit);
const selectedComparison = useVModel(props, "selectedComparison", emit);
const filterValue = useVModel(props, "filterValue", emit);

const comparisons = computed<FilterComparison[]>(() => {
  if (!selectedFilter.value) {
    return [];
  }

  switch (selectedFilter.value.filter?.type) {
    case "string":
      return [
        { label: "contains", pattern: "%p:%v", default: true },
        { label: "equals", pattern: "%p:/^%v$/i", escape: true },
        { label: "starts with", pattern: "%p:/^%v/i", escape: true },
        { label: "ends with", pattern: "%p:/%v$/i", escape: true },
        {
          label: "matches regex",
          pattern: "%p:/%v/i",
          before: "/",
          after: "/i",
        },
      ];
    case "number":
      return [
        { label: "<", pattern: "%p:<%v" },
        { label: "<=", pattern: "%p:<=%v" },
        { label: "=", pattern: "%p:%v", default: true },
        { label: ">=", pattern: "%p:>=%v" },
        { label: ">", pattern: "%p:>%v" },
      ];
    case "boolean":
      return [
        { label: "is true", pattern: "%p?", default: true },
        { label: "is false", pattern: "!%p?" },
      ];
    case "enum":
      return selectedFilter.value.filter.choices.map((choice, index) => ({
        label: choice,
        pattern: `%p:/^${escapeRegExp(choice)}$/`,
        default: index === 0,
      }));
  }

  return [];
});

watch(
  () => props.selectedFilter?.property,
  (prop) => {
    console.log(prop);
    emit(
      "update:selectedComparison",
      comparisons.value.find((comparison) => comparison.default)
    );
  },
  { immediate: true }
);

const isFilterTakingValue = computed(() => {
  return selectedComparison.value?.pattern.includes("%v");
});

const filterIcon = computed(() => {
  return getFilterIcon(selectedFilter.value.filter);
});
</script>

<style scoped></style>
