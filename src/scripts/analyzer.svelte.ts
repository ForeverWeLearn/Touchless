import type { GestureParser } from "./gesture_parser.svelte";
import type { Engine } from "./engine.svelte";

export class Analyzer {
  private engine!: Engine;
  private parsers!: GestureParser[];
  private last_analyze: number = 0;
  private now = 0;

  constructor(engine: Engine) {
    this.engine = engine;
    this.parsers = engine.gesture_parsers;
  }

  public analyze() {}
}
