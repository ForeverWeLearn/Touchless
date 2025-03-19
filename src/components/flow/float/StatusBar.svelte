<script lang="ts">
  import { edges_writable, nodeStore } from "../../../stores/flow.svelte";
  import { appStore, refresh } from "../../../stores/app.svelte";
  import { AppFileWriter } from "../../../scripts/utils/writer";
  import { useSvelteFlow } from "@xyflow/svelte";
  import { settings } from "../../../stores/settings.svelte";
  import { TaskType } from "../../../scripts/flow/attributes/task";

  const { fitView, getViewport } = useSvelteFlow();

  async function save() {
    await nodeStore.resetRuntimeState();
    await AppFileWriter.writeNodeData(nodeStore.nodes);
    await AppFileWriter.writeEdgeData($edges_writable);
    await AppFileWriter.writeViewData(getViewport());
    await refresh();
  }

  async function resetDefault() {
    await nodeStore.resetRuntimeState();
    await AppFileWriter.removeNodeFile();
    await AppFileWriter.removeEdgeFile();
    await AppFileWriter.removeViewFile();
    await refresh();
  }
</script>

<aside>
  <div class="d-flex justify-content-end gap-2">
    <div class="d-flex flex-column gap-3 ms-5" style="position: absolute; left: 0; bottom: 0">
      {#each appStore.taskHistory as task (task)}
        <div class="d-flex gap-3 appear-then-disappear">
          <img
            src={task.type == TaskType.COMMAND ? settings.icons.tasks.COMMAND : settings.icons.tasks.KEY_SEQUENCE}
            alt=""
          />
          <div>{task.name}</div>
        </div>
      {/each}
    </div>

    <div class="d-flex mt-auto gap-2 mx-5">
      <button class="btn btn-nbd btn-dark" onclick={() => fitView({ duration: 1000 })}>Fit View</button>
      <button class="btn btn-nbd btn-dark" onclick={() => resetDefault()}>Default</button>
      <button class="btn btn-nbd {settings.pendingSave ? 'btn-success' : 'btn-success'}" onclick={() => save()}>
        {settings.pendingSave ? "Save and Reload" : "Saved"}
      </button>
    </div>
  </div>
</aside>

<style>
  aside {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2rem;
    background: transparent;
    z-index: 997;
  }
</style>
