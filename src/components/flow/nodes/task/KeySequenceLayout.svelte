<script lang="ts">
  import type { KeySequenceNodeData } from "../../../../scripts/flow/nodes/task/key_sequence";
  import { KEY_SEQUENCE_NAMES } from "../../../../scripts/utils/const";
  import { hand_results } from "../../../../stores/engine.svelte";

  let {
    raw_data,
    reactive_data,
    id,
  }: { raw_data: KeySequenceNodeData; reactive_data: KeySequenceNodeData; id: string } = $props();

  const hand_detected = $derived(hand_results[0].has || hand_results[1].has);

  $effect(() => {
    raw_data.enable = reactive_data.enable;
    raw_data.sequence_name = reactive_data.sequence_name;
  });
</script>

<div
  class="container node-container distance-node-container"
  class:node-container-disabled={!reactive_data.enable}
  class:node-container-active={reactive_data.active && hand_detected}
>
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
          {raw_data.type}
        </label>
      </div>
    </div>
  </div>

  <div class="row">
    <div class="col me-2">
      <div class="input-group input-group-sm">
        <select class="form-control text-center" bind:value={reactive_data.sequence_name}>
          {#each KEY_SEQUENCE_NAMES as name}
            <option>{name}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
</div>
