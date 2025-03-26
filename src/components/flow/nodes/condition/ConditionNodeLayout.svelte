<script lang="ts">
  import { ConditionType, getDefaultCondition, type Condition, type ConditionNodeData } from "../../../../types/nodes";
  import ConditionAttribute from "./components/ConditionAttribute.svelte";
  import AttributeForm from "./components/AttributeForm.svelte";
  import NodeLabel from "../components/NodeLabel.svelte";

  let { data }: { data: ConditionNodeData } = $props();
</script>

<div class="node d-flex flex-column gap-2 p-4" class:node-active={data.runtime.activated} style="width: 800px;">
  <NodeLabel {data} />

  <div class="d-flex flex-column gap-3" class:disabled={!data.enable}>
    <ConditionAttribute {data}></ConditionAttribute>

    {#each data.conditions as condition, i (condition)}
      <AttributeForm
        data={condition}
        change={(newCondition: Condition) => {
          data.conditions.splice(i, 1);
          data.conditions.splice(i, 0, newCondition);
        }}
        remove={() => data.conditions.splice(i, 1)}
      ></AttributeForm>
    {/each}

    <button onclick={() => data.conditions.push(getDefaultCondition(ConditionType.GESTURES))}>+</button>
  </div>
</div>
