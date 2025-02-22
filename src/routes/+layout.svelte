<script>
  import Board from "../components/Board.svelte";
  import NavBar from "../components/NavBar.svelte";
  import { Engine } from "../scripts/engine";
  import { engine_state } from "../stores/engine_state";

  const engine = new Engine();

  let { children } = $props();

  engine_state.subscribe((state) => {
    engine.set_state(state);
  });

  document.addEventListener("contextmenu", (event) => event.preventDefault());
</script>

<img id="warmup" src="warmup.jpg" width="224" height="224" srcset="" alt="" />
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
