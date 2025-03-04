<script lang="ts">
  import type { RootNodeData } from "../../../scripts/utils/node";
  import { Handle, Position, type NodeProps, type Node } from "@xyflow/svelte";
  import Root from "../components/Root.svelte";
  import { nodes } from "../../../stores/flow_state.svelte";

  type $$Props = NodeProps<Node<RootNodeData>>;

  export let data: RootNodeData;
</script>

<div class="root-node">
  <Root raw_data={data} reactive_data={nodes[data.id].data as RootNodeData}></Root>

  <Handle type="source" position={Position.Right} />
</div>
