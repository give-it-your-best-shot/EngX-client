export function lerpStep(
  from: number,
  to: number,
  amp: number = 0.1,
  eps = 1e-6,
) {
  if (Math.abs(from - to) < eps) return to;
  return from * (1 - amp) + to * amp;
}

export function randRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
