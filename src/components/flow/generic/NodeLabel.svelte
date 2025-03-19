<script lang="ts">
  import { NodeType, type BaseNodeData } from "../../../scripts/flow/nodes/node";
  import { settings } from "../../../stores/settings.svelte";

  let { data }: { data: BaseNodeData } = $props();

  const src =
    data.type == NodeType.ENTRY
      ? settings.icons.nodes.ENTRY
      : data.type == NodeType.CONDITIONS
        ? settings.icons.nodes.CONDITIONS
        : data.type == NodeType.TASKS
          ? settings.icons.nodes.TASKS
          : settings.icons.nodes.POWER;
</script>

<div class="form-check node-label-box" class:faded={!data.enable}>
  <input
    class="form-check-input"
    type="checkbox"
    id="node-label-{data.id}"
    bind:checked={data.enable}
    style="display: none;"
  />
  <label
    class="form-check-label node-label d-flex align-items-center"
    for="node-label-{data.id}"
    style="cursor: pointer; text-transform: uppercase"
  >
    <img style="height: 2rem; aspect-ratio: 1; margin-left: -1rem; margin-right: 1rem" {src} alt="" />
    <div>{data.type}</div>
  </label>
</div>
