<script lang="ts">
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap/dist/js/bootstrap.min.js";

  import { getCurrentWindow } from "@tauri-apps/api/window";
  import { layoutStore, themeStore } from "../stores/appearance.svelte";
  import { handleKeyDown } from "../stores/user-key.svelte";
  import { engineStore } from "../stores/engine.svelte";
  import { windowSize } from "../stores/geometry.svelte";
  import { onMount } from "svelte";
  import { Engine } from "../scripts/engine.svelte";
  import Titlebar from "../components/Titlebar.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import Board from "../components/preview/Board.svelte";

  const appWindow = getCurrentWindow();

  const engine = new Engine();

  engineStore.engine = engine;

  let { children } = $props();

  let main: HTMLElement;

  appWindow.onResized(async ({ payload: size }) => {
    console.log("Window resized", size);

    if (!main) {
      return;
    }

    if (await appWindow.isMaximized()) {
      main.classList.remove("window-decoration");
    } else {
      main.classList.add("window-decoration");
    }
  });

  onMount(async () => {
    if (await appWindow.isMaximized()) {
      main.classList.remove("window-decoration");
    } else {
      main.classList.add("window-decoration");
    }
  });

  document.addEventListener("contextmenu", (event) => event.preventDefault());

  window.addEventListener("keydown", handleKeyDown);
</script>

<svelte:head>
  <link rel="stylesheet" href="css/main.css" />
  <link rel="stylesheet" href="css/layouts/{layoutStore.current}/layout.css" />
  <link rel="stylesheet" href="css/themes/{themeStore.current}/theme.css" />
</svelte:head>

<main
  class="window-decoration appear"
  bind:this={main}
  bind:clientWidth={windowSize.width}
  bind:clientHeight={windowSize.height}
>
  <div class="d-flex h-100" style="position: relative;">
    <Titlebar></Titlebar>

    <div class="d-flex sidebar-container" style="z-index: 9999;">
      <Sidebar></Sidebar>
    </div>

    <div class="d-flex flex-column flex-fill page-container">
      <Board></Board>
      {@render children()}
    </div>
  </div>
</main>
