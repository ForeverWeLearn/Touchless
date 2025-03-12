<script lang="ts">
  import type { GesturesConditionAttribute } from "../../../scripts/flow/attributes/condition/gestures";

  let {
    name,
    min,
    max,
    step,
    unit,
    reactive_data,
  }: { name: string; min: number; max: number; step: number; unit: string; reactive_data: GesturesConditionAttribute } =
    $props();
</script>

<div class="d-flex flex-column">
  <div>{name}</div>

  <div class="d-flex align-items-center gap-1 nodrag">
    <div class="d-flex flex-fill">
      <input class="form-range" type="range" {min} {max} {step} bind:value={reactive_data.active_time} />
    </div>
    <div class="d-flex flex-fill">
      <input
        class="form-control form-control-sm"
        type="number"
        {min}
        {max}
        {step}
        bind:value={reactive_data.active_time}
      />
    </div>
    <div>{unit}</div>
  </div>
</div>
