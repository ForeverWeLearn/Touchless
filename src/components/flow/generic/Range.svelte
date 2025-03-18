<script lang="ts">
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

<div class="d-flex flex-fill flex-column nodrag">
  <div class="d-flex justify-content-between flex-fill">
    <div>{value1} {unit}</div>
    <div>{"<"}</div>
    <div>{"d"}</div>
    <div>{"<"}</div>
    <div>{value2} {unit}</div>
  </div>
  <input class="form-range" type="range" {min} {max} {step} bind:value={value1} />
  <input class="form-range" type="range" {min} {max} {step} bind:value={value2} />
</div>
