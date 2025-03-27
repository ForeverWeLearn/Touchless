<script lang="ts">
  import "@xyflow/svelte/dist/style.css";

  import { type OnConnectEnd, BackgroundVariant, SvelteFlow, Background, useSvelteFlow } from "@xyflow/svelte";
  import { connectEndMenu, nodeContextMenu, paneContextMenu } from "../../stores/flow/menu.svelte";
  import { viewportStore } from "../../stores/flow/viewport.svelte";
  import { clientSize, sidebarSize } from "../../stores/geometry.svelte";
  import { NodeType } from "../../types/nodes";
  import { onMount } from "svelte";
  import NodeContextMenu from "./menus/NodeContextMenu.svelte";
  import PaneContextMenu from "./menus/PaneContextMenu.svelte";
  import ConditionsNode from "./nodes/condition/ConditionNode.svelte";
  import ConnectEndMenu from "./menus/ConnectEndMenu.svelte";
  import StatusBar from "./float/StatusBar.svelte";
  import EntryNode from "./nodes/entry/EntryNode.svelte";
  import nodeStore from "../../stores/flow/node.svelte";
  import edgeStore from "../../stores/flow/edge.svelte";
  import TaskNode from "./nodes/tasks/TaskNode.svelte";
  import TopBar from "./float/TopBar.svelte";

  const { viewport, setViewport } = useSvelteFlow();

  const nodeTypes = {
    [NodeType.ENTRY]: EntryNode,
    [NodeType.CONDITION]: ConditionsNode,
    [NodeType.TASK]: TaskNode,
  };

  viewport.subscribe((v) => {
    viewportStore.viewport = v;
  });

  onMount(() => {
    setViewport(viewportStore.initialViewport);
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

    // @ts-ignore
    connectEndMenu.top = event.clientY < clientSize.height - 200 ? event.clientY : undefined;
    // @ts-ignore
    connectEndMenu.left = event.clientX < clientSize.width - 200 ? event.clientX : undefined;

    // @ts-ignore
    connectEndMenu.right =
      event.clientX >= clientSize.width - 200 ? clientSize.width + sidebarSize.width - event.clientX : undefined;
    // @ts-ignore
    connectEndMenu.bottom = event.clientY >= clientSize.height - 200 ? clientSize.height - event.clientY : undefined;

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

    paneContextMenu.top = event.clientY < clientSize.height - 200 ? event.clientY : undefined;
    paneContextMenu.left = event.clientX < clientSize.width - 200 ? event.clientX : undefined;

    // @ts-ignore
    paneContextMenu.right =
      event.clientX >= clientSize.width - 200 ? clientSize.width + sidebarSize.width - event.clientX : undefined;
    // @ts-ignore
    paneContextMenu.bottom = event.clientY >= clientSize.height - 200 ? clientSize.height - event.clientY : undefined;
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

<main bind:clientWidth={clientSize.width} bind:clientHeight={clientSize.height}>
  <SvelteFlow
    {nodeTypes}
    nodes={nodeStore.nodesWritable}
    edges={edgeStore.edgesWritable}
    initialViewport={viewportStore.initialViewport}
    minZoom={0.2}
    maxZoom={10}
    snapGrid={[50, 50]}
    onconnectend={handleConnectEnd}
    on:paneclick={handlePaneClick}
    on:panecontextmenu={handlePaneContextMenu}
  >
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

  <TopBar />
  <StatusBar />
</main>

<style>
  main {
    width: calc(100% + 3px);
    height: calc(100% + 20px);
    margin-top: -1px;
    margin-left: -1px;
  }
</style>
