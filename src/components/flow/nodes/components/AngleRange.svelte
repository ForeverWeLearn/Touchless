<script lang="ts">
  import { ICON_PATHS } from "../../../../types/core";
  import type { AngleRange } from "../../../../types/forms";
  import Slider from "./Slider.svelte";

  let { data }: { data: AngleRange } = $props();

  let pieChart: HTMLElement;

  const updatePieChart = () => {
    let angle = 90 - data.angle;
    if (angle < 0) {
      angle += 360;
    }

    const spread_percent = (data.spread / 360) * 100;

    pieChart.style.rotate = `${angle}deg`;
    pieChart.style.background = `conic-gradient(
        var(--fg-color-2) 0% ${spread_percent}%,
        var(--bg-color-2) ${spread_percent}% ${100 - spread_percent}%,
        var(--fg-color-2) ${100 - spread_percent}% 100%)`;
  };

  $effect(() => {
    updatePieChart();
  });
</script>

<div class="d-flex gap-4">
  <div class="d-flex flex-column justify-content-center gap-1">
    <Slider name="Angle" icon={ICON_PATHS.A360} min={0} max={360} step={5} unit="deg" bind:value={data.angle}></Slider>
    <Slider name="Spread" icon={ICON_PATHS.ARROW_RANGE} min={0} max={180} step={5} unit="deg" bind:value={data.spread}
    ></Slider>
  </div>

  <div class="board">
    <div class="pie-chart" bind:this={pieChart}></div>

    <div class="axis-x"></div>
    <div class="axis-y"></div>
    <div class="deg deg0">0</div>
    <div class="deg deg90">90</div>
    <div class="deg deg180">180</div>
    <div class="deg deg270">270</div>
  </div>
</div>

<style>
  .deg {
    position: absolute;
    font-size: 0.5rem;
  }

  .deg0 {
    top: calc(50% - 0.4rem);
    right: -0.5rem;
  }

  .deg90 {
    top: -0.75rem;
    left: calc(50% - 0.3rem);
  }

  .deg180 {
    top: calc(50% - 0.4rem);
    left: -1rem;
  }

  .deg270 {
    left: calc(50% - 0.4rem);
    bottom: -0.75rem;
  }

  .axis-x {
    position: absolute;
    top: calc(50% - 1px);
    left: 0;
    right: 0;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .axis-y {
    position: absolute;
    left: calc(50% - 1px);
    top: 0;
    bottom: 0px;
    width: 2px;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .board {
    position: relative;
    height: 10%;
  }

  .pie-chart {
    width: 4rem;
    aspect-ratio: 1;
    border-radius: 50%;
    background: conic-gradient(#3498db 0% 70%, #2ecc71 70% 100%);
    box-shadow: 0 0 3px var(--fg-color-2);
    border-width: 2px;
    border-color: #3498db;
  }

  .pie-chart::before {
    position: absolute;
    top: 5%;
    left: 47.5%;
    width: 5%;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: var(--bg-color-2);
    content: "";
  }
</style>
