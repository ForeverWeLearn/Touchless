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
  
  :global {
    @font-face {
      font-family: Lexend;
      src: url(../fonts/Lexend.ttf);
    }

    @font-face {
      font-family: MartianMono;
      src: url(../fonts/MartianMono.ttf);
    }

    @font-face {
      font-family: Tektur;
      src: url(../fonts/Tektur.ttf);
    }

    ::-webkit-scrollbar {
      display: none;
    }

    html,
    body {
      background-color: #191919;
      user-select: none;
      font-family: Lexend !important;
      overflow: hidden;
    }

    img {
      pointer-events: none;
    }

    a {
      -webkit-user-drag: none;
    }

    select {
      cursor: pointer;
    }

    .disabled {
      pointer-events: none;
      opacity: 0.4;
    }

    .faded {
      opacity: 0.4;
    }

    /* .container {
      border: solid #ddd !important;
      border-radius: 10px !important;
      background-color: #fefefe !important;
    }

    .row .col {
      border: solid #ddd !important;
      border-radius: 6px !important;
    } */

    .node-container {
      border: solid;
      border-color: #0d6efd;
      border-radius: 9px;
      background-color: white;
    }

    .node-container-active {
      border-color: #0d6efd !important;
      border-width: 4px;
      background-color: #e3eeff !important;
    }

    .node-container-disabled {
      border-color: #00027335 !important;
    }

    .root-node-container {
      width: 200px !important;
    }

    .gesture-node-container {
      width: 440px !important;
    }

    .distance-node-container {
      width: 440px !important;
    }

    .task-node-container {
      width: 200px !important;
    }

    .context-menu {
      width: 160px;
      background-color: white;
      border: solid;
      border-width: 1px;
      border-color: #0a58ca;
      border-radius: 5px;
      position: absolute;
      z-index: 10;
      box-shadow: 0px 0px 7px #03002c4f;
    }

    .context-menu .btn {
      border: none;
      border-radius: 0;
      display: block;
      padding: 0.5em;
      text-align: left;
      width: 100%;
    }

    .context-menu .btn-first {
      border-top-left-radius: 3px !important;
      border-top-right-radius: 3px !important;
    }

    .context-menu .btn-last {
      border-bottom-left-radius: 3px !important;
      border-bottom-right-radius: 3px !important;
    }
  }
</style>
