import type { TaskNodeData } from "../task";

export enum MouseTask {
  CLICK = "CLICK",
  MOVE = "MOVE",
}

export type MouseNodeData = TaskNodeData & {
  task: MouseTask;
  speed: number;
}
