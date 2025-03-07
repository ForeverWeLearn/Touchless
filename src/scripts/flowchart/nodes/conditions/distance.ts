import { ConditionNodeType, type ConditionNodeData } from "../condition";
import type { HandRange } from "../../components/hand_range";
import { PointType, type Point } from "../../components/point";
import { TimeType, type Time } from "../../components/time";

export type DistanceNodeData = ConditionNodeData & {
  points: Point[];
  range: HandRange;
  timeout: Time;
};

export function get_default_distance_node_data(id: string): DistanceNodeData {
  return {
    id: id,
    type: ConditionNodeType.DISTANCE,
    active: false,
    enable: true,
    prev: "",
    next: [],
    points: [
      {
        type: PointType.DYNAMIC,
        handedness: 0,
        landmark: 8,
      },
      {
        type: PointType.DYNAMIC,
        handedness: 1,
        landmark: 8,
      },
    ],
    range: {
      min: 1.5,
      max: 3,
    },
    timeout: {
      type: TimeType.NORMAL,
      value: 2000,
    },
  };
}
