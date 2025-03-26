<script lang="ts">
  import { ICON_PATHS } from "../../../../../types/core";
  import type { GesturesCondition } from "../../../../../types/nodes";
  import Gesture from "../../components/Gesture.svelte";
  import Slider from "../../components/Slider.svelte";

  let { data }: { data: GesturesCondition } = $props();
</script>

<div class="d-flex align-items-center gap-4">
  <div class="d-flex align-items-center gap-1">
    <Gesture data={data.gestures[0]} handedness={0} />
    <Gesture data={data.gestures[1]} handedness={1} />
  </div>

  <Slider name="Hold" icon={ICON_PATHS.PAN_TOOL} min={0} max={5000} step={50} unit="ms" bind:value={data.time2active} />
</div>
