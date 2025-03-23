<script lang="ts">
  import { useSvelteFlow, type XYPosition } from "@xyflow/svelte";
  import { connectEndMenu } from "../../../stores/menu.svelte";
  import { sizebarSize } from "../../../stores/geometry.svelte";
  import { nodeStore } from "../../../stores/flow.svelte";
  import { NodeType } from "../../../scripts/flow/nodes/node";

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
  <button
    class="btn d-flex align-items-center btn-context-menu"
    onclick={() => nodeStore.add(NodeType.CONDITIONS, getFlowPosition(), connectEndMenu.source)}
  >
    <img src="imgs/svg/flowchart.svg" alt="" />
    <span>{NodeType.CONDITIONS}</span>
  </button>

  <button
    class="btn d-flex align-items-center btn-context-menu"
    onclick={() => nodeStore.add(NodeType.TASKS, getFlowPosition(), connectEndMenu.source)}
  >
    <img src="imgs/svg/bolt.svg" alt="" />
    <span>{NodeType.TASKS}</span>
  </button>

  <button
    class="btn d-flex align-items-center btn-context-menu"
    onclick={() => nodeStore.add(NodeType.POWER, getFlowPosition(), connectEndMenu.source)}
  >
    <img src="imgs/svg/token.svg" alt="" />
    <span>{NodeType.POWER}</span>
  </button>
</div>
