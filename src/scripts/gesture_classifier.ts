// @ts-nocheck
import { get_label_id_and_confidence, normalize_keypoints } from "./utils/algo";
import type { HandednessID } from "./utils/const";

export class GestureClassifier {
  public normalized_keypoints: number[];

  private model;

  constructor(file: string) {
    this.load_model(file);
  }

  private async load_model(file: string) {
    this.model = await tflite.loadTFLiteModel(file);
  }

  public input(keypoints: number[][], bbox: number[], handedness: HandednessID) {
    this.normalized_keypoints = normalize_keypoints(keypoints, bbox, handedness);
  }

  public inference() {
    const input_tensor = new tf.tensor(this.normalized_keypoints, [1, 42], "float32");

    let feeds = { [this.model.inputs[0].name]: input_tensor };

    let output_tensor = this.model.predict(feeds);

    return get_label_id_and_confidence(output_tensor.dataSync());
  }
}
