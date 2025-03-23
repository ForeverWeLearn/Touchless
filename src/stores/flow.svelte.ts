import type { Edge, Viewport, XYPosition } from "@xyflow/svelte";
import { getDefaultNodeData, NodeType, type CustomNode } from "../scripts/flow/nodes/node";
import { writable, type Writable } from "svelte/store";
import { getRandomString } from "../scripts/utils/algo";
import { AppFileReader, LocalFileReader } from "../scripts/utils/reader";
import ConditionsNode from "../components/flow/nodes/conditions/ConditionsNode.svelte";
import EntryNode from "../components/flow/nodes/entry/EntryNode.svelte";
import TaskNode from "../components/flow/nodes/tasks/TaskNode.svelte";
import type { ConditionsNodeData } from "../scripts/flow/nodes/conditions";
import type { Runtime } from "../scripts/flow/attributes/condition";

export const nodeTypes = {
  [NodeType.ENTRY]: EntryNode,
  [NodeType.CONDITIONS]: ConditionsNode,
  [NodeType.TASKS]: TaskNode,
};

let initialViewport: Viewport = await loadViewportData();

const nodes = $state(await loadNodeData());

const nodeMap: Record<string, CustomNode<NodeType>> = $state(
  nodes.reduce((accumulator, node) => {
    accumulator[node.data.id] = node;
    return accumulator;
  }, {} as Record<string, CustomNode<NodeType>>)
);

const edges = filterEdges(await loadEdgeData());
export const parentMap: Record<string, string> = edges.reduce((accumulator, edge) => {
  accumulator[edge.target] = edge.source;
  return accumulator;
}, {} as Record<string, string>);

export let nodesWritable: Writable<CustomNode<NodeType>[]> = writable(nodes);
export let edgesWritable: Writable<Edge[]> = writable(edges);

function createNodeStore() {
  const add = (type: NodeType, pos: XYPosition, parent: string = "") => {
    const id = getRandomString();
    const data = getDefaultNodeData(type, id);

    const newNode: CustomNode<NodeType> = {
      id: id,
      type: type,
      data: data,
      position: pos,
      origin: [0.0, 0.0],
    };

    if (parent) {
      parentMap[id] = parent;

      const edgeID = `${parent}-${id}`;

      const newEdge: Edge = {
        source: parent,
        target: id,
        id: edgeID,
      };

      edgesWritable.update((v) => {
        v.push(newEdge);
        recalculateParent(v);
        return v;
      });
    }

    nodes.push(newNode);
    nodeMap[id] = newNode;

    nodesWritable.set(nodes);

    console.log(`Node ${newNode.id} created at ${pos.x} ${pos.y}`);
  };

  const remove = (id: string) => {
    const index = nodes.findIndex((v) => v.id == id);

    if (index == -1) {
      return;
    }

    nodes.splice(index, 1);
    delete nodeMap[index];

    nodesWritable.set(nodes);
    edgesWritable.update((v) => {
      const r = v.filter((e) => e.target != id && e.source != id);
      recalculateParent(r);
      return r;
    });

    console.log(`Node ${id} deleted`);
  };

  const duplicate = (id: string) => {
    console.log(`Node ${id} duplicated`);
  };

  const isParentActivated = (id: string): boolean => {
    if (!id || !nodeMap[id]) {
      return false;
    }

    const parentID = parentMap[id];
    if (!parentID) {
      return false;
    }

    const node = nodeMap[parentID];
    if (!node) {
      return false;
    }

    if (node.type != NodeType.CONDITIONS) {
      return true;
    }

    const data = node.data as ConditionsNodeData;
    return data.runtime.activated;
  };

  const resetRuntimeState = async () => {
    const resetRuntime = (runtime: Runtime) => {
      runtime.activated = false;
      runtime.firstSatisfy = 0;
      runtime.lastSatisfy = 0;
    };

    for (const node of nodes) {
      if (node.type == NodeType.CONDITIONS) {
        const data = node.data as ConditionsNodeData;
        resetRuntime(data.runtime);
        resetRuntime(data.gestures.runtime);
        resetRuntime(data.distance.runtime);
        resetRuntime(data.rotation.runtime);
      }
    }
  };

  return {
    get nodes() {
      return nodes;
    },
    get nodeMap() {
      return nodeMap;
    },
    add,
    remove,
    duplicate,
    isParentActivated,
    resetRuntimeState,
  };
}

function createViewStore() {
  const reload = async () => {
    initialViewport = (await AppFileReader.viewData()) ?? { x: 0, y: 0, zoom: 1 };
    console.log("Viewport reloaded with new value", initialViewport);
  };

  return {
    get initialViewport() {
      return initialViewport;
    },
    reload,
  };
}

function filterEdges(edges: Edge[]): Edge[] {
  return edges.filter((e) => !(!nodeMap[e.source] || !nodeMap[e.target]));
}

export function recalculateParent(v: Edge[]) {
  for (const edge of v) {
    parentMap[edge.target] = edge.source;
  }

  console.log("Parents recalculated.");
}

async function loadNodeData(): Promise<CustomNode<NodeType>[]> {
  const data = (await AppFileReader.nodeData()) as CustomNode<NodeType>[];
  if (!data) {
    return await LocalFileReader.defaultNodes();
  }
  return data;
}

async function loadEdgeData(): Promise<Edge[]> {
  const data = (await AppFileReader.edgeData()) as Edge[];
  if (!data) {
    return await LocalFileReader.defaultEdges();
  }
  return data;
}

async function loadViewportData(): Promise<Viewport> {
  const data = (await AppFileReader.viewData()) as Viewport;
  if (!data) {
    return await LocalFileReader.defaultViewport();
  }
  return data;
}

export const nodeStore = createNodeStore();
export const viewStore = createViewStore();
