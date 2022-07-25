<template>
  <UiFilterGroup>
    <UiFilter
      v-for="filter in activeFilters"
      :key="filter"
      @click="editFilter(filter)"
      @remove="emit('removeFilter', filter)"
    >
      {{ filter }}
    </UiFilter>

    <UiButton
      :icon-left="faPlus"
      class="add-filter"
      color="action"
      @click="open"
    >
      Add filter
    </UiButton>
  </UiFilterGroup>

  <UiModal v-if="isOpen">
    <div class="filter-title">
      {{ isAdvancedModeEnabled ? "Type your search" : "Add a filter" }}
    </div>
    <form @submit.prevent="handleSubmit">
      <template v-if="!isAdvancedModeEnabled">
        <div
          class="form-row"
          v-for="(filter, index) in filters"
          :key="
            JSON.stringify([filter.selectedFilter, filter.selectedComparison])
          "
        >
          <span
            v-if="filters.length > 1"
            :style="{ visibility: index === 0 ? 'hidden' : 'visible' }"
          >
            OR
          </span>
          <CollectionFilterRow
            v-model:filter-value="filters[index].filterValue"
            v-model:selected-comparison="filters[index].selectedComparison"
            v-model:selected-filter="filters[index].selectedFilter"
            :available-filters="availableFilters"
          />
          <span
            v-if="index > 0"
            style="margin-left: auto"
            @click="removeFilterAtIndex(index)"
          >
            <FontAwesomeIcon :icon="faRemove" class="remove" />
          </span>
          <UiButton v-else :disabled="!isFilterValid" type="submit">
            Save
          </UiButton>
        </div>
      </template>

      <div v-else>
        <div style="display: flex; gap: 1rem">
          <FormWidget :before="faAngleRight" style="flex: 1">
            <input v-model="advancedFilter" />
          </FormWidget>
          <UiButton :disabled="!isFilterValid" type="submit"> Save </UiButton>
        </div>

        <div class="properties">
          <ul>
            <li
              v-for="(filter, property) in availableFilters"
              :key="property"
              @click="addAdvancedFilter(property, filter)"
            >
              +
              <FontAwesomeIcon :icon="getFilterIcon(filter)" fixed-width />
              {{ filter.label ?? property }}
            </li>
          </ul>
        </div>
      </div>

      <UiButtonGroup>
        <template v-if="!isAdvancedModeEnabled">
          <UiButton color="action" @click="addFilter">+ OR</UiButton>

          <UiButton
            :icon-left="faPencil"
            color="action"
            @click="isAdvancedModeEnabled = true"
          >
            Edit manually
          </UiButton>
        </template>

        <UiButton color="action" @click="handleCancel">Cancel</UiButton>
      </UiButtonGroup>
    </form>
  </UiModal>
</template>

<script lang="ts" setup>
import { parse } from "complex-matcher";
import { computed, nextTick, ref, watch } from "vue";
import type { Filter, FilterRow, Filters } from "@/types/filter";
import {
  faAngleRight,
  faPencil,
  faPlus,
  faRemove,
} from "@fortawesome/free-solid-svg-icons";
import CollectionFilterRow from "@/components/CollectionFilterRow.vue";
import FormWidget from "@/components/FormWidget.vue";
import UiButton from "@/components/ui/UiButton.vue";
import UiButtonGroup from "@/components/ui/UiButtonGroup.vue";
import UiFilter from "@/components/ui/UiFilter.vue";
import UiFilterGroup from "@/components/ui/UiFilterGroup.vue";
import UiModal from "@/components/ui/UiModal.vue";
import useModal from "@/composables/modal.composable";
import { escapeRegExp, getFilterIcon } from "@/libs/utils";

defineProps<{
  availableFilters: Filters;
  activeFilters: string[];
}>();

const emit = defineEmits<{
  (event: "addFilter", filter: string): void;
  (event: "removeFilter", filter: string): void;
}>();

const { open, close, isOpen } = useModal();

const advancedFilter = ref<string>();
const isAdvancedModeEnabled = ref(false);

watch(isAdvancedModeEnabled, (isEnabled) => {
  advancedFilter.value = isEnabled ? generatedFilter.value : "";
});

const filters = ref<FilterRow[]>([]);

const addFilter = () =>
  filters.value.push({
    selectedFilter: {
      property: undefined,
      filter: undefined,
    },
    selectedComparison: undefined,
    filterValue: "",
  });

const removeFilterAtIndex = (index: number) => {
  filters.value.splice(index, 1);
};

addFilter();

const filterValueToReplace = ref<string>();

const editFilter = (filter: string) => {
  filterValueToReplace.value = filter;
  open();
  isAdvancedModeEnabled.value = true;
  nextTick(() => (advancedFilter.value = filter));
};

const addAdvancedFilter = (property: string, filter: Filter) => {
  const char = filter.type === "boolean" ? "?" : ":";
  advancedFilter.value = `${advancedFilter.value} ${property}${char}`;
};

const generatedFilter = computed(() => {
  const result = filters.value
    .map((filter) => {
      if (!filter.selectedFilter || !filter.selectedComparison) {
        return "";
      }

      const result = filter.selectedComparison.pattern.replace(
        "%p",
        filter.selectedFilter.property
      );

      if (!filter.selectedComparison.pattern.includes("%v")) {
        return result;
      }

      if (!filter.filterValue) {
        return "";
      }

      return result.replace(
        "%v",
        filter.selectedComparison.escape
          ? escapeRegExp(filter.filterValue)
          : filter.filterValue
      );
    })
    .filter((value) => !!value)
    .join(" ");

  if (filters.value.length > 1) {
    return `|(${result})`;
  }

  return result;
});

const handleReset = () => {
  filters.value = [];
  isAdvancedModeEnabled.value = false;
  filterValueToReplace.value = "";
  addFilter();
};

const handleCancel = () => {
  handleReset();
  close();
};

const isFilterValid = computed(() => {
  const filter = isAdvancedModeEnabled.value
    ? advancedFilter.value
    : generatedFilter.value;

  if (!filter) {
    return false;
  }

  try {
    parse(filter);
    return true;
  } catch {
    return false;
  }
});

const handleSubmit = () => {
  if (!isFilterValid.value) {
    return;
  }

  if (filterValueToReplace.value) {
    emit("removeFilter", filterValueToReplace.value);
  }

  emit(
    "addFilter",
    isAdvancedModeEnabled.value ? advancedFilter.value! : generatedFilter.value!
  );

  handleReset();
  close();
};
</script>

<style scoped>
.filter-title {
  color: var(--color-blue-scale-300);
  margin-bottom: 0.5rem;
}

.add-filter {
  height: 3.4rem;
}

.form-row {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  gap: 1rem;
  border-bottom: 1px solid var(--background-color-secondary);
}

.properties {
  font-size: 1.6rem;
  margin-top: 1rem;

  ul {
    margin-left: 1rem;
  }

  li {
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }
}

.remove {
  color: red;
  cursor: pointer;
  font-size: 2rem;
}
</style>
