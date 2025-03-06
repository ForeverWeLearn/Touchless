<script lang="ts">
  import "@xyflow/svelte/dist/style.css";

  import {
    SvelteFlow,
    Controls,
    Background,
    BackgroundVariant,
    useSvelteFlow,
    type OnConnectEnd,
  } from "@xyflow/svelte";
  import {
    nodes_writable,
    node_types,
    initial_viewport,
    edges_writable,
  } from "../../stores/flow_state.svelte";
  import { get_random_string } from "../../scripts/utils/algo";

  import NodeContextMenu from "./menus/NodeContextMenu.svelte";
  import PaneContextMenu from "./menus/PaneContextMenu.svelte";
  import ConnectEndMenu from "./menus/ConnectEndMenu.svelte";
  import Sidebar from "../Sidebar.svelte";
  import { NodeType } from "../../scripts/flowchart/nodes/node";

  const { fitView, getNode } = useSvelteFlow();

  async function init() {
    setTimeout(() => fitView({ duration: 1000 }), 250);
  }

  let pane_context_menu = $state({ show: false, id: "0", top: 0, left: 0 });
  let node_context_menu = $state({ show: false, id: "0", top: 0, left: 0 });
  let connect_end_menu = $state({ show: false, id: "0", top: 0, left: 0 });
  let width = $state(1920);
  let height = $state(1080);
  let last_connect_end_menu_time = 0;

  const handle_connect_end: OnConnectEnd = (event, connectionState) => {
    if (connectionState.isValid) return;
    if (connectionState.fromHandle?.type == "target") return;

    const sourceNodeId = connectionState.fromNode?.id ?? "0";

    event.preventDefault();
    event = event as MouseEvent;

    connect_end_menu = {
      show: true,
      id: sourceNodeId,
      top: event.clientY,
      left: event.clientX,
    };

    last_connect_end_menu_time = performance.now();
  };

  // @ts-ignore
  const handle_pane_context_menu = ({ detail: { event } }) => {
    event.preventDefault();

    pane_context_menu = {
      show: true,
      id: get_random_string(),
      top: event.clientY,
      left: event.clientX,
    };
  };

  // @ts-ignore
  function handle_node_context_menu({ detail: { event, node } }) {
    event.preventDefault();

    const nd = getNode(node.id);
    if (nd != undefined && nd.type == NodeType.ROOT) {
      return;
    }

    node_context_menu = {
      show: true,
      id: node.id,
      top: event.clientY,
      left: event.clientX,
    };
  }

  function handle_pane_click() {
    if (performance.now() - last_connect_end_menu_time > 300) {
      connect_end_menu.show = false;
    }
    node_context_menu.show = false;
    pane_context_menu.show = false;
  }

  function handle_pane_context_menu_click() {
    pane_context_menu.show = false;
  }

  function handle_node_context_menu_click() {
    node_context_menu.show = false;
  }

  function handle_connect_end_menu_click() {
    connect_end_menu.show = false;
  }

  init();
</script>

<main bind:clientWidth={width} bind:clientHeight={height}>
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
    on:panecontextmenu={handle_pane_context_menu}
    on:nodecontextmenu={handle_node_context_menu}
  >
    <Controls showLock={false} showZoom={false} showFitView={false} />
    <Background variant={BackgroundVariant.Lines} />

    {#if pane_context_menu.show}
      <PaneContextMenu
        onClick={handle_pane_context_menu_click}
        id={pane_context_menu.id}
        top={pane_context_menu.top}
        left={pane_context_menu.left}
      />
    {/if}

    {#if node_context_menu.show}
      <NodeContextMenu
        onClick={handle_node_context_menu_click}
        id={node_context_menu.id}
        top={node_context_menu.top}
        left={node_context_menu.left}
      />
    {/if}

    {#if connect_end_menu.show}
      <ConnectEndMenu
        onClick={handle_connect_end_menu_click}
        id={connect_end_menu.id}
        top={connect_end_menu.top}
        left={connect_end_menu.left}
      />
    {/if}
  </SvelteFlow>
  <Sidebar />
</main>

<style>
  main {
    height: 100vh;
  }

  :global(.svelte-flow .svelte-flow__handle) {
    width: 18px;
    height: 36px;
    border-radius: 5px;
    background-color: #0a58ca;
  }

  :global(.svelte-flow .svelte-flow__handle-left) {
    left: -10px;
  }

  :global(.svelte-flow .svelte-flow__handle-right) {
    right: -10px;
  }

  :global(.svelte-flow .svelte-flow__edge path, .svelte-flow__connectionline path) {
    stroke-width: 2;
    stroke: #0d6efd;
  }
</style>
