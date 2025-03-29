import type { BaseNode, BaseNodeData } from "../../types/base";
import type { DistanceCondition } from "../distance";
import type { GesturesCondition } from "../gestures";
import type { RotationCondition } from "../rotation";
import type { NodeType } from "../../types";
import type { Runtime } from "./common";

export type Condition = GesturesCondition | DistanceCondition | RotationCondition;

export type ConditionNode = BaseNode & {
  type: NodeType.CONDITION;
  data: ConditionNodeData;
};

export type ConditionNodeData = BaseNodeData & {
  type: NodeType.CONDITION;
  conditions: (GesturesCondition | DistanceCondition | RotationCondition)[];
  hold: number;
  duration: number;
  runtime: Runtime;
};
