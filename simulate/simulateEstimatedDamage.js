export function simulateEstimatedDamage() {
  const min = 0;
  const max = 80000;

  return Math.floor(Math.random() * (max - min + 1)) + min;
}
