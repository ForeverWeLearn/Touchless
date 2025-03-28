<script lang="ts">
  import { GESTURE_NAMES } from "../../../types/core";
  import menuStore from "../../../stores/flow/menu.svelte";
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="context-menu"
  style="
    top: {menuStore.gestureSelect.top}px; 
    left: {menuStore.gestureSelect.left}px; 
    right: {menuStore.gestureSelect.right}px; 
    bottom: {menuStore.gestureSelect.bottom}px"
  onclick={() => (menuStore.gestureSelect.show = false)}
>
  <div class="background"></div>

  <div class="context-menu-content p-4">
    <div class="gesture-select-overlay">
      <div class="h5 text-center mb-4">Select Hand Gesture</div>

      <div class="d-flex flex-wrap justify-content-between gap-3">
        {#each GESTURE_NAMES as gesture_name}
          <div class="d-flex flex-fill flex-column justify-content-center align-items-center gap-1">
            <button
              class="btn btn-gesture-selection"
              onclick={() => (menuStore.gestureSelect.gesture.name = gesture_name)}
            >
              <img
                class="img-filter gesture-icon-sm"
                class:flip-h={menuStore.gestureSelect.handedness == 0}
                src="imgs/gestures/{gesture_name}.svg"
                alt=""
              />
            </button>
            <div class="gesture-selection-name">{gesture_name}</div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>

<style>
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
