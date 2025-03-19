<script lang="ts">
  import type { KeySequence } from "../../scripts/utils/const";
  import { keySequenceStore } from "../../stores/task.svelte";
  import KeyForm from "./KeyForm.svelte";

  let { key_sequence, remove }: { key_sequence: KeySequence; remove: () => void } = $props();
</script>

<div class="d-flex flex-column gap-2">
  <div class="d-flex gap-1">
    <input class="form-control input-name" type="text" spellcheck="false" bind:value={key_sequence.name} />

    <button class="btn btn-nbd" onclick={() => remove()}>
      <img src="imgs/svg/delete.svg" alt="Delete Sequence" />
    </button>
  </div>

  <div class="d-flex flex-column gap-1">
    {#each key_sequence.sequence as key, i (key)}
      <KeyForm
        {key}
        append={() => keySequenceStore.insertKey(key_sequence, i + 1)}
        remove={() => {
          if (key_sequence.sequence.length <= 1) return;
          keySequenceStore.remove_key(key_sequence, key);
        }}
      />
    {/each}
  </div>
</div>
