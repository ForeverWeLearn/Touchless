import { BaseDirectory } from "@tauri-apps/plugin-fs";

export const BASE = BaseDirectory.AppConfig;

export const NODES_DATA_FILE = {
  PATH: "nodes.json",
  DEST: "",
  NAME: "nodes.json",
};

export const EDGES_DATA_FILE = {
  PATH: "edges.json",
  DEST: "",
  NAME: "edges.json",
};

export const VIEW_DATA_FILE = {
  PATH: "view.json",
  DEST: "",
  NAME: "view.json",
};

export function join(destination: string, file_name: string): string {
  return destination ? `${destination}/${file_name}` : file_name;
}
