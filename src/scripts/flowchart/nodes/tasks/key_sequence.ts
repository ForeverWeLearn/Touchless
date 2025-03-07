import { KEY_SEQUENCE_NAMES } from "../../../utils/const";
import { LoopType } from "../../components/loop";
import { TaskNodeType, type TaskNodeData } from "../task";

type KeyDirectionType = "Click" | "Press" | "Release";

type KeyType = {
  key: string;
  direction: KeyDirectionType;
};

export type KeySequenceType = {
  name: string;
  sequence: KeyType[];
};

export type KeySequenceNodeData = TaskNodeData & {
  sequence_name: string;
};

export function get_default_key_sequence_node_data(id: string): KeySequenceNodeData {
  return {
    id: id,
    type: TaskNodeType.KEY_SEQUENCE,
    active: false,
    enable: true,
    prev: "",
    next: [],
    loop: LoopType.ONCE,
    sequence_name: KEY_SEQUENCE_NAMES[0],
  };
}
