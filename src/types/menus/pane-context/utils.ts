import type { PaneContextMenu } from "./types";

export function createPaneContextMenu(): PaneContextMenu {
  return {
    show: false,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };
}
