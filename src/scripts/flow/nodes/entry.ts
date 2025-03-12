import { get_default_base_node_data, NodeType, type BaseNodeData } from "./node";

export type EntryNodeData = BaseNodeData & {};

export function get_default_entry_node_data(id: string): EntryNodeData {
  return {
    ...get_default_base_node_data(id),
    type: NodeType.ENTRY,
  };
}
