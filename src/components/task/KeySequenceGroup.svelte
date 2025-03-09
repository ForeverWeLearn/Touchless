<script>
  import { KEY_SEQUENCES } from "../../scripts/utils/const";
  import KeySequenceForm from "./KeySequenceForm.svelte";
</script>

{#each KEY_SEQUENCES as key_sequence}
  <KeySequenceForm {key_sequence}></KeySequenceForm>
{/each}
