<script lang="ts">
  import { theme, titlebarBtnGroup } from "../../stores/appearance.svelte";
</script>

<div class="h1 my-5">Settings (in progress)</div>

<select bind:value={theme.current} style="text-transform: capitalize;">
  {#each theme.list as opt}
    <option value={opt} style="text-transform: capitalize;">{opt}</option>
  {/each}
</select>

<select bind:value={titlebarBtnGroup.current} style="text-transform: capitalize;">
  {#each titlebarBtnGroup.list as opt}
    <option value={opt} style="text-transform: capitalize;">{opt}</option>
  {/each}
</select>
