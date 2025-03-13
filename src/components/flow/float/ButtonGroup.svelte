<script lang="ts">
  import { get_current_edge_data, get_current_node_data, nodes } from "../../../stores/flow.svelte";
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
  <div class="d-flex flex-column gap-1">
    <button class="btn btn-sm btn-secondary" onclick={() => fitView({ duration: 1000 })}>Fit View</button>
    <button class="btn btn-sm btn-success" onclick={() => save()}>Save</button>
  </div>
</aside>

<style>
  aside {
    position: absolute;
    right: 1rem;
    top: 4rem;
    background: transparent;
    z-index: 997;
  }
</style>
