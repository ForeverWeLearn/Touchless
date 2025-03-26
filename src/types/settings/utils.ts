import type { Settings } from "./types";
import { NodeType, TaskType } from "../nodes";

export function getDefaultSettings(): Settings {
  return {
    autoSaveInterval: 3000,

    maxActiveStep: 100,
    engineIdleStep: 330,

    beautyJSON: false,

    icons: {
      nodes: {
        [NodeType.ENTRY]: "imgs/svg/hub.svg",
        [NodeType.CONDITION]: "imgs/svg/flowchart.svg",
        [NodeType.TASK]: "imgs/svg/bolt.svg",
      },
      tasks: {
        [TaskType.KEY_SEQUENCE]: "imgs/svg/keyboard_alt.svg",
        [TaskType.TEXT]: "imgs/svg/text_fields.svg",
        [TaskType.COMMAND]: "imgs/svg/terminal.svg",
      },
    },
  };
}
