import type { ConditionAttributes } from "../attributes/condition";
import type { TaskAttributes } from "../attributes/task";
import { get_default_base_node_data, NodeType, type BaseNodeData } from "./node";

export type PowerNodeData = BaseNodeData &
  ConditionAttributes & {
    at_active_tasks?: TaskAttributes;
    during_active?: TaskAttributes;
    at_deactive_tasks?: TaskAttributes;
  };

export function get_default_power_node_data(id: string): PowerNodeData {
  return {
    ...get_default_base_node_data(id),
    type: NodeType.POWER,
  };
}
