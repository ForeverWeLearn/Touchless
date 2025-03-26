import { exists, mkdir } from "@tauri-apps/plugin-fs";

import { BASE_DIRECTORY } from "../../types/fs";

export function join(...paths: string[]): string {
  const filtered = paths.filter((path) => path !== "").map((path) => path.replace(/^\/+|\/+$/g, ""));

  if (filtered.length === 0) {
    return "";
  }
  if (filtered.length === 1) {
    return filtered[0];
  }

  return filtered.join("/");
}

export async function checkEntryExist(filePath: string): Promise<boolean> {
  return await exists(filePath, { baseDir: BASE_DIRECTORY });
}

export async function ensureDirectoryExist(directory: string) {
  const exist = await exists(directory, { baseDir: BASE_DIRECTORY });

  if (!exist) {
    await mkdir(directory, { baseDir: BASE_DIRECTORY });
  }
}
