<script lang="ts">
  import { useSvelteFlow, type XYPosition } from "@xyflow/svelte";
  import { connectEndMenu } from "../../../stores/flow/menu.svelte";
  import { sizebarSize } from "../../../stores/geometry.svelte";
  import { NodeType } from "../../../types/nodes";
  import { nodeStore } from "../../../stores/flow/node.svelte";

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
    onclick={() => nodeStore.add(NodeType.CONDITION, getFlowPosition(), connectEndMenu.source)}
  >
    <img src="imgs/svg/flowchart.svg" alt="" />
    <span>{NodeType.CONDITION}</span>
  </button>

  <button
    class="btn d-flex align-items-center btn-context-menu"
    onclick={() => nodeStore.add(NodeType.TASK, getFlowPosition(), connectEndMenu.source)}
  >
    <img src="imgs/svg/bolt.svg" alt="" />
    <span>{NodeType.TASK}</span>
  </button>
</div>
