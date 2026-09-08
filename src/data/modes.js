/* ═══════════════════════════════════════════════════════════
   PROGRAM / AGE PATHWAY FOUNDATION
   The tablet proof of concept must visibly support both:
   - YEP ages 7-17, split into Foundation / Builder / Momentum
   - Y.A.E.P. ages 18-24 as a separate young-adult pathway

   The shared POC loop stays consistent across pathways. Copy may be
   adapted by pathway without changing the core FINISHER/progress logic.
   ═══════════════════════════════════════════════════════════ */

export const DEFAULT_MODE = 'builder';

export const MODES = {
  explorer: {
    id: 'explorer',
    program: 'YEP',
    programName: 'Young Entrepreneurs Process',
    tier: 'Foundation',
    ageRange: '7-10',
    label: 'Foundation · Ages 7-10',
    audio: false,
  },
  builder: {
    id: 'builder',
    program: 'YEP',
    programName: 'Young Entrepreneurs Process',
    tier: 'Builder',
    ageRange: '11-13',
    label: 'Builder · Ages 11-13',
    audio: false,
  },
  leader: {
    id: 'leader',
    program: 'YEP',
    programName: 'Young Entrepreneurs Process',
    tier: 'Momentum',
    ageRange: '14-17',
    label: 'Momentum · Ages 14-17',
    audio: false,
  },
  yaep: {
    id: 'yaep',
    program: 'Y.A.E.P.',
    programName: 'Young Adult Entrepreneur Process',
    tier: 'Young Adult',
    ageRange: '18-24',
    label: 'Y.A.E.P. · Ages 18-24',
    audio: false,
  },
};

export const MODE_IDS = Object.keys(MODES);

export function isValidMode(mode) {
  return MODE_IDS.includes(mode);
}

export function isAudioEnabled(mode) {
  return !!(MODES[mode] && MODES[mode].audio);
}
