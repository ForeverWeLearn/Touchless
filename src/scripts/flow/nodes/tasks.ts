import type { TaskAttribute } from "../attributes/task";
import { getDefaultBaseNodeData, NodeType, type BaseNodeData } from "./node";

export type TasksNodeData = BaseNodeData & {
  tasks: TaskAttribute[];
};

export function get_default_tasks_node_data(id: string): TasksNodeData {
  return {
    ...getDefaultBaseNodeData(id),
    type: NodeType.TASKS,
    tasks: [],
  };
}
