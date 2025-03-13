<script lang="ts">
  import type { GestureCondition } from "../../../../scripts/flow/attributes/condition/gestures";
  import { HANDEDNESS_NAMES, type HandednessID } from "../../../../scripts/utils/const";
  import GestureSelector, { type GestureSelectData } from "../../float/GestureSelector.svelte";

  let {
    raw_data,
    reactive_data,
    handedness,
  }: { raw_data: GestureCondition; reactive_data: GestureCondition; handedness: HandednessID } = $props();

  const select_data: GestureSelectData = $state({
    selecting: false,
    gesture: raw_data.name,
  });

  $effect(() => {
    raw_data.enable = reactive_data.enable;
    raw_data.name = reactive_data.name;
    reactive_data.name = select_data.gesture;
  });
</script>

<div class="gesture-select-box" style="position: relative;">
  <input class="form-check-input gesture-checkbox" type="checkbox" bind:checked={reactive_data.enable} />
  
  <button class="btn" class:faded={!reactive_data.enable} onclick={() => (select_data.selecting = !select_data.selecting)}>
    <img class="gesture-icon" src="imgs/hand/{HANDEDNESS_NAMES[handedness]}/{reactive_data.name}.svg" alt="Gesture" />
  </button>

  {#if select_data.selecting}
    <GestureSelector {select_data} {handedness} />
  {/if}
</div>
