<template>
  <form>
    {{ property.name }}
    <select
      :value="filterType"
      @change="emit('update:filterType', $event.target.value)"
    >
      <option value="stringEquals">equals</option>
      <option value="stringContains">contains</option>
      <option value="stringStartsWith">starts with</option>
      <option value="stringEndsWith">ends with</option>
      <option value="stringRegex">matches regex</option>
    </select>
    <input
      :value="filterValue"
      @input="emit('update:filterValue', $event.target.value)"
    />
    <button type="submit">Add</button>
  </form>
</template>

<script lang="ts" setup>
import type { FilterablePropertyConfig } from "@/types/filter";

const props = defineProps<{
  filterType?: string;
  filterValue?: string;
  property: {
    name: string;
    config: FilterablePropertyConfig;
  };
}>();

const emit = defineEmits<{
  (event: "update:filterType", filterType: string): void;
  (event: "update:filterValue", filterValue: string): void;
}>();
</script>

<style scoped></style>
