<script lang="ts">
  import { hand_results } from "../stores/hand_result.svelte";
  import { engine_state } from "../stores/engine_state.svelte";
  import { GESTURES, type HandednessName } from "../scripts/utils/const";

  let { handedness }: { handedness: HandednessName } = $props();

  let hand_result = handedness == "Left" ? hand_results[0] : hand_results[1];

  let result_text = $derived(
    !engine_state.running ? "NONE" : !hand_result.has ? "SCANNING" : GESTURES[hand_result.gesture_id]
  );

  let gesture_icon_path = $derived(
    !engine_state.running
      ? "imgs/hand/Left/NONE.svg"
      : !hand_result.has
        ? "imgs/hand/Left/SCANNING.svg"
        : `imgs/hand/${handedness}/${GESTURES[hand_result.gesture_id]}.svg`
  );
</script>

<div class="container text-center m-4 text-light">
  <h1 class="handedness">
    {handedness}
  </h1>
  <h4 class="result-text mb-4">{result_text}</h4>

  <div class="d-flex align-items-center justify-content-center">
    <img src={gesture_icon_path} alt="Gesture" class="img-fluid" />
  </div>

  <div class="col mt-4 ps-2 pe-2">
    <div class="row">
      <div class="col col-6 text-start">Time</div>
      <div class=" col col-6 text-end number">{(hand_result.hold_time / 1000).toFixed(0)}s</div>
    </div>
    <div class="row">
      <div class="col col-6 text-start">Confidence</div>
      <div class="col col-6 text-end number">{(hand_result.confidence * 100).toFixed(0)}%</div>
      <progress value="{hand_result.confidence}" max=1></progress>
    </div>
    <div class="row">
      <div class="col col-6 text-start">Stability</div>
      <div class="col col-6 text-end number">{hand_result.stability.toFixed(2)}</div>
      <progress value="{hand_result.stability}" max=1></progress>
    </div>
  </div>
</div>

<style>
  .container {
    width: 100%;
    max-width: 200px;
  }

  .handedness {
    text-transform: capitalize;
  }

  .result-text {
    word-break: break-all;
  }

  .number {
    font-family: MartianMono !important;
    font-weight: 300;
  }
</style>
