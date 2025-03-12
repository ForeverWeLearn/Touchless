<script lang="ts">
  import { useSvelteFlow, type XYPosition } from "@xyflow/svelte";
  import { create_node } from "../../../stores/flow.svelte";
  import { connect_end_menu } from "../../../stores/menu.svelte";
  import { sidebar_size } from "../../../stores/sidebar.svelte";
  import { NodeType } from "../../../scripts/flow/nodes/node";

  const { screenToFlowPosition } = useSvelteFlow();

  function get_pos(): XYPosition {
    const pos = screenToFlowPosition({
      x: connect_end_menu.left,
      y: connect_end_menu.top,
    });
    return pos;
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="d-flex flex-column context-menu px-0"
  style="top: {connect_end_menu.top}px; left: {connect_end_menu.left - sidebar_size.width}px;"
  onclick={() => (connect_end_menu.show = false)}
>
  <button
    class="btn d-flex align-items-center btn-context-menu"
    onclick={() => create_node(NodeType.CONDITIONS, get_pos(), connect_end_menu.source)}
  >
    <img src="imgs/svg/flowchart.svg" alt="Icon" />
    <span>{NodeType.CONDITIONS}</span>
  </button>

  <button
    class="btn d-flex align-items-center btn-context-menu"
    onclick={() => create_node(NodeType.TASKS, get_pos(), connect_end_menu.source)}
  >
    <img src="imgs/svg/bolt.svg" alt="Icon" />
    <span>{NodeType.TASKS}</span>
  </button>

  <button
    class="btn d-flex align-items-center btn-context-menu"
    onclick={() => create_node(NodeType.POWER, get_pos(), connect_end_menu.source)}
  >
    <img src="imgs/svg/token.svg" alt="Icon" />
    <span>{NodeType.POWER}</span>
  </button>
</div>
