import { getDefaultBaseNodeData, NodeType, type BaseNodeData } from "./node";

export type EntryNodeData = BaseNodeData & {
  message: string;
};

export function get_default_entry_node_data(id: string): EntryNodeData {
  return {
    ...getDefaultBaseNodeData(id),
    type: NodeType.ENTRY,
    message: "",
  };
}
