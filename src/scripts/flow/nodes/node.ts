import { get_default_conditions_node_data, type ConditionsNodeData } from "./conditions";
import { get_default_tasks_node_data, type TasksNodeData } from "./tasks";
import { get_default_entry_node_data, type EntryNodeData } from "./entry";
import { get_default_power_node_data, type PowerNodeData } from "./power";

export const enum NodeType {
  ENTRY = "ENTRY",
  CONDITIONS = "CONDITIONS",
  TASKS = "TASKS",
  POWER = "POWER",
}

export type NodeTypeDataMap = {
  [NodeType.ENTRY]: EntryNodeData;
  [NodeType.CONDITIONS]: ConditionsNodeData;
  [NodeType.TASKS]: TasksNodeData;
  [NodeType.POWER]: PowerNodeData;
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
  active: boolean;
  enable: boolean;
  prev: string;
  next: string[];
};

export function get_default_base_node_data(id: string): BaseNodeData {
  return {
    id: id,
    type: NodeType.ENTRY,
    active: false,
    enable: true,
    prev: "",
    next: [],
  };
}

export function get_default_node_data(type: NodeType, id: string): BaseNodeData {
  switch (type) {
    case NodeType.ENTRY: {
      return get_default_entry_node_data(id);
    }
    case NodeType.CONDITIONS: {
      return get_default_conditions_node_data(id);
    }
    case NodeType.TASKS: {
      return get_default_tasks_node_data(id);
    }
    case NodeType.POWER: {
      return get_default_power_node_data(id);
    }
  }
}
