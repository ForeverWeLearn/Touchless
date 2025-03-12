export type StandardRange = {
  min: number;
  max: number;
  step: number;
  value: number;
};

export function get_default_standard_range(): StandardRange {
  return {
    min: 0,
    max: 100,
    step: 1,
    value: 50,
  };
}
