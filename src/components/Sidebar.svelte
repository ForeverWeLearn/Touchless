<script lang="ts">
  import { page } from "$app/state";
  import { board_state } from "../stores/board.svelte";
  import { engine_state } from "../stores/engine.svelte";
  import { sidebar_size } from "../stores/sidebar.svelte";

  function is_active(path: string) {
    return page.url.pathname === path ? "active" : "";
  }
</script>

<div class="d-flex flex-column pt-2 sidebar" bind:clientWidth={sidebar_size.width} data-tauri-drag-region>
  <div class="d-flex justify-content-left align-items-end mt-3 mb-4">
    <img class="app-icon" src="imgs/sidebar/network_intelligence.svg" alt="Home" />

    <div class="d-flex flex-column justify-content-end align-items-start ms-2 h-100">
      <div class="d-flex align-items-end">
        <div class="h5 fw-bold mb-1">Touchless</div>
        <small class="ms-2 mb-1">0.0.3</small>
      </div>
      <div class="h6 fw-light">AI Mind Control</div>
    </div>
  </div>

  <div class="d-flex justify-content-center align-items-center px-4 mb-4">
    <button
      class="btn btn-lg btn-block w-100 {engine_state.running ? 'btn-launch-stop' : 'btn-launch'}"
      onclick={() => (engine_state.running = !engine_state.running)}>{engine_state.running ? "Stop" : "Start"}</button
    >
    <button class="btn btn-lg ms-2" onclick={() => (board_state.show = !board_state.show)}
      ><img src="imgs/sidebar/{board_state.show ? 'preview_off' : 'preview'}.svg" alt="Preview" /></button
    >
  </div>

  <a href="/" class="link-sidebar" onclick={() => (board_state.show = false)}>
    <div class="btn btn-transparent d-flex justify-content-left align-items-center mx-2 btn-sidebar {is_active('/')}">
      <img src="imgs/sidebar/token.svg" alt="Home" />
      <div class="my-0 text-sidebar">Home</div>
    </div>
  </a>
  <a href="/flow" class="link-sidebar" onclick={() => (board_state.show = false)}>
    <div
      class="btn btn-transparent d-flex justify-content-left align-items-center mx-2 mt-2 btn-sidebar {is_active(
        '/flow'
      )}"
    >
      <img src="imgs/sidebar/automation.svg" alt="Flow" />
      <div class="my-0 text-sidebar">Flow</div>
    </div>
  </a>
  <a href="/task" class="link-sidebar" onclick={() => (board_state.show = false)}>
    <div
      class="btn btn-transparent d-flex justify-content-left align-items-center mx-2 mt-2 btn-sidebar {is_active(
        '/task'
      )}"
    >
      <img src="imgs/sidebar/bolt.svg" alt="Task" />
      <div class="my-0 text-sidebar">Task</div>
    </div>
  </a>
  <div class="mt-auto">
    <a href="/settings" class="link-sidebar" onclick={() => (board_state.show = false)}>
      <div
        class="btn btn-transparent d-flex justify-content-left align-items-center mx-2 mb-2 btn-sidebar {is_active(
          '/settings'
        )}"
      >
        <img src="imgs/sidebar/settings.svg" alt="Settings" />
        <div class="my-0 text-sidebar">Settings</div>
      </div>
    </a>
  </div>
</div>

<style>
  .active {
    background-color: #ffffff17;
    opacity: 1;
  }
</style>
