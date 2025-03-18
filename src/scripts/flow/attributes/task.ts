export enum TaskType {
  KEY_SEQUENCE = "KEY_SEQUENCE",
  COMMAND = "COMMAND",
}

export type TaskAttribute = {
  type: TaskType;
  name: string;
  enable: boolean;
  delay: number;
};

export function get_default_task_attribute(): TaskAttribute {
  return {
    type: TaskType.KEY_SEQUENCE,
    name: "",
    enable: true,
    delay: 0,
  };
}
