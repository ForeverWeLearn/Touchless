import { get_default_condition_attribute, type ConditionAttribute } from "../condition";
import { get_default_standard_range, type StandardRange } from "../../generic/range";
import { get_default_point, type Point } from "../../generic/point";

export type RotationConditionAttribute = ConditionAttribute & {
  initial: Point;
  terminal: Point;
  range: StandardRange;
};

export function get_default_rotation_condition_attribute(): RotationConditionAttribute {
  return {
    ...get_default_condition_attribute(),
    initial: get_default_point(),
    terminal: get_default_point(),
    range: get_default_standard_range(),
  };
}
