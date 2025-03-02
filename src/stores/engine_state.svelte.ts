export type EngineState = {
  ready: boolean;
  running: boolean;
};

export const engine_state = $state({ ready: false, running: false } as EngineState);
