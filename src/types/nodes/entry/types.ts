import type { BaseNode, BaseNodeData, NodeType } from "../types";

export type EntryNode = BaseNode & {
  type: NodeType.ENTRY;
  data: EntryNodeData;
};

export type EntryNodeData = BaseNodeData & {
  type: NodeType.ENTRY;
  message: string;
};
