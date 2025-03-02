export type HandednessName = "Left" | "Right";
export type HandednessID = 0 | 1;
export type GestureName = "PALM" | "PALM_BACK" | "FIST" | "FIST_BACK" | "ONE" | "TWO" | "THREE";
export type LandmarkName =
  | "WRIST"
  | "THUMB_CMC"
  | "THUMB_MCP"
  | "THUMB_IP"
  | "THUMB_TIP"
  | "INDEX_FINGER_MCP"
  | "INDEX_FINGER_PIP"
  | "INDEX_FINGER_DIP"
  | "INDEX_FINGER_TIP"
  | "MIDDLE_FINGER_MCP"
  | "MIDDLE_FINGER_PIP"
  | "MIDDLE_FINGER_DIP"
  | "MIDDLE_FINGER_TIP"
  | "RING_FINGER_MCP"
  | "RING_FINGER_PIP"
  | "RING_FINGER_DIP"
  | "RING_FINGER_TIP"
  | "PINKY_FINGER_MCP"
  | "PINKY_FINGER_PIP"
  | "PINKY_FINGER_DIP"
  | "PINKY_FINGER_TIP";
export type LandmarkID = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;
export type TaskName =
  | "Copy"
  | "Paste"
  | "CloseTab"
  | "SelectAll"
  | "Undo"
  | "Redo"
  | "Save"
  | "SelectLine"
  | "DeselectLine"
  | "ShowDesktop"
  | "ChangeTabRight"
  | "ChangeTabLeft"
  | "ChangeAppRight"
  | "ChangeAppLeft"
  | "CloseApp";

type Landmark = {
  id: LandmarkID;
  name: LandmarkName;
};

export const RANDOM_STRING_LENGTH = 6;
export const HANDEDNESS_IDS: HandednessID[] = [0, 1];
export const HANDEDNESS_NAMES: HandednessName[] = ["Left", "Right"];
export const GESTURES: GestureName[] = ["FIST", "FIST_BACK", "ONE", "PALM", "PALM_BACK", "THREE", "TWO"];
export const LANDMARK_IDS: LandmarkID[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
export const LANDMARK_NAMES: LandmarkName[] = [
  "WRIST",
  "THUMB_CMC",
  "THUMB_MCP",
  "THUMB_IP",
  "THUMB_TIP",
  "INDEX_FINGER_MCP",
  "INDEX_FINGER_PIP",
  "INDEX_FINGER_DIP",
  "INDEX_FINGER_TIP",
  "MIDDLE_FINGER_MCP",
  "MIDDLE_FINGER_PIP",
  "MIDDLE_FINGER_DIP",
  "MIDDLE_FINGER_TIP",
  "RING_FINGER_MCP",
  "RING_FINGER_PIP",
  "RING_FINGER_DIP",
  "RING_FINGER_TIP",
  "PINKY_FINGER_MCP",
  "PINKY_FINGER_PIP",
  "PINKY_FINGER_DIP",
  "PINKY_FINGER_TIP",
];
export const LANDMARKS: Landmark[] = [
  {
    id: 0,
    name: "WRIST",
  },
  {
    id: 1,
    name: "THUMB_CMC",
  },
  {
    id: 2,
    name: "THUMB_MCP",
  },
  {
    id: 3,
    name: "THUMB_IP",
  },
  {
    id: 4,
    name: "THUMB_TIP",
  },
  {
    id: 5,
    name: "INDEX_FINGER_MCP",
  },
  {
    id: 6,
    name: "INDEX_FINGER_PIP",
  },
  {
    id: 7,
    name: "INDEX_FINGER_DIP",
  },
  {
    id: 8,
    name: "INDEX_FINGER_TIP",
  },
  {
    id: 9,
    name: "MIDDLE_FINGER_MCP",
  },
  {
    id: 10,
    name: "MIDDLE_FINGER_PIP",
  },
  {
    id: 11,
    name: "MIDDLE_FINGER_DIP",
  },
  {
    id: 12,
    name: "MIDDLE_FINGER_TIP",
  },
  {
    id: 13,
    name: "RING_FINGER_MCP",
  },
  {
    id: 14,
    name: "RING_FINGER_PIP",
  },
  {
    id: 15,
    name: "RING_FINGER_DIP",
  },
  {
    id: 16,
    name: "RING_FINGER_TIP",
  },
  {
    id: 17,
    name: "PINKY_FINGER_MCP",
  },
  {
    id: 18,
    name: "PINKY_FINGER_PIP",
  },
  {
    id: 19,
    name: "PINKY_FINGER_DIP",
  },
  {
    id: 20,
    name: "PINKY_FINGER_TIP",
  },
];
export const TASKS: TaskName[] = [
  "Copy",
  "Paste",
  "CloseTab",
  "SelectAll",
  "Undo",
  "Redo",
  "Save",
  "SelectLine",
  "DeselectLine",
  "ShowDesktop",
  "ChangeTabRight",
  "ChangeTabLeft",
  "ChangeAppRight",
  "ChangeAppLeft",
  "CloseApp",
];
