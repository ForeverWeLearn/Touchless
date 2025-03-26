import { DataFileType, DEFAULT_FLOW_NAME, FLOWS_FOLDER, VERSION_FOLDER } from "../../types/fs";
import { AppFileReader } from "../../utils/fs/reader";
import { AppFileWriter } from "../../utils/fs/writer";
import { viewportStore } from "./viewport.svelte";
import { edgeStore } from "./edge.svelte";
import { nodeStore } from "./node.svelte";
import { join } from "../../utils/fs/path";
import { invalidateAll } from "$app/navigation";
import { refresh } from "../app.svelte";

export const parentMap: Record<string, string> = edgeStore.edges.reduce((accumulator, edge) => {
  accumulator[edge.target] = edge.source;
  return accumulator;
}, {} as Record<string, string>);

export const flowNames = $state(await AppFileReader.listDir(join(VERSION_FOLDER, FLOWS_FOLDER)));
export const flowStore = $state({
  current: flowNames[0] ?? DEFAULT_FLOW_NAME,
  changes: 0,
});

export async function reloadFlow() {
  await nodeStore.reload();
  await edgeStore.reload();
  await viewportStore.reload();

  await refresh();
}

export async function saveFlow() {
  await nodeStore.resetRuntimeState();

  await AppFileWriter.writeDataFile(DataFileType.NODE, nodeStore.nodes, DEFAULT_FLOW_NAME);
  await AppFileWriter.writeDataFile(DataFileType.EDGE, edgeStore.edges, DEFAULT_FLOW_NAME);
  await AppFileWriter.writeDataFile(DataFileType.VIEWPORT, viewportStore.viewport, DEFAULT_FLOW_NAME);

  console.log("Flow files saved!");
}
