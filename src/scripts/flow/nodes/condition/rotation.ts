import { TimeType, type Time } from "../../components/time";
import { type BaseNodeData } from "../node";
import type { Rotation } from "../../components/rotation";
import { PointType } from "../../components/point";
import { NodeType } from "../note_type";
import { NodeGroup } from "../node_group";

export type RotationNodeData = BaseNodeData & {
  rotation: Rotation;
  timeout: Time;
};

export function get_default_rotation_node_data(id: string): RotationNodeData {
  return {
    id: id,
    type: NodeType.ROTATION,
    group: NodeGroup.CONDITION,
    active: false,
    enable: true,
    prev: "",
    next: [],
    rotation: {
      enable: true,
      pivot: {
        handedness: 0,
        landmark: 5,
        type: PointType.DYNAMIC,
      },
      target: {
        handedness: 0,
        landmark: 8,
        type: PointType.DYNAMIC,
      },
      degree_range: {
        min: 45,
        max: 135,
      },
    },
    timeout: {
      type: TimeType.INFINITE,
      value: 2000,
    },
  };
}
