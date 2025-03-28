<script lang="ts">
  import { HANDEDNESS_NAMES, ICON_PATHS, LANDMARK_NAMES } from "../../../../types/core";
  import type { Point } from "../../../../types/forms";
  import PointSelector from "./PointSelector.svelte";

  let { data, name }: { data: Point; name: string } = $props();

  let state = $state({ selecting: false });

  const POSITIONS = [
    { top: 84.8, left: 50 },
    { top: 76.2, left: 35.5 },
    { top: 63.6, left: 27 },
    { top: 53.4, left: 20.5 },
    { top: 44.1, left: 10.2 },
    { top: 43.7, left: 37.6 },
    { top: 33.7, left: 34.6 },
    { top: 24, left: 31.5 },
    { top: 15, left: 29 },
    { top: 42.7, left: 48.3 },
    { top: 30.7, left: 48.5 },
    { top: 20, left: 48.6 },
    { top: 9.7, left: 49.4 },
    { top: 46, left: 57.4 },
    { top: 34.7, left: 59.7 },
    { top: 25.2, left: 61.3 },
    { top: 14.8, left: 61.8 },
    { top: 51, left: 67 },
    { top: 45.9, left: 72.4 },
    { top: 40.6, left: 77.8 },
    { top: 33, left: 83 },
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
