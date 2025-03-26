import type { GestureName } from "../../../core";
import type { BaseCondition, ConditionType } from "../types";

export type GestureCondition = {
  enable: boolean;
  name: GestureName;
};

export type GesturesCondition = BaseCondition & {
  type: ConditionType.GESTURES;
  gestures: [GestureCondition, GestureCondition];
};
