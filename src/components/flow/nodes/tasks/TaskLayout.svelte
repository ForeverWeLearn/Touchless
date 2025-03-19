<script lang="ts">
  import { TaskType } from "../../../../scripts/flow/attributes/task";
  import type { TasksNodeData } from "../../../../scripts/flow/nodes/tasks";
  import CommandAttribute from "../../attributes/CommandAttribute.svelte";
  import KeySequenceAttribute from "../../attributes/KeySequenceAttribute.svelte";
  import AddTaskButtons from "../../generic/AddTaskButtons.svelte";
  import NodeLabel from "../../generic/NodeLabel.svelte";

  let { data }: { data: TasksNodeData } = $props();
</script>

<div class="node d-flex flex-column gap-2" style="width: 500px;">
  <div class="d-flex flex-column mt-3">
    <NodeLabel {data} />
  </div>

  <div class="d-flex flex-column gap-4" class:disabled={!data.enable}>
    <div class="d-flex justify-content-center">
      <AddTaskButtons {data} />
    </div>

    <div class="d-flex flex-column gap-1 mb-4">
      {#each data.tasks as task, i (task)}
        {#if task.type == TaskType.KEY_SEQUENCE}
          <KeySequenceAttribute data={task} remove={() => data.tasks.splice(i, 1)} />
        {:else if task.type == TaskType.COMMAND}
          <CommandAttribute data={task} remove={() => data.tasks.splice(i, 1)} />
        {/if}
      {/each}
    </div>
  </div>
</div>
