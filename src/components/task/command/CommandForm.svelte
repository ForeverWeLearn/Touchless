<script lang="ts">
  import { ICON_PATHS, type Command } from "../../../types/core";

  let { command, add, deleteCommand }: { command: Command; add: () => void; deleteCommand: () => void } = $props();
</script>

<div class="d-flex flex-column appear-opacity" style="position: relative;">
  <div class="d-flex gap-1">
    <div class="d-flex flex-fill gap-1">
      <div class="d-flex flex-shrink-1">
        <img class="img-filter img-icon" src={ICON_PATHS.TEXT_FIELDS} alt="" />
        <input class="form-control input-name" type="text" bind:value={command.name} />
      </div>

      <div class="d-flex flex-fill align-icons-center justify-content-center" style="position: relative;">
        <img class="img-filter img-icon" src={ICON_PATHS.TERMINAL} alt="" />
        <input
          class="form-control input-command"
          type="text"
          placeholder={"Command that run on cmd"}
          bind:value={command.comamnd}
        />
      </div>
    </div>

    <button class="btn btn-nbd" onclick={() => add()}>
      <img class="img-filter" src={ICON_PATHS.ADD} alt="Add Command" />
    </button>

    <button class="btn btn-nbd" onclick={() => deleteCommand()}>
      <img class="img-filter" src={ICON_PATHS.CLOSE} alt="Delete Command" />
    </button>
  </div>
</div>

<style>
  .img-icon {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    padding: 0.7rem;
    bottom: 0;
  }
</style>
