<script lang="ts">
  import { commandStore, keySequenceStore } from "../../stores/task.svelte";
  import { AppFileWriter } from "../../scripts/utils/writer";
  import KeySequenceGroup from "../../components/task/KeySequenceGroup.svelte";
  import TaskGroupTitle from "../../components/task/TaskGroupTitle.svelte";
  import CommandGroup from "../../components/task/CommandGroup.svelte";

  $effect(() => {
    console.log($state.snapshot(keySequenceStore.key_sequences));
    AppFileWriter.writeKeySequenceData(keySequenceStore.key_sequences);

    console.log($state.snapshot(commandStore.commands));
    AppFileWriter.writeCommandData(commandStore.commands);
  });
</script>

<div class="d-flex flex-column gap-4 m-3 mx-4" style="overflow: scroll;">
  <div class="d-flex flex-column">
    <TaskGroupTitle title="Key Sequences" icon_src="imgs/svg/keyboard_alt.svg"></TaskGroupTitle>
    <KeySequenceGroup></KeySequenceGroup>
  </div>

  <div class="d-flex flex-column mt-4">
    <TaskGroupTitle title="Commands" icon_src="imgs/svg/terminal.svg"></TaskGroupTitle>
    <CommandGroup></CommandGroup>
  </div>
</div>
