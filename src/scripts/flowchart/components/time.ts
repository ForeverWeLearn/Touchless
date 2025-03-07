export enum TimeType {
  INSTANT = "INSTANT",
  NORMAL = "NORMAL",
  INFINITE = "INFINITE",
}

export type Time = {
  type: TimeType;
  value: number;
};
