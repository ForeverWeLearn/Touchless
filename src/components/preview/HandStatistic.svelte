<script lang="ts">
  import { GESTURE_NAMES, type HandednessID } from "../../scripts/utils/const";
  import { handResults } from "../../stores/engine.svelte";

  let { handedness }: { handedness: HandednessID } = $props();
</script>

<div class="col statistic {handResults[handedness].has ? '' : 'faded'}">
  <div class="row">
    <img
      class:flip-h={handedness == 0}
      src="imgs/gestures/{GESTURE_NAMES[handResults[handedness].gesture_id]}.svg"
      alt=""
    />

    <div class="h6 text-center mt-4">Confidence</div>
    <progress value={handResults[handedness].confidence}></progress>

    <div class="h6 text-center mt-2">Stability</div>
    <progress value={handResults[handedness].stability}></progress>
  </div>
</div>

<style>
  .statistic {
    padding: 2rem;
    width: 100%;
  }
</style>
