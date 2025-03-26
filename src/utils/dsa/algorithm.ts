export function argmax(arr: Float32Array): [number, number] {
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

export function calculateBoundingBox(points: number[][]): number[] {
  let box = [999999, 999999, -999999, -999999];

  for (const [x, y] of points) {
    if (box[0] > x) {
      box[0] = x;
    }
    if (box[1] > y) {
      box[1] = y;
    }
    if (box[2] < x) {
      box[2] = x;
    }
    if (box[3] < y) {
      box[3] = y;
    }
  }

  box[2] = box[2] - box[0];
  box[3] = box[3] - box[1];

  return box;
}
