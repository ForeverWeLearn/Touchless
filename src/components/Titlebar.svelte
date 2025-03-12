<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";

  const appWindow = getCurrentWindow();
</script>

<div class="titlebar" data-tauri-drag-region>
  <div class="d-flex titlebar-btn-group">
    <button
      id="titlebar-minimize"
      class="btn d-flex justify-content-center align-items-center btn-titlebar"
      onclick={() => appWindow.minimize()}
    >
      <img src="imgs/titlebar/circle/minimize.svg" alt="Minimize" />
    </button>
    <button
      id="titlebar-maximize"
      class="btn d-flex justify-content-center align-items-center btn-titlebar"
      onclick={() => appWindow.toggleMaximize()}
    >
      <img src="imgs/titlebar/circle/maximize.svg" alt="Maximize" />
    </button>
    <button
      id="titlebar-close"
      class="btn d-flex justify-content-center align-items-center btn-titlebar"
      onclick={() => appWindow.close()}
    >
      <img src="imgs/titlebar/circle/close.svg" alt="Close" />
    </button>
  </div>
</div>
