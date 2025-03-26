import { TaskType } from "../types";
import { getDefaultBaseTask } from "../utils";
import type { KeySequenceTask } from "./types";

export function getDefaultKeySequenceTask(): KeySequenceTask {
  return {
    ...getDefaultBaseTask(),
    type: TaskType.KEY_SEQUENCE,
    name: "",
  };
}
