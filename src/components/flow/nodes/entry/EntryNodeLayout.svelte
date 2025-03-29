<script lang="ts">
  import type { EntryNodeData } from "../../../../types/nodes";
  import { handResults } from "../../../../stores/engine.svelte";
  import NodeLabel from "../components/NodeLabel.svelte";

  let { data }: { data: EntryNodeData } = $props();

  const handDetected = $derived(handResults[0].has || handResults[1].has);

  let focus = $state(false);
</script>

<div class="node d-flex flex-column gap-2 p-4" class:node-active={data.enable && handDetected} style="width: 450px;">
  <NodeLabel {data} />

  <div class="d-flex mx-4 nodrag" style="position: relative">
    <textarea wrap="hard" maxlength="240" spellcheck={false} bind:value={data.message} bind:focused={focus}></textarea>
    {#if focus}<small>{data.message.length}/240</small>{/if}
  </div>
</div>

<style>
  textarea {
    width: 100%;
    height: 11rem;
    resize: none;

    border: none;

    color: var(--fg-color-2);
    background-color: var(--bg-color-1);
  }

  textarea:focus {
    outline: none !important;
    border: none;
    background-color: transparent;
  }

  small {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 0.7rem;
    color: var(--fg-color-4);
  }
</style>
