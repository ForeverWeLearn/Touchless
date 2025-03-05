export type DistanceResult = {
  has: boolean;
  length: number;
  pointa: number[];
  pointb: number[];
};

function create() {
  return {
    has: false,
    length: 0,
    pointa: [0, 0],
    pointb: [0, 0],
  } as DistanceResult;
}

export let distance_result = $state(create());
