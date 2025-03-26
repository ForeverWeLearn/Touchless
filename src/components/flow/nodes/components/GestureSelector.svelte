<script lang="ts">
  import type { GestureCondition } from "../../../../types/nodes";
  import { GESTURE_NAMES, HANDEDNESS_NAMES, type HandednessID } from "../../../../types/core";

  let { data, handedness }: { data: GestureCondition; handedness: HandednessID } = $props();
</script>

<div class="background nodrag"></div>

<div class="gesture-select-overlay">
  <div class="h5 text-center mb-4">{HANDEDNESS_NAMES[handedness]} Hand Gesture</div>

  <div class="d-flex flex-wrap justify-content-between gap-3">
    {#each GESTURE_NAMES as gesture_name}
      <div class="d-flex flex-fill flex-column justify-content-center align-items-center gap-1">
        <button class="btn btn-gesture-selection" onclick={() => (data.name = gesture_name)}>
          <img class="gesture-icon-sm" class:flip-h={handedness == 0} src="imgs/gestures/{gesture_name}.svg" alt="" />
        </button>
        <div class="gesture-selection-name">{gesture_name}</div>
      </div>
    {/each}
  </div>
</div>

<style>
  .gesture-select-overlay {
    position: absolute;
    top: -0.2rem;
    left: calc(100% + 0.2rem);
    width: 20rem;
    padding: 1rem;
    border: solid 1px var(--fg-color-2);
    border-radius: 0.5rem;
    background-color: var(--bg-color-2);
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
</style>
