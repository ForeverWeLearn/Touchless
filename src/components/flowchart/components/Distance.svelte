<script lang="ts">
  import { type DistanceNodeData } from "../../../scripts/utils/node";
  import { hand_results } from "../../../stores/hand_result.svelte";
  import Point from "./Point.svelte";
  import Range from "./Range.svelte";

  let { raw_data, reactive_data, id }: { raw_data: DistanceNodeData; reactive_data: DistanceNodeData; id: string } =
    $props();
    
  const hand_detected = $derived(hand_results[0].has || hand_results[1].has);

  $effect(() => {
    raw_data.enable = reactive_data.enable;
  });
</script>

<div class="container node-container distance-node-container" class:node-container-disabled={!reactive_data.enable} class:node-container-active={reactive_data.active && hand_detected}>
  <div class="row">
    <div class="col">
      <div class="form-check text-center mt-3 px-0">
        <input
          class="form-check-input"
          type="checkbox"
          id="node-{id}-label"
          bind:checked={reactive_data.enable}
          style="visibility: hidden; position:absolute"
        />
        <label class="form-check-label h3" for="node-{id}-label" style="cursor: pointer; text-transform: uppercase">
          Distance
        </label>
      </div>
    </div>
  </div>

  <div class="col mb-2" class:disabled={!reactive_data.enable}>
    <div class="row">
      <div class="col">
        <div class="row">
          <Point raw_data={raw_data.points[0]} reactive_data={reactive_data.points[0]} name="From"></Point>
        </div>
        <div class="row mt-1">
          <Point raw_data={raw_data.points[1]} reactive_data={reactive_data.points[1]} name="To"></Point>
        </div>
        <div class="row mt-1">
          <Range raw_data={raw_data.range} reactive_data={reactive_data.range}></Range>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  :global(.distance-label) {
    min-width: 4em;
    max-width: 4em;
  }
</style>
