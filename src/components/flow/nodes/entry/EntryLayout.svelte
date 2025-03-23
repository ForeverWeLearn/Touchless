<script lang="ts">
  import type { EntryNodeData } from "../../../../scripts/flow/nodes/entry";
  import { handResults } from "../../../../stores/engine.svelte";
  import NodeLabel from "../../generic/NodeLabel.svelte";

  let { data }: { data: EntryNodeData } = $props();

  const handDetected = $derived(handResults[0].has || handResults[1].has);
</script>

<div class="node d-flex flex-column gap-2" class:node-active={handDetected} style="width: 300px;">
  <div class="d-flex flex-column mt-3">
    <NodeLabel {data} />
  </div>

  <div class="d-flex flex-column mx-1 mb-4 nodrag">
    <cite contenteditable="true" spellcheck="false" bind:textContent={data.message} style="padding: 0.5rem;"></cite>
  </div>
</div>
