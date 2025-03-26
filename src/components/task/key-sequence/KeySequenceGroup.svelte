<script lang="ts">
  import { keySequenceStore } from "../../../stores/task/key-sequence.svelte";
  import KeySequenceForm from "./KeySequenceForm.svelte";

  const keySequences = keySequenceStore.keySequences;
</script>

<div class="d-flex justify-content-left flex-wrap gap-5">
  {#each keySequences as keySequence (keySequence)}
    <KeySequenceForm {keySequence} remove={() => keySequenceStore.remove(keySequence)}></KeySequenceForm>
  {/each}
</div>
