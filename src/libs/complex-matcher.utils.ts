import type { ComparisonOperator, ComplexMatcherNode } from "complex-matcher";
import * as CM from "complex-matcher";
import type { FilterComparisonType } from "@/types/filter";
import { escapeRegExp } from "@/libs/utils";

function buildStringNode(property: string, value: string) {
  if (!value) {
    return;
  }

  return new CM.Property(property, new CM.StringNode(value));
}

function buildRegexNode(
  property: string,
  value: string,
  prefix = "",
  suffix = "",
  escape = false
) {
  if (!value) {
    return;
  }

  if (escape) {
    value = escapeRegExp(value);
  }

  return new CM.Property(
    property,
    new CM.RegExpNode(`${prefix}${value}${suffix}`, "i")
  );
}

function buildNumberComparisonNode(
  property: string,
  value: string | number,
  comparisonOperator: ComparisonOperator | "="
) {
  if (typeof value === "string") {
    value = parseInt(value, 10);
  }

  if (isNaN(value)) {
    return;
  }

  if (comparisonOperator === "=") {
    return new CM.Property(property, new CM.Number(value));
  }

  return new CM.Property(
    property,
    new CM.Comparison(comparisonOperator, value)
  );
}

function buildBooleanNode(property: string, value: boolean) {
  const node = new CM.TruthyProperty(property);

  if (!value) {
    return new CM.Not(node);
  }

  return node;
}

export function buildComplexMatcherNode(
  comparisonType: FilterComparisonType,
  property: string,
  value: string
): ComplexMatcherNode | undefined {
  switch (comparisonType) {
    case "stringContains":
      return buildStringNode(property, value);
    case "stringStartsWith":
      return buildRegexNode(property, value, "^", "", true);
    case "stringEndsWith":
      return buildRegexNode(property, value, "", "$", true);
    case "stringEquals":
      return buildRegexNode(property, value, "^", "$", true);
    case "stringMatchesRegex":
      return buildRegexNode(property, value);
    case "numberLessThan":
      return buildNumberComparisonNode(property, value, "<");
    case "numberLessThanOrEquals":
      return buildNumberComparisonNode(property, value, "<=");
    case "numberEquals":
      return buildNumberComparisonNode(property, value, "=");
    case "numberGreaterThanOrEquals":
      return buildNumberComparisonNode(property, value, ">=");
    case "numberGreaterThan":
      return buildNumberComparisonNode(property, value, ">");
    case "booleanTrue":
      return buildBooleanNode(property, true);
    case "booleanFalse":
      return buildBooleanNode(property, false);
  }
}
