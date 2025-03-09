<script lang="ts">
  import type { Rotation } from "../../../../scripts/flow/components/rotation";
  import Point from "./Point.svelte";
  import Range from "./Range.svelte";

  let { raw_data, reactive_data, id }: { raw_data: Rotation; reactive_data: Rotation; id: string } = $props();

  $effect(() => {
    raw_data.enable = reactive_data.enable;
  });
</script>

<div class="form-check text-center px-0 mb-0">
  <input
    class="form-check-input"
    type="checkbox"
    value=""
    id="gesture-{id}"
    bind:checked={reactive_data.enable}
    style="visibility: hidden; position:absolute"
  />
  <div class="col">
    <div class="row" class:disabled={!reactive_data.enable}>
      <div class="input-group input-group-sm">
        <Point name="Pivot" raw_data={raw_data.pivot} reactive_data={reactive_data.pivot}></Point>
        <Point name="Target" raw_data={raw_data.target} reactive_data={reactive_data.target}></Point>
        <Range raw_data={raw_data.degree_range} reactive_data={reactive_data.degree_range}></Range>
      </div>
    </div>
  </div>
</div>
