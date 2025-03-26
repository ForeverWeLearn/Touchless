<script lang="ts">
  import type { DistanceCondition } from "../../../../../types/nodes";
  import Slider from "../../components/Slider.svelte";
  import Point from "../../components/Point.svelte";
  import Range from "../../components/Range.svelte";
  import { ICON_PATHS } from "../../../../../types/core";

  let { data }: { data: DistanceCondition } = $props();
</script>

<div class="d-flex align-items-center gap-4">
  <div class="d-flex align-items-center gap-1">
    <Point name="From" data={data.initial}></Point>
    <Point name="To" data={data.terminal}></Point>
  </div>

  <div class="d-flex flex-column gap-3">
    <Range min={0} max={10} step={0.1} unit="hu" bind:value1={data.range.min} bind:value2={data.range.max}></Range>
    <Slider name="Hold" icon={ICON_PATHS.PAN_TOOL} min={0} max={5000} step={50} unit="ms" bind:value={data.time2active} />
  </div>
</div>
