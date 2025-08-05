// src/utils/scoreUtils.js

const anchors = [
  { score: 0, hex: '#22c55e' },
  { score: 14, hex: '#eab308' },
  { score: 28, hex: '#ef4444' },
  { score: 42, hex: '#991b1b' },
];

function hexToRgb(hex) {
  const [r, g, b] = hex.replace(/^#/, '')
    .match(/.{1,2}/g)
    .map(x => parseInt(x, 16));
  return { r, g, b };
}

function mixRgb(a, b, t) {
  return {
    r: Math.round(a.r + (b.r - a.r) * t),
    g: Math.round(a.g + (b.g - a.g) * t),
    b: Math.round(a.b + (b.b - a.b) * t),
  };
}

export function getScoreColor(score) {
  const clamped = Math.max(0, score);
  let lower = anchors[0];
  let upper = anchors[anchors.length - 1];

  for (let i = 0; i < anchors.length - 1; i++) {
    if (clamped >= anchors[i].score && clamped <= anchors[i + 1].score) {
      lower = anchors[i];
      upper = anchors[i + 1];
      break;
    }
  }

  if (clamped >= upper.score && upper === anchors[anchors.length - 1]) {
    return upper.hex;
  }

  const range = upper.score - lower.score;
  const t = range === 0 ? 0 : (clamped - lower.score) / range;

  const c1 = hexToRgb(lower.hex);
  const c2 = hexToRgb(upper.hex);
  const mixed = mixRgb(c1, c2, t);
  return `rgb(${mixed.r}, ${mixed.g}, ${mixed.b})`;
}

export function convertScoreToPercentage(score) {
  if (score >= 42) return 0;
  const percentage = (1 - score / 41) * 100;
  return Math.round(percentage);
}

export function capitalizeWords(text) {
  return text
    .toLowerCase()
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
}
export function coerceFiniteNumber(v) {
  if (typeof v === 'number') return Number.isFinite(v) ? v : NaN;
  if (typeof v === 'string') {
    const n = Number(v);
    return Number.isFinite(n) ? n : NaN;
  }
  return NaN;
}

/**
 * Format miles with fixed fraction digits. Returns null when not a finite number.
 * Example: formatMiles(1.234) -> "1.23 mi"
 */
export function formatMiles(v, fractionDigits = 2) {
  const n = coerceFiniteNumber(v);
  return Number.isFinite(n) ? `${n.toFixed(fractionDigits)} mi` : null;
}
