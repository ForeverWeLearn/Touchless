<script lang="ts">
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  
  import type { EntryNodeData } from "../../../../types/nodes";
  import EntryNodeLayout from "./EntryNodeLayout.svelte";

  type $$Props = NodeProps<Node<EntryNodeData>>;

  export let data: EntryNodeData;
</script>

<div>
  <EntryNodeLayout {data}></EntryNodeLayout>

  <Handle type="source" position={Position.Right} />
</div>
