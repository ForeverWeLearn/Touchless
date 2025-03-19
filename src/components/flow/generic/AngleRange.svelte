<script lang="ts">
  import type { AngleRange } from "../../../scripts/flow/generic/range";

  let { data }: { data: AngleRange } = $props();

  let pieChart: HTMLElement;

  const updatePieChart = () => {
    let angle = 90 - data.angle;
    if (angle < 0) {
      angle += 360;
    }

    const spread_percent = (data.spread / 360) * 100;

    pieChart.style.rotate = `${angle - data.spread}deg`;
    pieChart.style.background = `conic-gradient(
        var(--color) 0% ${spread_percent * 2}%,
        var(--bg-color) ${spread_percent * 2}% 100%)`;
  };

  $effect(() => {
    updatePieChart();
  });
</script>

<div class="d-flex gap-4">
  <div class="d-flex flex-column justify-content-center">
    <input class="form-range nodrag" type="range" bind:value={data.angle} max="360" />
    <input class="form-range nodrag" type="range" bind:value={data.spread} min="1" max="179" />
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

  input[type="range"] {
    max-width: 4.5rem;
  }

  .axis-x {
    position: absolute;
    top: calc(50% - 1px);
    left: 0;
    width: 100%;
    height: 2px;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .axis-y {
    position: absolute;
    left: calc(50% - 1px);
    top: 0;
    width: 2px;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
  }

  .board {
    position: relative;
  }

  .pie-chart {
    width: 4rem;
    aspect-ratio: 1;
    border-radius: 50%;
    background: conic-gradient(#3498db 0% 70%, #2ecc71 70% 100%);
    box-shadow: 0 0 3px aliceblue;
    border-width: 2px;
    border-color: #3498db;
  }

  .pie-chart::before {
    position: absolute;
    top: 5%;
    left: 40%;
    width: 5%;
    aspect-ratio: 1;
    border-radius: 50%;
    background-color: #ffffff;
    content: "";
  }
</style>
