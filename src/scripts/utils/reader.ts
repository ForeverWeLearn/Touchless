import type { NodeData } from "./node";
import { BASE_DIRECTORY, EDGES_DATA_FILE, NODES_DATA_FILE, VIEW_DATA_FILE, check_file_exist, join } from "./path";
import { edges_writable, nodes } from "../../stores/flow_state.svelte";
import { readTextFile } from "@tauri-apps/plugin-fs";

export async function read_text_file(destination: string, file_name: string): Promise<string | undefined> {
  const exist = await check_file_exist(destination, file_name);

  if (!exist) {
    return undefined;
  }

  const path = join(destination, file_name);

  console.log(`Reading data from "${path}"`);
  const data = await readTextFile(path, { baseDir: BASE_DIRECTORY });

  return data;
}

export async function read_json_file(destination: string, file_name: string): Promise<object | undefined> {
  const data = await read_text_file(destination, file_name);
  console.log(data);
  if (data == undefined || data.length == 0) {
    return undefined;
  }
  return JSON.parse(data);
}

export async function read_nodes_data_from_file(): Promise<NodeData[] | undefined> {
  return (await read_json_file(NODES_DATA_FILE.DEST, NODES_DATA_FILE.NAME)) as NodeData[];
}

export async function read_edges_data_from_file() {
  return await read_json_file(EDGES_DATA_FILE.DEST, EDGES_DATA_FILE.NAME);
}

export async function read_view_data_from_file() {
  return await read_json_file(VIEW_DATA_FILE.DEST, VIEW_DATA_FILE.NAME);
}

export function get_current_node_data() {
  const node_data = Object.values(nodes);
  return node_data;
}

export function get_current_edges_data() {
  let data;
  edges_writable.update((value) => {
    data = value;
    return value;
  });
  return data;
}
