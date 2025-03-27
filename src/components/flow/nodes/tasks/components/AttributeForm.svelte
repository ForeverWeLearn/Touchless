<script lang="ts">
  import { ICON_PATHS } from "../../../../../types/core";
  import { getDefaultTask, TaskType, type Task } from "../../../../../types/nodes";
  import CommandAttribute from "./CommandAttribute.svelte";
  import KeySequenceAttribute from "./KeySequenceAttribute.svelte";
  import TextAttribute from "./TextAttribute.svelte";

  let { data, change, remove }: { data: Task; change: (newTask: Task) => void; remove: () => void } = $props();

  let icon = $derived(
    data.type == TaskType.COMMAND
      ? ICON_PATHS.TERMINAL
      : data.type == TaskType.KEY_SEQUENCE
        ? ICON_PATHS.KEYBOARD_ALT
        : ICON_PATHS.TEXT_FIELDS
  );
</script>

<div class="attr d-flex align-items-center gap-3 appear">
  <div class="d-flex flex-fill gap-3 ps-3">
    <div class="d-flex gap-2" style="position: relative;">
      <img class="img-filter img-icon" src={icon} alt="" />

      <select class="nodrag" onchange={() => change(getDefaultTask(data.type))} bind:value={data.type}>
        {#each Object.values(TaskType) as type}
          {#if type != TaskType.TEXT}
            <option value={type}>{type}</option>
          {/if}
        {/each}
      </select>
    </div>

    {#if data.type == TaskType.KEY_SEQUENCE}
      <KeySequenceAttribute {data}></KeySequenceAttribute>
    {/if}
    {#if data.type == TaskType.COMMAND}
      <CommandAttribute {data}></CommandAttribute>
    {/if}
    {#if data.type == TaskType.TEXT}
      <TextAttribute {data}></TextAttribute>
    {/if}
  </div>

  <button class="btn btn-nbd" onclick={() => remove()}> ✕ </button>
</div>

<style>
  select {
    padding-left: 2.2rem;
    padding-right: 2.2rem !important;
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
