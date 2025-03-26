import type { RotationCondition } from "./types";
import { getDefaultBaseCondition } from "../utils";
import { getDefaultAngleRange } from "../../../forms";
import { ConditionType } from "../types";

export function getDefaultRotationCondition(): RotationCondition {
  return {
    ...getDefaultBaseCondition(),
    type: ConditionType.ROTATION,
    initial: {
      handedness: 0,
      landmark: 8,
    },
    terminal: {
      handedness: 1,
      landmark: 8,
    },
    range: getDefaultAngleRange(),
  };
}
