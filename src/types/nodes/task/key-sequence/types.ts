import type { BaseTask, TaskType } from "../types";

export type KeySequenceTask = BaseTask & {
  type: TaskType.KEY_SEQUENCE;
  name: string;
};
