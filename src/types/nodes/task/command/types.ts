import type { BaseTask, TaskType } from "../types";

export type CommandTask = BaseTask & {
  type: TaskType.COMMAND;
  name: string;
};
