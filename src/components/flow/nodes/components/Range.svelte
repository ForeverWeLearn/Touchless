<script lang="ts">
  import { ICON_PATHS } from "../../../../types/core";
  import Slider from "./Slider.svelte";

  let {
    min,
    max,
    step,
    unit,
    value1 = $bindable(),
    value2 = $bindable(),
  }: { min: number; max: number; step: number; unit: string; value1: number; value2: number } = $props();

  $effect(() => {
    if (value1 > value2) {
      value2 = value1;
    }
  });
</script>

<div class="d-flex flex-fill flex-column gap-1 nodrag">
  <Slider
    name="Min"
    icon={ICON_PATHS.ALIGN_LEFT}
    {min}
    {max}
    {step}
    {unit}
    bind:value={value1}
    editable={true}
    showvalue={true}
  ></Slider>
  <Slider
    name="Max"
    icon={ICON_PATHS.ALIGN_RIGHT}
    {min}
    {max}
    {step}
    {unit}
    bind:value={value2}
    editable={true}
    showvalue={true}
  ></Slider>
</div>
