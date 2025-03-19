<script lang="ts">
  let {
    name,
    min,
    max,
    step,
    unit,
    value = $bindable(),
  }: { name: string; min: number; max: number; step: number; unit: string; value: number } = $props();

  function nextStep(b: number) {
    return value + b * step - ((value + b * step) % step);
  }

  $effect(() => {
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
  });
</script>

<div class="d-flex flex-fill flex-column">
  <div class="d-flex align-items-center gap-1 nodrag">
    <div class="d-flex flex-column">
      <div class="d-flex align-items-center gap-3">
        <div class="flex-fill">{name}</div>
        
        <div class="d-flex align-items-center gap-1">
          <div class="d-flex align-items-center" style="position: relative;">
            <button class="btn btn-increment" onclick={() => (value = nextStep(-1))}>
              <img src="imgs/svg/remove.svg" alt="Decrease" />
            </button>

            <input class="form-control input-slider" style="width: 6rem;" type="number" {min} {max} {step} bind:value />

            <button class="btn btn-increment" onclick={() => (value = nextStep(1))} style="right: 0;">
              <img src="imgs/svg/add.svg" alt="Increase" />
            </button>
          </div>
          <div>{unit}</div>
        </div>
      </div>
      <input class="form-range" type="range" {min} {max} {step} bind:value />
    </div>
  </div>
</div>
