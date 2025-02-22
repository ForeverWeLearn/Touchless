import type { NormalizedLandmark } from "@mediapipe/tasks-vision";

export function argmax(arr: Float32Array): number {
  let maxValue = arr[0];
  let maxIndex = 0;

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > maxValue) {
      maxValue = arr[i];
      maxIndex = i;
    }
  }

  return maxIndex;
}

export function normalize_keypoints(keypoints: number[][]): number[] {
  let rel_keypoints: number[][] = structuredClone(keypoints);
  let base_x = rel_keypoints[0][0];
  let base_y = rel_keypoints[0][1];

  for (let i = 0; i < keypoints.length; i++) {
    rel_keypoints[i][0] = keypoints[i][0] - base_x;
    rel_keypoints[i][1] = keypoints[i][1] - base_y;
  }

  let flat_rel_keypoints: number[] = rel_keypoints.flat();

  let max_value = flat_rel_keypoints.reduce((max, x) => Math.max(max, Math.abs(x)), -Infinity);

  return flat_rel_keypoints.map((x) => x / max_value);
}

export function calc_keypoints(landmarks: NormalizedLandmark[], canvas: HTMLCanvasElement): number[][] {
  let imgw = canvas.width;
  let imgh = canvas.height;

  let keypoints: number[][] = [];
  for (const landmark of landmarks) {
    const x = Math.round(imgw - landmark.x * imgw);
    const y = Math.round(landmark.y * imgh);
    keypoints.push([x, y]);
  }

  return keypoints;
}
