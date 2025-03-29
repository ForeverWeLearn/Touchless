import type { ConditionTypeSelectMenu } from "./types";
import { ConditionType, getDefaultCondition } from "../../nodes";

export function createConditionTypeSelectMenu(): ConditionTypeSelectMenu {
  return {
    show: false,
    condition: getDefaultCondition(ConditionType.GESTURES),
    callback: () => {},
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };
}
