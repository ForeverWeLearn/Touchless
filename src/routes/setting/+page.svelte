<script lang="ts">
  import Palette from "../../components/setting/Palette.svelte";
  import { themeStore, titlebarBtnGroup } from "../../stores/appearance.svelte";
</script>

<div class="d-flex flex-column gap-4 p-5" style="overflow: scroll;">
  <div class="h1 my-5">Settings</div>

  <div class="d-flex gap-3">
    <div class="d-flex flex-column gap-3">
      <div class="h3 d-flex flex-column align-items-center gap-2">Themes</div>

      <div class="d-flex gap-2">
        {#each themeStore.list as theme}
          <div class="d-flex flex-column align-items-center gap-2">
            <button class="btn" onclick={() => (themeStore.current = theme.name)}>
              <Palette colors={theme.colors}></Palette>
            </button>
            <div style="text-transform: capitalize;">{theme.name}</div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</div>
