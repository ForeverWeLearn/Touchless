<script lang="ts">
  import type { TaskNodeData } from "../../../../../types/nodes";
  import { ICON_PATHS } from "../../../../../types/core";
  import Slider from "../../components/Slider.svelte";

  let { data }: { data: TaskNodeData } = $props();
</script>

<div class="attr d-flex flex-column align-items-center gap-2 p-3 appear">
  <Slider
    name="Start delay"
    icon={ICON_PATHS.HISTORY}
    min={0}
    max={10000}
    step={100}
    unit="ms"
    bind:value={data.startDelay}
    editable={true}
    showvalue={true}
  ></Slider>
  <Slider
    name="Delay"
    icon={ICON_PATHS.TIMELAPSE}
    min={0}
    max={5000}
    step={50}
    unit="ms"
    bind:value={data.delay}
    editable={true}
    showvalue={true}
  ></Slider>
  <Slider
    name="Cooldown"
    icon={ICON_PATHS.HOURGLASS_TOP}
    min={0}
    max={10000}
    step={100}
    unit="ms"
    bind:value={data.cooldown}
    editable={true}
    showvalue={true}
  ></Slider>
</div>
