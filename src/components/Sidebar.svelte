<script lang="ts">
  import { page } from "$app/state";

  import { sidebarSize } from "../stores/geometry.svelte";
  import { engineStore } from "../stores/engine.svelte";
  import { boardState } from "../stores/board.svelte";
  import { ICON_PATHS } from "../types/core";

  function isActive(path: string) {
    return page.url.pathname === path ? "btn-sidebar-active" : "";
  }
</script>

<div class="d-flex flex-column gap-4 sidebar" bind:clientWidth={sidebarSize.width}>
  <div class="d-flex justify-content-left align-items-end gap-2 m-3">
    <img class="img-filter app-icon" src={ICON_PATHS.TOKEN} alt="Home" />

    <div class="d-flex flex-column justify-content-end align-items-start h-100 me-4">
      <div class="d-flex flex-fill align-items-end">
        <div class="h5 fw-bold mb-1">Touchless</div>
        <small class="ms-2 mb-1">0.1.0</small>
      </div>
      <div class="d-flex flex-fill align-items-end">
        <div class="h6">AI Hand Control</div>
      </div>
    </div>
  </div>

  <div class="d-flex flex-column flex-fill align-items-center gap-3">
    <div class="d-flex flex-fill w-100 gap-1 ps-4 pe-3">
      <button
        class="btn d-flex flex-fill justify-content-center align-items-center gap-2"
        onclick={async () => await engineStore.changeRunningState()}
      >
        <img class="img-filter" src={engineStore.state.running ? ICON_PATHS.STOP : ICON_PATHS.PLAY_ARROW} alt="" />
        <div>
          {engineStore.state.running ? "Stop" : "Run"}
        </div>
      </button>

      <button class="btn btn-nbd" onclick={() => (boardState.show = !boardState.show)}>
        <img class="img-filter" src={boardState.show ? ICON_PATHS.PREVIEW_OFF : ICON_PATHS.PREVIEW} alt="" />
      </button>
    </div>

    {#if !engineStore.state.webcamAvaiable}
      <div class="d-flex align-items-center">
        <div class="webcam-log">Camera not avaiable</div>
        <button class="btn btn-nbd info-button">
          <img
            class="img-filter"
            style="width: 80%; padding-bottom: 0.2rem; opacity: 0.4"
            src={ICON_PATHS.INFO}
            alt=""
          />
          <span class="info-tooltip">Your camera is currently unavailable, which may happen if another application is using it, system settings are blocking access, or there's a temporary hardware/driver issue. Try closing other video apps, checking camera permissions, or restarting your device to resolve this.</span>
        </button>
      </div>
    {/if}
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

<style>
  .webcam-log {
    font-style: italic;
    font-weight: 300;
    opacity: 0.5;
  }

  .info-button {
    position: relative;
    display: inline-block;
    cursor: help;
  }

  .info-tooltip {
    visibility: hidden;
    position: absolute;
    width: 24rem;
    font-size: 0.9rem;
    z-index: 1;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);
    background-color: var(--bg-color-2);
    color: var(--fg-color-3);
    text-align: center;
    padding: 1rem;
    border-radius: var(--btn-border-radius);
    opacity: 0;
    transition: opacity 0.3s;
  }

  .info-button:hover .info-tooltip {
    visibility: visible;
    opacity: 1;
  }
</style>
