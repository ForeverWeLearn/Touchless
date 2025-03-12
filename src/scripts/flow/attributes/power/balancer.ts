import { get_default_point, type Point } from "../../generic/point";
import { type TaskAttributes } from "../task";

export type BalancerAttribute = {
  initial: Point;
  terminal: Point;
  unit: number;
  tasks: {
    up?: TaskAttributes,
    down?: TaskAttributes,
    left?: TaskAttributes,
    right?: TaskAttributes,
  }
};

export function get_default_command_attribute(): BalancerAttribute {
  return {
    initial: get_default_point(),
    terminal: get_default_point(),
    unit: 1,
    tasks: {
      up: {},
      down: {},
      left: {},
      right: {},
    }
  };
}
