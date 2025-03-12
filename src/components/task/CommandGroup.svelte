<script>
  import { AppFileWriter } from "../../scripts/utils/writer";
  import { commands, get_default_command } from "../../stores/task.svelte";
  import CommandForm from "./CommandForm.svelte";

  $effect(() => {
    console.log($state.snapshot(commands));
    AppFileWriter.command_data(commands);
  });
</script>

<div class="d-flex flex-column justify-content-left flex-wrap gap-5">
  <div class="d-flex flex-column gap-1">
    {#each commands as command}
      <CommandForm {command} delete_command={() => commands.splice(commands.indexOf(command), 1)} />
    {/each}

    <div class="d-flex flex-fill">
      <button class="btn btn-sm btn-primary flex-fill" onclick={() => commands.push(get_default_command())}>
        <img src="imgs/svg/add.svg" alt="Add Command" />
      </button>
    </div>
  </div>
</div>
