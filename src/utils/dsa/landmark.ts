import type { Landmark, NormalizedLandmark } from "@mediapipe/tasks-vision";

import type { HandednessID } from "../../types/core";
import { calculateAngle } from "./math";

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
