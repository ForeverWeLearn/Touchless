import type { Engine } from "./engine.svelte";
import { commandStore, keySequenceStore } from "../stores/task.svelte";
import { TaskType, type TaskAttribute } from "./flow/attributes/task";
import { appStore } from "../stores/app.svelte";
import { invoke } from "@tauri-apps/api/core";

export class Executor {
  private engine!: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  public async parse(tasks: TaskAttribute[]) {
    for (const task of tasks) {
      if (!task.enable) {
        continue;
      }

      switch (task.type) {
        case TaskType.COMMAND: {
          const command = commandStore.getCommandByName(task.name);

          await invoke("execute_command", { command: command });

          appStore.appendTaskHistory({ type: task.type, name: task.name });
          console.log("Execute", task.name);
        }

        case TaskType.KEY_SEQUENCE: {
          const key_sequence = keySequenceStore.getKeySequenceByName(task.name);

          await invoke("execute_key_sequence", { sequence: key_sequence });

          appStore.appendTaskHistory({ type: task.type, name: task.name });
          console.log("Execute", task.name);
        }
      }
    }
  }
}
