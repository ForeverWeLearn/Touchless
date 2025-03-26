import type { Edge } from "@xyflow/svelte";

import type { BaseNode, BaseNodeData } from "./types/base";
import type { CustomNode, NodeData } from "./types";
import { getDefaultConditionNode, getDefaultConditionNodeData } from "./condition";
import { getDefaultEntryNode, getDefaultEntryNodeData } from "./entry";
import { getDefaultTaskNode, getDefaultTaskNodeData } from "./task";
import { NodeType } from "./types/common";

export function getDefaultBaseNode(id: string): BaseNode {
  return {
    id: id,
    position: { x: 0, y: 0 },
  };
}

export function getDefaultBaseNodeData(id: string): BaseNodeData {
  return {
    id: id,
    enable: true,
  };
}

export function getDefaultNode(type: NodeType, id: string): CustomNode {
  switch (type) {
    case NodeType.ENTRY:
      return getDefaultEntryNode(id);

    case NodeType.CONDITION:
      return getDefaultConditionNode(id);

    case NodeType.TASK:
      return getDefaultTaskNode(id);
  }
}

export function getDefaultNodeData(type: NodeType, id: string): NodeData {
  switch (type) {
    case NodeType.ENTRY:
      return getDefaultEntryNodeData(id);

    case NodeType.CONDITION:
      return getDefaultConditionNodeData(id);

    case NodeType.TASK:
      return getDefaultTaskNodeData(id);
  }
}

export function getDefaultNodes(): CustomNode[] {
  return [];
}

export function getDefaultEdges(): Edge[] {
  return [];
}
