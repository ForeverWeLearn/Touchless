<script lang="ts">
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import GestureLayout from "./GestureLayout.svelte";
  import type { GestureNodeData } from "../../../../scripts/flow/nodes/condition/gesture";
  import { nodes } from "../../../../stores/flow.svelte";

  type $$Props = NodeProps<Node<GestureNodeData>>;

  export let data: GestureNodeData;
</script>

<div class="root-node">
  <Handle type="target" position={Position.Left} />

  <GestureLayout raw_data={data} reactive_data={nodes[data.id].data as GestureNodeData} id={data.id}></GestureLayout>

  <Handle type="source" position={Position.Right} />
</div>
