import { get_default_task_attribute, type TaskAttribute } from "../task";

export type CommandTaskAttribute = TaskAttribute & {
  name: string;
};

export function get_default_command_task_attribute(): CommandTaskAttribute {
  return {
    ...get_default_task_attribute(),
    type: "COMMAND",
    name: "",
  };
}
