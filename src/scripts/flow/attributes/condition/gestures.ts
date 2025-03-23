import type { GestureName } from "../../../utils/const";
import { getDefaultConditionAttribute, type ConditionAttribute } from "../condition";

export type GestureCondition = {
  enable: boolean;
  name: GestureName;
};

export type GesturesConditionAttribute = ConditionAttribute & {
  gestures: [GestureCondition, GestureCondition];
};

export function getDefaultGestureCondition(): GestureCondition {
  return {
    enable: true,
    name: "PALM",
  };
}

export function getDefaultGesturesConditionAttribute(): GesturesConditionAttribute {
  return {
    ...getDefaultConditionAttribute(),
    gestures: [getDefaultGestureCondition(), getDefaultGestureCondition()],
  };
}
