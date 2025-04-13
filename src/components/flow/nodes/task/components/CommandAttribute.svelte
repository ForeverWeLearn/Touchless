<script lang="ts">
  import type { CommandTask } from "../../../../../types/nodes/task/command";
  import { commandStore } from "../../../../../stores/task/command.svelte";

  let { data }: { data: CommandTask } = $props();
</script>

<select class="form-select" bind:value={data.name}>
  {#each commandStore.commands as command}
    <option value={command.name}>{command.name}</option>
  {/each}
</select>
