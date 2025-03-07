import type { NormalizedLandmark } from "@mediapipe/tasks-vision";

export const RANDOM_STRING_LENGTH = 6;

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

export function calculate_keypoints(
  landmarks: NormalizedLandmark[],
  canvas: HTMLCanvasElement
): [number[][], number[]] {
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
