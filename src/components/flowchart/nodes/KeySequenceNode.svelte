<script lang="ts">
  import type { KeySequenceNodeData } from "../../../scripts/flowchart/nodes/tasks/key_sequence";
  import type { DistanceNodeData } from "../../../scripts/flowchart/nodes/conditions/distance";
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import { nodes } from "../../../stores/flow_state.svelte";
  import KeySequence from "./KeySequence.svelte";

  type $$Props = NodeProps<Node<KeySequenceNodeData>>;

  export let data: KeySequenceNodeData;
</script>

<div class="root-node">
  <Handle type="target" position={Position.Left} />

  <KeySequence raw_data={data} reactive_data={nodes[data.id].data} id={data.id}></KeySequence>

  <Handle type="source" position={Position.Right} />
</div>
