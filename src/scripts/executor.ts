import type { Engine } from "./engine.svelte";
import { invoke } from "@tauri-apps/api/core";

export class Executor {
  private engine!: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  public async parse() {}

  public async move_mouse(point: number[]) {
    const coord = this.calc_coordnite(point);
    await invoke("move_mouse", { pos: `${coord[0]} ${coord[1]}` });
  }

  private calc_coordnite(point: number[]): number[] {
    const rel_point = [point[0] - 128, point[1] - 96];
    let coord = [(rel_point[0] / 384) * 3839, (rel_point[1] / 288) * 2159];
    if (coord[0] < 0) {
      coord[0] = 0;
    } else if (coord[0] > 3839) {
      coord[0] = 3839;
    }
    if (coord[1] < 0) {
      coord[1] = 0;
    } else if (coord[1] > 2159) {
      coord[1] = 2159;
    }
    return [Math.floor(coord[0]), Math.floor(coord[1])];
  }
}
