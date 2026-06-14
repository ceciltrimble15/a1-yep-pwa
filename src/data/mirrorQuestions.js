/* ═══════════════════════════════════════════════════════════
   THE MIRROR — 6 dimensions of the YEP self-assessment.
   Each statement is rated on a 4-point scale.
   Per-dimension score = sum of its statements (range 2–8).
   ═══════════════════════════════════════════════════════════ */

export const DIMENSIONS = [
  'Identity',
  'Discipline',
  'Confidence',
  'Money Awareness',
  'Adaptability',
  'Community',
];

// 4-point, no neutral middle — forces a real read.
export const SCALE = [
  { label: 'Not yet', value: 1 },
  { label: 'Sometimes', value: 2 },
  { label: 'Mostly', value: 3 },
  { label: 'Always', value: 4 },
];

// Two statements per dimension.
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
