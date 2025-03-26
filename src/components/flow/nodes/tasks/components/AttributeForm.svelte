<script lang="ts">
  import { getDefaultTask, TaskType, type Task } from "../../../../../types/nodes";
  import CommandAttribute from "./CommandAttribute.svelte";
  import KeySequenceAttribute from "./KeySequenceAttribute.svelte";
  import TextAttribute from "./TextAttribute.svelte";

  let { data, change, remove }: { data: Task; change: (newTask: Task) => void; remove: () => void } = $props();
</script>

<div class="attr d-flex align-items-center gap-3 appear" class:faded={!data.enable}>
  <div class="d-flex flex-fill gap-3 ps-3">
    <select class="nodrag" onchange={() => change(getDefaultTask(data.type))} bind:value={data.type}>
      {#each Object.values(TaskType) as type}
        <option value={type}>{type}</option>
      {/each}
    </select>

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
