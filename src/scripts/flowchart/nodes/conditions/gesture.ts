import { ConditionNodeType, type ConditionNodeData } from "../condition";
import type { Gesture } from "../../components/gesture";
import { TimeType, type Time } from "../../components/time";
import { GestureName } from "../../../utils/const";

export type GestureNodeData = ConditionNodeData & {
  handedness: Gesture[];
  timeout: Time;
};

export function get_default_gesture_node_data(id: string): GestureNodeData {
  return {
    id: id,
    type: ConditionNodeType.GESTURE,
    active: false,
    enable: true,
    prev: "",
    next: [],
    handedness: [
      {
        enable: false,
        gesture: GestureName.Palm,
        time: 250,
      },
      {
        enable: true,
        gesture: GestureName.Palm,
        time: 250,
      },
    ],
    timeout: {
      type: TimeType.NORMAL,
      value: 2000,
    },
  };
}
