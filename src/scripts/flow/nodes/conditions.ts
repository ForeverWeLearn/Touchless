import { getDefaultConditionAttributes, type ConditionAttributes } from "../attributes/condition";
import { getDefaultBaseNodeData, NodeType, type BaseNodeData } from "./node";

export type ConditionsNodeData = BaseNodeData & ConditionAttributes;

export function getDefaultConditionNodeData(id: string): ConditionsNodeData {
  return {
    ...getDefaultBaseNodeData(id),
    ...getDefaultConditionAttributes(),
    type: NodeType.CONDITIONS,
  };
}
