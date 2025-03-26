import type { Edge } from "@xyflow/svelte";

import { DataFileType, DEFAULT_FLOW_NAME } from "../../types/fs";
import { AppFileReader } from "../../utils/fs/reader";
import { writable, type Writable } from "svelte/store";

let edges: Edge[] = await AppFileReader.readDataFile(DataFileType.EDGE, DEFAULT_FLOW_NAME);

export const edgesWritable: Writable<Edge[]> = writable(edges);

edgesWritable.subscribe((val) => {
  edges = val;
});

function createEdgeStore() {
  const reload = async () => {
    edges = await AppFileReader.readDataFile(DataFileType.EDGE, DEFAULT_FLOW_NAME);
  };

  return {
    get edges() {
      return edges;
    },
    set edges(e: Edge[]) {
      edges = e;
    },
    reload,
  };
}

export const edgeStore = createEdgeStore();
