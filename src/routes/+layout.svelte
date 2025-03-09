<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap/dist/js/bootstrap.min.js";

  import { engine_state } from "../stores/engine.svelte";
  import { Engine } from "../scripts/engine.svelte";
  import { theme } from "../stores/theme.svelte";
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
  <link rel="stylesheet" href="css/layouts/default.css" />
  <link rel="stylesheet" href="css/themes/{theme.default}.css" />
</svelte:head>

<Titlebar></Titlebar>

<div class="row h-100">
  <div class="col pe-0 col-sidebar">
    <Sidebar></Sidebar>
  </div>
  <div class="col ps-0" style="position: relative;">
    <Board></Board>
    {@render children()}
  </div>
</div>
