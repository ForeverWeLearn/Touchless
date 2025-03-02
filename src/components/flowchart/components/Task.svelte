<script lang="ts">
  import type { TaskNodeData } from "../../../scripts/utils/node";
  import { TASKS } from "../../../scripts/utils/const";
  import Loop from "./Loop.svelte";
  import { hand_results } from "../../../stores/hand_result.svelte";

  let { raw_data, reactive_data, id }: { raw_data: TaskNodeData; reactive_data: TaskNodeData; id: string } = $props();
  
  const hand_detected = $derived(hand_results[0].has || hand_results[1].has);

  $effect(() => {
    raw_data.enable = reactive_data.enable;
    raw_data.task = reactive_data.task;
  });
</script>

<div class="container node-container task-node-container" class:node-container-disabled={!reactive_data.enable} class:node-container-active={reactive_data.active && hand_detected}>
  <div class="row">
    <div class="col col-12">
      <div class="form-check text-center mt-3 px-0">
        <input
          class="form-check-input"
          type="checkbox"
          id="task-{id}"
          bind:checked={reactive_data.enable}
          style="visibility: hidden; position:absolute"
        />
        <label class="form-check-label h3" for="task-{id}" style="cursor: pointer; text-transform: uppercase">
          Task
        </label>
      </div>
    </div>
  </div>

  <div class="row mb-2">
    <div class="col">
      <div class="d-flex justify-content-evenly" class:disabled={!reactive_data.enable}>
        <Loop raw_data={raw_data.loop} reactive_data={reactive_data.loop}></Loop>
      </div>
      <div class="input-group input-group-sm mt-1" class:disabled={!reactive_data.enable}>
        <select class="form-control text-center" disabled={!reactive_data.enable} bind:value={reactive_data.task}>
          {#each TASKS as task}
            <option>{task}</option>
          {/each}
        </select>
      </div>
    </div>
  </div>
</div>
