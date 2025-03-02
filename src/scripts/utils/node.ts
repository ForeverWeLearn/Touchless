import type { GestureName, HandednessID, LandmarkID, TaskName } from "./const";

export enum NodeType {
  Root = "ROOT",
  Gesture = "GESTURE",
  Distance = "DISTANCE",
  Task = "TASK",
}

export enum LoopType {
  Once = "ONCE",
  Unlimited = "UNLIMITED",
}

export type NodeData = {
  id: string;
  type: NodeType;
  data: RootNodeData | GestureNodeData | DistanceNodeData | TaskNodeData;
  position: { x: number; y: number };
  origin?: [number, number];
};

export type NodeGestureData = {
  enable: boolean;
  gesture: GestureName;
  time: number;
};

export type NodePointData = {
  handedness: HandednessID;
  landmark: LandmarkID;
};

export type NodeRangeData = {
  min: number;
  max: number;
};

export type NodeTimeoutData = {
  infinite: boolean;
  time: number;
};

export type NodeLoopData = {
  type: LoopType;
  times: number | null;
};

export type RootNodeData = {
  id: string;
  active: boolean;
  enable: boolean;
  prev: string;
  next: string[];
};

export type GestureNodeData = {
  id: string;
  active: boolean;
  enable: boolean;
  prev: string;
  next: string[];
  handedness: NodeGestureData[];
  timeout: NodeTimeoutData;
};

export type DistanceNodeData = {
  id: string;
  active: boolean;
  enable: boolean;
  prev: string;
  next: string[];
  points: NodePointData[];
  range: NodeRangeData;
  timeout: NodeTimeoutData;
};

export type TaskNodeData = {
  id: string;
  active: boolean;
  enable: boolean;
  prev: string;
  next: string[];
  loop: NodeLoopData;
  task: TaskName;
};
