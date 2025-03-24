import type { TaskAttribute } from "../attributes/task";
import { getDefaultConditionAttributes, type ConditionAttributes } from "../attributes/condition";
import { getDefaultBaseNodeData, NodeType, type BaseNodeData } from "./node";

export type PowerNodeData = BaseNodeData &
  ConditionAttributes & {
    at_active_tasks?: TaskAttribute;
    during_active?: TaskAttribute;
    at_deactive_tasks?: TaskAttribute;
  };

export function getDefaultPowerNodeData(id: string): PowerNodeData {
  return {
    ...getDefaultBaseNodeData(id),
    ...getDefaultConditionAttributes(),
    type: NodeType.POWER,
  };
}
