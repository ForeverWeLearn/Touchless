import {
  ConditionType,
  type BaseCondition,
  type Condition,
  type ConditionNode,
  type ConditionNodeData,
  type Runtime,
} from "./types";
import { getDefaultBaseNode, getDefaultBaseNodeData } from "../utils";
import { NodeType } from "../types";
import { getDefaultGesturesCondition } from "./gestures";
import { getDefaultDistanceCondition } from "./distance";
import { getDefaultRotationCondition } from "./rotation";

export function getDefaultRuntime(): Runtime {
  return {
    activated: false,
    firstSatisfied: 0,
    lastSatisfied: 0,
  };
}

export function resetRuntime(runtime: Runtime) {
  runtime.activated = false;
  runtime.firstSatisfied = 0;
  runtime.lastSatisfied = 0;
}

export function getDefaultBaseCondition(): BaseCondition {
  return {
    enable: true,
    time2active: 1500,
    runtime: getDefaultRuntime(),
  };
}

export function getDefaultCondition(type: ConditionType): Condition {
  switch (type) {
    case ConditionType.GESTURES:
      return getDefaultGesturesCondition();

    case ConditionType.DISTANCE:
      return getDefaultDistanceCondition();

    case ConditionType.ROTATION:
      return getDefaultRotationCondition();
  }
}

export function getDefaultConditionNode(id: string): ConditionNode {
  return {
    ...getDefaultBaseNode(id),
    type: NodeType.CONDITION,
    data: getDefaultConditionNodeData(id),
  };
}

export function getDefaultConditionNodeData(id: string): ConditionNodeData {
  return {
    ...getDefaultBaseNodeData(id),
    type: NodeType.CONDITION,
    conditions: [],
    duration: 5000,
    runtime: getDefaultRuntime(),
  };
}
