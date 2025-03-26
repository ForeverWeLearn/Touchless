import type { BaseTask, TaskType } from "../types";

export type TextTask = BaseTask & {
  type: TaskType.TEXT;
  text: string;
};
