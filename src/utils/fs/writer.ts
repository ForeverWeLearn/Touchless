import { remove, writeTextFile } from "@tauri-apps/plugin-fs";

import {
  BASE_DIRECTORY,
  DataFileType,
  DEFAULT_FLOW_NAME,
  FILE_NAMES,
  FLOWS_FOLDER,
  VERSION_FOLDER,
} from "../../types/fs";
import { checkEntryExist, ensureDirectoryExist, join } from "./path";
import { settings } from "../../stores/settings.svelte";
import { AppFileReader } from "./reader";

function toJson(obj: any): string {
  return settings.beautyJSON ? JSON.stringify(obj, null, 2) : JSON.stringify(obj);
}

export class AppFileWriter {
  static async removeEntry(filePath: string) {
    const exist = await checkEntryExist(filePath);

    if (!exist) {
      return;
    }

    await remove(filePath, { baseDir: BASE_DIRECTORY });

    console.log(`[SUCCESS] "${filePath}" deleted`);
  }

  static async removeFolder(folderPath: string) {
    const files = await AppFileReader.listFile(folderPath);

    for (const file of files) {
      await this.removeEntry(join(folderPath, file));
    }

    // this.removeEntry(folderPath);
  }

  static async removeFlow(flow: string) {
    await this.removeFolder(join(VERSION_FOLDER, FLOWS_FOLDER, flow));
  }

  static async writeJson(obj: any, filePath: string) {
    console.log(`Writing "${filePath}"...`);

    writeTextFile(filePath, toJson(obj), { baseDir: BASE_DIRECTORY });

    console.log(`[SUCCESS] "${filePath}" saved!`);
  }

  static async writeDataFile(fileType: DataFileType, data: any, flow?: string): Promise<void> {
    await ensureDirectoryExist("");
    await ensureDirectoryExist(VERSION_FOLDER);
    await ensureDirectoryExist(join(VERSION_FOLDER, FLOWS_FOLDER));
    if (flow) {
      await ensureDirectoryExist(join(VERSION_FOLDER, FLOWS_FOLDER, flow));
    }

    switch (fileType) {
      case DataFileType.NODE:
        console.log("Write Node to", flow);
        this.writeJson(data, join(VERSION_FOLDER, FLOWS_FOLDER, flow ?? DEFAULT_FLOW_NAME, FILE_NAMES.NODE));
        break;

      case DataFileType.EDGE:
        console.log("Write Edge to", flow);
        this.writeJson(data, join(VERSION_FOLDER, FLOWS_FOLDER, flow ?? DEFAULT_FLOW_NAME, FILE_NAMES.EDGE));
        break;

      case DataFileType.VIEWPORT:
        console.log("Write Viewport to", flow);
        this.writeJson(data, join(VERSION_FOLDER, FLOWS_FOLDER, flow ?? DEFAULT_FLOW_NAME, FILE_NAMES.VIEWPORT));
        break;

      case DataFileType.KEY_SEQUENCE:
        console.log("Write Key Sequence");
        this.writeJson(data, join(VERSION_FOLDER, FILE_NAMES.KEY_SEQUENCE));
        break;

      case DataFileType.COMMAND:
        console.log("Write Command");
        this.writeJson(data, join(VERSION_FOLDER, FILE_NAMES.COMMAND));
        break;

      case DataFileType.SETTING:
        console.log("Write Settings");
        this.writeJson(data, join(VERSION_FOLDER, FILE_NAMES.SETTING));
        break;
    }
  }
}
