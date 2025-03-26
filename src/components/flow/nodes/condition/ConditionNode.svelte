<script lang="ts">
  import type { ConditionNodeData } from "../../../../types/nodes";
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import ConditionNodeLayout from "./ConditionNodeLayout.svelte";

  type $$Props = NodeProps<Node<ConditionNodeData>>;

  export let data: ConditionNodeData;
</script>

<div>
  <Handle type="target" position={Position.Left} />

  <ConditionNodeLayout {data}></ConditionNodeLayout>

  <Handle type="source" position={Position.Right} />
</div>
