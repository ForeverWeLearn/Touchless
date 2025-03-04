<script lang="ts">
  import { useEdges, useNodes } from "@xyflow/svelte";

  export let onClick: () => void;
  export let id: string;
  export let top: number | undefined;
  export let left: number | undefined;

  const nodes = useNodes();
  const edges = useEdges();

  function duplicateNode() {
    const node = $nodes.find((node) => node.id === id);
    if (node) {
      $nodes.push({
        ...node,
        id: `${id}-copy${Math.random()}`,
        position: {
          x: node.position.x,
          y: node.position.y + 50,
        },
      });
    }
    $nodes = $nodes;
  }

  function deleteNode() {
    $nodes = $nodes.filter((node) => node.id !== id);
    $edges = $edges.filter((edge) => edge.source !== id && edge.target !== id);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  style="top: {top}px; left: {left}px;"
  class="context-menu px-0"
  onclick={onClick}
>
  <button class="btn btn-sm btn-outline-primary btn-first" onclick={duplicateNode}>Duplicate</button>
  <button class="btn btn-sm btn-outline-primary btn-last" onclick={deleteNode}>Delete</button>
</div>
