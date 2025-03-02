export type HandResult = {
  has: boolean;
  gesture_id: number;
  confidence: number;
  hold_time: number;
  stability: number;
};

const result = () => {
  return {
    has: false,
    gesture_id: 0,
    hold_time: 0,
    confidence: 0,
    stability: 0
  } satisfies HandResult;
};

export const hand_results = $state([result(), result()]);
