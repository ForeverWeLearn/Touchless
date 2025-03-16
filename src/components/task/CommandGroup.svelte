<script lang="ts">
  import { AppFileWriter } from "../../scripts/utils/writer";
  import { command_store } from "../../stores/task.svelte";
  import CommandForm from "./CommandForm.svelte";

  $effect(() => {
    console.log($state.snapshot(command_store.commands));
    AppFileWriter.command_data(command_store.commands);
  });

  let new_command_index = $state(-1);

  function insert(index: number) {
    command_store.insert(index);
    new_command_index = index;
  }
</script>

<div class="d-flex flex-column justify-content-left flex-wrap gap-5">
  <div class="d-flex flex-column gap-3">
    {#each command_store.commands as command, i}
      <CommandForm
        {command}
        is_new={i === new_command_index}
        add={() => insert(i + 1)}
        delete_command={() => command_store.remove(command)}
      />
    {/each}

    <div class="d-flex flex-fill">
      <button class="btn btn-sm btn-primary flex-fill" onclick={() => command_store.push()}>
        <img src="imgs/svg/add.svg" alt="Add Command" />
      </button>
    </div>
  </div>
</div>
