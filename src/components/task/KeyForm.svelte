<script lang="ts">
  import { userKeyStore, type KeyReceiver } from "../../stores/user_key.svelte";
  import { KEY_DIRECTION_NAMES, type Key } from "../../scripts/utils/const";

  let { key, append, remove }: { key: Key; append: () => void; remove: () => void } = $props();

  const receiver: KeyReceiver = $state({ listening: false, keyState: null });

  $effect(() => {
    if (receiver.keyState) {
      key.key = receiver.keyState.key;
    }
  });

  function listen_or_stop() {
    if (userKeyStore.listening) {
      userKeyStore.stopListen();
      receiver.listening = false;
      return;
    }
    userKeyStore.bindReceiver(receiver);
    userKeyStore.listen();
    receiver.listening = true;
  }
</script>

<div class="d-flex flex-column appear" style="position: relative;">
  <div class="d-flex gap-1">
    <div class="flex-shrink-1">
      <select class="form-select form-select-sm" bind:value={key.direction}>
        {#each KEY_DIRECTION_NAMES as direction}
          <option value={direction}>{direction}</option>
        {/each}
      </select>
    </div>

    <div class="d-flex flex-fill">
      <button class="btn flex-fill" onclick={() => listen_or_stop()}>
        {receiver.listening ? "..." : key.key}
      </button>
    </div>

    <button class="btn btn-nbd" onclick={() => append()}>
      <img src="imgs/svg/add.svg" alt="Add Key" />
    </button>

    <button class="btn btn-nbd" onclick={() => remove()}>
      <img src="imgs/svg/close.svg" alt="Delete Key" />
    </button>
  </div>
</div>

<style>
  select {
    height: 100%;
  }
</style>
