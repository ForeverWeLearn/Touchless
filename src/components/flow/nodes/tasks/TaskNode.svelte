<script lang="ts">
  import type { TasksNodeData } from "../../../../scripts/flow/nodes/tasks";
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import { nodes } from "../../../../stores/flow.svelte";
  import TaskLayout from "./TaskLayout.svelte";

  type $$Props = NodeProps<Node<TasksNodeData>>;

  export let data: TasksNodeData;
</script>

<div class="root-node">
  <Handle type="target" position={Position.Left} />

  <TaskLayout raw_data={data} reactive_data={nodes[data.id].data as TasksNodeData}></TaskLayout>

  <Handle type="source" position={Position.Right} />
</div>
