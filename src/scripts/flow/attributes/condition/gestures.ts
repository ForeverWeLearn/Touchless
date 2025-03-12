import type { GestureName } from "../../../utils/const";
import { get_default_condition_attribute, type ConditionAttribute } from "../condition";

export type GestureCondition = {
  enable: boolean;
  name: GestureName;
};

export type GesturesConditionAttribute = ConditionAttribute & {
  gestures: [GestureCondition, GestureCondition];
};

export function get_default_gesture_condition(): GestureCondition {
  return {
    enable: true,
    name: "PALM",
  };
}

export function get_default_gestures_condition_attribute(): GesturesConditionAttribute {
  return {
    ...get_default_condition_attribute(),
    gestures: [get_default_gesture_condition(), get_default_gesture_condition()],
  };
}
