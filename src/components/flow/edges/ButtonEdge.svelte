<script lang="ts">
  import { getBezierPath, BaseEdge, type EdgeProps, EdgeLabelRenderer, useEdges } from "@xyflow/svelte";
  import { ICON_PATHS } from "../../../types/core";
  import edgeStore from "../../../stores/flow/edge.svelte";

  type $$Props = EdgeProps;

  export let id: $$Props["id"];
  export let sourceX: $$Props["sourceX"];
  export let sourceY: $$Props["sourceY"];
  export let sourcePosition: $$Props["sourcePosition"];
  export let targetX: $$Props["targetX"];
  export let targetY: $$Props["targetY"];
  export let targetPosition: $$Props["targetPosition"];
  export let markerEnd: $$Props["markerEnd"] = undefined;
  export let style: $$Props["style"] = undefined;

  $: [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
</script>

<BaseEdge path={edgePath} {markerEnd} {style} />
<EdgeLabelRenderer>
  <div
    class="edgeButtonContainer nodrag nopan"
    style:transform="translate(-50%, -50%) translate({labelX}px,{labelY}px)"
  >
    <button class="btn edgeButton" onclick={() => edgeStore.removeByID(id)}>
      <img class="img-filter" src={ICON_PATHS.CONTENT_CUT} alt="" />
    </button>
  </div>
</EdgeLabelRenderer>

<style>
  .edgeButtonContainer {
    padding: 2rem;
    position: absolute;
    pointer-events: all;
    opacity: 0;
    transition: opacity 0.3s;
  }

  .edgeButtonContainer:hover {
    opacity: 1;
  }

  .edgeButton {
    background: var(--bg-color-1);
    aspect-ratio: 1;
    border: solid 1px var(--fg-color-2);
    cursor: pointer;
  }

  .edgeButton:hover {
    background: var(--bg-color-1);
  }
</style>
