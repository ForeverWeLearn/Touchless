<script lang="ts">
  import { boardState } from "../../stores/board.svelte";
  import { engineState } from "../../stores/engine.svelte";
  import { ICON_PATHS } from "../../types/core";
  import HandStatistic from "./HandStatistic.svelte";
</script>

<div class="d-flex justify-content-center board {boardState.show ? 'show' : 'hide'}">
  <div class="d-flex board-content">
    <div class="d-flex board-visualize px-3">
      <div class="info">
        {engineState.running ? `FPS: ${engineState.fps}` : ""}
      </div>

      <HandStatistic handedness={0}></HandStatistic>

      <div class="video-container mx-5">
        <div class="d-flex align-items-center justify-content-center placehold" style="opacity: 0.1;">
          <img src={ICON_PATHS.PLAY_ARROW} alt="" style="height: 80%;" />
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
  .info {
    font-family: MartianMono;
    color: var(--color-secondary);
    position: absolute;
    top: 0.4rem;
    left: 0.6rem;
  }

  .show {
    margin-top: 0;
  }

  .hide {
    margin-top: -100vh;
  }

  .board {
    pointer-events: none;
    position: absolute;
    z-index: 998;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    transition: margin-top 0.3s ease;
  }

  .board-content {
    position: relative;
    max-height: 16rem;
    aspect-ratio: 1.6;
    padding: 0.4rem;
    background-color: var(--bg-color-dim);
    border-bottom-left-radius: var(--window-border-radius);
    border-bottom-right-radius: var(--window-border-radius);
  }

  .board-visualize {
    width: 100%;
  }

  .video-container {
    position: relative;
    width: 100%;
    aspect-ratio: 1.6;
    background-color: var(--bg-color);
  }

  .placehold {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
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
    max-height: 100%;
  }
</style>
