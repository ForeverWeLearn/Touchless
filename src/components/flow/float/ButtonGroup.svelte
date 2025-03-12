<script lang="ts">
  import { get_current_edge_data, get_current_node_data } from "../../../stores/flow.svelte";
  import { AppFileWriter } from "../../../scripts/utils/writer";
  import { useSvelteFlow } from "@xyflow/svelte";

  const { fitView, getViewport } = useSvelteFlow();

  async function save() {
    const node_data = get_current_node_data();
    const edge_data = get_current_edge_data();
    const viewport = getViewport();
    AppFileWriter.chart_data(node_data, edge_data, viewport);
  }
</script>

<aside>
  <div class="row">
    <div class="col me-2">
      <div class="row">
        <button class="btn btn-sm btn-secondary mt-1" onclick={() => fitView({ duration: 1000 })}>Fit View</button>
        <button class="btn btn-sm btn-success mt-1" onclick={() => save()}>Save</button>
      </div>
    </div>
  </div>
</aside>

<style>
  aside {
    position: absolute;
    right: 30px;
    top: 80px;
    width: 4rem;
    background: transparent;
    z-index: 997;
  }
</style>
