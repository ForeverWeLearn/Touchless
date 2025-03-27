<script lang="ts">
  import { ICON_PATHS } from "../../../../../types/core";
  import { ConditionType, getDefaultCondition, type Condition } from "../../../../../types/nodes";
  import DistanceAttribute from "./DistanceAttribute.svelte";
  import GesturesAttribute from "./GesturesAttribute.svelte";
  import RotationAttribute from "./RotationAttribute.svelte";

  let { data, change, remove }: { data: Condition; change: (newCondition: Condition) => void; remove: () => void } =
    $props();

  let icon = $derived(
    data.type == ConditionType.GESTURES
      ? ICON_PATHS.HAND_GESTURE
      : data.type == ConditionType.DISTANCE
        ? ICON_PATHS.ARROW_RANGE
        : ICON_PATHS.CLOCK_LOADER
  );
</script>

<div class="attr d-flex align-items-center gap-4 py-3 appear" class:attr-active={data.runtime.activated}>
  <div class="d-flex flex-fill m-3" style="position: relative;">
    <img class="img-filter img-icon" src={icon} alt="" />

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

<style>
  select {
    padding-left: 2.2rem;
    outline: var(--fg-color-2);
  }

  .img-icon {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    padding: 0.5rem;
  }
</style>
