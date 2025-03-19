<script lang="ts">
  import type { TasksNodeData } from "../../../../scripts/flow/nodes/tasks";
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import TaskLayout from "./TaskLayout.svelte";

  type $$Props = NodeProps<Node<TasksNodeData>>;

  export let data: TasksNodeData;
</script>

<div>
  <Handle type="target" position={Position.Left} />

  <TaskLayout {data}></TaskLayout>
</div>
