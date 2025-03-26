import { TaskType } from "../types";
import { getDefaultBaseTask } from "../utils";
import type { TextTask } from "./types";

export function getDefaultTextTask(): TextTask {
  return {
    ...getDefaultBaseTask(),
    type: TaskType.TEXT,
    text: "",
  };
}
