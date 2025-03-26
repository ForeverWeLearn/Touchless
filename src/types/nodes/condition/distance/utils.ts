import type { DistanceCondition } from "./types";
import { getDefaultBaseCondition } from "../utils";
import { ConditionType } from "../types";

export function getDefaultDistanceCondition(): DistanceCondition {
  return {
    ...getDefaultBaseCondition(),
    type: ConditionType.DISTANCE,
    initial: {
      handedness: 0,
      landmark: 8,
    },
    terminal: {
      handedness: 1,
      landmark: 8,
    },
    range: {
      min: 2.5,
      max: 7.5,
      step: 0.1,
      value: 5,
    },
  };
}
