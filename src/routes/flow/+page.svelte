<script>
  import FlowProvider from "../../components/flow/FlowProvider.svelte";
  import { theme } from "../../stores/appearance.svelte";
</script>

<svelte:head>
  <link rel="stylesheet" href="css/themes/{theme.default}/theme.css" />
</svelte:head>

<FlowProvider></FlowProvider>
