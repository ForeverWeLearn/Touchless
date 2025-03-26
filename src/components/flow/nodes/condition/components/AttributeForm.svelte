<script lang="ts">
  import { ConditionType, getDefaultCondition, type Condition } from "../../../../../types/nodes";
  import DistanceAttribute from "./DistanceAttribute.svelte";
  import GesturesAttribute from "./GesturesAttribute.svelte";
  import RotationAttribute from "./RotationAttribute.svelte";

  let { data, change, remove }: { data: Condition; change: (newCondition: Condition) => void; remove: () => void } =
    $props();
</script>

<div
  class="attr d-flex align-items-center gap-4 py-3 appear"
  class:attr-active={data.runtime.activated}
  class:faded={!data.enable}
>
  <div class="d-flex flex-fill p-3">
    <select class="nodrag w-100" onchange={() => change(getDefaultCondition(data.type))} bind:value={data.type}>
      {#each Object.values(ConditionType) as type}
        <option value={type}>{type}</option>
      {/each}
    </select>
  </div>

  <div class="d-flex align-items-center gap-3">
    {#if data.type == ConditionType.GESTURES}
      <GesturesAttribute {data}></GesturesAttribute>
    {/if}
    {#if data.type == ConditionType.DISTANCE}
      <DistanceAttribute {data}></DistanceAttribute>
    {/if}
    {#if data.type == ConditionType.ROTATION}
      <RotationAttribute {data}></RotationAttribute>
    {/if}
  </div>

  <button class="btn btn-nbd" onclick={() => remove()}> ✕ </button>
</div>
