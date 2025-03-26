<script lang="ts">
  import { AppFileWriter } from "../../utils/fs/writer";
  import { DataFileType } from "../../types/fs";
  import { keySequenceStore } from "../../stores/task/key-sequence.svelte";
  import { commandStore } from "../../stores/task/command.svelte";
  import KeySequenceGroup from "../../components/task/key-sequence/KeySequenceGroup.svelte";
  import TaskGroupTitle from "../../components/task/components/TaskGroupTitle.svelte";
  import CommandGroup from "../../components/task/command/CommandGroup.svelte";
  import { ICON_PATHS } from "../../types/core";

  $effect(() => {
    $state.snapshot(keySequenceStore.keySequences);
    AppFileWriter.writeDataFile(DataFileType.KEY_SEQUENCE, keySequenceStore.keySequences);
  });

  $effect(() => {
    $state.snapshot(commandStore.commands);
    AppFileWriter.writeDataFile(DataFileType.COMMAND, commandStore.commands);
  });
</script>

<div class="d-flex flex-column gap-4 p-5" style="overflow: scroll;">
  <div class="d-flex flex-column">
    <div class="d-flex">
      <TaskGroupTitle title="Key Sequences" icon_src={ICON_PATHS.KEYBOARD_ALT}></TaskGroupTitle>

      <button class="btn btn-nbd" onclick={() => keySequenceStore.pushFront()}>
        <img class="img-filter" src={ICON_PATHS.ADD} alt="" />
      </button>
    </div>

    <KeySequenceGroup></KeySequenceGroup>
  </div>

  <div class="d-flex flex-column mt-4">
    <div class="d-flex">
      <TaskGroupTitle title="Commands" icon_src={ICON_PATHS.TERMINAL}></TaskGroupTitle>

      <button class="btn btn-nbd" onclick={() => commandStore.pushFront()}>
        <img class="img-filter" src={ICON_PATHS.ADD} alt="" />
      </button>
    </div>

    <CommandGroup></CommandGroup>
  </div>
</div>
