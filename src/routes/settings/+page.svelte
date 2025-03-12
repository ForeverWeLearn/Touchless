<script>
  import { theme } from "../../stores/appearance.svelte";
</script>

<h1>Settings</h1>
<select bind:value={theme.default} style="text-transform: capitalize;">
  {#each theme.list as th}
    <option value={th} style="text-transform: capitalize;">{th}</option>
  {/each}
</select>
