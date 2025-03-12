<script lang="ts">
  import type { EntryNodeData } from "../../../../scripts/flow/nodes/entry";
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import { nodes } from "../../../../stores/flow.svelte";
  import EntryLayout from "./EntryLayout.svelte";

  type $$Props = NodeProps<Node<EntryNodeData>>;

  export let data: EntryNodeData;
</script>

<div class="root-node">
  <EntryLayout raw_data={data} reactive_data={nodes[data.id].data as EntryNodeData}></EntryLayout>

  <Handle type="source" position={Position.Right} />
</div>
