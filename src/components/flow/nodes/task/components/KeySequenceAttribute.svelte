<script lang="ts">
  import type { KeySequenceTask } from "../../../../../types/nodes/task/key-sequence";
  import { keySequenceStore } from "../../../../../stores/task/key-sequence.svelte";

  let { data }: { data: KeySequenceTask } = $props();
</script>

<select class="form-select" bind:value={data.name}>
  {#each keySequenceStore.keySequences as keySequence}
    <option value={keySequence.name}>{keySequence.name}</option>
  {/each}
</select>
