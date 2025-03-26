import type { NodeType, TaskType } from "../nodes";

export type Settings = {
  maxActiveStep: number;
  engineIdleStep: number;

  beautyJSON: boolean;

  icons: {
    nodes: {
      [NodeType.ENTRY]: string;
      [NodeType.CONDITION]: string;
      [NodeType.TASK]: string;
    };
    tasks: {
      [TaskType.KEY_SEQUENCE]: string;
      [TaskType.TEXT]: string;
      [TaskType.COMMAND]: string;
    };
  };
};
