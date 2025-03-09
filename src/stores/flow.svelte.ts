import type { Edge, Viewport, XYPosition } from "@xyflow/svelte";
import { writable, type Writable } from "svelte/store";
import { get_default_node_data, type RawNodeData } from "../scripts/flow/nodes/node";
import { get_random_string } from "../scripts/utils/algo";
import {
  read_edge_data_from_file,
  read_raw_node_data_from_file,
  read_view_data_from_file,
} from "../scripts/utils/reader";
import { NodeType } from "../scripts/flow/nodes/note_type";

export const client_size = $state({ width: 1366, height: 768 });

export const raw_node_data = await load_raw_node_data();
export const nodes_writable = writable(raw_node_data);

export const nodes: Record<string, RawNodeData<NodeType>> = $state(
  raw_node_data.reduce((accumulator, node) => {
    accumulator[node.data.id] = node;
    return accumulator;
  }, {} as Record<string, RawNodeData<NodeType>>)
);

export const edges_writable: Writable<Edge[]> = writable(await load_edge_data());

function get_default_raw_node_data(): RawNodeData<any>[] {
  const id = get_random_string();
  return [
    {
      id: id,
      type: NodeType.ENTRY,
      data: get_default_node_data(NodeType.ENTRY, id),
      position: { x: 0, y: 0 },
    },
  ];
}

export let initial_viewport: Viewport = await load_view_data();

async function load_raw_node_data(): Promise<RawNodeData<NodeType>[]> {
  const data = await read_raw_node_data_from_file();
  if (data == undefined) {
    return get_default_raw_node_data();
  }
  return data as RawNodeData<NodeType>[];
}

async function load_edge_data(): Promise<Edge[]> {
  const data = await read_edge_data_from_file();
  if (data == undefined) {
    return [];
  }
  return data as Edge[];
}

async function load_view_data(): Promise<Viewport> {
  const data = await read_view_data_from_file();
  if (data == undefined) {
    return { x: 0, y: 0, zoom: 1 };
  }
  return data as Viewport;
}

export function create_node(type: NodeType, pos: XYPosition, parent: string = "") {
  const id = get_random_string();
  const data = get_default_node_data(type, id);

  const new_node: RawNodeData<NodeType> = {
    id: id,
    type: type,
    data: data,
    position: pos,
    origin: [0.0, 0.5],
  };

  if (parent) {
    const edge_id = `${parent}-${id}`;
    const new_edge: Edge = {
      source: parent,
      target: id,
      id: edge_id,
    };

    nodes[parent].data.next.push(id);
    new_node.data.prev = parent;

    edges_writable.update((value) => [...value.filter((v) => v.id != edge_id), new_edge]);
  }

  nodes[id] = new_node;
  nodes_writable.update((value) => [...value.filter((v) => v.id != parent && v.id != id), nodes[parent], nodes[id]]);

  console.log(`Node ${new_node.id} created at ${pos.x} ${pos.y}`);
}
