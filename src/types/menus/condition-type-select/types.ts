import type { Condition, ConditionType } from "../../nodes";
import type { BaseMenu } from "../types";

export type ConditionTypeSelectMenu = BaseMenu & {
  condition: Condition;
  callback: (type: ConditionType) => void;
};
