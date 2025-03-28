import { DEFAULT_FLOW_NAME, FLOWS_FOLDER, VERSION_FOLDER } from "../../types/fs";
import { AppFileReader } from "../../utils/fs/reader";
import { viewportStore } from "./viewport.svelte";
import { edgeStore } from "./edge.svelte";
import { refresh } from "../app.svelte";
import { join } from "../../utils/fs/path";
import nodeStore from "./node.svelte";

function createFlowStore() {
  let flowNames: string[] = $state([]);
  let state = $state({});

  const init = async () => {
    flowNames = await AppFileReader.listDir(join(VERSION_FOLDER, FLOWS_FOLDER));

    state = { current: flowNames[0] ?? DEFAULT_FLOW_NAME, changes: 0 };
  };

  const reload = async () => {
    await nodeStore.reload();
    await edgeStore.reload();
    await viewportStore.reload();

    await refresh();
  };
  
  const save = async () => {
    await nodeStore.resetRuntimeState();
    
    await nodeStore.save();
    await edgeStore.save();
    await viewportStore.save();
    
    await refresh();
    console.log("Flow files saved!");
  };

  return {
    get flowNames() {
      return flowNames;
    },

    get state() {
      return state;
    },

    init,
    reload,
    save,
  };
}

const flowStore = createFlowStore();

await flowStore.init();

export default flowStore;
