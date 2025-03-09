<script lang="ts">
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import { nodes } from "../../../../stores/flow.svelte";
  import type { RotationNodeData } from "../../../../scripts/flow/nodes/condition/rotation";
  import RotationLayout from "./RotationLayout.svelte";

  type $$Props = NodeProps<Node<RotationNodeData>>;

  export let data: RotationNodeData;
</script>

<div class="root-node">
  <Handle type="target" position={Position.Left} />

  <RotationLayout raw_data={data} reactive_data={nodes[data.id].data as RotationNodeData} id={data.id}></RotationLayout>

  <Handle type="source" position={Position.Right} />
</div>
