<script lang="ts">
  import { HANDEDNESS_NAMES, ICON_PATHS, LANDMARK_NAMES } from "../../../../types/core";
  import type { Point } from "../../../../types/forms";
  import PointSelector from "./PointSelector.svelte";

  let { data, name }: { data: Point; name: string } = $props();

  let state = $state({ selecting: false });

  const POSITIONS = [
    { top: 84.8, left: 50 },
    { top: 78.2, left: 33.5 },
    { top: 64, left: 24.6 },
    { top: 53.4, left: 17.5 },
    { top: 43.1, left: 7.2 },
    { top: 41.7, left: 36 },
    { top: 30.7, left: 33 },
    { top: 20, left: 29.7 },
    { top: 15, left: 29 },
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

<div class="d-flex flex-column select-box point-select-box nodrag" style="position: relative;">
  {#if state.selecting}
    <PointSelector {data} {state} />
  {/if}

  <button
    class="btn btn-nbd d-flex flex-column align-items-center"
    style="padding: 0rem !important;"
    onclick={() => (state.selecting = !state.selecting)}
  >
    <div class="hand-landmark" class:flip-h={data.handedness == 0} style="position: relative;">
      <div class="marker" style="left: {POSITIONS[data.landmark].left}%; top: {POSITIONS[data.landmark].top}%"></div>
      <img class="img-filter" src={ICON_PATHS.HAND_LANDMARKS} alt="Landmarks" />
    </div>

    <div class="landmark-name">
      <div>
        {name}
      </div>
      <strong>{LANDMARK_NAMES[data.landmark]}</strong>
    </div>
  </button>

  <button class="btn btn-nbd" onclick={() => (data.handedness = data.handedness == 0 ? 1 : 0)}
    >{HANDEDNESS_NAMES[data.handedness]}</button
  >
</div>

<style>
  .point-select-box > button {
    padding: 0;
  }

  .landmark-name {
    font-size: 0.5rem;
  }

  img {
    width: 100%;
    padding: 10%;
  }
</style>
