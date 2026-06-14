/* ═══════════════════════════════════════════════════════════
   MIRROR PROFILES — language for results.
   - anchorProfiles: how each dimension reads as a STRENGTH
   - edgeProfiles:   how each dimension reads as a GROWTH EDGE
   - styleProfiles:  the 3 learning styles
   - dimensionToStyle: Anchor dimension -> learning style
   ═══════════════════════════════════════════════════════════ */

export const anchorProfiles = {
  Identity: {
    title: 'Identity',
    line: 'You move from a clear sense of self. People feel your conviction before you say a word.',
  },
  Discipline: {
    title: 'Discipline',
    line: 'You finish. While others negotiate with the work, you just do it.',
  },
  Confidence: {
    title: 'Confidence',
    line: 'You bet on yourself out loud. That self-belief opens doors for the whole room.',
  },
  'Money Awareness': {
    title: 'Money Awareness',
    line: 'You think in numbers. You see the money move where others only see the idea.',
  },
  Adaptability: {
    title: 'Adaptability',
    line: 'You bend, you do not break. When the plan dies, you already have the next move.',
  },
  Community: {
    title: 'Community',
    line: 'You build with people. Your strength is multiplied by everyone you bring up with you.',
  },
};

export const edgeProfiles = {
  Identity: {
    title: 'Identity',
    line: 'Sharpen who you are. When your name means something to you, it means more to everyone else.',
  },
  Discipline: {
    title: 'Discipline',
    line: 'Train the follow-through. Ideas are cheap — the finish line is where you separate.',
  },
  Confidence: {
    title: 'Confidence',
    line: 'Take up more space. Your ideas deserve a louder voice than you are giving them.',
  },
  'Money Awareness': {
    title: 'Money Awareness',
    line: 'Learn the money. A great hustle with no numbers is a hobby that costs you.',
  },
  Adaptability: {
    title: 'Adaptability',
    line: 'Get comfortable with the pivot. The plan will change — your job is to change faster.',
  },
  Community: {
    title: 'Community',
    line: 'Build your circle. You go further with people who can do what you cannot.',
  },
};

export const styleProfiles = {
  'Hands-On': {
    title: 'Hands-On',
    line: 'You learn by building. Give you a task and you figure it out by doing.',
  },
  'Deep Thinker': {
    title: 'Deep Thinker',
    line: 'You learn by reflection. You go inward, map it out, then move with intention.',
  },
  'Connected Learner': {
    title: 'Connected Learner',
    line: 'You learn through people. Conversation and feedback are how you level up.',
  },
};

// The Anchor (highest) dimension determines the learning style.
export const dimensionToStyle = {
  Discipline: 'Hands-On',
  'Money Awareness': 'Hands-On',
  Identity: 'Deep Thinker',
  Confidence: 'Deep Thinker',
  Community: 'Connected Learner',
  Adaptability: 'Connected Learner',
};
