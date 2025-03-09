import type { Engine } from "./engine.svelte";
import { invoke } from "@tauri-apps/api/core";
import { type RawNodeData } from "./flow/nodes/node";
import { KEY_SEQUENCES } from "./utils/const";
import type { KeySequenceNodeData } from "./flow/nodes/task/key_sequence";
import type { CommandNodeData } from "./flow/nodes/task/command";
import { NodeType } from "./flow/nodes/note_type";

export class Executor {
  private engine!: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  public async parse(node: RawNodeData<NodeType>) {
    if (node.type == NodeType.KEY_SEQUENCE) {
      const data = node.data as KeySequenceNodeData;

      const sequence = KEY_SEQUENCES.filter((v) => v.name == data.sequence_name)[0].sequence;

      await invoke("execute_key_sequence", { sequence: sequence });
    }
    if (node.type == NodeType.COMMAND) {
      const data = node.data as CommandNodeData;

      await invoke("execute_command", { command: data.command });
    }
  }
}
