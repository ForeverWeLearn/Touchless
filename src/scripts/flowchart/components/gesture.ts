import type { GestureName } from "../../utils/const";

export type Gesture = {
  enable: boolean;
  gesture: GestureName;
  time: number;
};
