<script lang="ts">
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";

  import type { TaskNodeData } from "../../../../types/nodes";
  import TaskLayout from "./TaskNodeLayout.svelte";

  type $$Props = NodeProps<Node<TaskNodeData>>;

  export let data: TaskNodeData;
</script>

<div>
  <Handle type="target" position={Position.Left} />

  <TaskLayout {data}></TaskLayout>
</div>
