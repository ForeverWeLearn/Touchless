<script lang="ts">
  import { getCurrentWindow } from "@tauri-apps/api/window";

  import { titlebarBtnGroup } from "../stores/appearance.svelte";
  import { ICON_PATHS } from "../types/core";

  const appWindow = getCurrentWindow();
</script>

<div class="titlebar appear" data-tauri-drag-region>
  <div class="d-flex titlebar-btn-group gap-3 mt-3 me-4">
    <button
      id="titlebar-minimize"
      class="btn d-flex justify-content-center align-items-center btn-titlebar"
      onclick={() => appWindow.minimize()}
    >
      <img src="imgs/titlebar/{titlebarBtnGroup.current}/minimize.svg" alt="" />
      <img class="img-filter icon-overlay" src={ICON_PATHS.REMOVE} alt="" style="position: absolute;" />
    </button>
    <button
      id="titlebar-maximize"
      class="btn d-flex justify-content-center align-items-center btn-titlebar"
      onclick={() => appWindow.toggleMaximize()}
    >
      <img src="imgs/titlebar/{titlebarBtnGroup.current}/maximize.svg" alt="" />
      <img class="img-filter icon-overlay" src={ICON_PATHS.STOP} alt="" style="position: absolute;" />
    </button>
    <button
      id="titlebar-close"
      class="btn d-flex justify-content-center align-items-center btn-titlebar"
      onclick={() => appWindow.close()}
    >
      <img src="imgs/titlebar/{titlebarBtnGroup.current}/close.svg" alt="" />
      <img class="img-filter icon-overlay" src={ICON_PATHS.CLOSE} alt="" style="position: absolute;" />
    </button>
  </div>
</div>

<style>
  .titlebar {
    opacity: 0;
  }

  .icon-overlay {
    width: 40%;
  }
</style>
