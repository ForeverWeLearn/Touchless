import type { AngleRange, Point } from "../../../forms";
import type { BaseCondition, ConditionType } from "../types";

export type RotationCondition = BaseCondition & {
  type: ConditionType.ROTATION;
  initial: Point;
  terminal: Point;
  range: AngleRange;
};
