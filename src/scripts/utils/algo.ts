import type { NormalizedLandmark } from "@mediapipe/tasks-vision";

export const RANDOM_STRING_LENGTH = 6;

export function getRandomString(length = RANDOM_STRING_LENGTH): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let result = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
  }

  return result;
}

export function calculateDistance(point1: number[], point2: number[]) {
  return ((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2) ** 0.5;
}

export function calculateVectorAngle(initial: number[], terminal: number[]): number {
  const vector = [terminal[0] - initial[0], terminal[1] - initial[1]];

  const angleRad = Math.atan2(vector[1], vector[0]);

  let angleDeg = (angleRad * 180) / Math.PI;

  if (angleDeg < 0) {
    angleDeg += 360;
  }

  return angleDeg;
}

export function calculateKeypoints(landmarks: NormalizedLandmark[], canvas: HTMLCanvasElement): [number[][], number[]] {
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
