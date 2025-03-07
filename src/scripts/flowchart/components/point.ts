import type { HandednessID, LandmarkID } from "../../utils/const";

export enum PointType {
  STATIC = "STATIC",
  DYNAMIC = "DYNAMIC",
}

export type Point = {
  type: PointType;
  handedness: HandednessID;
  landmark: LandmarkID;
};
