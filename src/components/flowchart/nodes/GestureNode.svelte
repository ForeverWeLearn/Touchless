<script lang="ts">
  import type { GestureNodeData } from "../../../scripts/flowchart/nodes/conditions/gesture";
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import { nodes } from "../../../stores/flow_state.svelte";
  import Gesture from "./Gesture.svelte";

  type $$Props = NodeProps<Node<GestureNodeData>>;

  export let data: GestureNodeData;
</script>

<div class="root-node">
  <Handle type="target" position={Position.Left} />

  <Gesture raw_data={data} reactive_data={nodes[data.id].data as GestureNodeData} id={data.id}></Gesture>

  <Handle type="source" position={Position.Right} />
</div>
