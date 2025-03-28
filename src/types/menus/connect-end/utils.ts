import type { ConnectEndMenu } from "./types";

export function createConnectEndMenu(): ConnectEndMenu {
  return {
    show: false,
    source: "",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    lastOpen: 0,
  };
}
