import type { BaseNodeData } from "./node";

export interface RootNodeData extends BaseNodeData {}

export function get_default_root_node_data(id: string): RootNodeData {
  return {
    id: id,
    active: true,
    enable: true,
    prev: "",
    next: [],
  };
}
