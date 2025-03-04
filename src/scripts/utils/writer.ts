import type { Viewport } from "@xyflow/svelte";
import { BASE_DIRECTORY, EDGES_DATA_FILE, ensure_directory, join, NODES_DATA_FILE, VIEW_DATA_FILE } from "./path";
import { get_current_edges_data, get_current_node_data } from "./reader";
import { writeTextFile } from "@tauri-apps/plugin-fs";

export async function write_json_file(obj: any, destination: string, file_name: string) {
  await ensure_directory(destination);

  console.log(`Writing "${file_name}" to "${destination}"`);

  const path = join(destination, file_name);

  writeTextFile(path, JSON.stringify(obj), { baseDir: BASE_DIRECTORY });

  console.log(`[SUCCESS] "${file_name}" writed file to "${destination}"`);
}

export async function write_nodes_data_file() {
  const node_data = get_current_node_data();
  await write_json_file(node_data, NODES_DATA_FILE.DEST, NODES_DATA_FILE.NAME);
}

export async function write_edges_data_file() {
  const edges_data = get_current_edges_data();
  await write_json_file(edges_data, EDGES_DATA_FILE.DEST, EDGES_DATA_FILE.NAME);
}

export async function write_view_data_file(viewport: Viewport) {
  await write_json_file(viewport, VIEW_DATA_FILE.DEST, VIEW_DATA_FILE.NAME);
}

export async function save_chart(viewport: Viewport) {
  await write_nodes_data_file();
  await write_edges_data_file();
  await write_view_data_file(viewport);
}
