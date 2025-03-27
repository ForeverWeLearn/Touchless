import { readDir, readTextFile } from "@tauri-apps/plugin-fs";

import {
  BASE_DIRECTORY,
  DataFileType,
  DEFAULT_FLOW_NAME,
  FILE_NAMES,
  FLOWS_FOLDER,
  LOCAL_FOLDER,
  VERSION_FOLDER,
} from "../../types/fs";
import { getDefaultCommands, getDefaultKeySequences } from "../../types/core";
import { getDefaultEdges, getDefaultNodes } from "../../types/nodes";
import { checkEntryExist, join } from "./path";
import { getDefaultSettings } from "../../types/settings";

export class AppFileReader {
  static async listDir(path: string): Promise<string[]> {
    const exist = await checkEntryExist(path);

    if (!exist) {
      return [];
    }

    const entries = await readDir(path, { baseDir: BASE_DIRECTORY });
    const dirs: string[] = [];

    for (const entry of entries) {
      if (entry.isDirectory) {
        dirs.push(entry.name);
      }
    }

    return dirs;
  }

  static async listFile(path: string): Promise<string[]> {
    const exist = await checkEntryExist(path);

    if (!exist) {
      return [];
    }

    const entries = await readDir(path, { baseDir: BASE_DIRECTORY });
    const files: string[] = [];

    for (const entry of entries) {
      if (entry.isFile) {
        files.push(entry.name);
      }
    }

    return files;
  }

  static async readText(filePath: string): Promise<string | undefined> {
    const exist = await checkEntryExist(filePath);

    if (!exist) {
      return undefined;
    }

    console.log(`Reading data from "${filePath}"`);
    const data = await readTextFile(filePath, { baseDir: BASE_DIRECTORY });

    return data;
  }

  static async readJson(filePath: string): Promise<object | undefined> {
    const textData = await this.readText(filePath);

    if (textData == undefined || textData.length == 0) {
      console.log(`No data "${filePath}"`);
      return undefined;
    }

    const data = JSON.parse(textData);

    console.log(`Data from "${filePath}":`, data);

    return data;
  }

  static async readJsonLocal(path: string): Promise<object | undefined> {
    try {
      const response = await fetch(path);

      if (!response.ok) {
        return undefined;
      }

      const data = await response.json();

      if (data !== null && typeof data === "object") {
        console.log(`Data from "${path}":`, data);
        return data;
      }

      return undefined;
    } catch (error) {
      return undefined;
    }
  }

  static async readDataFile(fileType: DataFileType, flow?: string): Promise<any> {
    switch (fileType) {
      case DataFileType.NODE:
        return (
          (await this.readJson(join(VERSION_FOLDER, FLOWS_FOLDER, flow ?? DEFAULT_FLOW_NAME, FILE_NAMES.NODE))) ??
          (await this.readJsonLocal(join(LOCAL_FOLDER, FLOWS_FOLDER, flow ?? DEFAULT_FLOW_NAME, FILE_NAMES.NODE))) ??
          getDefaultNodes() ??
          []
        );

      case DataFileType.EDGE:
        return (
          (await this.readJson(join(VERSION_FOLDER, FLOWS_FOLDER, flow ?? DEFAULT_FLOW_NAME, FILE_NAMES.EDGE))) ??
          (await this.readJsonLocal(join(LOCAL_FOLDER, FLOWS_FOLDER, flow ?? DEFAULT_FLOW_NAME, FILE_NAMES.EDGE))) ??
          getDefaultEdges() ??
          []
        );

      case DataFileType.VIEWPORT:
        return (
          (await this.readJson(join(VERSION_FOLDER, FLOWS_FOLDER, flow ?? DEFAULT_FLOW_NAME, FILE_NAMES.VIEWPORT))) ??
          (await this.readJsonLocal(
            join(LOCAL_FOLDER, FLOWS_FOLDER, flow ?? DEFAULT_FLOW_NAME, FILE_NAMES.VIEWPORT)
          )) ?? {
            x: 0,
            y: 0,
            zoom: 1,
          }
        );

      case DataFileType.KEY_SEQUENCE:
        return (
          (await this.readJson(join(VERSION_FOLDER, FILE_NAMES.KEY_SEQUENCE))) ??
          (await this.readJsonLocal(join(LOCAL_FOLDER, FILE_NAMES.KEY_SEQUENCE))) ??
          getDefaultKeySequences() ??
          []
        );

      case DataFileType.COMMAND:
        return (
          (await this.readJson(join(VERSION_FOLDER, FILE_NAMES.COMMAND))) ??
          (await this.readJsonLocal(join(LOCAL_FOLDER, FILE_NAMES.COMMAND))) ??
          getDefaultCommands() ??
          []
        );

      case DataFileType.SETTING:
        return (
          (await this.readJson(join(VERSION_FOLDER, FILE_NAMES.SETTING))) ??
          (await this.readJsonLocal(join(LOCAL_FOLDER, FILE_NAMES.SETTING))) ??
          getDefaultSettings() ??
          []
        );
    }
  }
}
