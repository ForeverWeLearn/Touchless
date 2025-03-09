<script lang="ts">
  import { GESTURE_NAMES, HANDEDNESS_NAMES, type HandednessID } from "../../scripts/utils/const";
  import { hand_results } from "../../stores/engine.svelte";

  let { handedness }: { handedness: HandednessID } = $props();
</script>

<img
  src="imgs/hand/{HANDEDNESS_NAMES[handedness]}/{GESTURE_NAMES[hand_results[handedness].gesture_id]}.svg"
  alt="Gesture"
/>
