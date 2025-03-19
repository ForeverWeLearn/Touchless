<script lang="ts">
  import { GESTURE_NAMES, type HandednessID } from "../../scripts/utils/const";
  import { hand_results } from "../../stores/engine.svelte";

  let { handedness }: { handedness: HandednessID } = $props();
</script>

<div class="col statistic {hand_results[handedness].has ? '' : 'faded'}">
  <div class="row">
    <img
      class:flip-h={handedness == 0}
      src="imgs/gestures/{GESTURE_NAMES[hand_results[handedness].gesture_id]}.svg"
      alt=""
    />

    <div class="h6 text-center mt-4">Confidence</div>
    <progress value={hand_results[handedness].confidence}></progress>

    <div class="h6 text-center mt-2">Stability</div>
    <progress value={hand_results[handedness].stability}></progress>
  </div>
</div>

<style>
  .statistic {
    padding: 2rem;
    width: 100%;
  }
</style>
