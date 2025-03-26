import type { Runtime } from "./common";

export type BaseCondition = {
  enable: boolean;
  time2active: number;
  runtime: Runtime;
};
