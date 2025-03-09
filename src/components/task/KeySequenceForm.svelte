<script lang="ts">
  import type { KeySequenceType } from "../../scripts/flow/nodes/task/key_sequence";

  let { key_sequence }: { key_sequence: KeySequenceType } = $props();
</script>

<div class="h3">{key_sequence.name}</div>
<div class="row">
  {#each key_sequence.sequence as key}
    <div class="d-flex">
        <button class="btn btn-secondary m-1">{key.direction}</button>
      <button class="btn btn-primary m-1">{key.key}</button>
    </div>
  {/each}
</div>
