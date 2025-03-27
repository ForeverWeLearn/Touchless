<script lang="ts">
  import { NodeType, type NodeData } from "../../../../types/nodes";
  import { settings } from "../../../../stores/settings.svelte";
  import { ICON_PATHS } from "../../../../types/core";
  import nodeStore from "../../../../stores/flow/node.svelte";

  let { data }: { data: NodeData } = $props();

  const src =
    data.type == NodeType.ENTRY
      ? settings.icons.nodes.ENTRY
      : data.type == NodeType.CONDITION
        ? settings.icons.nodes.CONDITION
        : settings.icons.nodes.TASK;
</script>

<div class="form-check node-label-box" style="position: relative;" class:faded={!data.enable}>
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
    <img
      class="img-filter"
      style="height: 2rem; aspect-ratio: 1; margin-left: -1rem; margin-right: 1rem"
      {src}
      alt=""
    />
    <div>{data.type}</div>

    <div class="d-flex btn-group">
      <button class="btn btn-nbd" onclick={() => nodeStore.remove(data.id)}>
        <img class="img-filter" src={ICON_PATHS.DELETE} alt="" />
      </button>
    </div>
  </label>
</div>

<style>
  .btn-group {
    position: absolute;
    top: 0;
    right: 0;
  }

  .btn-group button {
    opacity: 0.1;
    transition: opacity 0.3s;
  }

  .btn-group button:hover {
    opacity: 0.8;
  }
</style>
