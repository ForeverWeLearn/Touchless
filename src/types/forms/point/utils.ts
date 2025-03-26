import type { Point } from "./types";

export function getDefaultPoint(): Point {
  return {
    handedness: 1,
    landmark: 8,
  };
}
