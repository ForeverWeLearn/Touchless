import type { BaseNode, BaseNodeData, NodeType } from "../../types";
import type { KeySequenceTask } from "../key-sequence";
import type { CommandTask } from "../command";
import type { TextTask } from "../text";

export type Task = CommandTask | KeySequenceTask | TextTask;

export type TaskNode = BaseNode & {
  type: NodeType.TASK;
  data: TaskNodeData;
};

export type TaskNodeData = BaseNodeData & {
  type: NodeType.TASK;
  tasks: Task[];
  startDelay: number;
  delay: number;
  cooldown: number;
};
