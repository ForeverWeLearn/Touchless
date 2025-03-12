import { type StandardRange } from "../generic/range";
import { get_default_distance_condition_attribute, type DistanceConditionAttribute } from "./condition/distance";
import { get_default_gestures_condition_attribute, type GesturesConditionAttribute } from "./condition/gestures";
import { get_default_rotation_condition_attribute, type RotationConditionAttribute } from "./condition/rotation";

export const DEFAULT_ACTIVE_TIME: StandardRange = {
  min: 0,
  max: 5000,
  step: 50,
  value: 1000,
}

export type ConditionAttribute = {
  enable: boolean;
  active_time: number;
  deactive_time: number;
  runtime: {
    activated: boolean;
    last_active: number;
  }
};

export type ConditionAttributes = {
  gestures: GesturesConditionAttribute;
  distance: DistanceConditionAttribute;
  rotation: RotationConditionAttribute;
};

export function get_default_condition_attribute(): ConditionAttribute {
  return {
    enable: true,
    active_time: DEFAULT_ACTIVE_TIME.value,
    deactive_time: 2000,
    runtime: {
      activated: false,
      last_active: 0,
    },
  };
}

export function get_default_condition_attributes(): ConditionAttributes {
  return {
    gestures: {
      ...get_default_gestures_condition_attribute(),
      enable: false,
    },
    distance: {
      ...get_default_distance_condition_attribute(),
      enable: false,
    },
    rotation: {
      ...get_default_rotation_condition_attribute(),
      enable: false,
    },
  };
}
