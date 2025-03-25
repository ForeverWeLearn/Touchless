import type { CustomNode, NodeType } from "../flow/nodes/node";
import type { Command, KeySequence } from "./const";
import type { Edge, Viewport } from "@xyflow/svelte";
import {
  BASE_DIRECTORY,
  EDGES_DATA_FILE,
  ensureDirectory,
  join,
  NODES_DATA_FILE,
  KEY_SEQUENCE_DATA_FILE,
  VIEWPORT_DATA_FILE,
  COMMAND_DATA_FILE,
} from "./path";
import { remove, writeTextFile } from "@tauri-apps/plugin-fs";
import { settings } from "../../stores/settings.svelte";

function toJson(obj: any): string {
  return settings.beautyJSON ? JSON.stringify(obj, null, 2) : JSON.stringify(obj);
}

export class AppFileWriter {
  static async removeFile(destination: string, file_name: string) {
    await ensureDirectory(destination);

    const path = join(destination, file_name);

    remove(path, { baseDir: BASE_DIRECTORY });

    console.log(`[SUCCESS] "${file_name}" deleted from "${destination}"`);
  }

  static async writeJson(obj: any, destination: string, file_name: string) {
    await ensureDirectory(destination);

    console.log(`Writing "${file_name}" to "${destination}"`);

    const path = join(destination, file_name);

    writeTextFile(path, toJson(obj), { baseDir: BASE_DIRECTORY });

    console.log(`[SUCCESS] "${file_name}" writed file to "${destination}"`);
  }

  static async writeNodeData(data: CustomNode<NodeType>[]) {
    await this.writeJson(data, NODES_DATA_FILE.DEST, NODES_DATA_FILE.NAME);
  }

  static async writeEdgeData(data: Edge[]) {
    await this.writeJson(data, EDGES_DATA_FILE.DEST, EDGES_DATA_FILE.NAME);
  }

  static async writeViewData(data: Viewport) {
    await this.writeJson(data, VIEWPORT_DATA_FILE.DEST, VIEWPORT_DATA_FILE.NAME);
  }

  static async writeKeySequenceData(data: KeySequence[]) {
    await this.writeJson(data, KEY_SEQUENCE_DATA_FILE.DEST, KEY_SEQUENCE_DATA_FILE.NAME);
  }

  static async writeCommandData(data: Command[]) {
    await this.writeJson(data, COMMAND_DATA_FILE.DEST, COMMAND_DATA_FILE.NAME);
  }

  static async removeNodeFile() {
    await this.removeFile(NODES_DATA_FILE.DEST, NODES_DATA_FILE.NAME);
  }

  static async removeEdgeFile() {
    await this.removeFile(EDGES_DATA_FILE.DEST, EDGES_DATA_FILE.NAME);
  }

  static async removeViewFile() {
    await this.removeFile(VIEWPORT_DATA_FILE.DEST, VIEWPORT_DATA_FILE.NAME);
  }

  static async removeKeySequenceFile() {
    await this.removeFile(KEY_SEQUENCE_DATA_FILE.DEST, KEY_SEQUENCE_DATA_FILE.NAME);
  }

  static async removeCommandFile() {
    await this.removeFile(COMMAND_DATA_FILE.DEST, COMMAND_DATA_FILE.NAME);
  }
}
