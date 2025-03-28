import type { BaseMenu } from "../types";
import type { Point } from "../../forms";

export type PointSelectMenu = BaseMenu & {
  data: Point;
};
