import { HandLandmarker } from "@mediapipe/tasks-vision";

export function draw_line(point1: number[], point2: number[], context_2d: CanvasRenderingContext2D, color = "#5cff8d", thickness = 5) {
  context_2d.fillStyle = color;
  context_2d.lineWidth = thickness;
  context_2d.beginPath();
  context_2d.moveTo(point1[0], point1[1]);
  context_2d.lineTo(point2[0], point2[1]);
  context_2d.stroke();
}

export function draw_bounding_box(box: number[], context_2d: CanvasRenderingContext2D, color: string, thickness = 2) {
  context_2d.fillStyle = color;
  context_2d.lineWidth = thickness;
  context_2d.strokeRect(box[0], box[1], box[2], box[3]);
}

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
