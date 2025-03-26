<script lang="ts">
  import { ICON_PATHS } from "../../../../../types/core";
  import type { TaskNodeData } from "../../../../../types/nodes";
  import Slider from "../../components/Slider.svelte";

  let { data }: { data: TaskNodeData } = $props();
</script>

<div class="attr d-flex flex-column align-items-center gap-2 p-3 appear">
  <Slider name="Start delay" icon={ICON_PATHS.HISTORY} min={0} max={60000} step={500} unit="ms" bind:value={data.startDelay}></Slider>
  <Slider name="Delay" icon={ICON_PATHS.TIMELAPSE} min={0} max={60000} step={500} unit="ms" bind:value={data.delay}></Slider>
  <Slider name="Cooldown" icon={ICON_PATHS.HOURGLASS_TOP} min={0} max={60000} step={500} unit="ms" bind:value={data.cooldown}></Slider>
</div>
