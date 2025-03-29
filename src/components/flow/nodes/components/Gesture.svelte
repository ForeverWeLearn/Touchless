<script lang="ts">
  import type { GestureCondition } from "../../../../types/nodes";
  import type { HandednessID } from "../../../../types/core";
  import { sidebarSize, windowSize } from "../../../../stores/geometry.svelte";
  import menuStore from "../../../../stores/flow/menu.svelte";

  let { data, handedness }: { data: GestureCondition; handedness: HandednessID } = $props();

  function onclick(event: MouseEvent) {
    event.preventDefault();

    menuStore.gestureSelect.show = true;

    menuStore.gestureSelect.gesture = data;
    menuStore.gestureSelect.handedness = handedness;

    // @ts-ignore
    menuStore.gestureSelect.top = event.y < windowSize.height - 400 ? event.y - Math.min(200, event.y - 7) : undefined;
    // @ts-ignore
    menuStore.gestureSelect.left =
      event.x < windowSize.width - 400
        ? event.x - sidebarSize.width - Math.min(200, event.x - sidebarSize.width - 7)
        : undefined;

    // @ts-ignore
    menuStore.gestureSelect.bottom =
      event.y >= windowSize.height - 400
        ? windowSize.height - event.y - Math.min(200, windowSize.height - event.y - 24)
        : undefined;
    // @ts-ignore
    menuStore.gestureSelect.right =
      event.x >= windowSize.width - 400
        ? windowSize.width - event.x - Math.min(200, windowSize.width - event.x - 7)
        : undefined;
  }
</script>

<div class="select-box gesture-select-box nodrag" style="position: relative;">
  <input class="form-check-input gesture-checkbox" type="checkbox" bind:checked={data.enable} />

  <button class="btn btn-nbd" class:faded={!data.enable} {onclick}>
    <img
      class="img-filter gesture-icon"
      class:flip-h={handedness == 0}
      src="imgs/gestures/{data.name}.svg"
      alt="Gesture"
    />
  </button>
</div>

<style>
  input[type="checkbox"] {
    cursor: pointer;
  }
</style>
