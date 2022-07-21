<template>
  <div class="filters">
    <span
      v-for="(activeFilter, index) in activeFilters"
      :key="index"
      class="filter"
    >
      {{ activeFilter }}
      <FontAwesomeIcon
        :icon="faRemove"
        class="remove"
        @click="emit('removeFilter', index)"
      />
    </span>

    <UiButton
      :icon-left="faPlus"
      class="add-filter"
      color="action"
      @click="open"
    >
      Add filter
    </UiButton>
  </div>

  <UiModal v-if="isOpen">
    <div v-if="!selectedProperty">Select a property below...</div>
    <form v-else @submit.prevent="handleSubmit">
      {{ selectedProperty.config.title ?? selectedProperty.name }}

      <template v-if="selectedProperty.config.type === 'string'">
        <select v-model="filterType">
          <option value="stringEquals">equals</option>
          <option value="stringContains">contains</option>
          <option value="stringStartsWith">starts with</option>
          <option value="stringEndsWith">ends with</option>
          <option value="stringRegex">matches regex</option>
        </select>
        <input v-model="filterValue" />
      </template>

      <select
        v-else-if="selectedProperty.config.type === 'enum'"
        v-model="filterValue"
      >
        <option v-if="!filterValue" />
        <option
          v-for="choice in selectedProperty.config.choices"
          :key="choice"
          :value="choice"
        >
          {{ choice }}
        </option>
      </select>

      <button type="submit">Add</button>
    </form>

    <UiSeparator />

    <UiTitle class="properties-title" type="h5">Properties</UiTitle>
    <div class="available-filters">
      <div
        v-for="(config, property) in availableFilters"
        :key="property"
        :class="{
          selected: selectedProperty && selectedProperty.name === property,
        }"
        class="available-filter"
        @click="selectedProperty = { name: property, config }"
      >
        <FontAwesomeIcon :icon="filterIcon(config)" fixed-width />
        {{ config.title ?? property }}
      </div>
    </div>

    <div style="text-align: right">
      <UiButton color="action" @click="close">Cancel</UiButton>
    </div>
  </UiModal>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import type {
  FilterType,
  FilterablePropertyConfig,
  Filters,
} from "@/types/filter";
import {
  faAlignLeft,
  faCheckSquare,
  faFont,
  faHashtag,
  faList,
  faPlus,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import UiButton from "@/components/ui/UiButton.vue";
import UiModal from "@/components/ui/UiModal.vue";
import UiSeparator from "@/components/ui/UiSeparator.vue";
import UiTitle from "@/components/ui/UiTitle.vue";
import useModal from "@/composables/modal.composable";

defineProps<{
  activeFilters: unknown;
  availableFilters: Filters<unknown>;
}>();

const emit = defineEmits<{
  (
    event: "addFilter",
    property: string,
    filterType: string,
    filterValue: string
  ): void;
  (event: "removeFilter", index: number): void;
}>();

const { open, close, isOpen } = useModal();

const selectedProperty = ref<{
  name: string;
  config: FilterablePropertyConfig;
}>();
const filterType = ref<FilterType>();
const filterValue = ref();

function filterIcon(config: FilterablePropertyConfig) {
  if (config.icon) {
    return config.icon;
  }

  switch (config.type) {
    case "string":
      return faFont;
    case "text":
      return faAlignLeft;
    case "enum":
      return faList;
    case "number":
      return faHashtag;
    case "boolean":
      return faCheckSquare;
    default:
  }
}

watch(selectedProperty, (value) => {
  if (!value) {
    return;
  }

  switch (value.config.type) {
    case "string":
      return (filterType.value = "stringContains");
  }
});

watch(isOpen, (value) => {
  if (!value) {
    selectedProperty.value = undefined;
    filterType.value = undefined;
    filterValue.value = undefined;
  }
});

function handleSubmit() {
  if (!selectedProperty.value) {
    return;
  }

  if (selectedProperty.value.config.type === "enum") {
    filterType.value = "stringEquals";
  }

  if (!filterType.value) {
    return;
  }

  emit(
    "addFilter",
    selectedProperty.value.name,
    filterType.value,
    filterValue.value
  );
  close();
}
</script>

<style scoped>
.properties-title {
  color: var(--color-extra-blue-base);
}

.available-filters {
  display: flex;
  flex-direction: column;
}

.available-filter {
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 3.2rem;
  font-size: 1.4rem;
  font-weight: 400;
  cursor: pointer;
  text-transform: uppercase;

  &:hover {
    color: var(--color-grayscale-200);
  }

  &.selected {
    color: var(--color-extra-blue-base);
  }
}

.filters {
  display: flex;
  padding: 1rem;
  background-color: var(--background-color-primary);
  gap: 1rem;
}

.filter {
  font-size: 1.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 3.4rem;
  padding: 0 1rem;
  color: var(--color-extra-blue-base);
  border: 1px solid var(--color-extra-blue-base);
  border-radius: 1.7rem;
  background-color: var(--background-color-extra-blue);
  gap: 1rem;
}

.add-filter {
  height: 3.4rem;
}

.remove {
  cursor: pointer;
  color: red;
}
</style>
