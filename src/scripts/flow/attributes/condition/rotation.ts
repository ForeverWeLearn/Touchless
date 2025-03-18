import { get_default_condition_attribute, type ConditionAttribute } from "../condition";
import { get_default_angle_range, type AngleRange } from "../../generic/range";
import { type Point } from "../../generic/point";

export type RotationConditionAttribute = ConditionAttribute & {
  initial: Point;
  terminal: Point;
  range: AngleRange;
};

export function get_default_rotation_condition_attribute(): RotationConditionAttribute {
  return {
    ...get_default_condition_attribute(),
    initial: {
      type: "DYNAMIC",
      handedness: 0,
      landmark: 8,
    },
    terminal: {
      type: "DYNAMIC",
      handedness: 1,
      landmark: 8,
    },
    range: get_default_angle_range(),
  };
}
