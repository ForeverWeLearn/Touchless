import type { GestureParser } from "./gesture-parser.svelte";
import type { Engine } from "./engine.svelte";
import {
  ConditionType,
  getDefaultTaskNodeData,
  NodeType,
  type Condition,
  type ConditionNodeData,
  type DistanceCondition,
  type GesturesCondition,
  type RotationCondition,
} from "../types/nodes";
import { calculateAngle, calculateDistance } from "../utils/dsa/math";
import { GESTURE_NAMES, type HandednessID } from "../types/core";
import { handResults } from "../stores/engine.svelte";
import { settings } from "../stores/settings.svelte";
import nodeStore from "../stores/flow/node.svelte";

export class Analyzer {
  private engine!: Engine;
  private parsers!: GestureParser[];

  private now = 0;

  constructor(engine: Engine) {
    getDefaultTaskNodeData;
    this.engine = engine;
    this.parsers = engine.gestureParsers;
  }

  public async analyze() {
    this.now = performance.now();

    for (const node of nodeStore.nodes) {
      switch (node.type) {
        case NodeType.ENTRY: {
          break;
        }

        case NodeType.CONDITION: {
          if (!nodeStore.isParentActivated(node.data.id)) {
            break;
          }

          const satisfied = this.checkConditions(node.data.conditions);

          this.parseConditionActive(node.data, satisfied);

          break;
        }

        case NodeType.TASK: {
          const parentActivated = nodeStore.isParentActivated(node.data.id);

          if (node.data.enable && parentActivated) {
            await this.resetAll();
            await this.engine.executor.parse(node.data);
          }

          break;
        }
      }
    }
  }

  private parseConditionActive(data: ConditionNodeData, satisfied: boolean) {
    const runtime = data.runtime;
    const hold = data.hold;

    const step = this.now - runtime.lastSatisfied;

    // If not satisfy...
    if (!satisfied) {
      // ...for longer than max active step...
      if (step > settings.maxActiveStep) {
        // ...then set deactivated.
        runtime.activated = false;
        runtime.firstSatisfied = 0;
        runtime.lastSatisfied = 0;
      }
    }

    // If satisfy...
    if (satisfied) {
      // ...and step too far...
      if (step > settings.maxActiveStep) {
        // ...then it seem to be first satisfy, set first satisfy to now.
        runtime.firstSatisfied = this.now;
      }

      // ...then set last satisfy to now.
      runtime.lastSatisfied = this.now;

      // ...for longer than time to active...
      if (runtime.lastSatisfied - runtime.firstSatisfied > hold) {
        // ...then active.
        runtime.activated = true;
      }
    }
  }

  private checkConditions(conditions: Condition[]): boolean {
    for (const condition of conditions) {
      switch (condition.type) {
        case ConditionType.GESTURES: {
          if (this.checkGesturesCondition(condition)) {
            condition.runtime.activated = true;
          }
          break;
        }

        case ConditionType.DISTANCE: {
          if (this.checkDistanceCondition(condition)) {
            condition.runtime.activated = true;
          }
          break;
        }

        case ConditionType.ROTATION: {
          if (this.checkRotationCondition(condition)) {
            condition.runtime.activated = true;
          }
          break;
        }
      }
    }

    for (const condition of conditions) {
      if (!condition.runtime.activated) {
        return false;
      }
    }

    return true;
  }

  private checkGesturesCondition(condition: GesturesCondition): boolean {
    function gestureMatching(handedness: HandednessID) {
      if (handResults[handedness].has) {
        return GESTURE_NAMES[handResults[handedness].gesture_id] == condition.gestures[handedness].name;
      }
    }

    if (condition.gestures[0].enable) {
      if (!gestureMatching(0)) {
        return false;
      }
    }

    if (condition.gestures[1].enable) {
      if (!gestureMatching(1)) {
        return false;
      }
    }

    return condition.gestures[0].enable || condition.gestures[1].enable;
  }

  private checkDistanceCondition(condition: DistanceCondition): boolean {
    if (!handResults[condition.initial.handedness].has || !handResults[condition.terminal.handedness].has) {
      return false;
    }

    const initial = this.engine.keypoints[condition.initial.handedness][condition.initial.landmark];
    const terminal = this.engine.keypoints[condition.terminal.handedness][condition.terminal.landmark];

    const unit = (this.parsers[0].unit + this.parsers[1].unit) / 2;

    const d = calculateDistance(initial, terminal) / unit;

    this.engine.drawer.line(initial, terminal, d.toFixed(1), 3);

    return condition.range.min < d && d < condition.range.max;
  }

  private checkRotationCondition(condition: RotationCondition): boolean {
    const angleInRange = (angle: number, min: number, max: number) => {
      if (min < 0) {
        min += 360;
      }
      if (max > 360) {
        max -= 360;
      }
      if (min < max) {
        return min <= angle && angle <= max;
      }
      return min <= angle || angle <= max;
    };

    if (!handResults[condition.initial.handedness].has || !handResults[condition.terminal.handedness].has) {
      return false;
    }

    const initial = this.engine.keypoints[condition.initial.handedness][condition.initial.landmark];
    const terminal = this.engine.keypoints[condition.terminal.handedness][condition.terminal.landmark];

    const angle = 360 - calculateAngle(initial, terminal);

    this.engine.drawer.line(initial, terminal, angle.toFixed(0) + "°", 3);

    const inRange = angleInRange(
      angle,
      condition.range.angle - condition.range.spread,
      condition.range.angle + condition.range.spread
    );

    return inRange;
  }

  private async resetAll() {
    await nodeStore.resetRuntimeState();
    this.parsers[0].reset();
    this.parsers[1].reset();
  }
}
