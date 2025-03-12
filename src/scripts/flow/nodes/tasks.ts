import { get_default_base_node_data, NodeType, type BaseNodeData } from "./node";
import type { TaskAttributes } from "../attributes/task";

export type TasksNodeData = BaseNodeData & {
  tasks: TaskAttributes[];
};

export function get_default_tasks_node_data(id: string): TasksNodeData {
  return {
    ...get_default_base_node_data(id),
    type: NodeType.TASKS,
    tasks: [],
  };
}
