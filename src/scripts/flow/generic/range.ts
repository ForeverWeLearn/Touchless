export type StandardRange = {
  min: number;
  max: number;
  step: number;
  value: number;
};

export type AngleRange = {
  angle: number;
  spread: number;
};

export function get_default_standard_range(): StandardRange {
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
