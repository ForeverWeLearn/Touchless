<script lang="ts">
  import { board_state } from "../stores/board_state.svelte";
  import Hand from "./Hand.svelte";
</script>

<div data-tauri-drag-region class="debug-container {board_state.show ? 'show' : 'hide'}">
  <Hand handedness="Left"></Hand>
  <div class="video-container">
    <!-- svelte-ignore a11y_media_has_caption -->
    <video width="640" height="480" id="webcam" autoplay playsinline></video>
    <canvas width="640" height="480" id="webcam-overlay"></canvas>
  </div>
  <Hand handedness="Right"></Hand>
</div>

<style>
  .show {
    margin-top: 0;
  }

  .hide {
    margin-top: -100vh;
  }

  .debug-container {
    z-index: 998;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100vw;
    height: 100vh;
    background-color: #191919;
  }

  .video-container {
    position: relative;
    margin-top: 60px;
    width: 640px;
    height: 480px;
  }

  video {
    transform: rotateY(180deg);
  }

  video,
  canvas {
    position: absolute;
    top: 0;
    left: 0;
  }
</style>
