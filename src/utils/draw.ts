import { HandLandmarker } from "@mediapipe/tasks-vision";

export function draw_landmarks(keypoints: number[][], context_2d: CanvasRenderingContext2D, color: string, radius = 2) {
  for (const keypoint of keypoints) {
    context_2d.fillStyle = color;
    context_2d.beginPath();
    context_2d.arc(keypoint[0], keypoint[1], radius, 0, 2 * Math.PI);
    context_2d.fill();
  }
}

export function draw_connections(
  keypoints: number[][],
  context_2d: CanvasRenderingContext2D,
  color: string,
  thickness = 2
) {
  for (const connection of HandLandmarker.HAND_CONNECTIONS) {
    const start = keypoints[connection.start];
    const end = keypoints[connection.end];
    context_2d.strokeStyle = color;
    context_2d.lineWidth = thickness;
    context_2d.beginPath();
    context_2d.moveTo(start[0], start[1]);
    context_2d.lineTo(end[0], end[1]);
    context_2d.stroke();
  }
}
