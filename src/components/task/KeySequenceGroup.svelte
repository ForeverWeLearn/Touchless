<script lang="ts">
  import { keySequenceStore } from "../../stores/task.svelte";
  import KeySequenceForm from "./KeySequenceForm.svelte";

  const key_sequences = keySequenceStore.key_sequences;
</script>

<div class="d-flex justify-content-left flex-wrap gap-5">
  {#each key_sequences as key_sequence (key_sequence)}
    <KeySequenceForm {key_sequence} remove={() => keySequenceStore.remove(key_sequence)}></KeySequenceForm>
  {/each}

  <div class="d-flex">
    <button class="btn btn-nbd btn-dark" onclick={() => keySequenceStore.push()}>
      <img src="imgs/svg/add.svg" alt="Add Key Sequence" />
    </button>
  </div>
</div>
