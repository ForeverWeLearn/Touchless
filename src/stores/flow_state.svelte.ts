import {
  read_edges_data_from_file,
  read_nodes_data_from_file,
  read_view_data_from_file,
} from "../scripts/utils/reader";
import {
  LoopType,
  NodeType,
  type DistanceNodeData,
  type GestureNodeData,
  type NodeData,
  type RootNodeData,
  type TaskNodeData,
} from "../scripts/utils/node";
import { type Edge, type Viewport, type XYPosition } from "@xyflow/svelte";
import { writable, type Writable } from "svelte/store";
import DistanceNode from "../components/flowchart/nodes/DistanceNode.svelte";
import GestureNode from "../components/flowchart/nodes/GestureNode.svelte";
import TaskNode from "../components/flowchart/nodes/TaskNode.svelte";
import RootNode from "../components/flowchart/nodes/RootNode.svelte";
import { get_random_string } from "../scripts/utils/algo";

export const node_types = {
  ROOT: RootNode,
  GESTURE: GestureNode,
  DISTANCE: DistanceNode,
  TASK: TaskNode,
};

const node_data = await load_nodes_data();
export const nodes: Record<string, NodeData> = $state(
  node_data.reduce((accumulator, node) => {
    accumulator[node.data.id] = node;
    return accumulator;
  }, {} as Record<string, NodeData>)
);
export const nodes_writable: Writable<NodeData[]> = writable(node_data);

export const edge_data = await load_edges_data();
export const edges = $state(edge_data);
export const edges_writable: Writable<Edge[]> = writable(edge_data);

export let initial_viewport: Viewport = await load_view_data();

function get_default_root_node_data(id: string): RootNodeData {
  return {
    id: id,
    active: true,
    enable: true,
    prev: "",
    next: [],
  };
}

function get_default_gesture_node_data(id: string): GestureNodeData {
  return {
    id: id,
    active: false,
    enable: true,
    prev: "",
    next: [],
    handedness: [
      {
        enable: false,
        gesture: "PALM",
        time: 250,
      },
      {
        enable: true,
        gesture: "PALM",
        time: 250,
      },
    ],
    timeout: {
      infinite: false,
      time: 2000,
    },
  };
}

function get_default_distance_node_data(id: string): DistanceNodeData {
  return {
    id: id,
    active: false,
    enable: true,
    prev: "",
    next: [],
    points: [
      {
        handedness: 0,
        landmark: 8,
      },
      {
        handedness: 1,
        landmark: 8,
      },
    ],
    range: {
      min: 0,
      max: 9,
    },
    timeout: {
      infinite: false,
      time: 2000,
    },
  };
}

function get_default_task_node_data(id: string): TaskNodeData {
  return {
    id: id,
    active: false,
    enable: true,
    prev: "",
    next: [],
    loop: {
      type: LoopType.Once,
      times: null,
    },
    task: "ShowDesktop",
  };
}

function get_dafault_nodes(): NodeData[] {
  const id = get_random_string();
  return [
    {
      id: id,
      type: NodeType.Root,
      data: get_default_root_node_data(id),
      position: { x: 0, y: 0 },
    },
  ];
}

function get_default_edges(): Edge[] {
  return [];
}

async function load_nodes_data(): Promise<NodeData[]> {
  const data = await read_nodes_data_from_file();
  if (data == undefined) {
    return get_dafault_nodes();
  }
  return data as NodeData[];
}

async function load_edges_data(): Promise<Edge[]> {
  const data = await read_edges_data_from_file();
  if (data == undefined) {
    return get_default_edges();
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

export function get_default_node_data(
  type: NodeType,
  id: string
): RootNodeData | GestureNodeData | DistanceNodeData | TaskNodeData {
  if (type == NodeType.Root) {
    return get_default_root_node_data(id);
  }
  if (type == NodeType.Gesture) {
    return get_default_gesture_node_data(id);
  }
  if (type == NodeType.Distance) {
    return get_default_distance_node_data(id);
  }
  if (type == NodeType.Task) {
    return get_default_task_node_data(id);
  }
  return get_default_root_node_data(id);
}

export function create_node(type: NodeType, source: string, pos: XYPosition) {
  const id = get_random_string();
  const data = get_default_node_data(type, id);

  const new_node: NodeData = {
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

export async function reset_default() {
  nodes;
}

export async function reload_flow() {
  nodes_writable.set(await load_nodes_data());
  edges_writable.set(await load_edges_data());
  initial_viewport = await load_view_data();
}
