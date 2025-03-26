<script lang="ts">
  let { colors }: { colors: string[][] } = $props();
</script>

<div class="d-flex flex-column align-items-center gap-1">
  {#each colors as group}
    <div class="d-flex gap-1">
      {#each group as color}
        <div class="color" style="background-color: {color};"></div>
      {/each}
    </div>
  {/each}
</div>

<style>
  .color {
    width: 2rem;
    aspect-ratio: 1;
  }
</style>
