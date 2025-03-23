import type { GesturesConditionAttribute } from "./flow/attributes/condition/gestures";
import type { DistanceConditionAttribute } from "./flow/attributes/condition/distance";
import type { RotationConditionAttribute } from "./flow/attributes/condition/rotation";
import type { ConditionsNodeData } from "./flow/nodes/conditions";
import type { GestureParser } from "./gesture_parser.svelte";
import type { TasksNodeData } from "./flow/nodes/tasks";
import type { Runtime } from "./flow/attributes/condition";
import type { Engine } from "./engine.svelte";
import { GESTURE_NAMES, type HandednessID } from "./utils/const";
import { calculateDistance, calculateAngle } from "./utils/algo";
import { handResults } from "../stores/engine.svelte";
import { nodeStore } from "../stores/flow.svelte";
import { NodeType } from "./flow/nodes/node";
import { settings } from "../stores/settings.svelte";

export class Analyzer {
  private engine!: Engine;
  private parsers!: GestureParser[];

  private now = 0;

  constructor(engine: Engine) {
    this.engine = engine;
    this.parsers = engine.gesture_parsers;
  }

  public async analyze() {
    this.now = performance.now();

    for (const node of nodeStore.nodes) {
      switch (node.type) {
        case NodeType.ENTRY: {
          break;
        }

        case NodeType.CONDITIONS: {
          const data = node.data as ConditionsNodeData;

          if (!nodeStore.isParentActivated(data.id)) {
            break;
          }

          if (this.parseConditions(data)) {
            data.runtime.activated = true;
            data.runtime.lastSatisfy = this.now;
          } else if (this.now - data.runtime.lastSatisfy > data.duration) {
            data.runtime.activated = false;
          }

          break;
        }

        case NodeType.TASKS: {
          const data = node.data as TasksNodeData;
          const parentActivated = nodeStore.isParentActivated(data.id);

          if (data.enable && parentActivated) {
            await this.resetAll();
            await this.engine.executor.parse(data.tasks);
          }
          break;
        }
      }
    }
  }

  /**
   * Whether or not a ConditionsNode's conditions seem to be satisfied.
   * Return true in cases:
   * - logic = "AND" and all conditions activated.
   * - logic = "OR" and one of conditons activated.
   *
   * Otherwise, return false.
   *  */
  private parseConditions(data: ConditionsNodeData): boolean {
    const parseActive = (stf: boolean, runtime: Runtime, time2active: number) => {
      const step = this.now - runtime.lastSatisfy;

      // If not satisfy...
      if (!stf) {
        // ...for longer than max active step...
        if (step > settings.maxActiveStep) {
          // ...then set deactivated and reset first satisfy.
          runtime.activated = false;
          runtime.firstSatisfy = 0;
        }
      }

      // If satisfy...
      if (stf) {
        // ...and step too far...
        if (step > settings.maxActiveStep) {
          // ...then it seem to be first satisfy, set first satisfy to now.
          runtime.firstSatisfy = this.now;
        }

        // ...then set last satisfy to now.
        runtime.lastSatisfy = this.now;

        // ...for longer than time to active...
        if (runtime.lastSatisfy - runtime.firstSatisfy > time2active) {
          // ...then active.
          runtime.activated = true;
        }
      }
    };

    if (data.gestures.enable) {
      parseActive(this.satisfyGestures(data.gestures), data.gestures.runtime, data.gestures.time2active);
    }

    if (data.distance.enable) {
      parseActive(this.satisfyDistance(data.distance), data.distance.runtime, data.distance.time2active);
    }

    if (data.rotation.enable) {
      parseActive(this.satisfyRotation(data.rotation), data.rotation.runtime, data.rotation.time2active);
    }

    if (data.logic == "AND") {
      return (
        data.gestures.runtime.activated == data.gestures.enable &&
        data.distance.runtime.activated == data.distance.enable &&
        data.rotation.runtime.activated == data.rotation.enable
      );
    }

    console.log(data.rotation.runtime.activated, data.rotation.enable);

    return (
      (data.gestures.runtime.activated && data.gestures.enable) ||
      (data.distance.runtime.activated && data.distance.enable) ||
      (data.rotation.runtime.activated && data.rotation.enable)
    );
  }

  private satisfyGestures(gestures: GesturesConditionAttribute): boolean {
    function gestureMatching(handedness: HandednessID) {
      if (handResults[handedness].has) {
        return GESTURE_NAMES[handResults[handedness].gesture_id] == gestures.gestures[handedness].name;
      }
    }

    if (gestures.gestures[0].enable) {
      if (!gestureMatching(0)) {
        return false;
      }
    }

    if (gestures.gestures[1].enable) {
      if (!gestureMatching(1)) {
        return false;
      }
    }

    return gestures.gestures[0].enable || gestures.gestures[1].enable;
  }

  private satisfyDistance(distance: DistanceConditionAttribute): boolean {
    if (!handResults[distance.initial.handedness].has || !handResults[distance.terminal.handedness].has) {
      return false;
    }

    const initial = this.engine.keypoints[distance.initial.handedness][distance.initial.landmark];
    const terminal = this.engine.keypoints[distance.terminal.handedness][distance.terminal.landmark];

    distance.unit = (this.parsers[0].unit + this.parsers[1].unit) / 2;

    const d = calculateDistance(initial, terminal) / distance.unit;

    this.engine.drawer.line(initial, terminal, d.toFixed(1) + " hu", 3);

    return distance.range.min < d && d < distance.range.max;
  }

  private satisfyRotation(rotation: RotationConditionAttribute): boolean {
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

    if (!handResults[rotation.initial.handedness].has || !handResults[rotation.terminal.handedness].has) {
      return false;
    }

    const initial = this.engine.keypoints[rotation.initial.handedness][rotation.initial.landmark];
    const terminal = this.engine.keypoints[rotation.terminal.handedness][rotation.terminal.landmark];

    const angle = 360 - calculateAngle(initial, terminal);

    this.engine.drawer.line(initial, terminal, angle.toFixed(0) + "°", 3);

    const inRange = angleInRange(
      angle,
      rotation.range.angle - rotation.range.spread,
      rotation.range.angle + rotation.range.spread
    );

    return inRange;
  }

  private async resetAll() {
    await nodeStore.resetRuntimeState();
    this.parsers[0].reset();
    this.parsers[1].reset();
  }
}
