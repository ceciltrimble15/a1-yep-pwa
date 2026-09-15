/* ═══════════════════════════════════════════════════════════
   THE MIRROR — 6 dimensions of the YEP self-assessment.
   Each statement is rated on a 4-point scale.
   Per-dimension score = sum of its statements (range 2–8).

   V0.5 rule: IDs, dimensions, values, and scoring stay stable.
   Only participant-facing wording changes by age pathway.
   ═══════════════════════════════════════════════════════════ */

export const DIMENSIONS = [
  'Identity',
  'Discipline',
  'Confidence',
  'Money Awareness',
  'Adaptability',
  'Community',
];

export const SCALE = [
  { label: 'Not yet', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Mostly', value: 3 },
  { label: 'Always', value: 4 },
];

const FOUNDATION_SCALE = [
  { label: 'Not Yet', value: 1 },
  { label: 'A Little', value: 2 },
  { label: 'A Lot', value: 3 },
  { label: 'All The Time', value: 4 },
];

const BUILDER_SCALE = [
  { label: 'Not Yet', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Usually', value: 3 },
  { label: 'Yes, I Do', value: 4 },
];

// Canonical statements used by Momentum and Y.A.E.P.
export const mirrorQuestions = [
  { id: 'id1', dimension: 'Identity', text: 'I know who I am and what I stand for.' },
  { id: 'id2', dimension: 'Identity', text: 'I can describe what makes me different in one sentence.' },

  { id: 'di1', dimension: 'Discipline', text: 'I finish what I start, even when it stops being fun.' },
  { id: 'di2', dimension: 'Discipline', text: 'I show up for my goals on the days I do not feel like it.' },

  { id: 'co1', dimension: 'Confidence', text: 'I speak up for my ideas in a room full of people.' },
  { id: 'co2', dimension: 'Confidence', text: 'I bet on myself when no one else does yet.' },

  { id: 'fa1', dimension: 'Money Awareness', text: 'I understand how money moves in and out of a hustle.' },
  { id: 'fa2', dimension: 'Money Awareness', text: 'I can price something so it actually makes a profit.' },

  { id: 'ad1', dimension: 'Adaptability', text: 'When the plan breaks, I find another way fast.' },
  { id: 'ad2', dimension: 'Adaptability', text: 'I treat feedback as fuel, not an attack.' },

  { id: 'cm1', dimension: 'Community', text: 'I build with people, not just for myself.' },
  { id: 'cm2', dimension: 'Community', text: 'People around me are better because I show up.' },
];

const FOUNDATION_COPY = {
  id1: 'I know what I like and what matters to me.',
  id2: 'I can tell someone one thing that makes me special.',
  di1: 'I keep going even when something gets hard.',
  di2: 'I keep trying even when I do not feel like it.',
  co1: 'I can share my ideas with other people.',
  co2: 'I believe I can learn something new.',
  fa1: 'I know money can be earned, saved, spent, and shared.',
  fa2: 'I can think before I spend money on something.',
  ad1: 'If my first idea does not work, I try another way.',
  ad2: 'I can listen to helpful advice and try again.',
  cm1: 'I can work with other people to get something done.',
  cm2: 'I try to make things better for people around me.',
};

const BUILDER_COPY = {
  id1: 'I know what matters to me and the kind of person I want to become.',
  id2: 'I can explain what makes my ideas or strengths different.',
  di1: 'I finish what I start, even when it gets boring or hard.',
  di2: 'I work on my goals even on days I do not feel motivated.',
  co1: 'I can speak up and explain my ideas to other people.',
  co2: 'I trust myself to learn, improve, and figure things out.',
  fa1: 'I understand the basic ways money comes in and goes out.',
  fa2: 'I can think about cost, price, and whether an idea could make money.',
  ad1: 'When one plan does not work, I can try a different approach.',
  ad2: 'I can use feedback to make my work better.',
  cm1: 'I can work with a team and do my part.',
  cm2: 'I look for ways my ideas can help other people too.',
};

export function getMirrorQuestions(mode) {
  const copy = mode === 'explorer' ? FOUNDATION_COPY : mode === 'builder' ? BUILDER_COPY : null;
  if (!copy) return mirrorQuestions;
  return mirrorQuestions.map((question) => ({ ...question, text: copy[question.id] || question.text }));
}

export function getMirrorScale(mode) {
  if (mode === 'explorer') return FOUNDATION_SCALE;
  if (mode === 'builder') return BUILDER_SCALE;
  return SCALE;
}
