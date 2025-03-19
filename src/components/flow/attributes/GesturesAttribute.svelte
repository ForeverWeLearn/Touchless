<script lang="ts">
  import type { GesturesConditionAttribute } from "../../../scripts/flow/attributes/condition/gestures";
  import Gesture from "../generic/Gesture.svelte";
  import Slider from "../generic/Slider.svelte";

  let { data }: { data: GesturesConditionAttribute } = $props();
</script>

<div class="attr d-flex align-items-center gap-4 appear" class:attr-active={data.runtime.activated} class:faded={!data.enable}>
  <button class="btn btn-nbd text-start flex-fill nodrag" onclick={() => (data.enable = !data.enable)}>Gestures</button>

  <div class="d-flex align-items-center gap-3">
    <div class="d-flex align-items-center gap-4">
      <div class="d-flex align-items-center gap-1">
        <Gesture data={data.gestures[0]} handedness={0} />
        <Gesture data={data.gestures[1]} handedness={1} />
      </div>

      <Slider name="Hold" min={0} max={5000} step={50} unit="ms" bind:value={data.time2active} />
    </div>

    <button
      class="btn btn-nbd"
      onclick={() => {
        data.included = false;
        data.enable = false;
      }}
    >
      ✕
    </button>
  </div>
</div>
