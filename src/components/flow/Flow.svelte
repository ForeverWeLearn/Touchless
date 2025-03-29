<script lang="ts">
  import "@xyflow/svelte/dist/style.css";

  import { type OnConnectEnd, BackgroundVariant, SvelteFlow, Background, useSvelteFlow } from "@xyflow/svelte";

  import { viewportStore } from "../../stores/flow/viewport.svelte";
  import { EdgeType, edgeTypes } from "../../types/edges";
  import { NodeType } from "../../types/nodes";
  import { flowSize } from "../../stores/geometry.svelte";
  import { onMount } from "svelte";
  import GestureSelectMenu from "./menus/GestureSelectMenu.svelte";
  import PointSelectMenu from "./menus/PointSelectMenu.svelte";
  import NodeContextMenu from "./menus/NodeContextMenu.svelte";
  import PaneContextMenu from "./menus/PaneContextMenu.svelte";
  import ConditionsNode from "./nodes/condition/ConditionNode.svelte";
  import ConnectEndMenu from "./menus/ConnectEndMenu.svelte";
  import menuStore from "../../stores/flow/menu.svelte";
  import StatusBar from "./float/StatusBar.svelte";
  import EntryNode from "./nodes/entry/EntryNode.svelte";
  import nodeStore from "../../stores/flow/node.svelte";
  import edgeStore from "../../stores/flow/edge.svelte";
  import TaskNode from "./nodes/tasks/TaskNode.svelte";
  import TopBar from "./float/TopBar.svelte";
  import ConditionTypeSelectMenu from "./menus/ConditionTypeSelectMenu.svelte";

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

    menuStore.hideAll();

    const sourceNodeId = connectionState.fromNode?.id ?? "0";

    event.preventDefault();
    event = event as MouseEvent;

    menuStore.connectEnd.show = true;
    menuStore.connectEnd.source = sourceNodeId;

    // @ts-ignore
    menuStore.connectEnd.top = event.offsetY < flowSize.height - 200 ? event.offsetY : undefined;
    // @ts-ignore
    menuStore.connectEnd.left = event.offsetX < flowSize.width - 200 ? event.offsetX : undefined;

    // @ts-ignore
    menuStore.connectEnd.bottom = event.offsetY >= flowSize.height - 200 ? flowSize.height - event.clientY : undefined;
    // @ts-ignore
    menuStore.connectEnd.right = event.offsetX >= flowSize.width - 200 ? flowSize.width - event.offsetX : undefined;

    menuStore.connectEnd.lastOpen = performance.now();
  };

  // @ts-ignore
  function handleNodeContextMenu({ detail: { event, node } }) {
    event.preventDefault();

    menuStore.hideAll();

    menuStore.nodeContext.show = true;
    menuStore.nodeContext.source = node.id;
    menuStore.nodeContext.top = event.clientY;
    menuStore.nodeContext.left = event.clientX;
  }

  // @ts-ignore
  function handlePaneContextMenu({ detail: { event } }) {
    event.preventDefault();

    menuStore.hideAll();

    menuStore.paneContext.show = true;

    menuStore.paneContext.top = event.offsetY < flowSize.height - 200 ? event.offsetY : undefined;
    menuStore.paneContext.left = event.offsetX < flowSize.width - 200 ? event.offsetX : undefined;

    // @ts-ignore
    menuStore.paneContext.bottom = event.offsetY >= flowSize.height - 200 ? flowSize.height - event.clientY : undefined;
    // @ts-ignore
    menuStore.paneContext.right = event.offsetX >= flowSize.width - 200 ? flowSize.width - event.offsetX : undefined;
  }

  function handlePaneClick() {
    menuStore.hideAll();
  }
</script>

<main bind:offsetWidth={flowSize.width} bind:offsetHeight={flowSize.height}>
  <SvelteFlow
    {nodeTypes}
    {edgeTypes}
    defaultEdgeOptions={{ type: EdgeType.BUTTON }}
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

    {#if menuStore.connectEnd.show}
      <ConnectEndMenu />
    {/if}

    {#if menuStore.paneContext.show}
      <PaneContextMenu />
    {/if}

    {#if menuStore.nodeContext.show}
      <NodeContextMenu />
    {/if}

    {#if menuStore.gestureSelect.show}
      <GestureSelectMenu />
    {/if}

    {#if menuStore.pointSelect.show}
      <PointSelectMenu />
    {/if}

    {#if menuStore.conditionTypeSelect.show}
      <ConditionTypeSelectMenu />
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
