export type BaseNode = {
  id: string;
  position: { x: number; y: number };
  origin?: [number, number];
};

export type BaseNodeData = {
  id: string;
  enable: boolean;
};
