import type { Edge, Viewport } from "@xyflow/svelte";
import type { CustomNode, NodeType } from "../flow/nodes/node";
import type { Command, KeySequence } from "./const";
import {
  BASE_DIRECTORY,
  checkFileExist,
  EDGES_DATA_FILE,
  join,
  NODES_DATA_FILE,
  KEY_SEQUENCE_DATA_FILE,
  VIEWPORT_DATA_FILE,
  COMMAND_DATA_FILE,
} from "./path";
import { readTextFile } from "@tauri-apps/plugin-fs";

export class AppFileReader {
  static async text(destination: string, file_name: string): Promise<string | undefined> {
    const exist = await checkFileExist(destination, file_name);

    if (!exist) {
      return undefined;
    }

    const path = join(destination, file_name);

    console.log(`Reading data from "${path}"`);
    const data = await readTextFile(path, { baseDir: BASE_DIRECTORY });

    return data;
  }

  static async json(destination: string, file_name: string): Promise<object | undefined> {
    const raw_data = await this.text(destination, file_name);

    if (raw_data == undefined || raw_data.length == 0) {
      console.log(`No data found in "${destination}/${file_name}"`);
      return undefined;
    }

    const data = JSON.parse(raw_data);

    console.log(`Data from "${destination}/${file_name}":`, data);

    return data;
  }

  static async nodeData(): Promise<CustomNode<NodeType>[] | undefined> {
    return (await this.json(NODES_DATA_FILE.DEST, NODES_DATA_FILE.NAME)) as CustomNode<NodeType>[];
  }

  static async edgeData(): Promise<Edge[] | undefined> {
    return (await this.json(EDGES_DATA_FILE.DEST, EDGES_DATA_FILE.NAME)) as Edge[];
  }

  static async viewData(): Promise<Viewport | undefined> {
    return (await this.json(VIEWPORT_DATA_FILE.DEST, VIEWPORT_DATA_FILE.NAME)) as Viewport;
  }

  static async keySequenceData() {
    return await this.json(KEY_SEQUENCE_DATA_FILE.DEST, KEY_SEQUENCE_DATA_FILE.NAME);
  }

  static async commandData() {
    return await this.json(COMMAND_DATA_FILE.DEST, COMMAND_DATA_FILE.NAME);
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
        console.error("Error fetching file: ", error);
      });
    return raw_data;
  }

  static async defaultKeySequences(): Promise<KeySequence[]> {
    return await this.json("default/key_sequences.json");
  }

  static async defaultCommands(): Promise<Command[]> {
    return await this.json("default/commands.json");
  }

  static async defaultNodes(): Promise<CustomNode<NodeType>[]> {
    return await this.json("default/nodes.json");
  }

  static async defaultEdges(): Promise<Edge[]> {
    return await this.json("default/edges.json");
  }

  static async defaultViewport(): Promise<Viewport> {
    return await this.json("default/viewport.json");
  }
}
