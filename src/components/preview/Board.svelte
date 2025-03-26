<script lang="ts">
  import { boardState } from "../../stores/board.svelte";
  import { engineState } from "../../stores/engine.svelte";
  import { ICON_PATHS } from "../../types/core";
  import HandStatistic from "./HandStatistic.svelte";
</script>

<div class="d-flex justify-content-center mt-2 board" class:hide={!boardState.show}>
  <div class="d-flex gap-3 px-3 content">
    <div class="info">
      {engineState.running ? `FPS: ${engineState.fps}` : ""}
    </div>

    <HandStatistic handedness={0}></HandStatistic>

    <div class="video-container">
      <div class="d-flex align-items-center justify-content-center placehold">
        <img class="img-filter" src={ICON_PATHS.PLAY_ARROW} alt="" style="height: 80%;" />
      </div>

      <!-- svelte-ignore a11y_media_has_caption -->
      <video id="webcam" autoplay playsinline></video>
      <canvas id="webcam-overlay"></canvas>
    </div>

    <HandStatistic handedness={1}></HandStatistic>
  </div>
</div>

<style>
  .content {
    background-color: var(--bg-color-1);
    border-style: solid;
    border-color: var(--bg-color-2);
    border-width: var(--btn-border-width);
    border-radius: calc(var(--btn-border-radius) * 0.6);
  }

  .info {
    font-family: var(--font-family-mono);
    color: var(--fg-color-1);
    position: absolute;
    top: 0.4rem;
    left: 0.6rem;
  }

  .hide {
    top: -110% !important;
  }

  .board {
    pointer-events: none;

    position: absolute;
    z-index: 998;

    height: 16rem;

    top: 0;
    left: 0;
    right: 0;

    transition: top 0.3s ease;
  }

  .video-container {
    position: relative;
    width: 100%;
    aspect-ratio: 1.8;
    background-color: var(--bg-color-2);
  }

  .placehold {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    opacity: 0.1;
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
    max-height: 100%;
  }
</style>
