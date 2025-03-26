export type HandednessID = 0 | 1;
export enum HandednessName {
  LEFT = "Left",
  RIGHT = "Right",
}

export enum GestureName {
  FIST = "FIST",
  HEART = "HEART",
  HI = "HI",
  INDEX = "INDEX",
  LIKE = "LIKE",
  OK = "OK",
  PALM = "PALM",
  SPIDER = "SPIDER",
  STOP = "STOP",
  THREE = "THREE",
  V = "V",
}

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

export enum KeyDirection {
  CLICK = "Click",
  PRESS = "Press",
  RELEASE = "Release",
}

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

export const HANDEDNESS_NAMES: HandednessName[] = Object.values(HandednessName);
export const GESTURE_NAMES: GestureName[] = Object.values(GestureName);
export const LANDMARK_NAMES: LandmarkName[] = Object.values(LandmarkName);
export const KEY_DIRECTION_NAMES: KeyDirection[] = Object.values(KeyDirection);

export enum ICON_PATHS {
  A360 = "imgs/svg/360.svg",
  ADD_BOX = "imgs/svg/add_box.svg",
  ADD = "imgs/svg/add.svg",
  ALIGN_LEFT = "imgs/svg/align_left.svg",
  ALIGN_RIGHT = "imgs/svg/align_right.svg",
  ARROW_RANGE = "imgs/svg/arrow_range.svg",
  ARROW_RANGE_MIN = "imgs/svg/arrow_range_min.svg",
  AUTOMATION = "imgs/svg/automation.svg",
  BOLT = "imgs/svg/bolt.svg",
  CENTER_FOCUS_WEAK = "imgs/svg/center_focus_weak.svg",
  CLOSE = "imgs/svg/close.svg",
  DELETE = "imgs/svg/delete.svg",
  DONE_OUTLINE = "imgs/svg/done_outline.svg",
  EXPAND_CONTENT = "imgs/svg/expand_content.svg",
  FLOWCHART = "imgs/svg/flowchart.svg",
  HAND_GESTURE_OFF = "imgs/svg/hand_gesture_off.svg",
  HAND_LANDMARKS = "imgs/svg/hand_landmarks.svg",
  HISTORY = "imgs/svg/history.svg",
  HOME = "imgs/svg/home.svg",
  HOURGLASS_TOP = "imgs/svg/hourglass_top.svg",
  HUB = "imgs/svg/hub.svg",
  KEYBOARD_ALT = "imgs/svg/keyboard_alt.svg",
  PAN_TOOL = "imgs/svg/pan_tool.svg",
  PAUSE = "imgs/svg/pause.svg",
  PAUSE_CIRCLE = "imgs/svg/pause_circle.svg",
  PLAY_ARROW = "imgs/svg/play_arrow.svg",
  PREVIEW = "imgs/svg/preview.svg",
  PREVIEW_OFF = "imgs/svg/preview_off.svg",
  REMOVE = "imgs/svg/remove.svg",
  SAVE = "imgs/svg/save.svg",
  SETTINGS = "imgs/svg/settings.svg",
  STOP = "imgs/svg/stop.svg",
  TERMINAL = "imgs/svg/terminal.svg",
  FIELDS = "imgs/svg/text_fields.svg",
  TIMELAPSE = "imgs/svg/timelapse.svg",
  TOKEN = "imgs/svg/token.svg",
}
