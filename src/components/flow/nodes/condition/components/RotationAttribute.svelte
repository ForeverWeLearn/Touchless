<script lang="ts">
  import type { RotationCondition } from "../../../../../types/nodes";
  import AngleRange from "../../components/AngleRange.svelte";
  import Point from "../../components/Point.svelte";

  let { data }: { data: RotationCondition } = $props();
</script>

<div class="d-flex align-items-center gap-4">
  <div class="d-flex align-items-center gap-1">
    <Point name="From" data={data.initial}></Point>
    <Point name="To" data={data.terminal}></Point>
  </div>

  <div class="d-flex flex-column gap-3">
    <AngleRange data={data.range}></AngleRange>
  </div>
</div>
