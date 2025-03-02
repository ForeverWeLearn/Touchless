<script lang="ts">
  import type { RootNodeData } from "../../../scripts/utils/node";
  import { hand_results } from "../../../stores/hand_result.svelte";

  let { raw_data, reactive_data }: { raw_data: RootNodeData; reactive_data: RootNodeData } = $props();

  const hand_detected = $derived(hand_results[0].has || hand_results[1].has);

  $effect(() => {
    raw_data.enable = reactive_data.enable;
  });
</script>

<div class="container node-container root-node-container" class:node-container-disabled={!reactive_data.enable} class:node-container-active={hand_detected}>
  <div class="d-flex justify-content-center align-items-center" style="width: 100%; height: 100%;">
    <div class="form-check text-center mt-3 mb-2 px-0">
      <input
        class="form-check-input"
        type="checkbox"
        id="node-label"
        bind:checked={reactive_data.enable}
        style="visibility: hidden; position:absolute"
      />
      <label
        class="form-check-label h3 align-middle mt-1"
        for="node-label"
        style="cursor: pointer; text-transform: uppercase"
      >
        Touchless
      </label>
    </div>
  </div>
</div>
