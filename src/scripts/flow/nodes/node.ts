import { get_default_entry_node_data, type EntryNodeData } from "./entry/entry";
import { get_default_gesture_node_data, type GestureNodeData } from "./condition/gesture";
import { get_default_key_sequence_node_data, type KeySequenceNodeData } from "./task/key_sequence";
import { get_default_command_node_data, type CommandNodeData } from "./task/command";
import { get_default_rotation_node_data, type RotationNodeData } from "./condition/rotation";
import { NodeType } from "./note_type";
import type { NodeGroup } from "./node_group";

export type NodeTypeDataMap = {
  [NodeType.ENTRY]: EntryNodeData;
  [NodeType.GESTURE]: GestureNodeData;
  [NodeType.ROTATION]: RotationNodeData;
  [NodeType.KEY_SEQUENCE]: KeySequenceNodeData;
  [NodeType.COMMAND]: CommandNodeData;
};

export type NodeTypeData<T extends NodeType> = NodeTypeDataMap[T];

export type RawNodeData<T extends NodeType> = {
  id: string;
  type: T;
  data: NodeTypeData<T>;
  position: { x: number; y: number };
  origin?: [number, number];
};

export type BaseNodeData = {
  id: string;
  type: NodeType;
  group: NodeGroup;
  active: boolean;
  enable: boolean;
  prev: string;
  next: string[];
};

export function get_default_node_data(type: NodeType, id: string): BaseNodeData {
  switch (type) {
    case NodeType.ENTRY: {
      return get_default_entry_node_data(id);
    }
    case NodeType.GESTURE: {
      return get_default_gesture_node_data(id);
    }
    case NodeType.ROTATION: {
      return get_default_rotation_node_data(id);
    }
    case NodeType.KEY_SEQUENCE: {
      return get_default_key_sequence_node_data(id);
    }
    case NodeType.COMMAND: {
      return get_default_command_node_data(id);
    }
  }
}
