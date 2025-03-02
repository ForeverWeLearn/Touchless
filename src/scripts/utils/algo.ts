import type { NormalizedLandmark } from "@mediapipe/tasks-vision";
import { RANDOM_STRING_LENGTH, type HandednessID } from "./const";

export function get_random_string(length = RANDOM_STRING_LENGTH): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
}

export function calculate_distance(point1: number[], point2: number[]) {
  return ((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2) ** 0.5;
}

export function get_label_id_and_confidence(arr: Float32Array): [number, number] {
  let max_value = arr[0];
  let max_index = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max_value) {
      max_value = arr[i];
      max_index = i;
    }
  }

  return [max_index, max_value];
}

export function normalize_keypoints(keypoints: number[][], bbox: number[], handedness: HandednessID): number[] {
  let flat: number[] = Array(keypoints.length * keypoints[0].length);

  const d = Math.max(bbox[2], bbox[3]);
  let base_x = keypoints[0][0];
  let base_y = keypoints[0][1];

  for (let i = 0, j = 0; i < keypoints.length; i++, j += 2) {
    flat[j] = (keypoints[i][0] - base_x) / d;
    if (handedness == 0) {
      flat[j] = -flat[j];
    }
    flat[j + 1] = (keypoints[i][1] - base_y) / d;
  }
  return flat;
}

export function calc_keypoints(landmarks: NormalizedLandmark[], canvas: HTMLCanvasElement): [number[][], number[]] {
  let imgw = canvas.width;
  let imgh = canvas.height;
  let box = [9999, 9999, 0, 0];

  let keypoints: number[][] = [];
  for (const landmark of landmarks) {
    const x = Math.round(imgw - landmark.x * imgw);
    const y = Math.round(landmark.y * imgh);
    keypoints.push([x, y]);
    if (box[0] > x) {
      box[0] = x;
    }
    if (box[1] > y) {
      box[1] = y;
    }
    if (box[2] < x) {
      box[2] = x;
    }
    if (box[3] < y) {
      box[3] = y;
    }
  }
  box[2] = box[2] - box[0];
  box[3] = box[3] - box[1];

  return [keypoints, box];
}
