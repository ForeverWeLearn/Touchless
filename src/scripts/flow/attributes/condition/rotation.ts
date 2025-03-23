import { getDefaultConditionAttribute, type ConditionAttribute } from "../condition";
import { getDefaultAngleRange, type AngleRange } from "../../generic/range";
import { type Point } from "../../generic/point";

export type RotationConditionAttribute = ConditionAttribute & {
  initial: Point;
  terminal: Point;
  range: AngleRange;
};

export function getDefaultRotationConditionAttribute(): RotationConditionAttribute {
  return {
    ...getDefaultConditionAttribute(),
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
    range: getDefaultAngleRange(),
  };
}
