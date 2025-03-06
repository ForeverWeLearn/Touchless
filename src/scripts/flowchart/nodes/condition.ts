import type { BaseNodeData } from "./node";

export enum ConditionNodeType {
  GESTURE = "GESTURE",
  DISTANCE = "DISTANCE",
}

export type ConditionNodeData = BaseNodeData & {
  type: ConditionNodeType;
};
