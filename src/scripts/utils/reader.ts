import type { KeySequenceType } from "../flow/nodes/task/key_sequence";
import type { RawNodeData } from "../flow/nodes/node";
import { BASE_DIRECTORY, check_file_exist, EDGES_DATA_FILE, join, NODES_DATA_FILE, VIEW_DATA_FILE } from "./path";
import { readTextFile } from "@tauri-apps/plugin-fs";

export class AppFileReader {
  static async text(destination: string, file_name: string): Promise<string | undefined> {
    const exist = await check_file_exist(destination, file_name);

    if (!exist) {
      return undefined;
    }

    const path = join(destination, file_name);

    console.log(`Reading data from "${path}"`);
    const data = await readTextFile(path, { baseDir: BASE_DIRECTORY });

    return data;
  }

  static async json(destination: string, file_name: string): Promise<object | undefined> {
    const data = await this.text(destination, file_name);
    console.log(data);
    if (data == undefined || data.length == 0) {
      return undefined;
    }
    return JSON.parse(data);
  }

  static async raw_node_data(): Promise<RawNodeData<any>[] | undefined> {
    return (await this.json(NODES_DATA_FILE.DEST, NODES_DATA_FILE.NAME)) as RawNodeData<any>[];
  }

  static async edge_data() {
    return await this.json(EDGES_DATA_FILE.DEST, EDGES_DATA_FILE.NAME);
  }

  static async view_data() {
    return await this.json(VIEW_DATA_FILE.DEST, VIEW_DATA_FILE.NAME);
  }
}

export class LocalFileReader {
  static async json(path: string): Promise<any> {
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

  static async default_key_sequences(): Promise<KeySequenceType[]> {
    const data: KeySequenceType[] = await this.json("default/key_sequences.json");
    console.log(data);
    return data;
  }
}
