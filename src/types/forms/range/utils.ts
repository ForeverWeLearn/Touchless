import type { AngleRange, StandardRange } from "./types";

export function getDefaultStandardRange(): StandardRange {
  return {
    min: 0,
    max: 100,
    step: 1,
    value: 50,
  };
}

export function getDefaultAngleRange(): AngleRange {
  return {
    angle: 0,
    spread: 30,
  };
}
