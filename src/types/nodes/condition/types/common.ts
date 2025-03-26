export enum ConditionType {
  GESTURES = "GESTURES",
  DISTANCE = "DISTANCE",
  ROTATION = "ROTATION",
}

export type Runtime = {
  activated: boolean;
  firstSatisfied: number;
  lastSatisfied: number;
};
