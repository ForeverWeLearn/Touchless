<script lang="ts">
  import type { GestureNodeData } from "../../../../scripts/flow/nodes/condition/gesture";
  import { hand_results } from "../../../../stores/engine.svelte";
  import HandednessGesture from "../components/HandednessGesture.svelte";
  import Timeout from "../components/Timeout.svelte";

  
    let { raw_data, reactive_data, id }: { raw_data: GestureNodeData; reactive_data: GestureNodeData; id: string } =
      $props();
  
    const hand_detected = $derived(hand_results[0].has || hand_results[1].has);
  
    $effect(() => {
      raw_data.enable = reactive_data.enable;
    });
  </script>
  
  <div
    class="container node-container"
    class:node-container-disabled={!reactive_data.enable}
    class:node-container-active={reactive_data.active && hand_detected}
  >
    <div class="row">
      <div class="col col-12">
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
  
    <div class="row" class:disabled={!reactive_data.enable}>
      <div class="col pe-1">
        <HandednessGesture
          raw_data={raw_data.handedness[0]}
          reactive_data={reactive_data.handedness[0]}
          handedness={0}
          {id}
        ></HandednessGesture>
      </div>
      <div class="col ps-1">
        <HandednessGesture
          raw_data={raw_data.handedness[1]}
          reactive_data={reactive_data.handedness[1]}
          handedness={1}
          {id}
        ></HandednessGesture>
      </div>
    </div>
  
    <div class="row mt-1 mb-2">
      <Timeout raw_data={raw_data.timeout} reactive_data={reactive_data.timeout} />
    </div>
  </div>
  