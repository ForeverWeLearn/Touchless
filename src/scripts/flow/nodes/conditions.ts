import { get_default_condition_attributes, type ConditionAttributes } from "../attributes/condition";
import { getDefaultBaseNodeData, NodeType, type BaseNodeData } from "./node";

export type ConditionsNodeData = BaseNodeData & ConditionAttributes;

export function get_default_conditions_node_data(id: string): ConditionsNodeData {
  return {
    ...getDefaultBaseNodeData(id),
    ...get_default_condition_attributes(),
    type: NodeType.CONDITIONS,
  };
}
