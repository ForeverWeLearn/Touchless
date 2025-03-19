<script lang="ts">
  import type { DistanceConditionAttribute } from "../../../scripts/flow/attributes/condition/distance";
  import Slider from "../generic/Slider.svelte";
  import Point from "../generic/Point.svelte";
  import Range from "../generic/Range.svelte";

  let { data }: { data: DistanceConditionAttribute } = $props();
</script>

<div
  class="attr d-flex align-items-center gap-4 appear"
  class:attr-active={data.runtime.activated}
  class:faded={!data.enable}
>
  <button class="btn btn-nbd text-start flex-fill nodrag" onclick={() => (data.enable = !data.enable)}>Distance</button>

  <div class="d-flex align-items-center gap-3">
    <div class="d-flex align-items-center gap-4">
      <div class="d-flex align-items-center gap-1">
        <Point name="From" data={data.initial}></Point>
        <Point name="To" data={data.terminal}></Point>
      </div>

      <div class="d-flex flex-column gap-3">
        <Range min={0} max={10} step={0.1} unit="hu" bind:value1={data.range.min} bind:value2={data.range.max}></Range>
        <Slider name="Hold" min={0} max={5000} step={50} unit="ms" bind:value={data.time2active} />
      </div>
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
