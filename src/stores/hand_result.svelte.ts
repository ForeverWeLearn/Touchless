export type HandResult = {
  has: boolean;
  gesture_id: number;
  confidence: number;
  hold_time: number;
  stability: number;
};

function create() {
  return {
    has: false,
    gesture_id: 0,
    hold_time: 0,
    confidence: 0,
    stability: 0
  } as HandResult;
};

export const hand_results = $state([create(), create()]);
