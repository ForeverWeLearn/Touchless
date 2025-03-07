<script lang="ts">
  import { LoopType } from "../../../scripts/flowchart/components/loop";

  let { raw_data, reactive_data }: { raw_data: LoopType; reactive_data: LoopType } = $props();

  $effect(() => {
    raw_data = reactive_data;
  });
</script>

<div class="input-group input-group-sm btn-group nodrag">
  <button
    class="btn {reactive_data == LoopType.ONCE ? 'btn-primary' : 'btn-outline-primary'}"
    type="button"
    onclick={() => (reactive_data = LoopType.ONCE)}
  >
    1
  </button>

  <button
    class="btn {reactive_data == LoopType.INFINITE ? 'btn-primary' : 'btn-outline-primary'}"
    type="button"
    onclick={() => (reactive_data = LoopType.INFINITE)}
  >
    ∞
  </button>
</div>

<style>
  button {
    width: max-content;
  }
</style>
