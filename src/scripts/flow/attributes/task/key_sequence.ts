import { getDefaultTaskAttribute, TaskType, type TaskAttribute } from "../task";

export function getDefaultKeySequenceTaskAttribute(): TaskAttribute {
  return {
    ...getDefaultTaskAttribute(),
    type: TaskType.KEY_SEQUENCE,
  };
}
