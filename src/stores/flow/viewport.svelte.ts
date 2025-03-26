import type { Viewport } from "@xyflow/svelte";

import { DataFileType, DEFAULT_FLOW_NAME } from "../../types/fs";
import { AppFileReader } from "../../utils/fs/reader";

export const initialViewport: Viewport = await AppFileReader.readDataFile(DataFileType.VIEWPORT, DEFAULT_FLOW_NAME);

let viewport: Viewport = initialViewport;

function createViewportStore() {
  const reload = async () => {
    viewport = await AppFileReader.readDataFile(DataFileType.VIEWPORT, DEFAULT_FLOW_NAME);
  };

  return {
    get viewport() {
      return viewport;
    },
    set viewport(v: Viewport) {
      viewport = v;
    },
    reload,
  };
}

export const viewportStore = createViewportStore();
