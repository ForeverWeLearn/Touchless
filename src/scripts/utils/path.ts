import { BaseDirectory, exists, mkdir } from "@tauri-apps/plugin-fs";

export const BASE_DIRECTORY = BaseDirectory.AppData;

const DIRECTORY = "v0.0.3"

export const NODES_DATA_FILE = {
  DEST: DIRECTORY,
  NAME: "nodes.json",
};

export const EDGES_DATA_FILE = {
  DEST: DIRECTORY,
  NAME: "edges.json",
};

export const VIEWPORT_DATA_FILE = {
  DEST: DIRECTORY,
  NAME: "viewport.json",
};

export const KEY_SEQUENCE_DATA_FILE = {
  DEST: DIRECTORY,
  NAME: "key_sequences.json",
};

export const COMMAND_DATA_FILE = {
  DEST: DIRECTORY,
  NAME: "commands.json",
};

export function join(destination: string, file_name: string): string {
  return destination ? `${destination}/${file_name}` : file_name;
}

export async function check_file_exist(destination: string, file_name: string): Promise<boolean> {
  const path = join(destination, file_name);

  const exist = await exists(path, { baseDir: BASE_DIRECTORY });

  return exist;
}

export async function ensure_directory(directory: string) {
  const exist = await exists(directory, { baseDir: BASE_DIRECTORY });

  if (!exist) {
    await mkdir(directory, {
      baseDir: BASE_DIRECTORY,
      recursive: true,
    });
  }
}
