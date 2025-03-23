import { get_default_task_attribute, TaskType, type TaskAttribute } from "../task";

export function getDefaultKeySequenceTaskAttribute(): TaskAttribute {
  return {
    ...get_default_task_attribute(),
    type: TaskType.KEY_SEQUENCE,
  };
}
