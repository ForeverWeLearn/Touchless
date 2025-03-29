<script lang="ts">
  import menuStore from "../../../stores/flow/menu.svelte";
  import { settings } from "../../../stores/settings.svelte";
  import { ConditionType } from "../../../types/nodes";
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="context-menu"
  style="
    top: {menuStore.conditionTypeSelect.top}px; 
    left: {menuStore.conditionTypeSelect.left}px; 
    right: {menuStore.conditionTypeSelect.right}px; 
    bottom: {menuStore.conditionTypeSelect.bottom}px"
  onclick={() => (menuStore.conditionTypeSelect.show = false)}
>
  <div class="background-cover"></div>

  <div class="context-menu-content p-4">
    <div class="h6 text-center mb-4">Select Condition</div>

    <div class="d-flex gap-3" style="font-size: 0.8rem;">
      {#each Object.values(ConditionType) as type}
        <button
          class="d-flex flex-fill flex-column align-items-center gap-3 p-3"
          onclick={() => menuStore.conditionTypeSelect.callback(type)}
        >
          <img class="img-filter" src={settings.icons.conditions[type]} alt="" style="width: 75%;" />
          <div>{type}</div>
        </button>
      {/each}
    </div>
  </div>
</div>

<style>
  .context-menu {
    width: 400px;
    max-width: 400px;
  }
</style>
