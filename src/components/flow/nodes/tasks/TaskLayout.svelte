<script lang="ts">
  import type { CommandTaskAttribute } from "../../../../scripts/flow/attributes/task/command";
  import type { KeySequenceTaskAttribute } from "../../../../scripts/flow/attributes/task/key_sequence";
  import type { TasksNodeData } from "../../../../scripts/flow/nodes/tasks";
  import CommandAttribute from "../../attributes/command/CommandAttribute.svelte";
  import KeySequenceAttribute from "../../attributes/key_sequence/KeySequenceAttribute.svelte";
  import AddTaskButtons from "../../generic/AddTaskButtons.svelte";
  import NodeLabel from "../../generic/NodeLabel.svelte";

  let { raw_data, reactive_data }: { raw_data: TasksNodeData; reactive_data: TasksNodeData } = $props();

  $effect(() => {
    raw_data.enable = reactive_data.enable;
  });
</script>

<div class="node-container d-flex flex-column gap-3">
  <div class="d-flex flex-column">
    <NodeLabel id={raw_data.id} name="Task" enable={reactive_data.enable} />
    <AddTaskButtons {reactive_data} />
  </div>

  <div class="d-flex flex-column">
    {#each reactive_data.tasks as task}
      {#if task.type == "KEY_SEQUENCE"}
        <KeySequenceAttribute
          raw_data={task as KeySequenceTaskAttribute}
          reactive_data={task as KeySequenceTaskAttribute}
          delete_task={() => reactive_data.tasks.splice(reactive_data.tasks.indexOf(task), 1)}
        />
      {:else if task.type == "COMMAND"}
        <CommandAttribute
          raw_data={task as CommandTaskAttribute}
          reactive_data={task as CommandTaskAttribute}
          delete_task={() => reactive_data.tasks.splice(reactive_data.tasks.indexOf(task), 1)}
        />
      {/if}
    {/each}
  </div>
</div>
