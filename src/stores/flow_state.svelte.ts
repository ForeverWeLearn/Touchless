import {
  read_edges_data_from_file,
  read_nodes_data_from_file as read_node_raw_data_from_file,
  read_view_data_from_file,
} from "../scripts/utils/reader";
import { type Edge, type Viewport, type XYPosition } from "@xyflow/svelte";
import { writable, type Writable } from "svelte/store";
import { get_dafault_nodes, get_default_node_data, NodeType, type NodeRawData } from "../scripts/flowchart/nodes/node";
import { ConditionNodeType } from "../scripts/flowchart/nodes/condition";
import { get_random_string } from "../scripts/utils/algo";
import { TaskNodeType } from "../scripts/flowchart/nodes/task";
import KeySequenceNode from "../components/flowchart/nodes/KeySequenceNode.svelte";
import DistanceNode from "../components/flowchart/nodes/DistanceNode.svelte";
import GestureNode from "../components/flowchart/nodes/GestureNode.svelte";
import RootNode from "../components/flowchart/nodes/RootNode.svelte";

export const node_types = {
  [NodeType.ROOT]: RootNode,
  [ConditionNodeType.GESTURE]: GestureNode,
  [ConditionNodeType.DISTANCE]: DistanceNode,
  [TaskNodeType.KEY_SEQUENCE]: KeySequenceNode,
};

const node_data = await load_nodes_data();
export const nodes: Record<string, NodeRawData<any>> = $state(
  node_data.reduce((accumulator, node) => {
    accumulator[node.data.id] = node;
    return accumulator;
  }, {} as Record<string, NodeRawData<any>>)
);
export const nodes_writable: Writable<NodeRawData<any>[]> = writable(node_data);

export const edge_data = await load_edges_data();
export const edges = $state(edge_data);
export const edges_writable: Writable<Edge[]> = writable(edge_data);

export let initial_viewport: Viewport = await load_view_data();

async function load_nodes_data(): Promise<NodeRawData<any>[]> {
  const data = await read_node_raw_data_from_file();
  if (data == undefined) {
    return get_dafault_nodes();
  }
  return data as NodeRawData<any>[];
}

async function load_edges_data(): Promise<Edge[]> {
  const data = await read_edges_data_from_file();
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

export function create_node(type: ConditionNodeType | TaskNodeType, source: string, pos: XYPosition) {
  const id = get_random_string();
  const data = get_default_node_data(type, id);

  const new_node: NodeRawData<any> = {
    id: id,
    type: type,
    data: data,
    position: pos,
    origin: [0.0, 0.5],
  };
  const new_edge: Edge = {
    source: source,
    target: id,
    id: `${source}-${id}`,
  };

  nodes[source].data.next.push(id);
  new_node.data.prev = source;
  nodes[id] = new_node;
  nodes_writable.update((value) => [...value, nodes[source], nodes[id]]);

  edges.push(new_edge);
  edges_writable.update((value) => [...value, new_edge]);
}
