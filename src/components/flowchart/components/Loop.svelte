<script lang="ts">
  import type { NodeLoopData } from "../../../scripts/utils/node";

  let { raw_data, reactive_data }: { raw_data: NodeLoopData; reactive_data: NodeLoopData } = $props();

  $effect(() => {
    raw_data.type = reactive_data.type;
  });
</script>

<div class="input-group input-group-sm btn-group nodrag">
  <button
    class="btn {reactive_data.type == 'ONCE' ? 'btn-primary' : 'btn-outline-primary'}"
    type="button"
    onclick={() => (reactive_data.type = "ONCE")}
  >
    1
  </button>

  <button
    class="btn {reactive_data.type == 'UNLIMITED' ? 'btn-primary' : 'btn-outline-primary'}"
    type="button"
    onclick={() => (reactive_data.type = "UNLIMITED")}
  >
    ∞
  </button>
</div>

<style>
  button {
    width: max-content;
  }
</style>
