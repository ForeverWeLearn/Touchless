import type { Settings } from "./types";
import { NodeType, TaskType } from "../nodes";
import { ICON_PATHS } from "../core";

export function getDefaultSettings(): Settings {
  return {
    maxActiveStep: 100,
    engineIdleStep: 330,

    beautyJSON: false,

    icons: {
      nodes: {
        [NodeType.ENTRY]: ICON_PATHS.HUB,
        [NodeType.CONDITION]: ICON_PATHS.FLOWCHART,
        [NodeType.TASK]: ICON_PATHS.BOLT,
      },
      tasks: {
        [TaskType.KEY_SEQUENCE]: ICON_PATHS.KEYBOARD_ALT,
        [TaskType.TEXT]: ICON_PATHS.TEXT_FIELDS,
        [TaskType.COMMAND]: ICON_PATHS.TERMINAL,
      },
    },
  };
}
