export type EngineState = {
  ready: boolean;
  running: boolean;
  fps: number;
};

export type HandResult = {
  has: boolean;
  gesture_id: number;
  confidence: number;
  hold_time: number;
  stability: number;
};

function create_engine_state(): EngineState {
  return { ready: false, running: false, fps: 0 };
}

function create_hand_result(): HandResult {
  return {
    has: false,
    gesture_id: 0,
    hold_time: 0,
    confidence: 0,
    stability: 0,
  };
}

export const engineState = $state(create_engine_state());

export const handResults = $state([create_hand_result(), create_hand_result()]);
