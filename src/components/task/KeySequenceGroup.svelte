<script>
  import { AppFileWriter } from "../../scripts/utils/writer";
  import { get_default_key, key_sequences } from "../../stores/task.svelte";
  import KeySequenceForm from "./KeySequenceForm.svelte";

  $effect(() => {
    console.log($state.snapshot(key_sequences));
    AppFileWriter.key_sequence_data(key_sequences);
  });
</script>

<div class="d-flex justify-content-left flex-wrap gap-5">
  {#each key_sequences as key_sequence}
    <KeySequenceForm {key_sequence} delete_sequence={() => key_sequences.splice(key_sequences.indexOf(key_sequence), 1)}
    ></KeySequenceForm>
  {/each}

  <div class="d-flex">
    <button
      class="btn btn-sm btn-primary"
      onclick={() => key_sequences.push({ name: "New Key Sequence", sequence: [get_default_key()] })}
    >
      <img src="imgs/svg/add.svg" alt="Add Key Sequence" />
    </button>
  </div>
</div>
