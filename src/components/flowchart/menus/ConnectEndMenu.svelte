<script lang="ts">
  import { useSvelteFlow } from "@xyflow/svelte";
  import { create_node } from "../../../stores/flow_state.svelte";
  import { NodeType } from "../../../scripts/utils/node";

  export let onClick: () => void;
  export let id: string;
  export let top: number | undefined;
  export let left: number | undefined;

  const { screenToFlowPosition } = useSvelteFlow();

  function create_node_on_runtime(type: NodeType) {
    const pos = screenToFlowPosition({
      x: left ?? 0,
      y: top ?? 0,
    });
    create_node(type, id, pos);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  style="top: {top}px; left: {left}px;"
  class="context-menu px-0"
  onclick={onClick}
>
  <button class="btn btn-sm btn-outline-primary btn-first" onclick={() => create_node_on_runtime(NodeType.Gesture)}
    >{NodeType.Gesture}</button
  >
  <button class="btn btn-sm btn-outline-primary" onclick={() => create_node_on_runtime(NodeType.Distance)}
    >{NodeType.Distance}</button
  >
  <button class="btn btn-sm btn-outline-primary btn-last" onclick={() => create_node_on_runtime(NodeType.Task)}
    >{NodeType.Task}</button
  >
</div>
