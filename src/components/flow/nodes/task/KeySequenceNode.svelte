<script lang="ts">
  import type { KeySequenceNodeData } from "../../../../scripts/flow/nodes/task/key_sequence";
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import KeySequenceLayout from "./KeySequenceLayout.svelte";
  import { nodes } from "../../../../stores/flow.svelte";

  type $$Props = NodeProps<Node<KeySequenceNodeData>>;

  export let data: KeySequenceNodeData;
</script>

<div class="root-node">
  <Handle type="target" position={Position.Left} />

  <KeySequenceLayout raw_data={data} reactive_data={nodes[data.id].data as KeySequenceNodeData} id={data.id}></KeySequenceLayout>

  <Handle type="source" position={Position.Right} />
</div>
