import { BaseDirectory } from "@tauri-apps/plugin-fs";
import { DataFileType } from "../file";

export const BASE_DIRECTORY = BaseDirectory.AppData;

export const VERSION_FOLDER = "v0.0.6";
export const LOCAL_FOLDER = "defaults";

export const FLOWS_FOLDER = "flows";

export const DEFAULT_FLOW_NAME = "Default";

export const FILE_NAMES = {
  [DataFileType.FLOW_LIST]: "list.json",

  [DataFileType.NODE]: "nodes.json",
  [DataFileType.EDGE]: "edges.json",
  [DataFileType.VIEWPORT]: "viewport.json",

  [DataFileType.KEY_SEQUENCE]: "key-sequences.json",
  [DataFileType.COMMAND]: "commands.json",

  [DataFileType.SETTING]: "settings.json",
};
