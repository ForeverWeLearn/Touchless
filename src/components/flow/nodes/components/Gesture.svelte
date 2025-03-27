<script lang="ts">
  import type { GestureCondition } from "../../../../types/nodes";
  import type { HandednessID } from "../../../../types/core";
  import GestureSelector from "./GestureSelector.svelte";

  let { data, handedness }: { data: GestureCondition; handedness: HandednessID } = $props();

  let selecting = $state(false);

  $effect(() => {
    $state.snapshot(data.name);
    selecting = false;
  });
</script>

<div class="select-box gesture-select-box" style="position: relative;">
  <input class="form-check-input gesture-checkbox" type="checkbox" bind:checked={data.enable} />

  <button class="btn btn-nbd" class:faded={!data.enable} onclick={() => (selecting = !selecting)}>
    <img class="img-filter gesture-icon" class:flip-h={handedness == 0} src="imgs/gestures/{data.name}.svg" alt="Gesture" />
  </button>

  {#if selecting}
    <GestureSelector {data} {handedness} />
  {/if}
</div>
