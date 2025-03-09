import { hand_results } from "../stores/engine.svelte";
import { nodes } from "../stores/flow.svelte";
import { rotation_data } from "../stores/rotation.svelte";
import type { Engine } from "./engine.svelte";
import type { GestureNodeData } from "./flow/nodes/condition/gesture";
import type { RotationNodeData } from "./flow/nodes/condition/rotation";
import { type RawNodeData } from "./flow/nodes/node";
import { NodeGroup } from "./flow/nodes/node_group";
import { NodeType } from "./flow/nodes/note_type";
import type { GestureParser } from "./gesture_parser.svelte";
import { GESTURE_NAMES } from "./utils/const";

export class Analyzer {
  private engine!: Engine;
  private parsers!: GestureParser[];
  private last_active: Record<string, number> = {};
  private last_analyze: number = 0;
  private now = 0;

  constructor(engine: Engine) {
    this.engine = engine;
    this.parsers = engine.gesture_parsers;
  }

  public analyze() {
    this.now = performance.now();

    if (this.now - this.last_analyze > 100) {
      this.reset();
    }

    for (const node of Object.values(nodes)) {
      this.parse_node(node);
    }

    this.last_analyze = this.now;
  }

  private parse_node(node: RawNodeData<NodeType>) {
    if (!node.data.enable) {
      return;
    }

    if (node.data.group == NodeGroup.ENTRY) {
      return;
    }

    if (node.data.group == NodeGroup.TASK) {
      if (node.data.enable && nodes[node.data.prev].data.active) {
        this.engine.executor.parse(node);
        this.reset();
      }
    }

    if (node.data.group == NodeGroup.CONDITION) {
      if (this.satisfy(node) && !node.data.active && nodes[node.data.prev].data.active) {
        console.log(`Active ${node.data.id}`);
        node.data.active = true;

        this.last_active[node.id] = this.now;
      }
    }
  }

  private satisfy(node: RawNodeData<NodeType>) {
    if (!node.data.enable) {
      return false;
    }

    if (node.data.type == NodeType.GESTURE) {
      const data = node.data as GestureNodeData;

      if (!data.enable) {
        return false;
      }

      let left = false;
      let right = false;

      if (data.handedness[0].enable) {
        if (
          GESTURE_NAMES[hand_results[0].gesture_id] == data.handedness[0].gesture &&
          hand_results[0].hold_time >= data.handedness[0].time
        ) {
          left = true;
        } else {
          return false;
        }
      }

      if (data.handedness[1].enable) {
        if (
          GESTURE_NAMES[hand_results[1].gesture_id] == data.handedness[1].gesture &&
          hand_results[1].hold_time >= data.handedness[1].time
        ) {
          right = true;
        } else {
          return false;
        }
      }

      return left == data.handedness[0].enable && right == data.handedness[1].enable;
    }

    if (node.data.type == NodeType.ROTATION) {
      const data = node.data as RotationNodeData;

      if (!data.enable || !data.rotation.enable) {
        return false;
      }

      const pivot = this.engine.keypoints[data.rotation.pivot.handedness][data.rotation.pivot.landmark];
      const target = this.engine.keypoints[data.rotation.target.handedness][data.rotation.target.landmark];

      const [x, y] = [target[0] - pivot[0], target[1] - pivot[1]];

      let angle = Math.atan2(y, x) * (180 / Math.PI);

      if (angle < 0) {
        angle += 360;
      }
      angle = 360 - angle;
      rotation_data.degree = angle;

      return data.rotation.degree_range.min <= angle && angle <= data.rotation.degree_range.max;
    }

    return false;
  }

  private reset() {
    this.parsers[0].reset();
    this.parsers[1].reset();

    for (const node of Object.values(nodes)) {
      if (node.type != NodeType.ENTRY) {
        node.data.active = false;
      }
    }
  }
}
