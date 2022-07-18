<template>
  <div class="filters">
    <span
      v-for="(activeFilter, index) in activeFilters"
      class="filter"
      :key="index"
    >
      {{ activeFilter }}
      <FontAwesomeIcon
        class="remove"
        :icon="faRemove"
        @click="emit('removeFilter', index)"
      />
    </span>

    <UiButton
      class="add-filter"
      color="action"
      @click="open"
      :icon-left="faPlus"
    >
      Add filter
    </UiButton>
  </div>

  <UiModal v-if="isOpen">
    <div v-if="!selectedProperty">Select a property below...</div>
    <component
      v-else-if="filterComponent"
      :is="filterComponent"
      @submit.prevent="handleSubmit"
      :property="selectedProperty"
      v-model:filterType="filterType"
      v-model:filterValue="filterValue"
    />

    <div
      v-for="(config, property) in availableFilters"
      :key="property"
      @click="selectedProperty = { name: property, config }"
    >
      {{ property }}
    </div>

    <UiButton @click="close">Cancel</UiButton>
  </UiModal>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import type {
  FilterType,
  FilterablePropertyConfig,
  Filters,
} from "@/types/filter";
import { faPlus, faRemove } from "@fortawesome/free-solid-svg-icons";
import FilterEnum from "@/components/filter/FilterEnum.vue";
import FilterString from "@/components/filter/FilterString.vue";
import UiButton from "@/components/ui/UiButton.vue";
import UiModal from "@/components/ui/UiModal.vue";
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

const filterComponent = computed(() => {
  switch (selectedProperty.value?.config.type) {
    case "string":
      return FilterString;
    case "enum":
      return FilterEnum;
    default:
      return undefined;
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
.filters {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  background-color: var(--background-color-primary);
}

.filter {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.4rem;
  color: var(--color-extra-blue-base);
  border: 1px solid var(--color-extra-blue-base);
  background-color: var(--background-color-extra-blue);
  padding: 0 1rem;
  border-radius: 1.7rem;
  font-size: 1.6rem;
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
