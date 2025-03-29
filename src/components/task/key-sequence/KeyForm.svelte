<script lang="ts">
  import { userKeyStore, type KeyReceiver } from "../../../stores/user-key.svelte";
  import { ICON_PATHS, KeyDirection, type Key } from "../../../types/core";

  let { key, append, remove }: { key: Key; append: () => void; remove: () => void } = $props();

  const receiver: KeyReceiver = $state({ listening: false, keyState: null });

  let keyDisplay = $derived(receiver.listening ? "..." : key.key.length == 0 ? "None" : key.key);
  let keyDirectionIcon = $derived(
    key.direction == KeyDirection.CLICK
      ? ICON_PATHS.CLICK
      : key.direction == KeyDirection.PRESS
        ? ICON_PATHS.KEY_DOWN
        : ICON_PATHS.KEY_UP
  );

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

  function changeDirection() {
    key.direction =
      key.direction == KeyDirection.CLICK
        ? KeyDirection.PRESS
        : key.direction == KeyDirection.PRESS
          ? KeyDirection.RELEASE
          : KeyDirection.CLICK;
  }
</script>

<div class="d-flex flex-column appear-opacity" style="position: relative;">
  <div class="d-flex gap-1">
    <div class="flex-shrink-1">
      <button class="btn btn-key-direction d-flex gap-2" onclick={() => changeDirection()}>
        <img class="img-filter" src={keyDirectionIcon} alt="" />
        {key.direction}
      </button>
    </div>

    <div class="d-flex flex-fill">
      <button class="btn btn-key flex-fill" class:btn-listening={receiver.listening} onclick={() => listen_or_stop()}>
        {keyDisplay}
      </button>
    </div>

    <button class="btn btn-nbd" onclick={() => append()}>
      <img class="img-filter" src={ICON_PATHS.ADD} alt="Add Key" />
    </button>

    <button class="btn btn-nbd" onclick={() => remove()}>
      <img class="img-filter" src={ICON_PATHS.CLOSE} alt="Delete Key" />
    </button>
  </div>
</div>

<style>
  .btn-key {
    width: 9rem;
  }

  .btn-key-direction {
    width: 8rem;
  }

  .btn-listening {
    font-family: var(--font-family-mono);
    color: var(--bg-color-2) !important;
    background-color: var(--fg-color-1) !important;
  }
</style>
