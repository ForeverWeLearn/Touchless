import type { KeySequenceTaskAttribute } from "./task/key_sequence";
import type { CommandTaskAttribute } from "./task/command";

export type TaskType = "KEY_SEQUENCE" | "COMMAND";

export type TaskAttribute = {
  type: TaskType;
  enable: boolean;
  delay: number;
};

export type TaskAttributes = KeySequenceTaskAttribute | CommandTaskAttribute;

export function get_default_task_attribute(): TaskAttribute {
  return {
    type: "KEY_SEQUENCE",
    enable: true,
    delay: 0,
  };
}
