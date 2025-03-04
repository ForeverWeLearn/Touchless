<script>
  import "bootstrap/dist/css/bootstrap.min.css";
  import "bootstrap/dist/js/bootstrap.min.js";

  import { Engine } from "../scripts/engine.svelte";
  import NavBar from "../components/NavBar.svelte";
  import Board from "../components/Board.svelte";

  const engine = new Engine();

  let { children } = $props();

  document.addEventListener("contextmenu", (event) => event.preventDefault());
</script>

<img id="warmup" src="imgs/warmup.jpg" width="224" height="224" srcset="" alt="" />
<Board />
<NavBar />

{@render children()}

<style>
  #warmup {
    position: absolute;
    top: -300px;
    left: -300px;
  }
</style>
