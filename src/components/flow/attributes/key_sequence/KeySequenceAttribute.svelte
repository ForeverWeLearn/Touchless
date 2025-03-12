<script lang="ts">
  import type { KeySequenceTaskAttribute } from "../../../../scripts/flow/attributes/task/key_sequence";
  import { key_sequences } from "../../../../stores/task.svelte";

  let {
    raw_data,
    reactive_data,
    delete_task,
  }: { raw_data: KeySequenceTaskAttribute; reactive_data: KeySequenceTaskAttribute; delete_task: () => void } =
    $props();

  $effect(() => {
    raw_data.enable = reactive_data.enable;
  });
</script>

<div class="d-flex align-items-center gap-2">
  <div style="white-space: nowrap;">Key Sequence</div>

  <select class="form-select form-select-sm" bind:value={reactive_data.name}>
    {#each key_sequences as sequence}
      <option value={sequence.name}>{sequence.name}</option>
    {/each}
  </select>

  <button class="btn" onclick={delete_task}>✕</button>
</div>
