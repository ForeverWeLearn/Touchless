import type { LoopType } from "../components/loop";
import type { BaseNodeData } from "./node";

export enum TaskNodeType {
  MOUSE = "MOUSE",
  KEY_SEQUENCE = "KEY SEQUENCE",
}

export type TaskNodeData = BaseNodeData & {
  type: TaskNodeType;
  loop: LoopType;
};
