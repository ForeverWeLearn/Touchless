<script lang="ts">
  import type { ConditionsNodeData } from "../../../../scripts/flow/nodes/conditions";
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import ConditionsLayout from "./ConditionsLayout.svelte";

  type $$Props = NodeProps<Node<ConditionsNodeData>>;

  export let data: ConditionsNodeData;
</script>

<div>
  <Handle type="target" position={Position.Left} />

  <ConditionsLayout {data}></ConditionsLayout>

  <Handle type="source" position={Position.Right} />
</div>
