<script lang="ts">
  import { ICON_PATHS, type KeySequence } from "../../../types/core";
  import { keySequenceStore } from "../../../stores/task/key-sequence.svelte";
  import KeyForm from "./KeyForm.svelte";

  let { keySequence, remove }: { keySequence: KeySequence; remove: () => void } = $props();
</script>

<div class="d-flex flex-column gap-2 appear-opacity">
  <div class="d-flex gap-1">
    <div class="d-flex flex-fill" style="position: relative;">
      <img class="img-filter img-icon" src={ICON_PATHS.TEXT_FIELDS} alt="" />
      <input class="form-control input-name" type="text" spellcheck="false" bind:value={keySequence.name} />
    </div>

    <button class="btn btn-nbd" onclick={() => remove()}>
      <img class="img-filter" src={ICON_PATHS.DELETE} alt="Delete Sequence" />
    </button>
  </div>

  <div class="d-flex flex-column gap-1">
    {#each keySequence.sequence as key, i (key)}
      <KeyForm
        {key}
        append={() => keySequenceStore.insertKey(keySequence, i + 1)}
        remove={() => {
          if (keySequence.sequence.length <= 1) {
            remove();
          } else {
            keySequenceStore.remove_key(keySequence, key);
          }
        }}
      />
    {/each}
  </div>
</div>

<style>
  .img-icon {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    padding: 0.7rem;
    bottom: 0;
  }
</style>
