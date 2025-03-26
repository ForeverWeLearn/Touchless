<script lang="ts">
  import { ICON_PATHS, type LandmarkID } from "../../../../types/core";
  import type { Point } from "../../../../types/forms";

  let { data, state }: { data: Point; state: { selecting: boolean } } = $props();

  const POSITIONS = [
    { top: 86.8, left: 50 },
    { top: 78.2, left: 33.5 },
    { top: 64, left: 24.6 },
    { top: 53.4, left: 17.5 },
    { top: 43.1, left: 7.2 },
    { top: 41.7, left: 36 },
    { top: 30.7, left: 33 },
    { top: 20, left: 29.7 },
    { top: 9, left: 26 },
    { top: 40.7, left: 48.3 },
    { top: 28.7, left: 48.5 },
    { top: 14, left: 48.6 },
    { top: 2.7, left: 49.4 },
    { top: 44, left: 58.4 },
    { top: 31.7, left: 61 },
    { top: 20.2, left: 62.3 },
    { top: 8.8, left: 63.8 },
    { top: 51, left: 69 },
    { top: 43.9, left: 76.4 },
    { top: 38.6, left: 80.8 },
    { top: 30, left: 86 },
  ];
</script>

<div class="background" onclick={() => (state.selecting = false)}></div>

<div class="gesture-select-overlay">
  <div class="h5 text-center mb-4">Select Point</div>

  <div class="nodrag" class:flip-h={data.handedness == 0} style="position: relative;">
    <img class="gesture-icon" src={ICON_PATHS.HAND_LANDMARKS} alt="Landmarks" />

    <div class="landmarks">
      {#each POSITIONS as position, i}
        <div class="point-container nodrag" style="top: {position.top}%; left: {position.left}%">
          <input
            class="form-check-input"
            type="radio"
            name="radio-{data.handedness}"
            id="radio-{data.handedness}-{i}"
            checked={data.landmark == i}
            onclick={() => (data.landmark = i as LandmarkID)}
          />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .landmarks {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .gesture-select-overlay {
    position: absolute;
    top: -0.2rem;
    left: calc(100% + 0.2rem);
    width: 20rem;
    padding: 1rem;
    border: solid 1px var(--fg-color-2);
    border-radius: 0.5rem;
    background-color: rgb(26, 26, 26);
    backdrop-filter: blur(5px);
    z-index: 999;
  }

  .background {
    background-color: rgba(0, 0, 0, 0.8);
    position: absolute;
    top: -5000px;
    left: -5000px;
    width: 10000px;
    height: 10000px;
    z-index: -1;
  }

  img {
    width: 100%;
    padding: 5%;
  }
</style>
