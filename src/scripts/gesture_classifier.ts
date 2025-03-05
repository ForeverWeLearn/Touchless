// @ts-nocheck
import type { HandednessID } from "./utils/const";

export class GestureClassifier {
  public normalized_keypoints!: number[];

  private model;

  constructor(file: string) {
    this.load_model(file);
  }

  private async load_model(file: string) {
    this.model = await tflite.loadTFLiteModel(file);
  }

  public input(keypoints: number[][], bbox: number[], handedness: HandednessID) {
    this.normalized_keypoints = this.normalize_keypoints(keypoints, bbox, handedness);
  }

  public inference() {
    const input_tensor = new tf.tensor(this.normalized_keypoints, [1, 42], "float32");

    let feeds = { [this.model.inputs[0].name]: input_tensor };

    let output_tensor = this.model.predict(feeds);

    return this.get_label_id_and_confidence(output_tensor.dataSync());
  }

  private get_label_id_and_confidence(arr: Float32Array): [number, number] {
    let max_value = arr[0];
    let max_index = 0;
  
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max_value) {
        max_value = arr[i];
        max_index = i;
      }
    }
  
    return [max_index, max_value];
  }
  
  private normalize_keypoints(keypoints: number[][], bbox: number[], handedness: HandednessID): number[] {
    let flat: number[] = Array(keypoints.length * keypoints[0].length);
  
    const d = Math.max(bbox[2], bbox[3]);
    let base_x = keypoints[0][0];
    let base_y = keypoints[0][1];
  
    for (let i = 0, j = 0; i < keypoints.length; i++, j += 2) {
      flat[j] = (keypoints[i][0] - base_x) / d;
      if (handedness == 0) {
        flat[j] = -flat[j];
      }
      flat[j + 1] = (keypoints[i][1] - base_y) / d;
    }
    return flat;
  }
}
