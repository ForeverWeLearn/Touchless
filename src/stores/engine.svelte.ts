export type EngineState = {
  ready: boolean;
  running: boolean;
  idle_step: number;
};

export type HandResult = {
  has: boolean;
  gesture_id: number;
  confidence: number;
  hold_time: number;
  stability: number;
};

function create_engine_state() {
  return { ready: false, running: false, idle_step: 500 } as EngineState;
}

function create_hand_result() {
  return {
    has: false,
    gesture_id: 0,
    hold_time: 0,
    confidence: 0,
    stability: 0,
  } as HandResult;
}

export const engine_state = $state(create_engine_state());

export const hand_results = $state([create_hand_result(), create_hand_result()]);
