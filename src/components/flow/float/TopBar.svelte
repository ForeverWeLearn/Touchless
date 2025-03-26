<script lang="ts">
  import { reloadFlow, saveFlow } from "../../../stores/flow/flow.svelte";
  import { ICON_PATHS } from "../../../types/core";

  let icon = $state(ICON_PATHS.SAVE);

  function saveDoneIcon() {
    icon = ICON_PATHS.DONE_OUTLINE;
    setTimeout(() => {
      icon = ICON_PATHS.SAVE;
    }, 2000);
  }

  async function save() {
    await saveFlow();
    saveDoneIcon();
  }
</script>

<aside>
  <div class="input-group">
    <button type="button" class="btn d-flex gap-2 px-4" onclick={() => save()}>
      <img class="img-filter" src={icon} alt="" />
      <div>Save</div>
    </button>

    <button
      type="button"
      class="btn btn-outline-secondary dropdown-toggle dropdown-toggle-split"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span class="visually-hidden">Toggle Dropdown</span>
    </button>

    <ul class="dropdown-menu dropdown-menu-end">
      <li>
        <div class="dropdown-item d-flex">
          <button class="btn btn-danger d-flex flex-fill gap-2">
            <img class="img-filter" src={ICON_PATHS.DELETE} alt="" />
            <div>Delete</div>
          </button>
        </div>
      </li>

      <li><hr class="dropdown-divider" /></li>

      <li>
        <div class="dropdown-item d-flex">
          <button class="btn btn-primary d-flex flex-fill gap-2" onclick={() => reloadFlow()}>
            <img class="img-filter" src={ICON_PATHS.HISTORY} alt="" />
            <div>Revert</div>
          </button>
        </div>
      </li>
    </ul>
  </div>
</aside>

<style>
  button {
    color: var(--fg-color-2) !important;
    background-color: var(--bg-color-2);
  }

  aside {
    position: absolute;
    bottom: 3rem;
    right: 2rem;
    z-index: 997;
  }
</style>
