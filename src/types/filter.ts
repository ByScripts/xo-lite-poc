interface FilterablePropertyCommonConfig {
  title?: string;
}

interface FilterablePropertyStringConfig
  extends FilterablePropertyCommonConfig {
  type: "string";
}

interface FilterablePropertyTextConfig extends FilterablePropertyCommonConfig {
  type: "text";
}

interface FilterablePropertyNumberConfig
  extends FilterablePropertyCommonConfig {
  type: "number";
}

interface FilterablePropertyBooleanConfig
  extends FilterablePropertyCommonConfig {
  type: "boolean";
}

interface FilterablePropertyEnumConfig extends FilterablePropertyCommonConfig {
  type: "enum";
  choices: string[];
}

export type FilterablePropertyConfig =
  | FilterablePropertyStringConfig
  | FilterablePropertyTextConfig
  | FilterablePropertyBooleanConfig
  | FilterablePropertyNumberConfig
  | FilterablePropertyEnumConfig;

export type Filters<T> = {
  [key in keyof T]?: FilterablePropertyConfig;
};

export type FilterType =
  | "stringEquals"
  | "stringContains"
  | "stringStartsWith"
  | "stringEndsWith"
  | "stringRegex"
  | "numberEquals"
  | "numberGreaterThan"
  | "numberGreaterThanOrEquals"
  | "numberLessThan"
  | "numberLessThanOrEquals"
  | "boolean";
