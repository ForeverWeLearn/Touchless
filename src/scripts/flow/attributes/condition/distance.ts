import { get_default_condition_attribute, type ConditionAttribute } from "../condition";
import { get_default_standard_range, type StandardRange } from "../../generic/range";
import { get_default_point, type Point } from "../../generic/point";

export type DistanceConditionAttribute = ConditionAttribute & {
  initial: Point;
  terminal: Point;
  unit: number;
  range: StandardRange;
};

export function get_default_distance_condition_attribute(): DistanceConditionAttribute {
  return {
    ...get_default_condition_attribute(),
    initial: get_default_point(),
    terminal: get_default_point(),
    unit: 100,
    range: get_default_standard_range(),
  };
}
