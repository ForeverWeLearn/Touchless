<script lang="ts">
  import { useSvelteFlow, type XYPosition } from "@xyflow/svelte";
  import { paneContextMenu } from "../../../stores/menu.svelte";
  import { sizebarSize } from "../../../stores/geometry.svelte";
  import { nodeStore } from "../../../stores/flow.svelte";
  import { NodeType } from "../../../scripts/flow/nodes/node";
  import { settings } from "../../../stores/settings.svelte";

  const { screenToFlowPosition } = useSvelteFlow();

  function getFlowPosition(): XYPosition {
    const pos = screenToFlowPosition({
      x: paneContextMenu.left,
      y: paneContextMenu.top,
    });
    return pos;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="context-menu"
  style="top: {paneContextMenu.top}px; left: {paneContextMenu.left - sizebarSize.width}px;"
  onclick={() => (paneContextMenu.show = false)}
>
  <button
    class="btn d-flex align-items-center btn-context-menu"
    onclick={() => nodeStore.add(NodeType.ENTRY, getFlowPosition())}
  >
    <img src={settings.icons.nodes.ENTRY} alt="" />
    <span>{NodeType.ENTRY}</span>
  </button>

  <button
    class="btn d-flex align-items-center btn-context-menu"
    onclick={() => nodeStore.add(NodeType.CONDITIONS, getFlowPosition())}
  >
    <img src={settings.icons.nodes.CONDITIONS} alt="" />
    <span>{NodeType.CONDITIONS}</span>
  </button>

  <button
    class="btn d-flex align-items-center btn-context-menu"
    onclick={() => nodeStore.add(NodeType.TASKS, getFlowPosition())}
  >
    <img src={settings.icons.nodes.TASKS} alt="" />
    <span>{NodeType.TASKS}</span>
  </button>

  <button
    class="btn d-flex align-items-center btn-context-menu"
    onclick={() => nodeStore.add(NodeType.POWER, getFlowPosition())}
  >
    <img src={settings.icons.nodes.POWER} alt="" />
    <span>{NodeType.POWER}</span>
  </button>
</div>
