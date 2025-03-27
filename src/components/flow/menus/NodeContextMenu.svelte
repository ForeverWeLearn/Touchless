<script lang="ts">
  import { nodeContextMenu } from "../../../stores/flow/menu.svelte";
  import { sidebarSize } from "../../../stores/geometry.svelte";
  import { ICON_PATHS } from "../../../types/core";
  import nodeStore from "../../../stores/flow/node.svelte";
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="context-menu"
  style="top: {nodeContextMenu.top}px; left: {nodeContextMenu.left - sidebarSize.width}px;"
  onclick={() => (nodeContextMenu.show = false)}
>
  <div class="background"></div>

  <div class="context-menu-content">
    <button class="btn btn-nbd d-flex gap-2" onclick={() => nodeStore.duplicate(nodeContextMenu.source)}>
      <img class="img-filter" src={ICON_PATHS.CONTENT_COPY} alt="" />
      <div>Duplicate</div>
    </button>
    <button class="btn btn-nbd btn-danger d-flex gap-2" onclick={() => nodeStore.remove(nodeContextMenu.source)}>
      <img class="img-filter" src={ICON_PATHS.DELETE} alt="" />
      <div>Delete</div>
    </button>
  </div>
</div>

<style>
  .background {
    background-color: rgba(0, 0, 0, 0.394);
    position: absolute;
    top: -5000px;
    left: -5000px;
    width: 10000px;
    height: 10000px;
    z-index: -1;
  }
</style>
