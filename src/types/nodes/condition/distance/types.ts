import type { Point, StandardRange } from "../../../forms";
import type { BaseCondition, ConditionType } from "../types";

export type DistanceCondition = BaseCondition & {
  type: ConditionType.DISTANCE;
  initial: Point;
  terminal: Point;
  range: StandardRange;
};
