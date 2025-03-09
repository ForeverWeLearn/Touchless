import { type BaseNodeData } from "../node";
import { NodeGroup } from "../node_group";
import { NodeType } from "../note_type";

export type CommandNodeData = BaseNodeData & {
  command: string;
};

export function get_default_command_node_data(id: string): CommandNodeData {
  return {
    id: id,
    type: NodeType.COMMAND,
    group: NodeGroup.TASK,
    active: false,
    enable: true,
    prev: "",
    next: [],
    command: "notepad",
  };
}
