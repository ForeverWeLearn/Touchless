import type { Landmark, NormalizedLandmark } from "@mediapipe/tasks-vision";

<<<<<<< HEAD:src/utils/dsa/landmark.ts
import type { HandednessID } from "../../types/core";
import { calculateAngle } from "./math";
=======
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

export function argmax(arr: Float32Array): [number, number] {
  let maxValue = arr[0];
  let max_index = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxValue) {
      maxValue = arr[i];
      max_index = i;
    }
  }

  return [max_index, maxValue];
}

export function calculateDistance(point1: number[], point2: number[]) {
  return ((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2) ** 0.5;
}

export function calculateAngle(initial: number[], terminal: number[]): number {
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
>>>>>>> 07011e4ae6974e031b4ac040dd3515816012aa10:src/scripts/utils/algo.ts

export function calculateKeypoints(landmarks: NormalizedLandmark[], width: number, height: number): number[][] {
  let keypoints: number[][] = [];

  for (const landmark of landmarks) {
    const x = Math.round(width - landmark.x * width);
    const y = Math.round(landmark.y * height);
    keypoints.push([x, y]);
  }

  return keypoints;
}

export function landmarks2array(landmarks: Landmark[] | NormalizedLandmark[]): number[][] {
  let arr = [];

  for (const landmark of landmarks) {
    arr.push([landmark.x, landmark.y, landmark.z]);
  }

  return arr;
}

export function rotateX(landmarks: number[][], angle: number): number[][] {
  const rad = angle * (Math.PI / 180);

  const mat = [
    [1, 0, 0],
    [0, Math.cos(rad), -Math.sin(rad)],
    [0, Math.sin(rad), Math.cos(rad)],
  ];

  const rotated: number[][] = [];

  for (const landmark of landmarks) {
    const x = landmark[0];
    const y = landmark[1] * mat[1][1] + landmark[2] * mat[1][2];
    const z = landmark[1] * mat[2][1] + landmark[2] * mat[2][2];

    rotated.push([x, y, z]);
  }

  return rotated;
}

export function rotateY(landmarks: number[][], angle: number): number[][] {
  const rad = angle * (Math.PI / 180);

  const mat = [
    [Math.cos(rad), 0, Math.sin(rad)],
    [0, 1, 0],
    [-Math.sin(rad), 0, Math.cos(rad)],
  ];

  const rotated: number[][] = [];

  for (const landmark of landmarks) {
    const x = landmark[0] * mat[0][0] + landmark[2] * mat[0][2];
    const y = landmark[1];
    const z = landmark[0] * mat[2][0] + landmark[2] * mat[2][2];

    rotated.push([x, y, z]);
  }

  return rotated;
}

export function rotateZ(landmarks: number[][], angle: number): number[][] {
  const rad = angle * (Math.PI / 180);

  const mat = [
    [Math.cos(rad), -Math.sin(rad), 0],
    [Math.sin(rad), Math.cos(rad), 0],
    [0, 0, 1],
  ];

  const rotated: number[][] = [];

  for (const landmark of landmarks) {
    const x = landmark[0] * mat[0][0] + landmark[1] * mat[0][1];
    const y = landmark[0] * mat[1][0] + landmark[1] * mat[1][1];
    const z = landmark[2];

    rotated.push([x, y, z]);
  }

  return rotated;
}

export function processLandmarks(landmarks: number[][], handedness: HandednessID): number[] {
  const [x0, y0, z0] = landmarks[0];

  for (const landmark of landmarks) {
    landmark[0] -= x0;
    landmark[1] -= y0;
    landmark[2] -= z0;
  }

  const angleX = calculateAngle([0, 0], [landmarks[9][1], landmarks[9][2]]);
  landmarks = rotateX(landmarks, -angleX + 90);

  const angleY = calculateAngle([0, 0], [-landmarks[9][0], landmarks[9][2]]);
  landmarks = rotateY(landmarks, -angleY + 90);

  const angleZ = calculateAngle([0, 0], [landmarks[17][0], landmarks[17][1]]);
  landmarks = rotateZ(landmarks, -angleZ);

  if (handedness == 1) {
    for (const landmark of landmarks) {
      landmark[1] *= -1;
    }
  }

  const rat = 1 / landmarks[9][2];

  const flat = landmarks.flat();
  if (rat != 0) {
    for (let i = 0; i < flat.length; i++) {
      flat[i] *= rat;
    }
  }

  return flat;
}
