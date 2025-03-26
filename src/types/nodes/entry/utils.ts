import { NodeType } from "../types";
import { getDefaultBaseNode, getDefaultBaseNodeData } from "../utils";
import type { EntryNode, EntryNodeData } from "./types";

export function getDefaultEntryNode(id: string): EntryNode {
  return {
    ...getDefaultBaseNode(id),
    type: NodeType.ENTRY,
    data: getDefaultEntryNodeData(id),
  };
}

export function getDefaultEntryNodeData(id: string): EntryNodeData {
  return {
    ...getDefaultBaseNodeData(id),
    type: NodeType.ENTRY,
    message: "",
  };
}
