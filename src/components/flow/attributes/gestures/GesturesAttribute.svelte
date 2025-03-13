<script lang="ts">
  import { DEFAULT_ACTIVE_TIME } from "../../../../scripts/flow/attributes/condition";
  import type { GesturesConditionAttribute } from "../../../../scripts/flow/attributes/condition/gestures";
  import Slider from "../../generic/Slider.svelte";
  import Gesture from "./Gesture.svelte";

  let { raw_data, reactive_data }: { raw_data: GesturesConditionAttribute; reactive_data: GesturesConditionAttribute } =
    $props();
</script>

<div class="d-flex align-items-center gap-2">
  <div>Gestures</div>

  <div class="d-flex align-items-center gap-1">
    <Gesture raw_data={raw_data.gestures[0]} reactive_data={reactive_data.gestures[0]} handedness={0} />
    <Gesture raw_data={raw_data.gestures[1]} reactive_data={reactive_data.gestures[1]} handedness={1} />

    <Slider
      name="Hold"
      min={DEFAULT_ACTIVE_TIME.min}
      max={DEFAULT_ACTIVE_TIME.max}
      step={DEFAULT_ACTIVE_TIME.step}
      unit="ms"
      bind:value={reactive_data.active_time}
    />
  </div>

  <button class="btn" onclick={() => (reactive_data.enable = false)}>✕</button>
</div>
