export function mapRange(value: number, fromRangeMin: number, fromRangeMax: number, toRangeMin: number, toRangeMax: number): number {
  return (value - fromRangeMin) * (toRangeMax - toRangeMin) / (fromRangeMax - fromRangeMin) + toRangeMin;
}
