<script lang="ts">
  import type { GesturesConditionAttribute } from "../../../../scripts/flow/attributes/condition/gestures";
  import type { ConditionsNodeData } from "../../../../scripts/flow/nodes/conditions";
  import GesturesAttribute from "../../attributes/gestures/GesturesAttribute.svelte";
  import AddConditionButtons from "../../generic/AddConditionButtons.svelte";
  import NodeLabel from "../../generic/NodeLabel.svelte";

  let { raw_data, reactive_data }: { raw_data: ConditionsNodeData; reactive_data: ConditionsNodeData } = $props();

  $effect(() => {
    raw_data.enable = reactive_data.enable;
  });
</script>

<div class="node-container d-flex flex-column gap-3">
  <div class="d-flex flex-column">
    <NodeLabel id={raw_data.id} name="Condition" enable={reactive_data.enable} />
    <AddConditionButtons {reactive_data} />
  </div>

  <div class="d-flex flex-column">
    {#if reactive_data.gestures.enable}
      <GesturesAttribute
        raw_data={raw_data.gestures as GesturesConditionAttribute}
        reactive_data={reactive_data.gestures}
      ></GesturesAttribute>
    {/if}
  </div>
</div>
