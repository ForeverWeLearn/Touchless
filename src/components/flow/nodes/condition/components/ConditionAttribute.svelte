<script lang="ts">
  import { ICON_PATHS } from "../../../../../types/core";
  import type { ConditionNodeData } from "../../../../../types/nodes";
  import Slider from "../../components/Slider.svelte";

  let { data }: { data: ConditionNodeData } = $props();
</script>

<div class="attr d-flex flex-column align-items-center gap-2 p-3 appear">
  <Slider
    name="Hold"
    icon={ICON_PATHS.TIMELAPSE}
    min={0}
    max={5000}
    step={50}
    unit="ms"
    bind:value={data.hold}
    editable={true}
    showvalue={true}
  ></Slider>
  <Slider
    name="Duration"
    icon={ICON_PATHS.HOURGLASS_TOP}
    min={0}
    max={20000}
    step={200}
    unit="ms"
    bind:value={data.duration}
    editable={true}
    showvalue={true}
  ></Slider>
</div>
