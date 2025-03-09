<script lang="ts">
  import type { CustomRange } from "../../../../scripts/flow/components/custom_range";

  let { raw_data, reactive_data }: { raw_data: CustomRange; reactive_data: CustomRange } = $props();

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
</div>
