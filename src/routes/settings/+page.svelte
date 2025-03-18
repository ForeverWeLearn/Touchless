<script lang="ts">
  import { theme } from "../../stores/appearance.svelte";
</script>

<h1>Settings (in progress)</h1>
<select bind:value={theme.current} style="text-transform: capitalize;">
  {#each theme.list as th}
    <option value={th} style="text-transform: capitalize;">{th}</option>
  {/each}
</select>
