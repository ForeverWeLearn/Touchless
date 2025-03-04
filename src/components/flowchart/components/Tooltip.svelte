<script lang="ts">
  let { content } = $props();
</script>

<button type="button" class="btn btn-sm btn-transparent" data-toggle="tooltip" title={content}>🛈</button>

<style>
  button {
    border: none;
    padding: 0;
    padding-left: 0.5em;
  }
</style>
