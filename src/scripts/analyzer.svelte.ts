import { distance_result } from "../stores/distance.svelte";
import { nodes } from "../stores/flow_state.svelte";
import { hand_results } from "../stores/hand_result.svelte";
import type { Engine } from "./engine.svelte";
import type { GestureParser } from "./gesture_parser.svelte";
import { calculate_distance } from "./utils/algo";
import { GESTURES } from "./utils/const";
import {
  LoopType,
  NodeType,
  type DistanceNodeData,
  type GestureNodeData,
  type NodeData,
  type TaskNodeData,
} from "./utils/node";

export class Analyzer {
  private engine!: Engine;
  private parsers!: GestureParser[];
  private last_active: Record<string, number> = {};
  private last_analyze: number = 0;

  constructor(engine: Engine) {
    this.engine = engine;
    this.parsers = engine.gesture_parsers;
  }

  public analyze() {
    const now = performance.now();
    
    if (now - this.last_analyze > 100) {
      this.reset();
    }

    for (const node of Object.values(nodes)) {
      if (this.match(node)) {
        if (!node.data.active) {
          if (nodes[node.data.prev].data.active) {
            console.log(`Active ${node.data.id}`);
            node.data.active = true;
          }
        }
        this.last_active[node.id] = now;
      }
      if (this.check_timeout(node)) {
        if (node.data.active) {
          console.log(`Deactive ${node.data.id}`);
          node.data.active = false;
        }
      }
    }

    for (const node of Object.values(nodes)) {
      if (node.data.active) {
        for (const child_id of node.data.next) {
          const child = nodes[child_id];

          if (child.type == NodeType.Task) {
            const data = child.data as TaskNodeData;

            console.log(`Execute ${data.task}`);
            this.engine.executor.parse(data.task);

            if (data.loop.type == LoopType.Once) {
              this.reset();
            }
          }
        }
      }
    }

    this.last_analyze = now;
  }

  private match(node: NodeData) {
    if (!node.data.enable) {
      return false;
    }

    if (node.type == NodeType.Root) {
      return true;
    }

    if (node.type == NodeType.Task) {
      return false;
    }

    if (node.type == NodeType.Gesture) {
      const data = node.data as GestureNodeData;
      
      if (!data.enable) {
        return false;
      }

      let left = false;
      let right = false;

      if (data.handedness[0].enable) {
        if (
          GESTURES[hand_results[0].gesture_id] == data.handedness[0].gesture &&
          hand_results[0].hold_time >= data.handedness[0].time
        ) {
          left = true;
        } else {
          return false;
        }
      }

      if (data.handedness[1].enable) {
        if (
          GESTURES[hand_results[1].gesture_id] == data.handedness[1].gesture &&
          hand_results[1].hold_time >= data.handedness[1].time
        ) {
          right = true;
        } else {
          return false;
        }
      }

      return left == data.handedness[0].enable && right == data.handedness[1].enable;
    }

    if (node.type == NodeType.Distance) {
      const data = node.data as DistanceNodeData;

      if (!data.enable || !hand_results[data.points[0].handedness].has || !hand_results[data.points[1].handedness].has) {
        return false;
      }

      const pointa = this.engine.keypoints[data.points[0].handedness][data.points[0].landmark];
      const pointb = this.engine.keypoints[data.points[1].handedness][data.points[1].landmark];
      
      const distance = calculate_distance(pointa, pointb) * 2 / (this.parsers[0].unit + this.parsers[1].unit);
      distance_result.rel_distance = distance;

      if (data.range.min <= distance && distance <= data.range.max) {
        return true;
      }
      return false;
    }

    return false;
  }

  private check_timeout(node: NodeData) {
    if (node.type == NodeType.Root || node.type == NodeType.Task) {
      return false;
    }

    const data = node.data as GestureNodeData | DistanceNodeData;

    if (data.timeout.infinite) {
      return false;
    }

    if (performance.now() - this.last_active[node.id] > data.timeout.time) {
      return true;
    }

    return false;
  }

  private reset() {
    this.parsers[0].reset();
    this.parsers[1].reset();

    for (const node of Object.values(nodes)) {
      if (node.type != NodeType.Root) {
        node.data.active = false;
      }
    }
  }
}
