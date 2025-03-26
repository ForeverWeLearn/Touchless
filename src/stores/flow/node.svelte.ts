import type { Edge, XYPosition } from "@xyflow/svelte";

import { getDefaultNode, NodeType, resetRuntime, type ConditionNodeData, type CustomNode } from "../../types/nodes";
import { DataFileType, DEFAULT_FLOW_NAME } from "../../types/fs";
import { writable, type Writable } from "svelte/store";
import { generateRandomString } from "../../utils/dsa/generate";
import { AppFileReader } from "../../utils/fs/reader";
import { edgesWritable } from "./edge.svelte";
import { parentMap } from "./flow.svelte";

let nodes: CustomNode[] = $state(await AppFileReader.readDataFile(DataFileType.NODE, DEFAULT_FLOW_NAME));

const nodeMap: Record<string, CustomNode> = $state(
  nodes.reduce((accumulator, node) => {
    accumulator[node.data.id] = node;
    return accumulator;
  }, {} as Record<string, CustomNode>)
);

export const nodesWritable: Writable<CustomNode[]> = writable(nodes);

function createNodeStore() {
  const reload = async () => {
    nodes = await AppFileReader.readDataFile(DataFileType.NODE, DEFAULT_FLOW_NAME);
  };

  const add = (type: NodeType, pos: XYPosition, parent: string = "") => {
    const id = generateRandomString();
    const newNode = getDefaultNode(type, id);
    newNode.position = pos;

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

    if (node.type != NodeType.CONDITION) {
      return true;
    }

    const data = node.data as ConditionNodeData;
    return data.runtime.activated;
  };

  const resetRuntimeState = async () => {
    for (const node of nodes) {
      if (node.type == NodeType.CONDITION) {
        resetRuntime(node.data.runtime);
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
    reload,
    add,
    remove,
    duplicate,
    isParentActivated,
    resetRuntimeState,
  };
}

export const nodeStore = createNodeStore();
