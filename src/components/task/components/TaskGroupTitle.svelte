<script lang="ts">
  let { title, icon_src }: { title: string; icon_src: string } = $props();
</script>

<div class="d-flex align-items-center">
  <img class="task-group-title-icon" src={icon_src} alt="" />
  <div class="task-group-title">{title}</div>
</div>
