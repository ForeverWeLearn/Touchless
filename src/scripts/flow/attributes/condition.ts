import { getDefaultDistanceConditionAttribute, type DistanceConditionAttribute } from "./condition/distance";
import { getDefaultGesturesConditionAttribute, type GesturesConditionAttribute } from "./condition/gestures";
import { getDefaultRotationConditionAttribute, type RotationConditionAttribute } from "./condition/rotation";

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
export function getDefaultConditionAttribute(): ConditionAttribute {
  return {
    included: false,
    enable: true,
    time2active: 1000,
    runtime: get_default_runtime_data(),
  };
}

export function getDefaultConditionAttributes(): ConditionAttributes {
  return {
    gestures: {
      ...getDefaultGesturesConditionAttribute(),
      enable: false,
    },
    distance: {
      ...getDefaultDistanceConditionAttribute(),
      enable: false,
    },
    rotation: {
      ...getDefaultRotationConditionAttribute(),
      enable: false,
    },
    logic: "AND",
    duration: 5000,
    runtime: get_default_runtime_data(),
  };
}
