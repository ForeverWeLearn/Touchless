<script lang="ts">
  import type { Command } from "../../scripts/utils/const";

  let { command, add, delete_command }: { command: Command; add: () => void; delete_command: () => void } = $props();
</script>

<div class="d-flex flex-column" style="position: relative;">
  <div class="d-flex gap-1">
    <div class="d-flex flex-fill gap-1">
      <div class="d-flex flex-shrink-1">
        <input class="form-control input-name" type="text" bind:value={command.name} />
      </div>
      <input
        class="form-control input-command"
        type="text"
        placeholder={"cmd | notepad | start https:/google.com ..."}
        bind:value={command.comamnd}
      />
    </div>

    <button class="btn btn-nbd" onclick={() => add()}>
      <img src="imgs/svg/add.svg" alt="Add Command" />
    </button>

    <button class="btn btn-nbd" onclick={() => delete_command()}>
      <img src="imgs/svg/close.svg" alt="Delete Command" />
    </button>
  </div>
</div>
