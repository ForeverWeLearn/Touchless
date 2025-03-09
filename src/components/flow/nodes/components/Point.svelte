<script lang="ts">
  import { PointType, type Point } from "../../../../scripts/flow/components/point";
  import { HANDEDNESS_NAMES, LANDMARK_NAMES } from "../../../../scripts/utils/const";

  let { raw_data, reactive_data, name }: { raw_data: Point; reactive_data: Point; name: string } = $props();

  $effect(() => {
    raw_data.handedness = reactive_data.handedness;
    raw_data.landmark = reactive_data.landmark;
  });
</script>

<div class="input-group input-group-sm">
  <span class="input-group-text">
    <label class="form-check-label text-start distance-label" for="."> {name} </label>
  </span>
  <select
    class="form-control text-center nodrag"
    bind:value={reactive_data.handedness}
    style="min-width: 4em;max-width: 4em;"
  >
    {#each HANDEDNESS_NAMES as handedness, i}
      <option value={i}>{handedness}</option>
    {/each}
  </select>
  <select class="form-control text-center" bind:value={reactive_data.landmark} style="min-width: 14em;max-width: 14em;">
    {#each LANDMARK_NAMES as landmark, i}
      <option value={i}>{i} - {landmark}</option>
    {/each}
  </select>
  <select class="form-control text-center" bind:value={reactive_data.type} style="min-width: 5em;">
    {#each Object.values(PointType) as type}
      <option value={type}>{type}</option>
    {/each}
  </select>
</div>
