// @ts-nocheck
import { argmax } from "../utils/algo";

export class GestureClassifier {
  public model;

  constructor(file: string) {
    this.loadModel(file);
  }

  public async loadModel(file: string) {
    this.model = await tflite.loadTFLiteModel(file);
  }

  public inference(normalized_keypoints) {
    const input_tensor = new tf.tensor(normalized_keypoints, [1, 42], "float32");

    let feeds = { [this.model.inputs[0].name]: input_tensor };

    let output_tensor = this.model.predict(feeds);

    let labelID = argmax(output_tensor.dataSync());

    return labelID;
  }
}
