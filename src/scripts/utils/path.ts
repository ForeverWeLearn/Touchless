import { BaseDirectory, exists, mkdir } from "@tauri-apps/plugin-fs";

export const BASE_DIRECTORY = BaseDirectory.AppData;

enum Directory {
  Flow = "flow",
  Settings = "settings",
}

export const NODES_DATA_FILE = {
  DEST: Directory.Flow,
  NAME: "nodes.json",
};

export const EDGES_DATA_FILE = {
  DEST: Directory.Flow,
  NAME: "edges.json",
};

export const VIEW_DATA_FILE = {
  DEST: Directory.Flow,
  NAME: "view.json",
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
