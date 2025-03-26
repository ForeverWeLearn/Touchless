<script lang="ts">
  import { GESTURE_NAMES, type HandednessID } from "../../types/core";
  import { handResults } from "../../stores/engine.svelte";
  import Slider from "../flow/nodes/components/Slider.svelte";

  let { handedness }: { handedness: HandednessID } = $props();
</script>

<div
  class="d-flex flex-column justify-content-center align-items-center gap-5"
  class:faded={!handResults[handedness].has}
>
  <img
    class="img-filter"
    class:flip-h={handedness == 0}
    src="imgs/gestures/{GESTURE_NAMES[handResults[handedness].gesture_id]}.svg"
    alt=""
    style="width: 6rem;"
  />

  <div>
    <Slider
      name="Confidence"
      icon=""
      min={0}
      max={1}
      step={0.1}
      unit=""
      bind:value={handResults[handedness].confidence}
      editable={false}
      showvalue={false}
    ></Slider>
  </div>
</div>
