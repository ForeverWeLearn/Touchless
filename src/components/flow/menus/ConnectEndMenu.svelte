<script lang="ts">
  import { useSvelteFlow, type XYPosition } from "@xyflow/svelte";
  import { sidebarSize, windowSize } from "../../../stores/geometry.svelte";
  import { ICON_PATHS } from "../../../types/core";
  import { NodeType } from "../../../types/nodes";
  import nodeStore from "../../../stores/flow/node.svelte";
  import menuStore from "../../../stores/flow/menu.svelte";

  const { screenToFlowPosition } = useSvelteFlow();

  function getFlowPosition(): XYPosition {
    const pos = screenToFlowPosition({
      x: menuStore.connectEnd.left
        ? menuStore.connectEnd.left + sidebarSize.width
        : windowSize.width - menuStore.connectEnd.right,
      y: menuStore.connectEnd.top ?? windowSize.height - menuStore.connectEnd.bottom,
    });
    return pos;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="context-menu"
  style="
  top: {menuStore.connectEnd.top}px; 
  left: {menuStore.connectEnd.left}px; 
  right: {menuStore.connectEnd.right}px; 
  bottom: {menuStore.connectEnd.bottom}px"
  onclick={() => (menuStore.connectEnd.show = false)}
>
  <div class="background"></div>

  <div class="context-menu-content">
    <button
      class="btn d-flex align-items-center btn-context-menu"
      onclick={() => nodeStore.add(NodeType.CONDITION, getFlowPosition(), menuStore.connectEnd.source)}
    >
      <img class="img-filter" src={ICON_PATHS.FLOWCHART} alt="" />
      <span>{NodeType.CONDITION}</span>
    </button>

    <button
      class="btn d-flex align-items-center btn-context-menu"
      onclick={() => nodeStore.add(NodeType.TASK, getFlowPosition(), menuStore.connectEnd.source)}
    >
      <img class="img-filter" src={ICON_PATHS.BOLT} alt="" />
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
