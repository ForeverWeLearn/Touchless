<script lang="ts">
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import { nodes } from "../../../../stores/flow.svelte";
  import CommandLayout from "./CommandLayout.svelte";
  import type { CommandNodeData } from "../../../../scripts/flow/nodes/task/Command";

  type $$Props = NodeProps<Node<CommandNodeData>>;

  export let data: CommandNodeData;
</script>

<div class="root-node">
  <Handle type="target" position={Position.Left} />

  <CommandLayout raw_data={data} reactive_data={nodes[data.id].data as CommandNodeData} id={data.id}></CommandLayout>

  <Handle type="source" position={Position.Right} />
</div>
