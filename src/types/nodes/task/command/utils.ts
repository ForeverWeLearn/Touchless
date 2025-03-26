import { TaskType } from "../types";
import { getDefaultBaseTask } from "../utils";
import type { CommandTask } from "./types";

export function getDefaultCommandTask(): CommandTask {
  return {
    ...getDefaultBaseTask(),
    type: TaskType.COMMAND,
    name: "",
  };
}
