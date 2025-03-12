<script lang="ts">
  import { get_default_command_task_attribute } from "../../../scripts/flow/attributes/task/command";
  import { get_default_key_sequence_task_attribute } from "../../../scripts/flow/attributes/task/key_sequence";
  import type { TasksNodeData } from "../../../scripts/flow/nodes/tasks";

  let { reactive_data }: { reactive_data: TasksNodeData } = $props();
</script>

<div class="d-flex justify-content-center gap-1">
  <button class="btn btn-add-task" onclick={() => reactive_data.tasks.push(get_default_key_sequence_task_attribute())}
    >+ Key Sequence</button
  >
  <button class="btn btn-add-task" onclick={() => reactive_data.tasks.push(get_default_command_task_attribute())}
    >+ Command</button
  >
</div>
