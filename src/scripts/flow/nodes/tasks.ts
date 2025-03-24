import type { TaskAttribute } from "../attributes/task";
import { getDefaultBaseNodeData, NodeType, type BaseNodeData } from "./node";

export type TasksNodeData = BaseNodeData & {
  tasks: TaskAttribute[];
};

export function getDefaultTasksNodeData(id: string): TasksNodeData {
  return {
    ...getDefaultBaseNodeData(id),
    type: NodeType.TASKS,
    tasks: [],
  };
}
