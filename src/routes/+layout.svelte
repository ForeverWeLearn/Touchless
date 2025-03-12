<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap/dist/js/bootstrap.min.js";

  import { engine_state } from "../stores/engine.svelte";
  import { Engine } from "../scripts/engine.svelte";
  import { layout, theme } from "../stores/appearance.svelte";
  import Titlebar from "../components/Titlebar.svelte";
  import Sidebar from "../components/Sidebar.svelte";
  import Board from "../components/preview/Board.svelte";

  const engine = new Engine();

  let { children } = $props();

  $effect(() => {
    engine.set_state(engine_state.running);
  });

  document.addEventListener("contextmenu", (event) => event.preventDefault());
</script>

<svelte:head>
  <link rel="stylesheet" href="css/main.css" />
  <link rel="stylesheet" href="css/layouts/{layout.default}/layout.css" />
  <link rel="stylesheet" href="css/themes/{theme.default}/theme.css" />
</svelte:head>

<Titlebar></Titlebar>

<div class="d-flex h-100">
  <div class="d-flex sidebar-container" style="z-index: 10000;">
    <Sidebar></Sidebar>
  </div>

  <div class="d-flex flex-column flex-fill" style="position: relative;">
    <Board></Board>
    {@render children()}
  </div>
</div>

<style>
  .sidebar-container {
    padding: 1rem;
  }
</style>