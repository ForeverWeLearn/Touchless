import type { HandednessID } from "./utils/const";
import { FilesetResolver, HandLandmarker, type HandLandmarkerResult } from "@mediapipe/tasks-vision";
import { engine_state, handResults } from "../stores/engine.svelte";
import { calculateKeypoints } from "./utils/algo";
import { GestureClassifier } from "./gesture_classifier";
import { GestureParser } from "./gesture_parser.svelte";
import { settings } from "../stores/settings.svelte";
import { Analyzer } from "./analyzer.svelte";
import { Executor } from "./executor";
import { Drawer } from "./drawer";
import { Queue } from "./utils/queue";

async function inference(engine: Engine) {
  if (!engine_state.running) {
    return;
  }

  const current_time = performance.now();

  engine.calculateFPS(current_time);

  // Do nothing until next trigger time
  if (current_time < engine.next_trigger_time) {
    window.requestAnimationFrame(() => inference(engine));
    return;
  }

  // Hand landmarking
  engine.results = engine.landmarker.detectForVideo(engine.video, current_time);

  // Clear canvas
  engine.drawer.clear();

  // No hand detected
  if (engine.results.landmarks.length == 0) {
    engine.next_trigger_time = current_time + settings.engineIdleStep;

    await engine.analyzer.analyze();

    handResults[0].has = false;
    handResults[1].has = false;

    setTimeout(() => window.requestAnimationFrame(() => inference(engine)), settings.engineIdleStep);
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
    [engine.keypoints[handedness], engine.bbox[handedness]] = calculateKeypoints(landmark, engine.canvas);
    engine.drawer.landmarks(engine.keypoints[handedness]);
    engine.drawer.connections(engine.keypoints[handedness]);
    engine.drawer.bounding_box(engine.bbox[handedness]);

    // Gesture classification
    engine.gesture_classifier.input(engine.keypoints[handedness], engine.bbox[handedness], handedness);
    const [label_id, confidence] = engine.gesture_classifier.inference();

    handResults[handedness].confidence = confidence;

    // Gesture parsing
    engine.gesture_parsers[handedness].parse(label_id, engine.keypoints[handedness], engine.bbox[handedness]);
    i += 1;
  }

  handResults[0].has = checked[0];
  handResults[1].has = checked[1];

  await engine.analyzer.analyze();

  window.requestAnimationFrame(() => inference(engine));
}

export class Engine {
  public next_trigger_time = 0;

  public landmarker!: HandLandmarker;
  public gesture_classifier!: GestureClassifier;
  public gesture_parsers: GestureParser[] = [];
  public analyzer!: Analyzer;
  public executor!: Executor;
  public drawer!: Drawer;

  public results!: HandLandmarkerResult;
  public keypoints: [number[][], number[][]] = [[], []];
  public bbox: [number[], number[]] = [[], []];

  public video!: HTMLVideoElement;
  public canvas!: HTMLCanvasElement;
  public context!: CanvasRenderingContext2D;

  private queueFPS: Queue<number> = new Queue();
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
      this.connect_camera();
    } else {
      this.disconnect_camera();
    }
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
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

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
    if (this.context == undefined) {
      return;
    }
    this.drawer.clear();
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

    this.gesture_parsers[0] = new GestureParser(handResults[0]);
    this.gesture_parsers[1] = new GestureParser(handResults[1]);

    this.analyzer = new Analyzer(this);

    this.executor = new Executor(this);

    this.drawer = new Drawer(this);
  }

  public calculateFPS(t: number) {
    this.queueFPS.push(t);
    // @ts-ignore
    while (t - this.queueFPS.peek_back() > 1000) {
      this.queueFPS.pop();
    }
    engine_state.fps = this.queueFPS.size();
  }
}
