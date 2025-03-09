<script>
  import FlowProvider from "../../components/flow/FlowProvider.svelte";
  import { theme } from "../../stores/theme.svelte";
</script>

<svelte:head>
  <link rel="stylesheet" href="css/themes/{theme.default}.css" />
</svelte:head>

<FlowProvider></FlowProvider>
