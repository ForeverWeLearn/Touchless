import type { Engine } from "./engine.svelte";

export class Executor {
  private engine!: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  public async parse() {}
}
