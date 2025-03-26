<script lang="ts">
  import type { TextTask } from "../../../../../types/nodes/task/text";

  let { data }: { data: TextTask } = $props();
</script>

<div class="flex-fill">
  <input class="form-input" type="text" style="width: 100%;" bind:value={data.text} />
</div>
