import type { HandednessID, LandmarkID } from "../../utils/const";

export type PointType = "STATIC" | "DYNAMIC";

export type Point = {
  type: PointType;
  handedness: HandednessID;
  landmark: LandmarkID;
};

export function getDefaultPoint(): Point {
  return {
    type: "DYNAMIC",
    handedness: 1,
    landmark: 8,
  };
}
