<script lang="ts">
  import { appStore } from "../../../stores/app.svelte";
  import { settings } from "../../../stores/settings.svelte";
  import { TaskType } from "../../../types/nodes";
</script>

<aside>
  <div class="d-flex justify-content-end gap-2">
    <div class="d-flex flex-column gap-3 ms-5" style="position: absolute; left: 0; bottom: 0">
      {#each appStore.taskHistory as task (task)}
        <div class="d-flex gap-3 appear-then-disappear">
          <img
            class="img-filter"
            src={task.type == TaskType.COMMAND
              ? settings.icons.tasks.COMMAND
              : task.type == TaskType.KEY_SEQUENCE
                ? settings.icons.tasks.KEY_SEQUENCE
                : settings.icons.tasks.TEXT}
            alt=""
          />
          <div>{task.name}</div>
        </div>
      {/each}
    </div>
  </div>
</aside>

<style>
  aside {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 2rem;
    z-index: 997;
  }
</style>
