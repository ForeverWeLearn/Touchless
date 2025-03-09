<script lang="ts">
  import { useSvelteFlow } from "@xyflow/svelte";
  import { save_chart } from "../../../scripts/utils/writer";

  const { fitView, getViewport } = useSvelteFlow();

  async function save_and_reload() {
    await save_chart(getViewport());
  }
</script>

<aside>
  <div class="row">
    <div class="col me-2">
      <div class="row">
        <button class="btn btn-sm btn-secondary mt-1" onclick={() => fitView({ duration: 1000 })}>Fit View</button>
        <button class="btn btn-sm btn-success mt-1" onclick={() => save_and_reload()}>Save</button>
      </div>
    </div>
  </div>
</aside>

<style>
  aside {
    position: absolute;
    right: 30px;
    top: 80px;
    width: 4em;
    background: transparent;
    z-index: 997;
  }
</style>
