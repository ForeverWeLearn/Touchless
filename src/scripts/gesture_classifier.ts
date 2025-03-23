import type { HandednessID } from "./utils/const";
import type { Landmark } from "@mediapipe/tasks-vision";
import { argmax, landmarks2array, processLandmarks } from "./utils/algo";

export class GestureClassifier {
  // @ts-ignore
  private _model;
  private _processedLandmarks!: number[];

  constructor(file: string) {
    this.load_model(file);
  }

  private async load_model(file: string) {
    // @ts-ignore
    this._model = await tflite.loadTFLiteModel(file);
  }

  public input(normalizedLandmarks: Landmark[], handedness: HandednessID) {
    const landmarks = landmarks2array(normalizedLandmarks);
    this._processedLandmarks = processLandmarks(landmarks, handedness);
  }

  public inference(): [number, number] | undefined {
    if (!this._processedLandmarks) {
      return undefined;
    }

    // @ts-ignore
    const input_tensor = new tf.tensor(this._processedLandmarks, [1, 63], "float32");

    let feeds = { [this._model.inputs[0].name]: input_tensor };

    let output_tensor = this._model.predict(feeds);

    return argmax(output_tensor.dataSync());
  }
}
