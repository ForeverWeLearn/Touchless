<script lang="ts">
  import type { NodeTimeoutData } from "../../../scripts/utils/node";
  import Tooltip from "./Tooltip.svelte";

  let { raw_data, reactive_data }: { raw_data: NodeTimeoutData; reactive_data: NodeTimeoutData } = $props();

  $effect(() => {
    raw_data.infinite = reactive_data.infinite;
    raw_data.time = reactive_data.time;
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
    bind:value={reactive_data.time}
  />
</div>
