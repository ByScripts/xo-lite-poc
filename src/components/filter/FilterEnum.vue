<template>
  <form>
    {{ property.name }}
    <select @change="emit('update:filterValue', $event.target.value)">
      <option v-if="!filterValue" />
      <option
        v-for="choice in property.config.choices"
        :key="choice"
        :value="choice"
      >
        {{ choice }}
      </option>
    </select>
    <button type="submit">Add</button>
  </form>
</template>

<script lang="ts" setup>
import type { FilterablePropertyConfig } from "@/types/filter";

const props = defineProps<{
  filterValue?: string;
  property: {
    name: string;
    config: FilterablePropertyConfig;
  };
}>();

const emit = defineEmits<{
  (event: "update:filterValue", filterValue: string): void;
}>();
</script>

<style scoped></style>
