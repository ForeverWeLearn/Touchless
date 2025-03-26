<script lang="ts">
  import type { EntryNodeData } from "../../../../types/nodes";
  import { handResults } from "../../../../stores/engine.svelte";
  import NodeLabel from "../components/NodeLabel.svelte";

  let { data }: { data: EntryNodeData } = $props();

  const handDetected = $derived(handResults[0].has || handResults[1].has);
</script>

<div class="node d-flex flex-column gap-2" class:node-active={handDetected} style="width: 300px;">
  <div class="d-flex flex-column mt-3">
    <NodeLabel {data} />
  </div>
</div>
