import { getDefaultTaskAttribute, TaskType, type TaskAttribute } from "../task";

export function getDefaultCommandTaskAttribute(): TaskAttribute {
  return {
    ...getDefaultTaskAttribute(),
    type: TaskType.COMMAND,
  };
}
