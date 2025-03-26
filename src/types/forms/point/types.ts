import type { HandednessID, LandmarkID } from "../../core";

export type Point = {
  handedness: HandednessID;
  landmark: LandmarkID;
};
