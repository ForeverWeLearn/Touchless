import { get_default_condition_attributes, type ConditionAttributes } from "../attributes/condition";
import { get_default_base_node_data, NodeType, type BaseNodeData } from "./node";

export type ConditionsNodeData = BaseNodeData & ConditionAttributes;

export function get_default_conditions_node_data(id: string): ConditionsNodeData {
  return {
    ...get_default_base_node_data(id),
    ...get_default_condition_attributes(),
    type: NodeType.CONDITIONS,
  };
}
