import { FilesetResolver, HandLandmarker, type HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { hand_result_left, hand_result_right } from "../stores/hand_result";
import { calc_keypoints, normalize_keypoints } from "../utils/algo";
import { draw_connections, draw_landmarks } from "../utils/draw";
import { GestureClassifier } from "./gesture_classifier";
import { GestureParser } from "./gesture_parser";
import { labels } from "../utils/labels";
import { Node } from "../utils/node";

const hand_results = [hand_result_left, hand_result_right];

let results: HandLandmarkerResult;

async function inference(engine: Engine) {
  if (!engine.state) {
    return;
  }

  const current_time = performance.now();

  if (current_time < engine.next_trigger_time) {
    window.requestAnimationFrame(() => inference(engine));
    return;
  }

  results = engine.landmarker.detectForVideo(engine.video, current_time);

  engine.context_2d.clearRect(0, 0, engine.canvas.width, engine.canvas.height);

  if (results.landmarks.length == 0) {
    engine.next_trigger_time = current_time + 250;
    hand_results[0].update((s) => ({
      ...s,
      hold_time: 0,
      scanning: true,
    }));
    hand_results[1].update((s) => ({
      ...s,
      hold_time: 0,
      scanning: true,
    }));
    window.requestAnimationFrame(() => inference(engine));
    return;
  }

  let i = 0;
  for (const landmark of results.landmarks) {
    let keypoints = calc_keypoints(landmark, engine.canvas);

    engine.draw(keypoints);

    let normalized_keypoints = normalize_keypoints(keypoints);

    const handedness = results.handedness[i][0].displayName == "Left" ? 0 : 1;
    const label_id = engine.classifier[handedness].inference(normalized_keypoints);
    const label_name = labels[label_id];

    engine.parser[handedness].parse(label_id, keypoints);

    hand_results[handedness].update((s) => ({
      ...s,
      gesture_label: label_name,
      hold_time: engine.parser[handedness].hold_time,
      scanning: false,
    }));

    i += 1;
  }

  window.requestAnimationFrame(() => inference(engine));
}

export class Engine {
  public state = false;
  public next_trigger_time = 0;
  public nodes: Node[] = [];

  public landmarker!: HandLandmarker;
  public classifier: GestureClassifier[] = [];
  public parser: GestureParser[] = [];

  public video!: HTMLVideoElement;
  public canvas!: HTMLCanvasElement;
  public context_2d!: CanvasRenderingContext2D;

  public landmark_color = "#ff0022";
  public landmark_radius = 5;
  public line_color = "#001f22";
  public line_thickness = 3;

  private stream!: MediaStream;
  private inference_handler!: () => void;

  constructor() {
    this.setup();
  }

  public set_state(state: boolean) {
    this.state = state;
    if (state) {
      this.connect_camera();
    } else {
      this.disconnect_camera();
    }
  }

  public draw(keypoints: number[][]) {
    draw_connections(keypoints, this.context_2d, this.line_color, this.line_thickness);
    draw_landmarks(keypoints, this.context_2d, this.landmark_color, this.landmark_radius);
  }

  private connect_camera() {
    const video = document.getElementById("webcam") as HTMLVideoElement;
    if (video == null) {
      return;
    }
    this.video = video as HTMLVideoElement;

    const canvas = document.getElementById("webcam-overlay") as HTMLCanvasElement;
    if (canvas == null) {
      return;
    }
    this.canvas = canvas;
    this.context_2d = canvas.getContext("2d") as CanvasRenderingContext2D;

    navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
      this.video.srcObject = stream;
      this.stream = stream;
      this.inference_handler = () => inference(this);
      this.video.addEventListener("loadeddata", this.inference_handler);
    });
  }

  private disconnect_camera() {
    if (this.video == undefined) {
      return;
    }
    this.video.removeEventListener("loadeddata", this.inference_handler);
    if (this.video.srcObject) {
      this.video.pause();
      this.video.srcObject = null;
      this.stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }
    if (this.context_2d == undefined) {
      return;
    }
    this.context_2d.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private async setup() {
    await this.load_data();
    await this.load_model();
    await this.model_warmup();
  }

  private async load_data() {
    let objs: { id: number }[] = [];
    await fetch("nodes.json")
      .then((response) => response.json())
      .then((data) => {
        objs.push(...data);
      });
    objs.sort((a, b) => a.id - b.id);
    objs.forEach((obj) => {
      this.nodes.push(new Node(obj));
    });
  }

  private async load_model() {
    const fileset_resolver = await FilesetResolver.forVisionTasks("libs/mediapipe");
    this.landmarker = await HandLandmarker.createFromOptions(fileset_resolver, {
      baseOptions: {
        modelAssetPath: "libs/mediapipe/hand_landmarker.task",
        delegate: "GPU",
      },
      runningMode: "IMAGE",
      numHands: 2,
    });

    this.classifier[0] = new GestureClassifier("models/gesture_classifier_left.tflite");
    this.classifier[1] = new GestureClassifier("models/gesture_classifier_right.tflite");

    this.parser[0] = new GestureParser(this.nodes);
    this.parser[1] = new GestureParser(this.nodes);
  }

  private async model_warmup() {
    this.landmarker.detect(document.getElementById("warmup") as HTMLImageElement);
    await this.landmarker.setOptions({ runningMode: "VIDEO" });
  }
}
