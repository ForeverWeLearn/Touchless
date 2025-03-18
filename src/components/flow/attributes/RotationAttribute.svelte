<script lang="ts">
  import type { RotationConditionAttribute } from "../../../scripts/flow/attributes/condition/rotation";
  import Slider from "../generic/Slider.svelte";
  import Point from "../generic/Point.svelte";
  import AngleRange from "../generic/AngleRange.svelte";

  let { data }: { data: RotationConditionAttribute } = $props();
</script>

<div class="attr d-flex align-items-center gap-4 appear" class:attr-active={data.runtime.activated} class:faded={!data.enable}>
  <button class="btn btn-nbd text-start flex-fill nodrag" onclick={() => (data.enable = !data.enable)}>Rotation</button>

  <div class="d-flex align-items-center gap-3">
    <div class="d-flex align-items-center gap-4">
      <div class="d-flex align-items-center gap-1">
        <Point name="From" data={data.initial}></Point>
        <Point name="To" data={data.terminal}></Point>
      </div>

      <div class="d-flex flex-column gap-3">
        <AngleRange data={data.range}></AngleRange>
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
