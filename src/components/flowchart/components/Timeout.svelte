<script lang="ts">
  import type { Time } from "../../../scripts/flowchart/components/time";
  import Tooltip from "./Tooltip.svelte";

  let { raw_data, reactive_data }: { raw_data: Time; reactive_data: Time } = $props();

  $effect(() => {
    raw_data.type = reactive_data.type;
    raw_data.value = reactive_data.value;
  });
</script>

<div class="input-group input-group-sm">
  <span class="input-group-text">
    <label class="form-check-label" for="."> Timeout </label>
    <Tooltip content="None"></Tooltip>
  </span>
  <input
    type="text"
    class="form-control text-center input-time"
    placeholder="Time (ms)"
    bind:value={reactive_data.value}
  />
</div>
