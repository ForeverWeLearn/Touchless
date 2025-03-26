<script lang="ts">
  import type { KeySequence } from "../../../types/core";
  import { keySequenceStore } from "../../../stores/task/key-sequence.svelte";
  import KeyForm from "./KeyForm.svelte";

  let { keySequence, remove }: { keySequence: KeySequence; remove: () => void } = $props();
</script>

<div class="d-flex flex-column gap-2 appear-opacity">
  <div class="d-flex gap-1">
    <input class="form-control input-name" type="text" spellcheck="false" bind:value={keySequence.name} />

    <button class="btn btn-nbd" onclick={() => remove()}>
      <img src="imgs/svg/delete.svg" alt="Delete Sequence" />
    </button>
  </div>

  <div class="d-flex flex-column gap-1">
    {#each keySequence.sequence as key, i (key)}
      <KeyForm
        {key}
        append={() => keySequenceStore.insertKey(keySequence, i + 1)}
        remove={() => {
          if (keySequence.sequence.length <= 1) return;
          keySequenceStore.remove_key(keySequence, key);
        }}
      />
    {/each}
  </div>
</div>
