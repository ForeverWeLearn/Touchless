<script lang="ts">
  import type { DistanceNodeData } from "../../../scripts/utils/node";
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import Distance from "../components/Distance.svelte";
  import { nodes } from "../../../stores/flow_state.svelte";

  type $$Props = NodeProps<Node<DistanceNodeData>>;

  export let data: DistanceNodeData;
</script>

<div class="root-node">
  <Handle type="target" position={Position.Left} />

  <Distance raw_data={data} reactive_data={nodes[data.id].data as DistanceNodeData} id={data.id}></Distance>

  <Handle type="source" position={Position.Right} />
</div>
