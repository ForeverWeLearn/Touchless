import {
  createConditionTypeSelectMenu,
  createConnectEndMenu,
  createGestureSelectMenu,
  createNodeContextMenu,
  createPaneContextMenu,
  createPointSelectMenu,
  type ConditionTypeSelectMenu,
  type ConnectEndMenu,
  type GestureSelectMenu,
  type NodeContextMenu,
  type PaneContextMenu,
  type PointSelectMenu,
} from "../../types/menus";

function createMenuStore() {
  const conditionTypeSelect: ConditionTypeSelectMenu = $state(createConditionTypeSelectMenu());

  const connectEnd: ConnectEndMenu = $state(createConnectEndMenu());

  const paneContext: PaneContextMenu = $state(createPaneContextMenu());

  const nodeContext: NodeContextMenu = $state(createNodeContextMenu());

  const gestureSelect: GestureSelectMenu = $state(createGestureSelectMenu());

  const pointSelect: PointSelectMenu = $state(createPointSelectMenu());

  function hideAll() {
    if (performance.now() - connectEnd.lastOpen > 250) {
      connectEnd.show = false;
    }
    nodeContext.show = false;
    paneContext.show = false;
    pointSelect.show = false;
  }

  return {
    get conditionTypeSelect() {
      return conditionTypeSelect;
    },
    
    get connectEnd() {
      return connectEnd;
    },

    get paneContext() {
      return paneContext;
    },

    get nodeContext() {
      return nodeContext;
    },

    get gestureSelect() {
      return gestureSelect;
    },

    get pointSelect() {
      return pointSelect;
    },

    hideAll,
  };
}

export const menuStore = createMenuStore();

export default menuStore;
