import type { GestureSelectMenu } from "./types";
import { getDefaultGestureCondition } from "../../nodes";

export function createGestureSelectMenu(): GestureSelectMenu {
  return {
    show: false,
    gesture: getDefaultGestureCondition(),
    handedness: 0,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };
}
