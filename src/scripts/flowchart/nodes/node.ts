import { get_random_string } from "../../utils/algo";
import { ConditionNodeType, type ConditionNodeData } from "./condition";
import { get_default_distance_node_data, type DistanceNodeData } from "./conditions/distance";
import { get_default_gesture_node_data, type GestureNodeData } from "./conditions/gesture";
import { get_default_root_node_data, type RootNodeData } from "./root";
import { TaskNodeType, type TaskNodeData } from "./task";
import { get_default_key_sequence_node_data, type KeySequenceNodeData } from "./tasks/key_sequence";

export enum NodeType {
  ROOT = "ROOT",
  CONDITION = "CONDITION",
  TASK = "TASK",
}

export type BaseNodeData = {
  id: string;
  active: boolean;
  enable: boolean;
  prev: string;
  next: string[];
};

export type NodeTypeDataMap = {
  [NodeType.ROOT]: RootNodeData;
  [NodeType.CONDITION]: ConditionNodeData;
  [NodeType.TASK]: TaskNodeData;
};

export type NodeTypeData<T extends NodeType> = NodeTypeDataMap[T];

export type NodeRawData<T extends NodeType> = {
  id: string;
  type: T;
  data: NodeTypeData<T>;
  position: { x: number; y: number };
  origin?: [number, number];
};

export function get_dafault_nodes(): NodeRawData<any>[] {
  const id = get_random_string();
  return [
    {
      id: id,
      type: NodeType.ROOT,
      data: get_default_root_node_data(id),
      position: { x: 0, y: 0 },
    },
  ];
}

export function get_default_node_data(
  type: ConditionNodeType | TaskNodeType,
  id: string
): GestureNodeData | DistanceNodeData | KeySequenceNodeData {
  switch (type) {
    case ConditionNodeType.GESTURE: {
      return get_default_gesture_node_data(id);
    }
    case ConditionNodeType.DISTANCE: {
      return get_default_distance_node_data(id);
    }
    case TaskNodeType.KEY_SEQUENCE: {
      return get_default_key_sequence_node_data(id);
    }
  }
  return get_default_gesture_node_data(id);
}
