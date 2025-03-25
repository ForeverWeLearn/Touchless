import { getDefaultConditionNodeData, type ConditionsNodeData } from "./conditions";
import { getDefaultTasksNodeData, type TasksNodeData } from "./tasks";
import { getDefaultEntryNodeData, type EntryNodeData } from "./entry";
import { getDefaultPowerNodeData, type PowerNodeData } from "./power";

export enum NodeType {
  ENTRY = "ENTRY",
  CONDITIONS = "CONDITIONS",
  TASKS = "TASKS",
  POWER = "POWER",
}

export type CustomNodeDataMap = {
  [NodeType.ENTRY]: EntryNodeData;
  [NodeType.CONDITIONS]: ConditionsNodeData;
  [NodeType.TASKS]: TasksNodeData;
  [NodeType.POWER]: PowerNodeData;
};

export type CustomNodeData<T extends NodeType> = CustomNodeDataMap[T];

export type CustomNode<T extends NodeType> = {
  id: string;
  type: T;
  data: CustomNodeData<T>;
  position: { x: number; y: number };
  origin?: [number, number];
};

export type BaseNodeData = {
  id: string;
  type: NodeType;
  enable: boolean;
};

/**
 * Creates a default BaseNode data object
 *
 * This function generates a base data structure that serves as the foundation
 * for all node types in the system. It initializes a node with default values
 * and the specified ID.
 *
 * @param {string} id - Unique identifier for the node
 * @returns {BaseNodeData} A new node data object initialized with default values
 *
 * @example
 * const nodeData = getDefaultBaseNodeData("node-123");
 * // Returns: { id: "node-123", type: NodeType.ENTRY, enable: true: "", next: [] }
 */
export function getDefaultBaseNodeData(id: string): BaseNodeData {
  return {
    id: id,
    type: NodeType.ENTRY,
    enable: true,
  };
}

/**
 * Creates default node data for a specific node type
 *
 * This function serves as a factory method that generates appropriate default data
 * based on the specified node type. It delegates to type-specific helper functions
 * to create the appropriate data structure for each node type.
 *
 * @param {NodeType} type - The type of node to create default data for
 * @param {string} id - Unique identifier for the node
 * @returns {EntryNodeData | ConditionsNodeData | TasksNodeData | PowerNodeData} A node data object initialized with type-specific default values
 *
 * @example
 * const entryNodeData = getDefaultNodeData(NodeType.ENTRY, "node-123");
 * const tasksNodeData = getDefaultNodeData(NodeType.TASKS, "tasks-456");
 */
export function getDefaultNodeData(
  type: NodeType,
  id: string
): EntryNodeData | ConditionsNodeData | TasksNodeData | PowerNodeData {
  switch (type) {
    case NodeType.ENTRY: {
      return getDefaultEntryNodeData(id);
    }
    case NodeType.CONDITIONS: {
      return getDefaultConditionNodeData(id);
    }
    case NodeType.TASKS: {
      return getDefaultTasksNodeData(id);
    }
    case NodeType.POWER: {
      return getDefaultPowerNodeData(id);
    }
  }
}
