<script lang="ts">
  import { useSvelteFlow, type XYPosition } from "@xyflow/svelte";
  import { create_node } from "../../../stores/flow.svelte";
  import { connect_end_menu } from "../../../stores/menu.svelte";
  import { sidebar_size } from "../../../stores/sidebar.svelte";
  import { NodeType } from "../../../scripts/flow/nodes/note_type";

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
  class="context-menu px-0"
  style="top: {connect_end_menu.top}px; left: {connect_end_menu.left - sidebar_size.width}px;"
  onclick={() => (connect_end_menu.show = false)}
>
  <button
    class="btn btn-sm btn-outline-primary btn-first"
    onclick={() => create_node(NodeType.GESTURE, get_pos(), connect_end_menu.source)}
  >
    {NodeType.GESTURE}</button
  >
  <button
    class="btn btn-sm btn-outline-primary btn-first"
    onclick={() => create_node(NodeType.ROTATION, get_pos(), connect_end_menu.source)}
  >
    {NodeType.ROTATION}</button
  >
  <button
    class="btn btn-sm btn-outline-primary btn-first"
    onclick={() => create_node(NodeType.KEY_SEQUENCE, get_pos(), connect_end_menu.source)}
  >
    {NodeType.KEY_SEQUENCE}</button
  >
  <button
    class="btn btn-sm btn-outline-primary btn-first"
    onclick={() => create_node(NodeType.COMMAND, get_pos(), connect_end_menu.source)}
  >
    {NodeType.COMMAND}</button
  >
</div>

<style>
  .context-menu {
    z-index: 999;
    position: absolute;
    background-color: aqua;
  }
</style>
