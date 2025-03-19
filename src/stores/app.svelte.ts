import type { TaskType } from "../scripts/flow/attributes/task";
import { invoke } from "@tauri-apps/api/core";

export async function refresh() {
  await invoke("execute_key_sequence", { sequence: [{ direction: "Click", key: "F5" }] });
}

type TaskInspect = {
  type: TaskType;
  name: string;
};

const taskHistorySize = 6;

const taskHistory: TaskInspect[] = $state([]);

function createAppStore() {
  const appendTaskHistory = (task: TaskInspect) => {
    taskHistory.push(task);

    if (taskHistory.length > taskHistorySize) {
      taskHistory.splice(0, 1);
    }
  };

  return {
    get taskHistory() {
      return taskHistory;
    },
    appendTaskHistory,
  };
}

export const appStore = createAppStore();
