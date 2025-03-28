import type { PointSelectMenu } from "./types";
import { getDefaultPoint } from "../../forms";

export function createPointSelectMenu(): PointSelectMenu {
  return {
    show: false,
    data: getDefaultPoint(),
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  };
}
