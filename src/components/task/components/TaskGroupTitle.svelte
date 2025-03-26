<script lang="ts">
  let { title, icon_src }: { title: string; icon_src: string } = $props();
</script>

<div class="title-with-icon py-3" style="font-size: 2rem;">
  <img class="img-filter" src={icon_src} alt="" />
  <div class="fw-bold">{title}</div>
</div>
