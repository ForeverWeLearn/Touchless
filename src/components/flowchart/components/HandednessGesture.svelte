<script lang="ts">
  import type { Gesture } from "../../../scripts/flowchart/components/gesture";
  import { GESTURE_NAMES, HANDEDNESS_NAMES, type HandednessID } from "../../../scripts/utils/const";

  let {
    raw_data,
    reactive_data,
    handedness,
    id,
  }: { raw_data: Gesture; reactive_data: Gesture; handedness: HandednessID; id: string } = $props();

  $effect(() => {
    raw_data.enable = reactive_data.enable;
    raw_data.gesture = reactive_data.gesture;
    raw_data.time = reactive_data.time;
  });
</script>

<div class="form-check text-center px-0 mb-0">
  <input
    class="form-check-input"
    type="checkbox"
    value=""
    id="gesture-{handedness}-{id}"
    bind:checked={reactive_data.enable}
    style="visibility: hidden; position:absolute"
  />
  <div class="col">
    <div class="row" class:faded={!reactive_data.enable}>
      <label class="form-check-label h6 text-center" for="gesture-{handedness}-{id}" style="cursor: pointer;">
        {HANDEDNESS_NAMES[handedness]}
      </label>
    </div>

    <div class="row" class:disabled={!reactive_data.enable}>
      <div class="input-group input-group-sm">
        <select class="form-control text-center select-gesture" bind:value={reactive_data.gesture}>
          {#each GESTURE_NAMES as gesture}
            <option>{gesture}</option>
          {/each}
        </select>
        <input
          type="text"
          class="form-control text-center input-time"
          placeholder="Time (ms)"
          bind:value={reactive_data.time}
        />
      </div>
    </div>
  </div>
</div>

<style>
  .input-time {
    min-width: 4em;
  }

  .select-gesture {
    min-width: 9em;
  }
</style>
