<script lang="ts">
  import { useSvelteFlow, type XYPosition } from "@xyflow/svelte";
  import { paneContextMenu } from "../../../stores/flow/menu.svelte";
  import { clientSize, sidebarSize } from "../../../stores/geometry.svelte";
  import { settings } from "../../../stores/settings.svelte";
  import { NodeType } from "../../../types/nodes";
  import nodeStore from "../../../stores/flow/node.svelte";

  const { screenToFlowPosition } = useSvelteFlow();

  function getFlowPosition(): XYPosition {
    const pos = screenToFlowPosition({
      x: paneContextMenu.left ?? clientSize.width + sidebarSize.width - paneContextMenu.right,
      y: paneContextMenu.top ?? clientSize.height - paneContextMenu.bottom,
    });
    return pos;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="context-menu"
  style="
  top: {paneContextMenu.top}px; 
  left: {paneContextMenu.left - sidebarSize.width}px; 
  right: {paneContextMenu.right}px; 
  bottom: {paneContextMenu.bottom}px"
  onclick={() => (paneContextMenu.show = false)}
>
  <div class="background"></div>

  <div class="context-menu-content">
    <button
      class="btn d-flex align-items-center btn-context-menu"
      onclick={() => nodeStore.add(NodeType.ENTRY, getFlowPosition())}
    >
      <img class="img-filter" src={settings.icons.nodes.ENTRY} alt="" />
      <span>{NodeType.ENTRY}</span>
    </button>

    <button
      class="btn d-flex align-items-center btn-context-menu"
      onclick={() => nodeStore.add(NodeType.CONDITION, getFlowPosition())}
    >
      <img class="img-filter" src={settings.icons.nodes.CONDITION} alt="" />
      <span>{NodeType.CONDITION}</span>
    </button>

    <button
      class="btn d-flex align-items-center btn-context-menu"
      onclick={() => nodeStore.add(NodeType.TASK, getFlowPosition())}
    >
      <img class="img-filter" src={settings.icons.nodes.TASK} alt="" />
      <span>{NodeType.TASK}</span>
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
