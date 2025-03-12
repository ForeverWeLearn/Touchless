<script lang="ts">
  import { KEY_NAMES, KEY_DIRECTION_NAMES, type Key } from "../../scripts/utils/const";
  import { get_default_key } from "../../stores/task.svelte";

  let { key, append_key, delete_key }: { key: Key; append_key: (key: Key) => void; delete_key: () => void } = $props();
</script>

<div class="d-flex flex-column" style="position: relative;">
  <div class="d-flex gap-1">
    <div class="flex-shrink-1">
      <select class="form-select form-select-sm" bind:value={key.direction}>
        {#each KEY_DIRECTION_NAMES as direction}
          <option value={direction}>{direction}</option>
        {/each}
      </select>
    </div>

    <div class="d-flex flex-fill">
      <select class="form-select form-select-sm" bind:value={key.key}>
        {#each KEY_NAMES as control}
          <option value={control}>{control}</option>
        {/each}
      </select>
    </div>

    <button class="btn btn-sm" onclick={() => delete_key()}>
      <img src="imgs/svg/close.svg" alt="Delete Key" />
    </button>
  </div>

  <div class="d-flex flex-fill justify-content-center align-items-center">
    <button class="btn btn-sm btn-dark btn-add-key" onclick={() => append_key(get_default_key())}>
      <img src="imgs/svg/add.svg" alt="Add Key" />
    </button>
  </div>
</div>

<style>
  select {
    height: 2.4rem;
    background: #f4f4f4;
  }

  .btn-add-key {
    position: absolute;
    margin-top: 0.5rem;
    padding-top: 0;
    padding-bottom: 0;
    z-index: 10;
    opacity: 0;
  }

  .btn-add-key:hover {
    opacity: 1;
  }
</style>
