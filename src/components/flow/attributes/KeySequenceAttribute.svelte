<script lang="ts">
  import type { TaskAttribute } from "../../../scripts/flow/attributes/task";
  import { keySequenceStore } from "../../../stores/task.svelte";

  let { data, remove }: { data: TaskAttribute; remove: () => void } = $props();
</script>

<div class="attr d-flex align-items-center gap-5 appear" class:faded={!data.enable}>
  <button class="btn btn-nbd text-start flex-fill nodrag" onclick={() => (data.enable = !data.enable)}>Key Sequence</button>

  <div class="d-flex flex-fill align-items-center gap-1">
    <select class="form-select" bind:value={data.name}>
      {#each keySequenceStore.key_sequences as sequence}
        <option value={sequence.name}>{sequence.name}</option>
      {/each}
    </select>

    <button class="btn btn-nbd" onclick={remove}>✕</button>
  </div>
</div>
