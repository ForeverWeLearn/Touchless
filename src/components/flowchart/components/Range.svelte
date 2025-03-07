<script lang="ts">
  import type { HandRange } from "../../../scripts/flowchart/components/hand_range";
  import { distance_result } from "../../../stores/distance_result.svelte";

  let { raw_data, reactive_data }: { raw_data: HandRange; reactive_data: HandRange } = $props();

  $effect(() => {
    raw_data.min = reactive_data.min;
    raw_data.max = reactive_data.max;
  });
</script>

<div class="input-group input-group-sm">
  <span class="input-group-text">
    <label class="form-check-label text-start distance-label" for="."> Range </label>
  </span>
  <input
    type="number"
    min="0"
    max="10"
    step="0.1"
    class="form-control text-center nodrag"
    placeholder="Min"
    bind:value={reactive_data.min}
  />
  <input
    type="number"
    min="0"
    max="10"
    step="0.1"
    class="form-control text-center nodrag"
    placeholder="Max"
    bind:value={reactive_data.max}
  />

  <div class="container mt-3">
    <div class="range-container">
      <div class="range-track"></div>

      <div class="range-selected" style="width: {distance_result.length * 10}%;"></div>

      <div class="range-pointer" style="left: {reactive_data.min * 10}%;"></div>
      <div class="range-pointer" style="left: {reactive_data.max * 10}%;"></div>
    </div>
  </div>
</div>

<style>
  .range-container {
    position: relative;
    height: 20px;
    width: 100%;
    border-radius: 10px;
    margin-bottom: 1rem;
  }

  .range-track {
    background-color: white;
    border: solid #ddd 2px;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: 3px;
    overflow: hidden;
  }

  .range-selected {
    background-color: #0d6efd;
    left: 0;
    position: absolute;
    height: 100%;
    top: 0;
    transition: width 0.3s ease;
  }

  .range-pointer {
    background-color: #0d6efd;
    position: absolute;
    width: 6px;
    height: 32px;
    border-radius: 3px;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
</style>
