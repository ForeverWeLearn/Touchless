import { get_default_condition_attribute, type ConditionAttribute } from "../condition";
import { type StandardRange } from "../../generic/range";
import { type Point } from "../../generic/point";

export type DistanceConditionAttribute = ConditionAttribute & {
  initial: Point;
  terminal: Point;
  unit: number;
  range: StandardRange;
};

export function get_default_distance_condition_attribute(): DistanceConditionAttribute {
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
    unit: 100,
    range: {
      min: 2.5,
      max: 7.5,
      step: 0.1,
      value: 5,
    },
  };
}
