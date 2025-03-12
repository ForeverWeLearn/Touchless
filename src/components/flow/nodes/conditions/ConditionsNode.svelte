<script lang="ts">
  import type { ConditionsNodeData } from "../../../../scripts/flow/nodes/conditions";
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import { nodes } from "../../../../stores/flow.svelte";
  import ConditionsLayout from "./ConditionsLayout.svelte";

  type $$Props = NodeProps<Node<ConditionsNodeData>>;

  export let data: ConditionsNodeData;
</script>

<div class="root-node">
  <Handle type="target" position={Position.Left} />

  <ConditionsLayout raw_data={data} reactive_data={nodes[data.id].data as ConditionsNodeData}></ConditionsLayout>

  <Handle type="source" position={Position.Right} />
</div>
