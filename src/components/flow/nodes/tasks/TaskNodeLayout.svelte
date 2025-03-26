<script lang="ts">
  import { getDefaultTask, TaskType, type Task, type TaskNodeData } from "../../../../types/nodes";
  import AttributeForm from "./components/AttributeForm.svelte";
  import TaskAttribute from "./components/TaskAttribute.svelte";
  import NodeLabel from "../components/NodeLabel.svelte";
  
  let { data }: { data: TaskNodeData } = $props();
</script>

<div class="node d-flex flex-column gap-2 p-4" style="width: 600px;">
  <NodeLabel {data} />

  <div class="d-flex flex-column gap-3" class:disabled={!data.enable}>
    <TaskAttribute {data}></TaskAttribute>

    {#each data.tasks as task, i (task)}
      <AttributeForm
        data={task}
        change={(newTask: Task) => {
          data.tasks.splice(i, 1);
          data.tasks.splice(i, 0, newTask);
        }}
        remove={() => data.tasks.splice(i, 1)}
      ></AttributeForm>
    {/each}

    <button onclick={() => data.tasks.push(getDefaultTask(TaskType.COMMAND))}>+</button>
  </div>
</div>
