<script lang="ts">
  import { ConditionType, type Condition } from "../../../../../types/nodes";
  import { sidebarSize, windowSize } from "../../../../../stores/geometry.svelte";
  import DistanceAttribute from "./DistanceAttribute.svelte";
  import GesturesAttribute from "./GesturesAttribute.svelte";
  import RotationAttribute from "./RotationAttribute.svelte";
  import menuStore from "../../../../../stores/flow/menu.svelte";
  import { settings } from "../../../../../stores/settings.svelte";

  let { data, change, remove }: { data: Condition; change: (type: ConditionType) => void; remove: () => void } =
    $props();

  function onclick(event: MouseEvent) {
    event.preventDefault();

    menuStore.conditionTypeSelect.show = true;

    menuStore.conditionTypeSelect.condition = data;
    menuStore.conditionTypeSelect.callback = change;

    // @ts-ignore
    menuStore.conditionTypeSelect.top =
      event.y < windowSize.height - 400 ? event.y - Math.min(100, event.y - 7) : undefined;
    // @ts-ignore
    menuStore.conditionTypeSelect.left =
      event.x < windowSize.width - 400
        ? event.x - sidebarSize.width - Math.min(200, event.x - sidebarSize.width - 7)
        : undefined;

    // @ts-ignore
    menuStore.conditionTypeSelect.bottom =
      event.y >= windowSize.height - 400
        ? windowSize.height - event.y - Math.min(100, windowSize.height - event.y - 24)
        : undefined;
    // @ts-ignore
    menuStore.conditionTypeSelect.right =
      event.x >= windowSize.width - 400
        ? windowSize.width - event.x - Math.min(200, windowSize.width - event.x - 7)
        : undefined;
  }
</script>

<div class="attr d-flex align-items-center gap-4 py-3 appear" class:attr-active={data.runtime.activated}>
  <div class="d-flex flex-fill gap-2 m-3">
    <button class="d-flex align-items-center gap-3" {onclick}>
      <img class="img-filter" src={settings.icons.conditions[data.type]} alt="" style="width: 75%;" />
      <div>{data.type}</div>
    </button>
  </div>

  <div class="d-flex align-items-center gap-3">
    {#if data.type == ConditionType.GESTURES}
      <GesturesAttribute {data}></GesturesAttribute>
    {:else if data.type == ConditionType.DISTANCE}
      <DistanceAttribute {data}></DistanceAttribute>
    {:else}
      <RotationAttribute {data}></RotationAttribute>
    {/if}
  </div>

  <button class="btn btn-nbd faded" onclick={() => remove()}> ✕ </button>
</div>
