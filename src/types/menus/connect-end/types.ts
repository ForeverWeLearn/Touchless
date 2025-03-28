import type { BaseMenu } from "../types";

export type ConnectEndMenu = BaseMenu & {
  source: string;
  lastOpen: number;
};
