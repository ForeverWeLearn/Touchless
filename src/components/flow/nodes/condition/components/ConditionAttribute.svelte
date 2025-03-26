<script lang="ts">
  import { ICON_PATHS } from "../../../../../types/core";
  import type { ConditionNodeData } from "../../../../../types/nodes";
  import Slider from "../../components/Slider.svelte";

  let { data }: { data: ConditionNodeData } = $props();
</script>

<div class="attr d-flex flex-column align-items-center gap-2 p-3 appear">
  <Slider name="Active Duration" icon={ICON_PATHS.HOURGLASS_TOP} min={0} max={60000} step={500} unit="ms" bind:value={data.duration}></Slider>
</div>
