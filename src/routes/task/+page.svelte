<script>
  import CommandGroup from "../../components/task/CommandGroup.svelte";
  import KeySequenceGroup from "../../components/task/KeySequenceGroup.svelte";
</script>

<div class="d-flex flex-column m-3" style="overflow: scroll;">
  <div class="d-flex flex-column">
    <div class="d-flex align-items-center">
      <img src="imgs/svg/keyboard_alt.svg" alt="Key Sequence" />
      <div class="task-type-name">Key Sequences</div>
    </div>
    <KeySequenceGroup></KeySequenceGroup>
  </div>

  <div class="d-flex flex-column mt-4">
    <div class="d-flex align-items-center">
      <img src="imgs/svg/terminal.svg" alt="Command" />
      <div class="task-type-name">Commands</div>
    </div>
    <CommandGroup></CommandGroup>
  </div>
</div>

<style>
  .task-type-name {
    font-size: 2rem;
    font-weight: 700;
    margin: 1rem;
  }

  img {
    width: 2.5rem;

  }
</style>
