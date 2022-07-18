import type { ComparisonOperator } from "complex-matcher";
import * as CM from "complex-matcher";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type { FilterType } from "@/types";
import { escapeRegExp } from "@/libs/utils";

export default function useCollectionFilter() {
  const route = useRoute();
  const router = useRouter();

  const activeFilters = ref(
    new CM.And(
      route.query.filter ? [CM.parse(route.query.filter as string)] : []
    )
  );

  const activeFiltersAsString = computed(() => activeFilters.value.toString());

  const predicate = computed(() => activeFilters.value.createPredicate());

  const removeFilter = (index: number) => {
    activeFilters.value.children.splice(index, 1);
  };

  if (router) {
    watch(activeFiltersAsString, (value) => {
      router.replace({ query: { filter: value } });
    });
  }

  const addRegexFilter = (property: string, pattern: string) => {
    activeFilters.value.children.push(
      new CM.Property(property, new CM.RegExpNode(pattern, ""))
    );
  };

  const addStringContainsFilter = (property: string, value: string) => {
    activeFilters.value.children.push(
      new CM.Property(property, new CM.StringNode(value))
    );
  };

  const addComparisonFilter = (
    property: string,
    operator: ComparisonOperator,
    value: number
  ) => {
    activeFilters.value.children.push(
      new CM.Property(property, new CM.Comparison(operator, value))
    );
  };

  const addNumberEqualsFilter = (property: string, value: number) => {
    return activeFilters.value.children.push(
      new CM.Property(property, new CM.Number(value))
    );
  };

  const addBooleanFilter = (property: string) => {
    return activeFilters.value.children.push(new CM.TruthyProperty(property));
  };

  const addFilter = (property: string, filterType: FilterType, value: any) => {
    switch (filterType) {
      case "stringRegex":
        return addRegexFilter(property, value);
      case "stringStartsWith":
        return addRegexFilter(property, `^${escapeRegExp(value)}`);
      case "stringEndsWith":
        return addRegexFilter(property, `${escapeRegExp(value)}$`);
      case "stringEquals":
        return addRegexFilter(property, `^${escapeRegExp(value)}$`);
      case "stringContains":
        return addStringContainsFilter(property, value);
      case "numberEquals":
        return addNumberEqualsFilter(property, value);
      case "numberLessThan":
        return addComparisonFilter(property, "<", value);
      case "numberLessThanOrEquals":
        return addComparisonFilter(property, "<=", value);
      case "numberGreaterThan":
        return addComparisonFilter(property, ">", value);
      case "numberGreaterThanOrEquals":
        return addComparisonFilter(property, ">=", value);
      case "boolean":
        return addBooleanFilter(property);
    }
  };

  return {
    predicate,
    activeFilters: computed(() => activeFilters.value.children),
    addFilter,
    removeFilter,
  };
}
