import { get_default_task_attribute, type TaskAttribute } from "../task";

export type KeySequenceTaskAttribute = TaskAttribute & {
  name: string;
};

export function get_default_key_sequence_task_attribute(): KeySequenceTaskAttribute {
  return {
    ...get_default_task_attribute(),
    type: "KEY_SEQUENCE",
    name: "",
  };
}
