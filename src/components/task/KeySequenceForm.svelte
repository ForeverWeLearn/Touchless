<script lang="ts">
  import type { Key, KeySequence } from "../../scripts/utils/const";
  import KeyForm from "./KeyForm.svelte";

  let { key_sequence, delete_sequence }: { key_sequence: KeySequence; delete_sequence: () => void } = $props();
</script>

<div class="d-flex flex-column gap-2">
  <div class="d-flex gap-1">
    <input class="form-control input-name" type="text" spellcheck="false" bind:value={key_sequence.name} />

    <button class="btn btn-sm btn-danger" onclick={() => delete_sequence()}>
      <img src="imgs/svg/delete.svg" alt="Delete Key" />
    </button>
  </div>

  <div class="d-flex flex-column gap-2">
    {#each key_sequence.sequence as key}
      <KeyForm
        {key}
        append_key={(new_key: Key) => key_sequence.sequence.splice(key_sequence.sequence.indexOf(key) + 1, 0, new_key)}
        delete_key={() => {
          if (key_sequence.sequence.length > 1) {
            key_sequence.sequence.splice(key_sequence.sequence.indexOf(key), 1);
          }
        }}
      />
    {/each}
  </div>
</div>
