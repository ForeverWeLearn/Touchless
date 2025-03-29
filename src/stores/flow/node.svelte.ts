import type { XYPosition } from "@xyflow/svelte";

import { getDefaultNode, NodeType, resetRuntime, type CustomNode } from "../../types/nodes";
import { DataFileType, DEFAULT_FLOW_NAME } from "../../types/fs";
import { writable, type Writable } from "svelte/store";
import { generateRandomString } from "../../utils/dsa/generate";
import { AppFileReader } from "../../utils/fs/reader";
import { AppFileWriter } from "../../utils/fs/writer";
import { edgeStore } from "./edge.svelte";

function createNodeStore() {
  let nodes: CustomNode[] = $state([]);
  let nodesWritable: Writable<CustomNode[]> = writable(nodes);

  let nodeMap: Record<string, CustomNode>;
  let parentMap: Record<string, string>;

  const generateNodeMap = (): Record<string, CustomNode> => {
    return nodes.reduce((accumulator, node) => {
      accumulator[node.data.id] = node;
      return accumulator;
    }, {} as Record<string, CustomNode>);
  };

  const init = async () => {
    await reload();
  };

  const reload = async () => {
    nodes = await AppFileReader.readDataFile(DataFileType.NODE, DEFAULT_FLOW_NAME);
    nodesWritable.set(nodes);

    nodeMap = generateNodeMap();
    parentMap = edgeStore.generateParentMap();
  };

  const save = async () => {
    await nodeStore.resetRuntimeState();
    await AppFileWriter.writeDataFile(DataFileType.NODE, nodeStore.nodes, DEFAULT_FLOW_NAME);
  };

  const get = (id: string): CustomNode | null => {
    for (const node of nodes) {
      if (node.data.id == id) {
        return node;
      }
    }

    return null;
  };

  const getIndex = (id: string): number | -1 => {
    return nodes.findIndex((node) => node.id == id);
  };

  const add = (type: NodeType, pos: XYPosition, parent: string = "") => {
    const id = generateRandomString();
    const newNode = getDefaultNode(type, id);

    // newNode.origin = [0, 0.5];

    newNode.position = pos;

    if (parent) {
      parentMap[id] = parent;
      edgeStore.add(parent, id);
    }

    push(newNode);

    console.log(`Node ${newNode.id} created at ${pos.x} ${pos.y}`);
  };

  const push = (node: CustomNode) => {
    nodes.push(node);
    nodeMap[node.id] = node;
    nodesWritable.set(nodes);
  };

  const remove = (id: string) => {
    const index = getIndex(id);

    if (index == -1) {
      return;
    }

    nodes.splice(index, 1);
    delete nodeMap[index];

    edgeStore.remove(id, id);

    nodesWritable.set(nodes);

    console.log(`Node ${id} deleted`);
  };

  const duplicate = (id: string) => {
    const node = nodeMap[id];

    if (!node) {
      return;
    }

    const newId = generateRandomString();
    const newNode = structuredClone(node);
    
    newNode.id = newId;
    newNode.data.id = newId;

    newNode.position.x = node.position.x + 20;
    newNode.position.y = node.position.y + 20;

    nodes.push(newNode);
    nodesWritable.set(nodes);

    nodeMap[id] = newNode;

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

    return node.data.runtime.activated;
  };

  const resetRuntimeState = async () => {
    for (const node of nodes) {
      if (node.type == NodeType.CONDITION) {
        resetRuntime(node.data.runtime);
        for (const condition of node.data.conditions) {
          resetRuntime(condition.runtime);
        }
      }
    }
  };

  return {
    get nodes() {
      return nodes;
    },

    get nodesWritable() {
      return nodesWritable;
    },

    get nodeMap() {
      return nodeMap;
    },

    get parentMap() {
      return parentMap;
    },

    init,
    reload,
    save,

    get,
    getIndex,

    add,
    duplicate,
    remove,

    isParentActivated,
    resetRuntimeState,
  };
}

const nodeStore = createNodeStore();

await nodeStore.init();

export default nodeStore;
