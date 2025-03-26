<script lang="ts">
  import { useSvelteFlow, type XYPosition } from "@xyflow/svelte";
  import { connectEndMenu } from "../../../stores/flow/menu.svelte";
  import { sizebarSize } from "../../../stores/geometry.svelte";
  import { NodeType } from "../../../types/nodes";
  import { nodeStore } from "../../../stores/flow/node.svelte";
  import { ICON_PATHS } from "../../../types/core";

  const { screenToFlowPosition } = useSvelteFlow();

  function getFlowPosition(): XYPosition {
    const pos = screenToFlowPosition({
      x: connectEndMenu.left,
      y: connectEndMenu.top,
    });
    return pos;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="context-menu"
  style="top: {connectEndMenu.top}px; left: {connectEndMenu.left - sizebarSize.width}px;"
  onclick={() => (connectEndMenu.show = false)}
>
  <div class="background"></div>

  <div class="context-menu-content">
    <button
      class="btn d-flex align-items-center btn-context-menu"
      onclick={() => nodeStore.add(NodeType.CONDITION, getFlowPosition(), connectEndMenu.source)}
    >
      <img class="img-filter" src={ICON_PATHS.FLOWCHART} alt="" />
      <span>{NodeType.CONDITION}</span>
    </button>

    <button
      class="btn d-flex align-items-center btn-context-menu"
      onclick={() => nodeStore.add(NodeType.TASK, getFlowPosition(), connectEndMenu.source)}
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
