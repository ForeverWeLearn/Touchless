<script lang="ts">
  import type { DistanceCondition } from "../../../../../types/nodes";
  import Point from "../../components/Point.svelte";
  import Range from "../../components/Range.svelte";

  let { data }: { data: DistanceCondition } = $props();
</script>

<div class="d-flex align-items-center gap-4">
  <div class="d-flex align-items-center gap-1">
    <Point name="From" data={data.initial}></Point>
    <Point name="To" data={data.terminal}></Point>
  </div>

  <div class="d-flex flex-column gap-3">
    <Range min={0} max={5} step={0.1} unit="hu" bind:value1={data.range.min} bind:value2={data.range.max}></Range>
  </div>
</div>
