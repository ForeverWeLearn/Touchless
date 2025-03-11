import type { Viewport } from "@xyflow/svelte";
import { BASE_DIRECTORY, EDGES_DATA_FILE, ensure_directory, join, NODES_DATA_FILE, VIEW_DATA_FILE } from "./path";
import { writeTextFile } from "@tauri-apps/plugin-fs";

export class AppFileWriter {
  static async json(obj: any, destination: string, file_name: string) {
    await ensure_directory(destination);

    console.log(`Writing "${file_name}" to "${destination}"`);

    const path = join(destination, file_name);

    writeTextFile(path, JSON.stringify(obj), { baseDir: BASE_DIRECTORY });

    console.log(`[SUCCESS] "${file_name}" writed file to "${destination}"`);
  }

  static async raw_node_data(node_data: any) {
    await this.json(node_data, NODES_DATA_FILE.DEST, NODES_DATA_FILE.NAME);
  }

  static async edge_data(edge_data: any) {
    await this.json(edge_data, EDGES_DATA_FILE.DEST, EDGES_DATA_FILE.NAME);
  }

  static async view_data(viewport: Viewport) {
    await this.json(viewport, VIEW_DATA_FILE.DEST, VIEW_DATA_FILE.NAME);
  }

  static async chart_data(node_data: any, edge_data: any, viewport: Viewport) {
    await this.raw_node_data(node_data);
    await this.edge_data(edge_data);
    await this.view_data(viewport);
  }
}
