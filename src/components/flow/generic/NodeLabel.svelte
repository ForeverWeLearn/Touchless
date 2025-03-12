<script lang="ts">
  let { id, name, enable } = $props();
</script>

<div class="form-check node-label-box" class:faded={!enable}>
  <input class="form-check-input" type="checkbox" id="node-label-{id}" bind:checked={enable} style="display: none;" />
  <label class="form-check-label node-label" for="node-label-{id}" style="cursor: pointer; text-transform: uppercase">
    {name}
  </label>
</div>
