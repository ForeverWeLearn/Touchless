import { get_default_task_attribute, TaskType, type TaskAttribute } from "../task";

export function get_default_key_sequence_task_attribute(): TaskAttribute {
  return {
    ...get_default_task_attribute(),
    type: TaskType.KEY_SEQUENCE,
  };
}
