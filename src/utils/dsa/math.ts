export function calculateDistance(point1: number[], point2: number[]) {
  return ((point1[0] - point2[0]) ** 2 + (point1[1] - point2[1]) ** 2) ** 0.5;
}

export function calculateAngle(initial: number[], terminal: number[]): number {
  const vector = [terminal[0] - initial[0], terminal[1] - initial[1]];

  const angleRad = Math.atan2(vector[1], vector[0]);

  let angleDeg = (angleRad * 180) / Math.PI;

  if (angleDeg < 0) {
    angleDeg += 360;
  }

  return angleDeg;
}
