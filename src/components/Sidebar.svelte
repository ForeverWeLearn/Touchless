<script lang="ts">
  import { page } from "$app/state";
  import { board_state } from "../stores/board.svelte";
  import { engine_state } from "../stores/engine.svelte";
  import { sizebarSize } from "../stores/geometry.svelte";

  function is_active(path: string) {
    return page.url.pathname === path ? "active" : "";
  }
</script>

<div class="d-flex flex-column gap-4 sidebar" bind:clientWidth={sizebarSize.width} data-tauri-drag-region>
  <div class="d-flex justify-content-left align-items-end gap-2 m-3">
    <img class="app-icon" src="imgs/svg/token.svg" alt="Home" />

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

  <div class="d-flex justify-content-center align-items-center gap-3 px-4">
    <button
      class="btn d-flex flex-fill justify-content-center align-items-center btn-launch"
      onclick={() => (engine_state.running = !engine_state.running)}
    >
      <img src="imgs/svg/{engine_state.running ? 'stop' : 'play_arrow'}.svg" alt="" />
      <div>
        {engine_state.running ? "Stop" : "Run"}
      </div>
    </button>

    <button class="btn btn-nbd" onclick={() => (board_state.show = !board_state.show)}>
      <img src="imgs/svg/{board_state.show ? 'preview_off' : 'preview'}.svg" alt="" />
    </button>
  </div>

  <div class="d-flex flex-column p-2 h-100">
    <div class="d-flex flex-column mb-auto gap-2">
      <a href="/" class="link-sidebar" onclick={() => (board_state.show = false)}>
        <div class="btn d-flex justify-content-left align-items-center btn-sidebar {is_active('/')}">
          <img src="imgs/svg/home.svg" alt="Home" />
          <div class="my-0 text-sidebar">Home</div>
        </div>
      </a>

      <a href="/flow" class="link-sidebar" onclick={() => (board_state.show = false)}>
        <div class="btn d-flex justify-content-left align-items-center btn-sidebar {is_active('/flow')}">
          <img src="imgs/svg/automation.svg" alt="Flow" />
          <div class="my-0 text-sidebar">Flow</div>
        </div>
      </a>

      <a href="/task" class="link-sidebar" onclick={() => (board_state.show = false)}>
        <div class="btn d-flex justify-content-left align-items-center btn-sidebar {is_active('/task')}">
          <img src="imgs/svg/bolt.svg" alt="Task" />
          <div class="my-0 text-sidebar">Task</div>
        </div>
      </a>
    </div>

    <div class="d-flex flex-column mt-auto">
      <a href="/settings" class="link-sidebar" onclick={() => (board_state.show = false)}>
        <div class="btn d-flex justify-content-left align-items-center btn-sidebar {is_active('/settings')}">
          <img src="imgs/svg/settings.svg" alt="Settings" />
          <div class="my-0 text-sidebar">Settings</div>
        </div>
      </a>
    </div>
  </div>
</div>

<style>
  .active {
    background-color: #ffffff17;
    opacity: 1;
  }
</style>
