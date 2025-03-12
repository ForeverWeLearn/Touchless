<script lang="ts">
  import type { ConditionsNodeData } from "../../../scripts/flow/nodes/conditions";

  let { reactive_data }: { reactive_data: ConditionsNodeData } = $props();
</script>

<div class="d-flex justify-content-center gap-1">
  {#if !reactive_data.gestures.enable}
    <button class="btn btn-add-condition" onclick={() => (reactive_data.gestures.enable = true)}>+ Gestures</button>
  {/if}
  {#if !reactive_data.distance.enable}
    <button class="btn btn-add-condition">+ Distance</button>
  {/if}
  {#if !reactive_data.rotation.enable}
    <button class="btn btn-add-condition">+ Rotation</button>
  {/if}
</div>
