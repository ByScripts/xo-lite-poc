import type { IconDefinition } from "@fortawesome/fontawesome-common-types";

export type FilterType = "string" | "boolean" | "number" | "enum";

export interface FilterComparison {
  label: string;
  pattern: string;
  default?: boolean;
  before?: string | IconDefinition;
  after?: string | IconDefinition;
  escape?: boolean;
}

interface FilterCommon {
  label?: string;
  icon?: IconDefinition;
}

export interface FilterEnum extends FilterCommon {
  type: "enum";
  choices: string[];
}

interface FilterOther extends FilterCommon {
  type: Exclude<FilterType, "enum">;
}

export type Filter = FilterEnum | FilterOther;

export type Filters = { [key: string]: Filter };

export interface SelectedFilter {
  property: string | undefined;
  filter: Filter | undefined;
}

export interface FilterRow {
  selectedFilter: SelectedFilter;
  selectedComparison?: FilterComparison;
  filterValue: string;
}
