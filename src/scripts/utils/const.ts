import type { KeySequenceType } from "../flow/nodes/task/key_sequence";
import { LocalFileReader } from "./reader";

export type HandednessID = 0 | 1;
export enum HandednessName {
  Left = "Left",
  Right = "Right",
}

export enum GestureName {
  Fist = "FIST",
  FistBack = "FIST_BACK",
  One = "ONE",
  Palm = "PALM",
  PalmBack = "PALM_BACK",
  Three = "THREE",
  Two = "TWO",
}

export type LandmarkID = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export enum LandmarkName {
  Wrist = "Wrist",

  ThumbCMC = "Thumb CMC",
  ThumbMCP = "Thumb MCP",
  ThumbIP = "Thumb IP",
  ThumbTIP = "Thumb TIP",

  IndexMCP = "Index MCP",
  IndexPIP = "Index PIP",
  IndexDIP = "Index DIP",
  IndexTIP = "Index TIP",

  MiddleMCP = "Middle MCP",
  MiddlePIP = "Middle PIP",
  MiddleDIP = "Middle DIP",
  MiddleTIP = "Middle TIP",

  RingMCP = "Ring MCP",
  RingPIP = "Ring PIP",
  RingDIP = "Ring DIP",
  RingTIP = "Ring TIP",

  PinkyMCP = "Pinky MCP",
  PinkyPIP = "Pinky PIP",
  PinkyDIP = "Pinky DIP",
  PinkyTIP = "Pinky TIP",
}

export const HANDEDNESS_IDS: HandednessID[] = [0, 1];
export const HANDEDNESS_NAMES: HandednessName[] = Object.values(HandednessName);

export const GESTURE_NAMES: GestureName[] = Object.values(GestureName);

export const LANDMARK_IDS: LandmarkID[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
export const LANDMARK_NAMES: LandmarkName[] = Object.values(LandmarkName);

export const KEY_SEQUENCES: KeySequenceType[] = await LocalFileReader.default_key_sequences();
export const KEY_SEQUENCE_NAMES: string[] = KEY_SEQUENCES.map((v) => v.name);
