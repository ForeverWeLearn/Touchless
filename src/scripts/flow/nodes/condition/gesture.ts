import type { Gesture } from "../../components/gesture";
import { GestureName } from "../../../utils/const";
import { TimeType, type Time } from "../../components/time";
import { type BaseNodeData } from "../node";
import { NodeType } from "../note_type";
import { NodeGroup } from "../node_group";

export type GestureNodeData = BaseNodeData & {
  handedness: Gesture[];
  timeout: Time;
};

export function get_default_gesture_node_data(id: string): GestureNodeData {
  return {
    id: id,
    type: NodeType.GESTURE,
    group: NodeGroup.CONDITION,
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
