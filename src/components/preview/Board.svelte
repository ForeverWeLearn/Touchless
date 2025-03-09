<script>
  import { board_state } from "../../stores/board.svelte";
  import HandStatistic from "./HandStatistic.svelte";
</script>

<div class="d-flex flex-column justify-content-center align-items-center board {board_state.show ? 'show' : 'hide'}">

  <div class="d-flex flex-column justify-content-center align-items-center board-content">
    <div class="h1 mb-5">PREVIEW</div>
    <div class="board-visualize d-flex justify-content-center align-items-center">
      <HandStatistic handedness={0}></HandStatistic>
      <div class="video-container">
        <div class="d-flex flex-column align-items-center justify-content-center w-100 placehold">
          <div class="h5 fw-light mb-3">There is nothing here...</div>
          <div>o(*￣▽￣*)ブ</div>
          <div class="h5 fw-light mt-3">Press the 'Start' button?!</div>
        </div>
        <!-- svelte-ignore a11y_media_has_caption -->
        <video id="webcam" autoplay playsinline></video>
        <canvas id="webcam-overlay"></canvas>
      </div>
      <HandStatistic handedness={1}></HandStatistic>
    </div>
  </div>

</div>

<style>
  .show {
    margin-top: 0;
  }

  .hide {
    margin-top: -100vh;
  }

  .board {
    position: absolute;
    z-index: 998;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    backdrop-filter: blur(5px);
  }

  .board-content {
    width: 90%;
    padding: 24px;
    background-color: #0f0f0f;
  }

  .board-visualize {
    width: 100%;
  }

  .video-container {
    position: relative;
    margin-left: 2em;
    margin-right: 2em;
    width: 100%;
    aspect-ratio: 1.6;
    background-color: rgb(0, 0, 0);
  }

  .placehold {
    font-size: 3em;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    aspect-ratio: 1.6;
    margin: auto;
  }

  video {
    display: block;
    transform: rotateY(180deg);
  }

  video,
  canvas {
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }

  video,
  canvas,
  .placehold {
    max-width: 640px;
    max-height: 480px;
  }
</style>
