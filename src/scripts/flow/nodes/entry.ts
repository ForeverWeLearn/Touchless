import { getDefaultBaseNodeData, NodeType, type BaseNodeData } from "./node";

export type EntryNodeData = BaseNodeData & {
  message: string;
};

export function getDefaultEntryNodeData(id: string): EntryNodeData {
  return {
    ...getDefaultBaseNodeData(id),
    type: NodeType.ENTRY,
    message: "",
  };
}
