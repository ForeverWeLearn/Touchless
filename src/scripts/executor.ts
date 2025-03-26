import { invoke } from "@tauri-apps/api/core";

import type { Engine } from "./engine.svelte";
import { keySequenceStore } from "../stores/task/key-sequence.svelte";
import { commandStore } from "../stores/task/command.svelte";
import { appStore } from "../stores/app.svelte";
import { TaskType, type Task, type TaskNodeData } from "../types/nodes";

export class Executor {
  public inQueue = false;
  public executing = false;

  private engine!: Engine;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public async parse(taskData: TaskNodeData) {
    if (taskData.tasks.length >= 1) {
      if (taskData.tasks[0].enable) {
        await this.sleep(taskData.startDelay);
        await this.execute(taskData.tasks[0]);
      }
    }

    if (taskData.tasks.length <= 1) {
      await this.sleep(taskData.cooldown);
      return;
    }

    for (let i = 1; i < taskData.tasks.length; i++) {
      const task = taskData.tasks[i];

      if (!task.enable) {
        continue;
      }

      await this.sleep(taskData.delay);
      await this.execute(task);
    }
  }

  public async execute(task: Task) {
    switch (task.type) {
      case TaskType.KEY_SEQUENCE: {
        const keySequence = keySequenceStore.getKeySequenceByName(task.name);

        await invoke("execute_key_sequence", { sequence: keySequence });

        appStore.appendTaskHistory({ type: task.type, name: task.name });

        break;
      }

      case TaskType.COMMAND: {
        const command = commandStore.getCommandByName(task.name);

        await invoke("execute_command", { command: command });

        appStore.appendTaskHistory({ type: task.type, name: task.name });

        break;
      }

      case TaskType.TEXT: {
        const text = commandStore.getCommandByName(task.text);

        await invoke("execute_text", { text: text });

        appStore.appendTaskHistory({
          type: task.type,
          name: task.text.length > 16 ? task.text.slice(16) + "..." : task.text,
        });

        break;
      }
    }
  }
}
