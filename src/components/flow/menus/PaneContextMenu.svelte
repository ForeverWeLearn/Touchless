<script lang="ts">
  import { useSvelteFlow, type XYPosition } from "@xyflow/svelte";
  import { sidebarSize, windowSize } from "../../../stores/geometry.svelte";
  import { settings } from "../../../stores/settings.svelte";
  import { NodeType } from "../../../types/nodes";
  import nodeStore from "../../../stores/flow/node.svelte";
  import menuStore from "../../../stores/flow/menu.svelte";

  const { screenToFlowPosition } = useSvelteFlow();

  function getFlowPosition(): XYPosition {
    const pos = screenToFlowPosition({
      x: menuStore.paneContext.left
        ? menuStore.paneContext.left + sidebarSize.width
        : windowSize.width - menuStore.paneContext.right,
      y: menuStore.paneContext.top ?? windowSize.height - menuStore.paneContext.bottom,
    });
    return pos;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="context-menu"
  style="
  top: {menuStore.paneContext.top}px; 
  left: {menuStore.paneContext.left}px; 
  right: {menuStore.paneContext.right}px; 
  bottom: {menuStore.paneContext.bottom}px"
  onclick={() => (menuStore.paneContext.show = false)}
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
