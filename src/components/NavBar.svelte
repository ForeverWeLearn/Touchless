<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";
  import { engine_state } from "../stores/engine_state";
  import { board_state } from "../stores/board_state";

  const appWindow = getCurrentWindow();
</script>

<nav class="navbar navbar-expand navbar-dark bg-transparent">
  <button class="btn btn-tranparent btn-navbar-link" onclick={() => board_state.set(false)}>
    <a class="navbar-brand" href="/">
      <img src="favicon.svg" width="30" height="30" class="d-inline-block align-top ms-4 me-3" alt="" />
      <span><strong>TOUCHLESS</strong></span>
    </a>
  </button>

  <div class="collapse navbar-collapse mx-2" data-tauri-drag-region>
    <ul class="navbar-nav">
      <li class="nav-item me-0">
        <button class="btn btn-tranparent btn-navbar-link" onclick={() => board_state.set(false)}>
          <a class="nav-link" href="/"><span>HOME</span></a>
        </button>
      </li>
      <li class="nav-item me-0">
        <button class="btn btn-transparent btn-navbar-link" onclick={() => board_state.set(false)}>
          <a class="nav-link" href="/customize">
            <span>CUSTOMIZE</span>
          </a>
        </button>
      </li>
      <li class="nav-item me-0">
        <button class="btn btn-transparent btn-navbar-link" onclick={() => board_state.set(true)}>
          <!-- svelte-ignore a11y_missing_attribute -->
          <a class="nav-link">
            <span>VISUALIZE</span>
          </a>
        </button>
      </li>
      <li class="nav-item me-0">
        <button class="btn btn-transparent btn-navbar-link" onclick={() => board_state.set(false)}>
          <a class="nav-link" href="/settings">
            <span>SETTINGS</span>
          </a>
        </button>
      </li>
    </ul>

    <div class="ms-auto d-flex align-items-center">
      <button
        class="btn {$engine_state ? 'btn-danger' : 'btn-success'} btn-engine me-4"
        style="width: 120px !important;"
        onclick={() => engine_state.set(!$engine_state)}
      >
        {$engine_state ? "Stop" : "Run"}
      </button>
      <button id="titlebar-minimize" class="titlebar-button" onclick={() => appWindow.minimize()}>
        <img src="imgs/titlebar/circle/minimize.svg" alt="Minimize" />
      </button>
      <button id="titlebar-maximize" class="titlebar-button" onclick={() => appWindow.toggleMaximize()}>
        <img src="imgs/titlebar/circle/maximize.svg" alt="Maximize" />
      </button>
      <button id="titlebar-close" class="titlebar-button" onclick={() => appWindow.close()}>
        <img src="imgs/titlebar/circle/close.svg" alt="Close" />
      </button>
    </div>
  </div>
</nav>

<style>
  .navbar {
    margin: 5px;
    border-radius: 9px;
    background-color: rgba(26, 26, 30, 0.8) !important;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
    transition: opacity 0.5s ease-in-out;
    backdrop-filter: blur(10px);
  }

  .navbar:hover {
    opacity: 1;
  }

  .btn-navbar-link {
    border: none;
  }

  .navbar-brand {
    transition: 0.3s ease-in-out;
  }

  .navbar-brand:hover {
    filter: drop-shadow(0 0 9px rgba(255, 255, 255, 0.4));
  }

  .nav-link {
    color: rgb(200, 200, 200);
    font-weight: 400;
    text-underline-offset: 10px;
  }

  .nav-link:hover {
    color: white;
    text-decoration: underline;
    text-shadow: 0px 0px 5px rgba(255, 255, 255, 0.4);
  }

  .btn-engine {
    font-weight: 500;
  }

  .titlebar-button {
    display: inline-flex;
    background-color: transparent;
    justify-content: center;
    align-items: center;
    border: 0;
    opacity: 0.6;
  }

  .titlebar-button:hover {
    opacity: 1;
  }

  .titlebar-button > img {
    width: 30px;
    height: 30px;
  }

  #titlebar-minimize:hover {
    filter: drop-shadow(0 0 10px rgba(255, 196, 0, 0.6));
  }

  #titlebar-maximize:hover {
    filter: drop-shadow(0 0 10px rgba(0, 255, 195, 0.6));
  }

  #titlebar-close:hover {
    filter: drop-shadow(0 0 10px rgba(255, 37, 37, 0.6));
  }
</style>
