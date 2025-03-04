// Core
import { FilesetResolver, HandLandmarker, type HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { GestureClassifier } from "./gesture_classifier";
import { GestureParser } from "./gesture_parser.svelte";
import { Analyzer } from "./analyzer.svelte";
import { Executor } from "./executor";

// Utils
import type { HandednessID } from "./utils/const";
import { draw_bounding_box, draw_connections, draw_landmarks } from "./utils/draw";
import { calc_keypoints } from "./utils/algo";
import { engine_state } from "../stores/engine_state.svelte";
import { hand_results } from "../stores/hand_result.svelte";

async function inference(engine: Engine) {
  if (!engine_state.running) {
    return;
  }

  // Do nothing until next trigger time
  const current_time = performance.now();
  if (current_time < engine.next_trigger_time) {
    window.requestAnimationFrame(() => inference(engine));
    return;
  }

  // Hand landmarking
  engine.results = engine.landmarker.detectForVideo(engine.video, current_time);

  // Clear canvas
  engine.context_2d.clearRect(0, 0, engine.canvas.width, engine.canvas.height);

  // No hand detected
  if (engine.results.landmarks.length == 0) {
    engine.next_trigger_time = current_time + 250;

    // Update UI
    hand_results[0].has = false;
    hand_results[1].has = false;

    window.requestAnimationFrame(() => inference(engine));
    return;
  }

  // Hands detected
  let i = 0;
  let checked = [false, false];
  for (const landmark of engine.results.landmarks) {
    const handedness: HandednessID = engine.results.handedness[i][0].displayName == "Left" ? 0 : 1;
    if (checked[handedness]) {
      continue;
    }
    checked[handedness] = true;

    // Calculate keypoints and bounding box
    [engine.keypoints[handedness], engine.bbox[handedness]] = calc_keypoints(landmark, engine.canvas);
    engine.draw(handedness);

    // Gesture classification
    engine.gesture_classifier.input(engine.keypoints[handedness], engine.bbox[handedness], handedness);
    const [label_id, confidence] = engine.gesture_classifier.inference();
    
    hand_results[handedness].confidence = confidence;

    // Gesture parsing
    engine.gesture_parsers[handedness].parse(label_id, engine.keypoints[handedness], engine.bbox[handedness]);
    i += 1;
  }
  engine.analyzer.analyze();

  window.requestAnimationFrame(() => inference(engine));
}

export class Engine {
  public next_trigger_time = 0;

  public landmarker!: HandLandmarker;
  public gesture_classifier!: GestureClassifier;
  public gesture_parsers: GestureParser[] = [];
  public analyzer!: Analyzer;
  public executor!: Executor;

  public results!: HandLandmarkerResult;
  public keypoints: [number[][], number[][]] = [[], []];
  public bbox: [number[], number[]] = [[], []];

  public video!: HTMLVideoElement;
  public canvas!: HTMLCanvasElement;
  public context_2d!: CanvasRenderingContext2D;

  public point_color = "#ff0022";
  public point_radius = 5;
  public line_color = "#ffffff";
  public line_thickness = 3;

  private stream!: MediaStream;
  private inference_handler!: () => void;

  constructor() {
    $effect(() => {
      this.set_state(engine_state.running);
    });
    this.load_model();
  }

  public async set_state(running: boolean) {
    engine_state.running = running;
    if (running) {
      if (!engine_state.ready) {
        await this.model_warmup();
      }
      this.connect_camera();
    } else {
      this.disconnect_camera();
    }
  }

  public draw(handedness: HandednessID) {
    draw_connections(this.keypoints[handedness], this.context_2d, this.line_color, this.line_thickness);
    draw_landmarks(this.keypoints[handedness], this.context_2d, this.point_color, this.point_radius);
    draw_bounding_box(this.bbox[handedness], this.context_2d, this.line_color, this.line_thickness);
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

  private async load_model() {
    const fileset_resolver = await FilesetResolver.forVisionTasks("libs/mediapipe");
    this.landmarker = await HandLandmarker.createFromOptions(fileset_resolver, {
      baseOptions: {
        modelAssetPath: "libs/mediapipe/hand_landmarker.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numHands: 4,
    });

    this.gesture_classifier = new GestureClassifier("models/gesture_classifier_right.tflite");

    this.gesture_parsers[0] = new GestureParser(hand_results[0]);
    this.gesture_parsers[1] = new GestureParser(hand_results[1]);

    this.analyzer = new Analyzer(this);

    this.executor = new Executor();
  }

  private async model_warmup() {
    await this.landmarker.setOptions({ runningMode: "IMAGE" });
    this.landmarker.detect(document.getElementById("warmup") as HTMLImageElement);
    await this.landmarker.setOptions({ runningMode: "VIDEO" });
    engine_state.ready = true;
  }
}
