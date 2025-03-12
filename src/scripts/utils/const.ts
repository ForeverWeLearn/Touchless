import { LocalFileReader } from "./reader";

export type HandednessID = 0 | 1;
export type HandednessName = "Left" | "Right";

export type GestureName = "FIST" | "FIST_BACK" | "ONE" | "PALM" | "PALM_BACK" | "THREE" | "TWO";

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
}

export const HANDEDNESS_NAMES: HandednessName[] = ["Left", "Right"];
export const GESTURE_NAMES: GestureName[] = ["FIST", "FIST_BACK", "ONE", "PALM", "PALM_BACK", "THREE", "TWO"];

export const LANDMARK_NAMES: LandmarkName[] = Object.values(LandmarkName);

export const KEY_DIRECTION_NAMES: KeyDirection[] = ["Click", "Press", "Release"];
export const KEY_NAMES = [
  "Control",
  "Alt",
  "Shift",
  "Meta",
  "Tab",
  "Home",
  "End",
  "Insert",
  "Delete",
  "Space",
  "Scroll",
  "Up",
  "Down",
  "Left",
  "Right",
  "Zoom",
  "F1",
  "F2",
  "F3",
  "F4",
  "F5",
  "F6",
  "F7",
  "F8",
  "F9",
  "F10",
  "F11",
  "F12",
  "Escape",
  "Enter",
  "Unicode(a)",
  "Unicode(b)",
  "Unicode(c)",
  "Unicode(d)",
  "Unicode(e)",
  "Unicode(f)",
  "Unicode(g)",
  "Unicode(h)",
  "Unicode(i)",
  "Unicode(j)",
  "Unicode(k)",
  "Unicode(l)",
  "Unicode(m)",
  "Unicode(n)",
  "Unicode(o)",
  "Unicode(p)",
  "Unicode(q)",
  "Unicode(r)",
  "Unicode(s)",
  "Unicode(t)",
  "Unicode(u)",
  "Unicode(v)",
  "Unicode(w)",
  "Unicode(x)",
  "Unicode(y)",
  "Unicode(z)",
];
