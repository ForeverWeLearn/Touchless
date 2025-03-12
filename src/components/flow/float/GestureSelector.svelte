<script lang="ts">
  import { GESTURE_NAMES, HANDEDNESS_NAMES, type GestureName, type HandednessID } from "../../../scripts/utils/const";

  export type GestureSelectData = {
    selecting: boolean;
    gesture: GestureName;
  };

  let {
    select_data,
    handedness,
  }: {
    select_data: GestureSelectData;
    handedness: HandednessID;
  } = $props();
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="background nodrag" onclick={() => (select_data.selecting = false)}></div>
<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="gesture-select-overlay">

  <div class="h5 text-center mb-4">{HANDEDNESS_NAMES[handedness]} Hand Gesture</div>

  <div class="d-flex flex-wrap justify-content-between gap-3">
    {#each GESTURE_NAMES as gesture_name}
      <div class="d-flex flex-fill flex-column justify-content-center align-items-center gap-1">
        <button
          class="btn btn-gesture-selection"
          onclick={() => {
            select_data.gesture = gesture_name;
            select_data.selecting = false;
          }}
        >
          <img
            class="gesture-icon-sm"
            src="imgs/hand/{HANDEDNESS_NAMES[handedness]}/{gesture_name}.svg"
            alt="Gesture"
          />
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
    border: solid 1px aliceblue;
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
</style>
