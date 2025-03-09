import { type BaseNodeData } from "../node";
import { NodeGroup } from "../node_group";
import { NodeType } from "../note_type";

type KeyDirectionType = "Click" | "Press" | "Release";

type KeyType = {
  key: string;
  direction: KeyDirectionType;
};

export type KeySequenceType = {
  name: string;
  sequence: KeyType[];
};

export type KeySequenceNodeData = BaseNodeData & {
  sequence_name: string;
};

export function get_default_key_sequence_node_data(id: string): KeySequenceNodeData {
  return {
    id: id,
    type: NodeType.KEY_SEQUENCE,
    group: NodeGroup.TASK,
    active: false,
    enable: true,
    prev: "",
    next: [],
    sequence_name: "",
  };
}
