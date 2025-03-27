import type { Viewport } from "@xyflow/svelte";

import { DataFileType, DEFAULT_FLOW_NAME } from "../../types/fs";
import { AppFileReader } from "../../utils/fs/reader";
import { AppFileWriter } from "../../utils/fs/writer";

function createViewportStore() {
  let initialViewport: Viewport = { x: 0, y: 0, zoom: 1 };
  let viewport: Viewport = $state(initialViewport);

  const init = async () => {
    await reload();
    initialViewport = viewport;
  };

  const reload = async () => {
    viewport = await AppFileReader.readDataFile(DataFileType.VIEWPORT, DEFAULT_FLOW_NAME);
  };

  const save = async () => {
    await AppFileWriter.writeDataFile(DataFileType.VIEWPORT, viewport, DEFAULT_FLOW_NAME);
  };

  return {
    get viewport() {
      return viewport;
    },
    set viewport(v: Viewport) {
      viewport = v;
    },

    get initialViewport() {
      return initialViewport;
    },

    init,
    reload,
    save,
  };
}

export const viewportStore = createViewportStore();

await viewportStore.init();

export default viewportStore;
