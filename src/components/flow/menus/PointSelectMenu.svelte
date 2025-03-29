<script lang="ts">
  import { ICON_PATHS, type LandmarkID } from "../../../types/core";
  import menuStore from "../../../stores/flow/menu.svelte";

  const POSITIONS = [
    { top: 92, left: 51 },
    { top: 81.2, left: 32.5 },
    { top: 66, left: 22.6 },
    { top: 54.4, left: 14.5 },
    { top: 43.1, left: 3.2 },
    { top: 41.7, left: 36 },
    { top: 29.7, left: 32 },
    { top: 17, left: 27.7 },
    { top: 6, left: 24.6 },
    { top: 40.7, left: 48.3 },
    { top: 26.7, left: 49.5 },
    { top: 13, left: 49.4 },
    { top: 0, left: 50.4 },
    { top: 44, left: 59.4 },
    { top: 30.7, left: 63 },
    { top: 18.2, left: 64.3 },
    { top: 5.8, left: 65.8 },
    { top: 53, left: 71.4 },
    { top: 43.9, left: 80.4 },
    { top: 36.6, left: 85.8 },
    { top: 28, left: 92 },
  ];
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="context-menu"
  style="
    top: {menuStore.pointSelect.top}px; 
    left: {menuStore.pointSelect.left}px; 
    right: {menuStore.pointSelect.right}px; 
    bottom: {menuStore.pointSelect.bottom}px"
  onclick={() => (menuStore.pointSelect.show = false)}
>
  <div class="background"></div>

  <div class="context-menu-content p-4">
    <div class="h6 text-center mb-4">Select Keypoint</div>

    <div class:flip-h={menuStore.pointSelect.data.handedness == 0} style="position: relative;">
      <img class="img-filter gesture-icon" src={ICON_PATHS.HAND_LANDMARKS} alt="Landmarks" />

      <div class="landmarks">
        {#each POSITIONS as position, i}
          <div class="point-container nodrag" style="top: {position.top}%; left: {position.left}%">
            <input
              class="form-check-input"
              type="radio"
              name="radio-{menuStore.pointSelect.data.handedness}"
              id="radio-{menuStore.pointSelect.data.handedness}-{i}"
              checked={menuStore.pointSelect.data.landmark == i}
              onclick={() => (menuStore.pointSelect.data.landmark = i as LandmarkID)}
            />
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
  input[type="radio"] {
    transform: scale(1.6);
  }

  .context-menu {
    max-width: 400px;
  }

  .background {
    background-color: rgba(0, 0, 0, 0.394);
    position: absolute;
    top: -5000px;
    left: -5000px;
    width: 10000px;
    height: 10000px;
    z-index: -1;
  }
</style>
