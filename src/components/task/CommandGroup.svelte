<script lang="ts">
  import { commandStore } from "../../stores/task.svelte";
  import CommandForm from "./CommandForm.svelte";
</script>

<div class="d-flex flex-column flex-wrap gap-5">
  <div class="d-flex flex-column gap-4">
    {#each commandStore.commands as command, i (command)}
      <CommandForm
        {command}
        add={() => commandStore.insert(i + 1)}
        deleteCommand={() => commandStore.remove(command)}
      />
    {/each}

    <div class="d-flex flex-fill">
      <button class="btn btn-nbd flex-fill" onclick={() => commandStore.push()}>
        <img src="imgs/svg/add.svg" alt="Add Command" />
      </button>
    </div>
  </div>
</div>
