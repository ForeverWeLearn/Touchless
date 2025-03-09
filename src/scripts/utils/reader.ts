import { readTextFile } from "@tauri-apps/plugin-fs";
import { BASE_DIRECTORY, check_file_exist, EDGES_DATA_FILE, join, NODES_DATA_FILE, VIEW_DATA_FILE } from "./path";
import type { RawNodeData } from "../flow/nodes/node";
import type { KeySequenceType } from "../flow/nodes/task/key_sequence";
import { edges_writable, nodes } from "../../stores/flow.svelte";

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

export async function read_local_json_file(path: string): Promise<any> {
  let raw_data = undefined;
  await fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Could not read file: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      raw_data = data;
    })
    .catch((error) => {
      console.error("Error fetching file:", error);
    });
  return raw_data;
}

export async function read_raw_node_data_from_file(): Promise<RawNodeData<any>[] | undefined> {
  return (await read_json_file(NODES_DATA_FILE.DEST, NODES_DATA_FILE.NAME)) as RawNodeData<any>[];
}

export async function read_edge_data_from_file() {
  return await read_json_file(EDGES_DATA_FILE.DEST, EDGES_DATA_FILE.NAME);
}

export async function read_view_data_from_file() {
  return await read_json_file(VIEW_DATA_FILE.DEST, VIEW_DATA_FILE.NAME);
}

export async function read_default_key_sequences(): Promise<KeySequenceType[]> {
  const data: KeySequenceType[] = await read_local_json_file("default/key_sequences.json");
  console.log(data);
  return data;
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
