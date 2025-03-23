import { getDefaultPoint, type Point } from "../../generic/point";
import type { TaskAttribute } from "../task";

export type BalancerAttribute = {
  initial: Point;
  terminal: Point;
  unit: number;
  tasks: {
    up?: TaskAttribute;
    down?: TaskAttribute;
    left?: TaskAttribute;
    right?: TaskAttribute;
  };
};

export function get_default_command_attribute(): BalancerAttribute {
  return {
    initial: getDefaultPoint(),
    terminal: getDefaultPoint(),
    unit: 1,
    tasks: {},
  };
}
