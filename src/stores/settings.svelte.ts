import { TaskType } from "../scripts/flow/attributes/task";
import { NodeType } from "../scripts/flow/nodes/node";

export const settings = $state({
  autoSaveInterval: 3000,
  pendingSave: false,
  maxActiveStep: 100,
  engineIdleStep: 330,
  beautyJSON: false,
  icons: {
    nodes: {
      [NodeType.ENTRY]: "imgs/svg/hub.svg",
      [NodeType.CONDITIONS]: "imgs/svg/flowchart.svg",
      [NodeType.TASKS]: "imgs/svg/bolt.svg",
      [NodeType.POWER]: "imgs/svg/token.svg",
    },
    tasks: {
      [TaskType.KEY_SEQUENCE]: "imgs/svg/keyboard_alt.svg",
      [TaskType.COMMAND]: "imgs/svg/terminal.svg",
    },
  },
});
