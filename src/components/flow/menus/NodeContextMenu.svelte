<script lang="ts">
  import { edges_writable, nodes, nodes_writable } from "../../../stores/flow.svelte";
  import { get_random_string } from "../../../scripts/utils/algo";
  import { node_context_menu } from "../../../stores/menu.svelte";
  import { sidebar_size } from "../../../stores/sidebar.svelte";

  function duplicate_node() {
    const node = nodes[node_context_menu.source];
    if (!node) {
      return;
    }

    const new_node_id = get_random_string();
    const new_node = {
      ...node,
      id: new_node_id,
      position: {
        x: node.position.x + 40,
        y: node.position.y + 40,
      },
    };

    nodes[new_node_id] = new_node;
    nodes_writable.update((value) => [...value, new_node]);
  }

  function delete_node() {
    delete nodes[node_context_menu.source];
    nodes_writable.update((value) => [...value.filter((node) => node.id !== node_context_menu.source)]);

    edges_writable.update((value) => [
      ...value.filter((edge) => edge.source !== node_context_menu.source && edge.target !== node_context_menu.source),
    ]);
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  style="top: {node_context_menu.top}px; left: {node_context_menu.left - sidebar_size.width}px;"
  class="context-menu px-0"
  onclick={() => (node_context_menu.show = false)}
>
  <button class="btn btn-sm btn-outline-primary btn-first" onclick={duplicate_node}>Duplicate</button>
  <button class="btn btn-sm btn-outline-primary btn-last" onclick={delete_node}>Delete</button>
</div>

<style>
  .context-menu {
    z-index: 999;
    position: absolute;
    background-color: aqua;
  }
</style>
