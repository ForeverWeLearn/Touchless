import type { GestureCondition } from "../../nodes";
import type { HandednessID } from "../../core";
import type { BaseMenu } from "../types";

export type GestureSelectMenu = BaseMenu & {
  gesture: GestureCondition;
  handedness: HandednessID;
};
