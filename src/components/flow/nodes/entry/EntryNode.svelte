<script lang="ts">
  import type { EntryNodeData } from "../../../../scripts/flow/nodes/entry";
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import EntryLayout from "./EntryLayout.svelte";

  type $$Props = NodeProps<Node<EntryNodeData>>;

  export let data: EntryNodeData;
</script>

<div>
  <EntryLayout {data}></EntryLayout>

  <Handle type="source" position={Position.Right} />
</div>
