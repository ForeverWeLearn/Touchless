<script lang="ts">
  import type { TasksNodeData } from "../../../scripts/flow/nodes/tasks";
  import { getDefaultKeySequenceTaskAttribute } from "../../../scripts/flow/attributes/task/key_sequence";
  import { get_default_command_task_attribute } from "../../../scripts/flow/attributes/task/command";

  let { data }: { data: TasksNodeData } = $props();
</script>

<div class="d-flex justify-content-center gap-1">
  <button class="btn btn-add-attribute" onclick={() => data.tasks.push(getDefaultKeySequenceTaskAttribute())}
    >+ Key Sequence</button
  >
  <button class="btn btn-add-attribute" onclick={() => data.tasks.push(get_default_command_task_attribute())}
    >+ Command</button
  >
</div>
