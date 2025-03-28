<script lang="ts">
  let {
    name,
    icon,
    min,
    max,
    step,
    unit,
    value = $bindable(),
    editable = true,
    showvalue = true,
  }: {
    name: string;
    icon: string;
    min: number;
    max: number;
    step: number;
    unit: string;
    value: number;
    editable: boolean;
    showvalue: boolean;
  } = $props();

  $effect(() => {
    if (value < min) {
      value = min;
    }
    if (value > max) {
      value = max;
    }
  });

  let percent = $derived(((value - min) / (max - min)) * 100);
</script>

<div class="d-flex flex-fill flex-column nodrag" style="width: 100%; position: relative">
  <div class="spacer"></div>

  <div class="slider">
    <div class="fill" style="width: {percent}%"></div>
    <div class="d-flex align-items-center gap-2 ms-2 content">
      {#if icon}<img class="img-filter" src={icon} alt="" />{/if}
      <div class="name">
        {name}
      </div>
    </div>
  </div>

  {#if editable}
    <input class="form-range" type="range" {min} {max} {step} bind:value />
  {/if}

  {#if showvalue}
    <div class="d-flex gap-1" style="position: absolute; top: 0; right: 0.65rem; bottom: 0; display:flex; align-items:center">
      <input class="form-control input-slider" type="number" {min} {max} {step} bind:value />
      {#if unit}<span>{unit}</span>{/if}
    </div>
  {/if}
</div>

<style>
  span {
    font-size: 0.8rem;
    mix-blend-mode: difference;
  }

  img {
    mix-blend-mode: difference;
    transform: scale(0.8);
  }

  .content {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  .spacer {
    min-width: 12rem;
    width: 100%;
    height: 2rem;
  }

  .slider {
    position: absolute;
    padding: 2px;

    top: 0;
    left: 5px;
    right: 5px;
    bottom: 0;

    height: 100%;

    border: solid 1px #fff;
    border-radius: 5px;
  }

  .fill {
    width: 100%;
    height: 100%;
    border-radius: 3px;
    background-color: #fff;
  }

  .name {
    font-size: 0.8rem;
    mix-blend-mode: difference;
  }

  input[type="number"] {
    width: 4rem;
    padding: 0.1rem;

    text-align: center;

    mix-blend-mode: difference;
    background-color: transparent !important;

    font-size: 0.8rem;
    color: var(--fg-color-0) !important;
    border-radius: calc(var(--btn-border-radius) / 2);
  }

  input[type="number"]:focus {
    border-color: var(--fg-color-0);
    box-shadow: none;
  }

  input[type="range"] {
    appearance: none !important;
    overflow: hidden !important;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2.4rem;
  }

  input[type="range"]::-webkit-slider-runnable-track {
    height: 100%;
    background-color: #ffffff00;
  }

  input[type="range"]::-webkit-slider-thumb {
    height: 100%;
    opacity: 0;

    margin-top: 0px;
  }
</style>
