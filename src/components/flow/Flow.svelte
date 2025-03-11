<script lang="ts">
  import "@xyflow/svelte/dist/style.css";

  import { SvelteFlow, Controls, Background, BackgroundVariant, type OnConnectEnd } from "@xyflow/svelte";
  import {
    initial_viewport,
    edges_writable,
    nodes_writable,
    client_size,
    node_types,
    nodes,
  } from "../../stores/flow.svelte";
  import { connect_end_menu, node_context_menu } from "../../stores/menu.svelte";
  import { NodeType } from "../../scripts/flow/nodes/note_type";
  import NodeContextMenu from "./menus/NodeContextMenu.svelte";
  import ConnectEndMenu from "./menus/ConnectEndMenu.svelte";
  import ButtonGroup from "./components/ButtonGroup.svelte";

  const handle_connect_end: OnConnectEnd = (event, connectionState) => {
    if (connectionState.isValid) return;
    if (connectionState.fromHandle?.type == "target") return;

    const sourceNodeId = connectionState.fromNode?.id ?? "0";

    event.preventDefault();
    event = event as MouseEvent;

    connect_end_menu.show = true;
    connect_end_menu.source = sourceNodeId;
    connect_end_menu.top = event.clientY;
    connect_end_menu.left = event.clientX;

    connect_end_menu.last_open = performance.now();
  };

  // @ts-ignore
  function handle_node_context_menu({ detail: { event, node } }) {
    event.preventDefault();

    const nd = nodes[node.id];
    if (nd != undefined && nd.type == NodeType.ENTRY) {
      return;
    }

    node_context_menu.show = true;
    node_context_menu.source = node.id;
    node_context_menu.top = event.clientY;
    node_context_menu.left = event.clientX;
  }

  function handle_pane_click() {
    if (performance.now() - connect_end_menu.last_open > 250) {
      connect_end_menu.show = false;
    }
    node_context_menu.show = false;
  }
</script>

<main bind:clientWidth={client_size.width} bind:clientHeight={client_size.height}>
  <SvelteFlow
    nodes={nodes_writable}
    edges={edges_writable}
    nodeTypes={node_types}
    initialViewport={initial_viewport}
    minZoom={0.2}
    maxZoom={1.5}
    snapGrid={[20, 20]}
    onconnectend={handle_connect_end}
    on:paneclick={handle_pane_click}
    on:nodecontextmenu={handle_node_context_menu}
  >
    <Controls showLock={false} showZoom={false} showFitView={false} />
    <Background variant={BackgroundVariant.Dots} />

    {#if connect_end_menu.show}
      <ConnectEndMenu />
    {/if}

    {#if node_context_menu.show}
      <NodeContextMenu />
    {/if}
  </SvelteFlow>

  <ButtonGroup />
</main>

<style>
  main {
    width: 103%;
    height: 103%;
  }
</style>
