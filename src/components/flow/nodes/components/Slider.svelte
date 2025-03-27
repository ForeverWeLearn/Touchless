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
        {name}{#if unit}<small>({unit})</small>{/if}
      </div>
    </div>
  </div>

  {#if editable}
    <input class="form-range" type="range" {min} {max} {step} bind:value />
  {/if}

  {#if showvalue}
    <div style="position: absolute; top: 0; right: 0; bottom: 0; display:flex; align-items:center">
      <input class="form-control input-slider" type="number" {min} {max} {step} bind:value />
    </div>
  {/if}
</div>

<style>
  small {
    font-family: MartianMono;
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
    position: absolute;
    right: 0.5rem;
    width: 4rem;
    padding: 0;
    margin-right: 0.4rem;

    mix-blend-mode: difference;
    background-color: var(--bg-color-4) !important;

    font-size: 0.8rem;
    /* border: none; */
    outline: none;
  }

  input[type="number"]:focus {
    /* border: none; */
    border-color: var(--fg-color-0);
    outline: none;
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
