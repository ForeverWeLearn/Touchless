type ConnextEndMenu = {
  show: boolean;
  source: string;
  top: number;
  left: number;
  bottom: number;
  right: number;
  lastOpen: number;
};

type PaneContextMenu = {
  show: boolean;
  top: number;
  left: number;
  bottom: number;
  right: number;
};

export const connectEndMenu: ConnextEndMenu = $state({
  show: false,
  source: "",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  lastOpen: 0,
});

export const paneContextMenu: PaneContextMenu = $state({
  show: false,
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
});

export const nodeContextMenu = $state({
  show: false,
  source: "",
  top: 0,
  left: 0,
});
