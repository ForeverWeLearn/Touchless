import type { HandResult } from "../stores/engine.svelte";
import { Queue } from "./utils/queue";

export class GestureParser {
  public unit = 0;

  private hand_result!: HandResult;
  private time_label_id = new Queue<[number, number]>();

  private distance = new Queue<number>();
  private prev_point = [0, 0];
  private diff = 0;
  private next_stab_calc = 0;

  constructor(hand_result: HandResult) {
    this.hand_result = hand_result;
  }

  public async parse(label_id: number, keypoints: number[][], box: number[]) {
    const now = performance.now();

    if (now > this.next_stab_calc) {
      this.calc_stability(keypoints[0]);
      this.next_stab_calc += 50;
    }

    this.hand_result.has = true;

    this.unit = (box[2] + box[3]) / 2;

    const front = this.time_label_id.peek_front();

    if (front && (front[1] !== label_id || now - front[0] > 300)) {
      this.time_label_id.clear();
      this.hand_result.hold_time = 0;
    }

    this.time_label_id.push([now, label_id]);
    const back = this.time_label_id.peek_back();

    if (back) {
      this.hand_result.gesture_id = back[1];
      this.hand_result.hold_time = now - back[0];
    }
    this.hand_result.stability = Math.max(0, 1 - this.diff / this.unit);
  }

  private calc_stability(point: number[]) {
    let d = Math.abs(point[0] - this.prev_point[0]) + Math.abs(point[1] - this.prev_point[1]);
    this.diff += d;
    this.prev_point = point;

    this.distance.push(d);

    while (this.distance.size() > 20) {
      const back = this.distance.peek_back();
      if (back != undefined) {
        this.diff -= back;
      }
      this.distance.pop();
    }
  }

  public reset() {
    this.hand_result.gesture_id = 0;
    this.hand_result.hold_time = 0;
    this.hand_result.stability = 0;
    this.unit = 0;
    this.time_label_id.clear();
  }
}
