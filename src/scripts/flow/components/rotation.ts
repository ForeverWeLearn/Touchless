import type { CustomRange } from "./custom_range";
import type { Point } from "./point";

export type Rotation = {
  enable: boolean;
  pivot: Point;
  target: Point;
  degree_range: CustomRange;
};
