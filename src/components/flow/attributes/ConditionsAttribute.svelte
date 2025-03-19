<script lang="ts">
  import type { ConditionsNodeData } from "../../../scripts/flow/nodes/conditions";
  import Slider from "../generic/Slider.svelte";

  let { data }: { data: ConditionsNodeData } = $props();
</script>

<div class="attr d-flex align-items-center gap-4 appear" class:faded={!data.enable}>
  <button class="btn btn-nbd text-start flex-fill nodrag">Configs</button>

  <div class="d-flex align-items-center gap-3">
    <Slider name="Active Duration" min={0} max={60000} step={500} unit="ms" bind:value={data.duration}></Slider>

    <button class="btn btn-nbd" style="visibility: hidden;"> ✕ </button>
  </div>
</div>
