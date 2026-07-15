// Mirrors the CSS custom properties in index.css (dark categorical steps).
// Kept as plain hex here so canvas/D3 code can use them without touching the DOM.
export const palette = {
  s1: "#3987e5", // blue
  s2: "#199e70", // aqua
  s3: "#c98500", // yellow
  s4: "#008300", // green
  s5: "#9085e9", // violet
  s6: "#e66767", // red
  s7: "#d55181", // magenta
  s8: "#d95926", // orange
  ink: "#f7f7f5",
  inkSecondary: "#c3c2b7",
  inkMuted: "#8b897f",
  inkFaint: "#5a5952",
  grid: "#262625",
  baseline: "#383835",
  surface: "#131313",
  surface2: "#1a1a19",
};

export function alpha(hex, a) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}
