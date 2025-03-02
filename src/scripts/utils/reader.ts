import { BASE, EDGES_DATA_FILE, join, NODES_DATA_FILE, VIEW_DATA_FILE } from "./path";
import { exists, readTextFile } from "@tauri-apps/plugin-fs";
import { edges_writable, nodes, nodes_writable } from "../../stores/flow_state.svelte";
import type { NodeData } from "./node";

export async function check_file_exist(destination: string, file_name: string): Promise<boolean> {
  const path = join(destination, file_name);
  const exist = await exists(path, { baseDir: BASE });
  return exist;
}

export async function read_text_file(destination: string, file_name: string): Promise<string | undefined> {
  const exist = await check_file_exist(destination, file_name);

  if (!exist) {
    return undefined;
  }

  const path = join(destination, file_name);

  console.log(`Reading data from "${path}"`);
  const data = await readTextFile(path, { baseDir: BASE });

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

export function get_current_nodes_data() {
  const d = Object.values(nodes);
  return d;
}

export function get_current_edges_data() {
  let data;
  edges_writable.update((value) => {
    data = value;
    return value;
  });
  return data;
}
