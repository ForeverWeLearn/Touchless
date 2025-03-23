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

export function getDefaultTaskAttribute(): TaskAttribute {
  return {
    type: TaskType.KEY_SEQUENCE,
    name: "",
    enable: true,
    delay: 0,
  };
}
