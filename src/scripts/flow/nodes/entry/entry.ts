import { type BaseNodeData } from "../node";
import { NodeGroup } from "../node_group";
import { NodeType } from "../note_type";

export type EntryNodeData = BaseNodeData & {};

export function get_default_entry_node_data(id: string): EntryNodeData {
  return {
    id: id,
    type: NodeType.ENTRY,
    group: NodeGroup.ENTRY,
    active: true,
    enable: true,
    prev: "",
    next: [],
  };
}
