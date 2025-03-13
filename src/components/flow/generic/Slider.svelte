<script lang="ts">
  let {
    name,
    min,
    max,
    step,
    unit,
    value = $bindable(),
  }: { name: string; min: number; max: number; step: number; unit: string; value: number } = $props();
</script>

<div class="d-flex flex-column">
  <div>{name}</div>

  <div class="d-flex align-items-center gap-1 nodrag">
    <div class="d-flex flex-fill">
      <input class="form-range" type="range" {min} {max} {step} bind:value />
    </div>
    <div class="d-flex flex-fill">
      <input class="form-control form-control-sm" type="number" {min} {max} {step} bind:value />
    </div>
    <div>{unit}</div>
  </div>
</div>
