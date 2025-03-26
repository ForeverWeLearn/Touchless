import type { GestureCondition, GesturesCondition } from "./types";
import { getDefaultBaseCondition } from "../utils";
import { ConditionType } from "../types";
import { GestureName } from "../../../core";

export function getDefaultGestureCondition(): GestureCondition {
  return {
    enable: true,
    name: GestureName.PALM,
  };
}

export function getDefaultGesturesCondition(): GesturesCondition {
  return {
    ...getDefaultBaseCondition(),
    type: ConditionType.GESTURES,
    gestures: [getDefaultGestureCondition(), getDefaultGestureCondition()],
  };
}
