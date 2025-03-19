import { get_default_distance_condition_attribute, type DistanceConditionAttribute } from "./condition/distance";
import { get_default_gestures_condition_attribute, type GesturesConditionAttribute } from "./condition/gestures";
import { get_default_rotation_condition_attribute, type RotationConditionAttribute } from "./condition/rotation";

export type Logic = "AND" | "OR";

export type Runtime = {
  activated: boolean;
  firstSatisfy: number;
  lastSatisfy: number;
};

export type ConditionAttribute = {
  included: boolean;
  enable: boolean;
  time2active: number;
  runtime: Runtime;
};

export type ConditionAttributes = {
  gestures: GesturesConditionAttribute;
  distance: DistanceConditionAttribute;
  rotation: RotationConditionAttribute;
  logic: Logic;
  duration: number;
  runtime: Runtime;
};

function get_default_runtime_data(): Runtime {
  return {
    activated: false,
    firstSatisfy: 0,
    lastSatisfy: 0,
  };
}
export function get_default_condition_attribute(): ConditionAttribute {
  return {
    included: false,
    enable: true,
    time2active: 1000,
    runtime: get_default_runtime_data(),
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
    logic: "AND",
    duration: 5000,
    runtime: get_default_runtime_data(),
  };
}
