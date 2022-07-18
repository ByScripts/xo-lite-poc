# useCollectionFilter composable

```vue
<template>
  <CollectionFilter
    :active-filters="activeFilters"
    :available-filters="availableFilters"
    @add-filter="addFilter"
    @remove-filter="removeFilter"
  />
  
  <div v-for="item in filteredCollection">...</div>
</template>

<script lang="ts" setup>
  import CollectionFilter from "@/components/filter/CollectionFilter.vue";
  import useCollectionFilter from "@/composables/collection-filter.composable";
  import { computed } from "vue";

  const collection = [
    { name: "Foo", team: "Blue" },
    { name: "Bar", team: "Red" },
    { name: "Baz", team: "Blue" },
  ]

  const filters = {
    name: { type: "string" },
    team: { type: "enum", choices: ["Blue", "Red"] },
  };

  const {
    predicate,
    activeFilters,
    addFilter,
    removeFilter,
  } = useCollectionFilter()

  const filteredCollection = computed(() => collection.filter(predicate));
</script>
```
