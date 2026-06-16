/* ═══════════════════════════════════════════════════════════
   AGE-MODE FOUNDATION
   A lightweight mode layer so future age-tier behavior — starting
   with Explorer Mode audio — can be gated cleanly.

   IMPORTANT (current scope):
   - NO per-mode copy, screens, XP, scoring, or FINISHER yet.
   - NO audio yet.
   - Builder is the current live experience AND the default.
   This file only defines valid modes and a future capability flag.
   ═══════════════════════════════════════════════════════════ */

export const DEFAULT_MODE = 'builder';

export const MODES = {
  builder: {
    id: 'builder',
    label: 'Builder Mode Preview',
    audio: false, // current live YEP experience
  },
  explorer: {
    id: 'explorer',
    label: 'Explorer',
    audio: false, // future: flip to true when Explorer Audio ships
  },
  leader: {
    id: 'leader',
    label: 'Leader',
    audio: false,
  },
  yaep: {
    id: 'yaep',
    label: 'Y-A.E.P.',
    audio: false,
  },
};

export const MODE_IDS = Object.keys(MODES);

export function isValidMode(mode) {
  return MODE_IDS.includes(mode);
}

/**
 * The future audio gate. Currently false for every mode because audio
 * is not built yet. When Explorer Audio ships, set MODES.explorer.audio
 * = true and gate playback on isAudioEnabled(mode).
 */
export function isAudioEnabled(mode) {
  return !!(MODES[mode] && MODES[mode].audio);
}
