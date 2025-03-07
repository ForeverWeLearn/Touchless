import type { Engine } from "./engine.svelte";
import { HandLandmarker } from "@mediapipe/tasks-vision";

export class Drawer {
  public point_color = "#ff0022";
  public point_radius = 5;
  public line_color = "#ffffff";
  public line_width = 3;

  private engine!: Engine;
  private CONNECTIONS = HandLandmarker.HAND_CONNECTIONS;

  constructor(engine: Engine) {
    this.engine = engine;
  }

  public clear() {
    this.engine.context.clearRect(0, 0, this.engine.canvas.width, this.engine.canvas.height);
  }

  public bounding_box(box: number[]) {
    this.engine.context.fillStyle = this.line_color;
    this.engine.context.lineWidth = this.line_width;
    this.engine.context.strokeRect(box[0], box[1], box[2], box[3]);
  }

  public landmarks(keypoints: number[][]) {
    for (const keypoint of keypoints) {
      this.engine.context.fillStyle = this.point_color;
      this.engine.context.beginPath();
      this.engine.context.arc(keypoint[0], keypoint[1], this.point_radius, 0, 2 * Math.PI);
      this.engine.context.fill();
    }
  }

  public connections(keypoints: number[][]) {
    for (const connection of this.CONNECTIONS) {
      const start = keypoints[connection.start];
      const end = keypoints[connection.end];
      this.engine.context.strokeStyle = this.line_color;
      this.engine.context.lineWidth = this.line_width;
      this.engine.context.beginPath();
      this.engine.context.moveTo(start[0], start[1]);
      this.engine.context.lineTo(end[0], end[1]);
      this.engine.context.stroke();
    }
  }

  public line(point1: number[], point2: number[]) {
    this.engine.context.fillStyle = this.line_color;
    this.engine.context.lineWidth = this.line_width;
    this.engine.context.beginPath();
    this.engine.context.moveTo(point1[0], point1[1]);
    this.engine.context.lineTo(point2[0], point2[1]);
    this.engine.context.stroke();

    this.engine.context.fillStyle = this.point_color;
    this.engine.context.beginPath();
    this.engine.context.arc(point1[0], point1[1], this.point_radius, 0, 2 * Math.PI);
    this.engine.context.arc(point2[0], point2[1], this.point_radius, 0, 2 * Math.PI);
    this.engine.context.fill();
  }
}
