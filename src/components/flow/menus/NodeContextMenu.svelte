<script lang="ts">
  import { nodeContextMenu } from "../../../stores/menu.svelte";
  import { sizebarSize } from "../../../stores/geometry.svelte";
  import { nodeStore } from "../../../stores/flow.svelte";
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="context-menu"
  style="top: {nodeContextMenu.top}px; left: {nodeContextMenu.left - sizebarSize.width}px;"
  onclick={() => (nodeContextMenu.show = false)}
>
  <button class="btn btn-nbd" onclick={() => nodeStore.duplicate(nodeContextMenu.source)}>Duplicate</button>
  <button class="btn btn-nbd btn-danger" onclick={() => nodeStore.remove(nodeContextMenu.source)}>Delete</button>
</div>
