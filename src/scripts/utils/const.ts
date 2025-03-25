export type HandednessID = 0 | 1;
export type HandednessName = "Left" | "Right";

export type GestureName =
  | "FIST"
  | "HEART"
  | "HI"
  | "INDEX"
  | "LIKE"
  | "OK"
  | "PALM"
  | "SPIDER"
  | "STOP"
  | "THREE"
  | "V";

export type LandmarkID = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export enum LandmarkName {
  WRIST = "Wrist",

  THUMB_CMC = "Thumb CMC",
  THUMB_MCP = "Thumb MCP",
  THUMB_IP = "Thumb IP",
  THUMB_TIP = "Thumb TIP",

  INDEX_MCP = "Index MCP",
  INDEX_PIP = "Index PIP",
  INDEX_DIP = "Index DIP",
  INDEX_TIP = "Index TIP",

  MIDDLE_MCP = "Middle MCP",
  MIDDLE_PIP = "Middle PIP",
  MIDDLE_DIP = "Middle DIP",
  MIDDLE_TIP = "Middle TIP",

  RING_MCP = "Ring MCP",
  RING_PIP = "Ring PIP",
  RING_DIP = "Ring DIP",
  RING_TIP = "Ring TIP",

  PINKY_MCP = "Pinky MCP",
  PINKY_PIP = "Pinky PIP",
  PINKY_DIP = "Pinky DIP",
  PINKY_TIP = "Pinky TIP",
}

export type KeyDirection = "Click" | "Press" | "Release";
export type Key = {
  key: string;
  direction: KeyDirection;
};
export type KeySequence = {
  name: string;
  sequence: Key[];
};
export type Command = {
  name: string;
  comamnd: string;
};

export const HANDEDNESS_NAMES: HandednessName[] = ["Left", "Right"];
export const GESTURE_NAMES: GestureName[] = [
  "FIST",
  "HEART",
  "HI",
  "INDEX",
  "LIKE",
  "OK",
  "PALM",
  "SPIDER",
  "STOP",
  "THREE",
  "V",
];

export const LANDMARK_NAMES: LandmarkName[] = Object.values(LandmarkName);

export const KEY_DIRECTION_NAMES: KeyDirection[] = ["Click", "Press", "Release"];