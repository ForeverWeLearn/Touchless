import { get_default_point, type Point } from "../../generic/point";
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
    initial: get_default_point(),
    terminal: get_default_point(),
    unit: 1,
    tasks: {},
  };
}
