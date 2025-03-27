import type { Engine } from "../scripts/engine.svelte";

export type EngineState = {
  webcamAvaiable: boolean;
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

function createEngineStore() {
  let engine: Engine;
  const state: EngineState = $state({ webcamAvaiable: true, ready: false, running: false, fps: 0 });

  const changeRunningState = async () => {
    await engine.changeState();
  };

  return {
    get engine() {
      return engine;
    },
    set engine(value) {
      engine = value;
    },

    get state() {
      return state;
    },

    changeRunningState,
  };
}

function createHandResult(): HandResult {
  return {
    has: false,
    gesture_id: 0,
    hold_time: 0,
    confidence: 0,
    stability: 0,
  };
}

export const engineStore = $state(createEngineStore());

export const handResults = $state([createHandResult(), createHandResult()]);
