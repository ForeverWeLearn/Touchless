<script lang="ts">
  import "@xyflow/svelte/dist/style.css";

  import { type OnConnectEnd, BackgroundVariant, SvelteFlow, Background, Controls } from "@xyflow/svelte";
  import { nodes_writable, nodeTypes, viewStore, edgesWritable } from "../../stores/flow.svelte";
  import { connectEndMenu, nodeContextMenu, paneContextMenu } from "../../stores/menu.svelte";
  import { client_size } from "../../stores/geometry.svelte";
  import { settings } from "../../stores/settings.svelte";
  import NodeContextMenu from "./menus/NodeContextMenu.svelte";
  import PaneContextMenu from "./menus/PaneContextMenu.svelte";
  import ConnectEndMenu from "./menus/ConnectEndMenu.svelte";
  import StatusBar from "./float/StatusBar.svelte";

  // When edges changed, pending save
  edgesWritable.subscribe((v) => {
    settings.pendingSave = true;
  });

  // When nodes changed, pending save
  nodes_writable.subscribe((v) => {
    settings.pendingSave = true;
  });

  const handleConnectEnd: OnConnectEnd = (event, connectionState) => {
    if (connectionState.isValid) return;
    if (connectionState.fromHandle?.type == "target") return;

    hideAllMenu();

    const sourceNodeId = connectionState.fromNode?.id ?? "0";

    event.preventDefault();
    event = event as MouseEvent;

    connectEndMenu.show = true;
    connectEndMenu.source = sourceNodeId;
    connectEndMenu.top = event.clientY;
    connectEndMenu.left = event.clientX;

    connectEndMenu.lastOpen = performance.now();
  };

  // @ts-ignore
  function handleNodeContextMenu({ detail: { event, node } }) {
    event.preventDefault();

    hideAllMenu();

    nodeContextMenu.show = true;
    nodeContextMenu.source = node.id;
    nodeContextMenu.top = event.clientY;
    nodeContextMenu.left = event.clientX;
  }

  // @ts-ignore
  function handlePaneContextMenu({ detail: { event } }) {
    event.preventDefault();
    event = event as MouseEvent;

    hideAllMenu();

    paneContextMenu.show = true;
    paneContextMenu.top = event.clientY;
    paneContextMenu.left = event.clientX;
  }

  function handlePaneClick() {
    hideAllMenu();
  }

  function hideAllMenu() {
    if (performance.now() - connectEndMenu.lastOpen > 250) {
      connectEndMenu.show = false;
    }
    nodeContextMenu.show = false;
    paneContextMenu.show = false;
  }
</script>

<main bind:clientWidth={client_size.width} bind:clientHeight={client_size.height}>
  <SvelteFlow
    nodes={nodes_writable}
    edges={edgesWritable}
    {nodeTypes}
    initialViewport={viewStore.initialViewport}
    minZoom={0.2}
    maxZoom={10}
    snapGrid={[50, 50]}
    onconnectend={handleConnectEnd}
    on:paneclick={handlePaneClick}
    on:panecontextmenu={handlePaneContextMenu}
    on:nodecontextmenu={handleNodeContextMenu}
  >
    <Controls showLock={false} showZoom={false} showFitView={false} />
    <Background variant={BackgroundVariant.Dots} gap={50} />

    {#if connectEndMenu.show}
      <ConnectEndMenu />
    {/if}

    {#if paneContextMenu.show}
      <PaneContextMenu />
    {/if}

    {#if nodeContextMenu.show}
      <NodeContextMenu />
    {/if}
  </SvelteFlow>

  <StatusBar />
</main>

<style>
  main {
    width: 102%;
    height: 103%;
    margin-top: -1px;
    margin-left: -1%;
  }
</style>
