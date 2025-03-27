import { FilesetResolver, HandLandmarker, type HandLandmarkerResult } from "@mediapipe/tasks-vision";

import type { HandednessID } from "../types/core";
import { engineStore, handResults } from "../stores/engine.svelte";
import { calculateBoundingBox } from "../utils/dsa/algorithm";
import { calculateKeypoints } from "../utils/dsa/landmark";
import { GestureClassifier } from "./gesture-classifier";
import { GestureParser } from "./gesture-parser.svelte";
import { settings } from "../stores/settings.svelte";
import { Analyzer } from "./analyzer.svelte";
import { Executor } from "./executor";
import { Drawer } from "./drawer";
import { Queue } from "../utils/dsa/queue";

async function inference(engine: Engine) {
  if (!engineStore.state.running) {
    return;
  }

  const current_time = performance.now();

  engine.updateFPS(current_time);

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
  let checked = [false, false];
  for (let i = 0; i < engine.results.landmarks.length; i++) {
    const handedness: HandednessID = engine.results.handedness[i][0].displayName == "Left" ? 0 : 1;
    if (checked[handedness]) {
      continue;
    }
    checked[handedness] = true;

    // Calculate keypoints and bounding box
    engine.keypoints[handedness] = calculateKeypoints(
      engine.results.landmarks[i],
      engine.canvas.width,
      engine.canvas.height
    );
    engine.bbox[handedness] = calculateBoundingBox(engine.keypoints[handedness]);

    // Draw keypoints and connections

    engine.drawer.landmarks(engine.keypoints[handedness]);
    engine.drawer.connections(engine.keypoints[handedness]);
    engine.drawer.bounding_box(engine.bbox[handedness]);

    // Gesture classification
    engine.gestureClassifier.input(engine.results.worldLandmarks[i], handedness);
    const prediction = engine.gestureClassifier.inference();
    if (!prediction) {
      continue;
    }
    const [label_id, confidence] = prediction;

    handResults[handedness].confidence = confidence;

    // Gesture parsing
    engine.gestureParsers[handedness].parse(label_id, engine.keypoints[handedness], engine.bbox[handedness]);
  }

  handResults[0].has = checked[0];
  handResults[1].has = checked[1];

  await engine.analyzer.analyze();

  window.requestAnimationFrame(() => inference(engine));
}

export class Engine {
  public next_trigger_time = 0;

  public landmarker!: HandLandmarker;
  public gestureClassifier!: GestureClassifier;
  public gestureParsers: GestureParser[] = [];
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
  private inferenceHandler!: () => void;

  constructor() {
    this.loadModel();
  }

  public async changeState() {
    if (!engineStore.state.ready) {
      return;
    }

    if (!engineStore.state.running) {
      if (await this.connectCamera()) {
        engineStore.state.running = true;
      }
    } else {
      if (await this.disconnectCamera()) {
        engineStore.state.running = false;
      }
    }
  }

  private async connectCamera(): Promise<boolean> {
    const video = document.getElementById("webcam") as HTMLVideoElement;
    if (video == null) {
      return false;
    }
    this.video = video as HTMLVideoElement;

    const canvas = document.getElementById("webcam-overlay") as HTMLCanvasElement;
    if (canvas == null) {
      return false;
    }
    this.canvas = canvas;
    this.context = canvas.getContext("2d") as CanvasRenderingContext2D;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.video.srcObject = stream;
      this.stream = stream;

      this.inferenceHandler = () => inference(this);
      this.video.addEventListener("loadeddata", this.inferenceHandler);

      engineStore.state.webcamAvaiable = true;

      return true;
    } catch (error) {
      engineStore.state.webcamAvaiable = false;
      console.log("Cannot access camera:", error);

      return false;
    }
  }

  private async disconnectCamera(): Promise<boolean> {
    if (this.video == undefined) {
      return false;
    }

    this.video.removeEventListener("loadeddata", this.inferenceHandler);

    if (this.video.srcObject) {
      this.video.pause();
      this.video.srcObject = null;
      this.stream.getTracks().forEach(function (track) {
        track.stop();
      });
    }

    if (this.context == undefined) {
      return false;
    }

    this.drawer.clear();

    return true;
  }

  private async loadModel() {
    const fileset_resolver = await FilesetResolver.forVisionTasks("libs/mediapipe");
    this.landmarker = await HandLandmarker.createFromOptions(fileset_resolver, {
      baseOptions: {
        modelAssetPath: "libs/mediapipe/hand_landmarker.task",
        delegate: "GPU",
      },
      runningMode: "VIDEO",
      numHands: 4,
    });

    this.gestureClassifier = new GestureClassifier("models/gesture_classifier/world/nano.tflite");

    this.gestureParsers[0] = new GestureParser(handResults[0]);
    this.gestureParsers[1] = new GestureParser(handResults[1]);

    this.analyzer = new Analyzer(this);

    this.executor = new Executor(this);

    this.drawer = new Drawer(this);

    engineStore.state.ready = true;
  }

  public updateFPS(t: number) {
    this.queueFPS.push(t);

    while (true) {
      const back = this.queueFPS.peekBack();
      if (!back || t - back <= 1000) {
        break;
      }
      this.queueFPS.pop();
    }

    engineStore.state.fps = this.queueFPS.size();
  }
}
