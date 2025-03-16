<script lang="ts">
  import type { CommandTaskAttribute } from "../../../scripts/flow/attributes/task/command";
  import { command_store } from "../../../stores/task.svelte";

  let {
    raw_data,
    reactive_data,
    delete_task,
  }: { raw_data: CommandTaskAttribute; reactive_data: CommandTaskAttribute; delete_task: () => void } = $props();

  $effect(() => {
    raw_data.enable = reactive_data.enable;
  });
</script>

<div class="d-flex align-items-center gap-2">
  <div style="white-space: nowrap;">Command</div>

  <select class="form-select form-select-sm" bind:value={reactive_data.name}>
    {#each command_store.commands as command}
      <option value={command.name}>{command.name}</option>
    {/each}
  </select>

  <button class="btn" onclick={delete_task}>✕</button>
</div>
