import type { Edge } from "@xyflow/svelte";

import { DataFileType, DEFAULT_FLOW_NAME } from "../../types/fs";
import { writable, type Writable } from "svelte/store";
import { AppFileReader } from "../../utils/fs/reader";
import { AppFileWriter } from "../../utils/fs/writer";

function createEdgeStore() {
  let edges: Edge[] = $state([]);
  let edgesWritable: Writable<Edge[]> = writable(edges);

  const init = async () => {
    // edges always get the value of edgesWritable
    edgesWritable.subscribe((value) => {
      edges = value;
    });

    await reload();
  };

  const reload = async () => {
    edges = await AppFileReader.readDataFile(DataFileType.EDGE, DEFAULT_FLOW_NAME);
    edgesWritable.set(edges);
  };

  const add = (source: string, target: string) => {
    const newEdge: Edge = {
      source: source,
      target: target,
      id: `${parent}-${target}`,
    };

    edges.push(newEdge);
    edgesWritable.set(edges);
  };

  const remove = (source: string, target: string) => {
    edges = edges.filter((edge) => edge.source != source && edge.target != target);
    edgesWritable.set(edges);
  };

  const save = async () => {
    await AppFileWriter.writeDataFile(DataFileType.EDGE, edgeStore.edges, DEFAULT_FLOW_NAME);
  };

  const generateParentMap = (): Record<string, string> => {
    return edges.reduce((accumulator, edge) => {
      accumulator[edge.target] = edge.source;
      return accumulator;
    }, {} as Record<string, string>);
  };

  return {
    get edges() {
      return edges;
    },
    get edgesWritable() {
      return edgesWritable;
    },

    init,
    reload,
    save,

    add,
    remove,

    generateParentMap,
  };
}

export const edgeStore = createEdgeStore();

await edgeStore.init();

export default edgeStore;
