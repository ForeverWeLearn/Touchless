<script lang="ts">
  import type { ConditionsNodeData } from "../../../../scripts/flow/nodes/conditions";
  import AddConditionButtons from "../../generic/AddConditionButtons.svelte";
  import ConditionsAttribute from "../../attributes/ConditionsAttribute.svelte";
  import DistanceAttribute from "../../attributes/DistanceAttribute.svelte";
  import GesturesAttribute from "../../attributes/GesturesAttribute.svelte";
  import RotationAttribute from "../../attributes/RotationAttribute.svelte";
  import NodeLabel from "../../generic/NodeLabel.svelte";

  let { data }: { data: ConditionsNodeData } = $props();
</script>

<div class="node d-flex flex-column gap-2" class:node-active={data.runtime.activated} style="width: 600px;">
  <div class="d-flex flex-column justify-content-center mt-3">
    <NodeLabel {data} />
  </div>

  <div class="d-flex flex-column gap-4" class:disabled={!data.enable}>
    <div class="d-flex flex-column justify-content-center gap-3">
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div class="btn-group mx-5" role="group">
        <input
          type="radio"
          class="btn-check"
          name="btnradio-{data.id}"
          id="btnradio1-{data.id}"
          autocomplete="off"
          checked={data.logic == "AND"}
        />
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <label
          class="btn btn-outline-light"
          for="btnradio1-{data.id}"
          style="width: 1rem;"
          onclick={() => (data.logic = "AND")}>AND</label
        >

        <input
          type="radio"
          class="btn-check"
          name="btnradio-{data.id}"
          id="btnradio2-{data.id}"
          autocomplete="off"
          checked={data.logic == "OR"}
        />
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <label
          class="btn btn-outline-light"
          for="btnradio2-{data.id}"
          style="width: 1rem;"
          onclick={() => (data.logic = "OR")}>OR</label
        >
      </div>

      <AddConditionButtons {data} />
    </div>

    <div class="d-flex flex-column gap-3 mb-4" class:disabled={!data.enable}>
      <ConditionsAttribute {data}></ConditionsAttribute>

      {#if data.gestures.included}
        <GesturesAttribute data={data.gestures}></GesturesAttribute>
      {/if}
      {#if data.distance.included}
        <DistanceAttribute data={data.distance}></DistanceAttribute>
      {/if}
      {#if data.rotation.included}
        <RotationAttribute data={data.rotation}></RotationAttribute>
      {/if}
    </div>
  </div>
</div>
