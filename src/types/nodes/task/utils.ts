import { TaskType, type BaseTask, type Task, type TaskNode, type TaskNodeData } from "./types";
import { getDefaultBaseNode, getDefaultBaseNodeData } from "../utils";
import { getDefaultKeySequenceTask } from "./key-sequence/utils";
import { getDefaultCommandTask } from "./command/utils";
import { getDefaultTextTask } from "./text/utils";
import { NodeType } from "../types";

export function getDefaultTask(type: TaskType): Task {
  switch (type) {
    case TaskType.KEY_SEQUENCE:
      return getDefaultKeySequenceTask();

    case TaskType.COMMAND:
      return getDefaultCommandTask();

    case TaskType.TEXT:
      return getDefaultTextTask();
  }
}

export function getDefaultBaseTask(): BaseTask {
  return {
    enable: true,
  };
}

export function getDefaultTaskNode(id: string): TaskNode {
  return {
    ...getDefaultBaseNode(id),
    type: NodeType.TASK,
    data: getDefaultTaskNodeData(id),
  };
}

export function getDefaultTaskNodeData(id: string): TaskNodeData {
  return {
    ...getDefaultBaseNodeData(id),
    type: NodeType.TASK,
    tasks: [],
    startDelay: 0,
    delay: 0,
    cooldown: 1000,
  };
}
