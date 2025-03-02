<script lang="ts">
  import type { TaskNodeData } from "../../../scripts/utils/node";
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import Task from "../components/Task.svelte";
  import { nodes } from "../../../stores/flow_state.svelte";

  type $$Props = NodeProps<Node<TaskNodeData>>;

  export let data: TaskNodeData;
</script>

<div class="root-node">
  <Handle type="target" position={Position.Left} />

  <Task raw_data={data} reactive_data={nodes[data.id].data as TaskNodeData} id={data.id}></Task>
</div>
