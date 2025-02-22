<script lang="ts">
  import { hand_result_left, hand_result_right } from "../stores/hand_result";
  import { engine_state } from "../stores/engine_state";

  let { handedness, index } = $props();

  let hand_result = index == 0 ? hand_result_left : hand_result_right;

  let result_text = $derived($hand_result.scanning ? "SCANNING" : $hand_result.gesture_label);

  let hold_time_second = $derived(($hand_result.hold_time / 1000).toFixed(1));

  let gesture_icon_path = $derived(
    !$engine_state
      ? "imgs/hand/left/NONE.svg"
      : $hand_result.scanning
        ? "imgs/hand/left/SCANNING.svg"
        : `imgs/hand/${handedness}/${$hand_result.gesture_label}.svg`
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

  <table class="table table-dark mt-4">
    <tbody>
      <tr>
        <th>Time</th>
        <td class="number">{hold_time_second}s</td>
      </tr>
    </tbody>
  </table>
</div>

<style>
  .container {
    width: 100%;
    max-width: 240px;
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
