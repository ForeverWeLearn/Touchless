<script lang="ts">
  import { DEFAULT_FLOW_NAME } from "../../../types/fs";
  import { AppFileWriter } from "../../../utils/fs/writer";
  import { ICON_PATHS } from "../../../types/core";
  import flowStore from "../../../stores/flow/flow.svelte";

  let icon = $state(ICON_PATHS.SAVE);

  function saveDoneIcon() {
    icon = ICON_PATHS.DONE_OUTLINE;
    setTimeout(() => {
      icon = ICON_PATHS.SAVE;
    }, 2000);
  }

  async function save() {
    await flowStore.save();
    saveDoneIcon();
  }

  async function deleteFlow() {
    await AppFileWriter.removeFlow(DEFAULT_FLOW_NAME);
    flowStore.reload();
  }
</script>

<aside>
  <div class="input-group">
    <button type="button" class="btn btn-save d-flex gap-2 px-4" onclick={() => save()}>
      <img class="img-filter" src={icon} alt="" />
      <div>Save</div>
    </button>

    <button
      type="button"
      class="btn btn-save dropdown-toggle dropdown-toggle-split"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span class="visually-hidden">Toggle Dropdown</span>
    </button>

    <ul class="dropdown-menu dropdown-menu-end">
      <div class="d-flex flex-column gap-2">
        <div class="d-flex mx-2">
          <button class="btn btn-danger d-flex flex-fill gap-2" onclick={async () => await deleteFlow()}>
            <img class="img-filter" src={ICON_PATHS.DELETE} alt="" />
            <div>Clear</div>
          </button>
        </div>
        <div class="d-flex mx-2">
          <button class="btn btn-primary d-flex flex-fill gap-2" onclick={async () => await flowStore.reload()}>
            <img class="img-filter" src={ICON_PATHS.HISTORY} alt="" />
            <div>Revert</div>
          </button>
        </div>
      </div>
    </ul>
  </div>
</aside>

<style>
  ul {
    background-color: var(--bg-color-1);
  }

  ul:hover {
    background-color: var(--bg-color-1) !important;
  }

  .btn {
    color: var(--fg-color-2) !important;
  }

  .btn-save {
    color: var(--fg-color-2) !important;
    background-color: var(--bg-color-1);
  }

  .btn-save:hover {
    background-color: var(--bg-color-2);
  }

  aside {
    position: absolute;
    bottom: 3rem;
    right: 2rem;
    z-index: 997;
  }
</style>
