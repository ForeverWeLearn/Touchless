<script lang="ts">
  import { HANDEDNESS_NAMES, LANDMARKS } from "../../../scripts/utils/const";
  import type { NodePointData } from "../../../scripts/utils/node";

  let { raw_data, reactive_data, name }: { raw_data: NodePointData; reactive_data: NodePointData; name: string } =
    $props();

  $effect(() => {
    raw_data.handedness = reactive_data.handedness;
    raw_data.landmark = reactive_data.landmark;
  });
</script>

<div class="input-group input-group-sm">
  <span class="input-group-text">
    <label class="form-check-label text-start distance-label" for="."> {name} </label>
  </span>
  <select class="form-control text-center" bind:value={reactive_data.handedness} style="min-width: 5em;max-width: 5em;">
    {#each HANDEDNESS_NAMES as handedness, i}
      <option value={i}>{handedness}</option>
    {/each}
  </select>
  <select class="form-control text-center" bind:value={reactive_data.landmark}>
    {#each LANDMARKS as landmark, i}
      <option value={i}>{landmark.id} - {landmark.name}</option>
    {/each}
  </select>
</div>
