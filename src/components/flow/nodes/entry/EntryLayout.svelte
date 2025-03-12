<script lang="ts">
  import type { EntryNodeData } from "../../../../scripts/flow/nodes/entry";
  import { hand_results } from "../../../../stores/engine.svelte";
  import NodeLabel from "../../generic/NodeLabel.svelte";

  let { raw_data, reactive_data }: { raw_data: EntryNodeData; reactive_data: EntryNodeData } = $props();

  const hand_detected = $derived(hand_results[0].has || hand_results[1].has);

  $effect(() => {
    raw_data.enable = reactive_data.enable;
  });
</script>

<div
  class="node-container"
  class:node-container-active={hand_detected}
>
  <NodeLabel id={raw_data.id} name="Entry" enable={reactive_data.enable} />

</div>
