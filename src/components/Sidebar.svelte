<script lang="ts">
  import { page } from "$app/state";

  import { boardState } from "../stores/board.svelte";
  import { engineState } from "../stores/engine.svelte";
  import { sizebarSize } from "../stores/geometry.svelte";
  import { ICON_PATHS } from "../types/core";

  function isActive(path: string) {
    return page.url.pathname === path ? "btn-sidebar-active" : "";
  }

  function runButtonClick() {
    engineState.running = !engineState.running;
  }
</script>

<div class="d-flex flex-column gap-4 sidebar" bind:clientWidth={sizebarSize.width}>
  <div class="d-flex justify-content-left align-items-end gap-2 m-3">
    <img class="img-filter app-icon" src={ICON_PATHS.TOKEN} alt="Home" />

    <div class="d-flex flex-column justify-content-end align-items-start h-100 me-4">
      <div class="d-flex flex-fill align-items-end">
        <div class="h5 fw-bold mb-1">Touchless</div>
        <small class="ms-2 mb-1">0.0.3</small>
      </div>
      <div class="d-flex flex-fill align-items-end">
        <div class="h6">AI Hand Control</div>
      </div>
    </div>
  </div>

  <div class="d-flex justify-content-center align-items-center gap-1 ps-4 pe-3">
    <button
      class="btn d-flex flex-fill justify-content-center align-items-center gap-2"
      onclick={() => runButtonClick()}
    >
      <img class="img-filter" src={engineState.running ? ICON_PATHS.STOP : ICON_PATHS.PLAY_ARROW} alt="" />
      <div>
        {engineState.running ? "Stop" : "Run"}
      </div>
    </button>

    <button class="btn btn-nbd" onclick={() => (boardState.show = !boardState.show)}>
      <img class="img-filter" src={boardState.show ? ICON_PATHS.PREVIEW_OFF : ICON_PATHS.PREVIEW} alt="" />
    </button>
  </div>

  <div class="d-flex flex-column h-100 navigation-pane">
    <div class="d-flex flex-column mb-auto gap-2">
      <a href="/" class="link-sidebar" onclick={() => (boardState.show = false)}>
        <div class="btn d-flex justify-content-left align-items-center btn-sidebar {isActive('/')}">
          <img class="img-filter" src={ICON_PATHS.AUTOMATION} alt="Flow" />
          <div class="my-0 text-sidebar">Flow</div>
        </div>
      </a>

      <a href="/task" class="link-sidebar" onclick={() => (boardState.show = false)}>
        <div class="btn d-flex justify-content-left align-items-center btn-sidebar {isActive('/task')}">
          <img class="img-filter" src={ICON_PATHS.BOLT} alt="Task" />
          <div class="my-0 text-sidebar">Task</div>
        </div>
      </a>
    </div>

    <div class="d-flex flex-column mt-auto">
      <!-- <a href="/setting" class="link-sidebar" onclick={() => (boardState.show = false)}>
        <div class="btn d-flex justify-content-left align-items-center btn-sidebar {isActive('/setting')}">
          <img class="img-filter" src={ICON_PATHS.SETTINGS} alt="Settings" />
          <div class="my-0 text-sidebar">Settings</div>
        </div>
      </a> -->
    </div>
  </div>
</div>
