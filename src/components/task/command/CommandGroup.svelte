<script lang="ts">
  import { commandStore } from "../../../stores/task/command.svelte";
  import CommandForm from "./CommandForm.svelte";
</script>

<div class="d-flex flex-column flex-wrap gap-3">
  {#each commandStore.commands as command, i (command)}
    <CommandForm {command} add={() => commandStore.insert(i + 1)} deleteCommand={() => commandStore.remove(command)} />
  {/each}
</div>
