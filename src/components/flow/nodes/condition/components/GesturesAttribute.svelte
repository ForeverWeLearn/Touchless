<script lang="ts">
  import type { GesturesCondition } from "../../../../../types/nodes";
  import Gesture from "../../components/Gesture.svelte";

  let { data }: { data: GesturesCondition } = $props();
</script>

<div class="d-flex align-items-center gap-4">
  <div class="d-flex align-items-center gap-1">
    <Gesture data={data.gestures[0]} handedness={0} />
    <Gesture data={data.gestures[1]} handedness={1} />
  </div>
</div>
