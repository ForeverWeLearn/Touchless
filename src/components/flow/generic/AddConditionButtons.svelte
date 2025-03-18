<script lang="ts">
  import type { ConditionsNodeData } from "../../../scripts/flow/nodes/conditions";

  let { data }: { data: ConditionsNodeData } = $props();
</script>

<div class="d-flex justify-content-center gap-1">
  {#if !data.gestures.included}
    <button
      class="btn btn-add-attribute"
      onclick={() => {
        data.gestures.included = true;
        data.gestures.enable = true;
      }}>+ Gestures</button
    >
  {/if}
  {#if !data.distance.included}
    <button
      class="btn btn-add-attribute"
      onclick={() => {
        data.distance.included = true;
        data.distance.enable = true;
      }}>+ Distance</button
    >
  {/if}
  {#if !data.rotation.included}
    <button
      class="btn btn-add-attribute"
      onclick={() => {
        data.rotation.included = true;
        data.rotation.enable = true;
      }}>+ Rotation</button
    >
  {/if}
</div>
