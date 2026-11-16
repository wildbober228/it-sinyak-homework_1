export function formatElapsed(milliseconds: number) {
  const seconds = Math.max(0, Math.floor(milliseconds / 1000));
  const rest = String(seconds % 60).padStart(2, "0");

  return `${Math.floor(seconds / 60)}:${rest}`;
}
