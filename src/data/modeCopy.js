/* ═══════════════════════════════════════════════════════════
   AGE-MODE COPY LAYER
   Per-mode language for the youth-facing screens. This is a COPY
   layer only — it changes wording, never behavior.

   Modes (age tiers):
     explorer  7–10
     builder   11–13  ← DEFAULT and canonical baseline
     leader    14–17
     yaep      18–24  (Y-A.E.P.)

   HOW IT WORKS
   - `builder` holds the full, current live copy and is the baseline.
   - Other modes override only the lines they change; everything else
     falls back to builder via getModeCopy().
   - This layer NEVER touches Mirror dimensions, scoring, XP values,
     the FINISHER system, or the screen flow. It only supplies strings
     (and a few label helpers) the screens render.
   ═══════════════════════════════════════════════════════════ */

// ── BUILDER (11–13) · canonical baseline = current live copy ──
const builder = {
  welcome: {
    eyebrow: 'Your Process Starts Here',
    greetingKnownPrefix: "What's good, ",
    greetingNewPrefix: 'Welcome, ',
    greetingNewName: 'Future Founder.',
    lede: "Lock in. Let's finish. Run the four pillars every day — then face the Mirror.",
    nextLabel: 'Next Step',
    nextTitle: 'The Mirror',
    nextDesc:
      'Six dimensions. Honest answers. It finds your Anchor Strength and your Growth Edge — then hands you a mission built for you.',
    cta: 'Face The Mirror',
  },

  mirrorIntro: {
    eyebrow: 'Before You Start',
    titleEm: 'Mirror.',
    lede1: 'Before you start, you have to look in the Mirror.',
    sub1a: 'Not to judge yourself.',
    sub1b: 'Not to compare yourself to anyone else.',
    lede2: 'The Mirror shows you where you are right now — so the Process can meet you there.',
    dimsLabel: 'Six Areas · Honest Answers Only',
    sub2:
      'There are no wrong answers. There are only real ones. The more honest you are, the more the Process works for you.',
    rule1: { b: 'About two minutes.', text: 'One question at a time.' },
    rule2: { b: 'Be honest.', text: 'This is for you, not a grade.' },
    rule3: { b: 'Trust the read.', text: 'Every answer points you toward your next move.' },
    ready: 'Ready?',
    lockin: 'Lock in.',
    motto: 'Always Forward. Never Back.',
    cta: 'Take The Mirror',
  },

  // Keyed by question id (dimensions/ids/scoring are untouched — text only).
  mirrorQuestions: {
    id1: 'I know who I am and what I stand for.',
    id2: 'I can describe what makes me different in one sentence.',
    di1: 'I finish what I start, even when it stops being fun.',
    di2: 'I show up for my goals on the days I do not feel like it.',
    co1: 'I speak up for my ideas in a room full of people.',
    co2: 'I bet on myself when no one else does yet.',
    fa1: 'I understand how money moves in and out of a hustle.',
    fa2: 'I can price something so it actually makes a profit.',
    ad1: 'When the plan breaks, I find another way fast.',
    ad2: 'I treat feedback as fuel, not an attack.',
    cm1: 'I build with people, not just for myself.',
    cm2: 'People around me are better because I show up.',
  },

  results: {
    xpFlash: 'MIRROR COMPLETE',
    eyebrow: 'Your Mirror',
    anchorKicker: 'Your Strength',
    edgeKicker: 'Your Growth Area',
    focusKicker: 'Your First FINISHER Focus',
    unlockLabel: 'Mission Unlocked',
    continueCta: 'Continue',
    finisherCta: 'See Full Result',
    fullTitleEm: 'Read You.',
    anchorLabel: 'Anchor Strength',
    edgeLabel: 'Growth Edge',
    styleLabel: 'Learning Style',
    missionLabel: 'Your Recommended Mission',
    scoresLabel: 'Your Six Dimensions',
    startCta: 'Start The Mission',
  },

  mission: {
    eyebrow: 'FINISHER Mission',
    unlocksPrefix: 'Unlocks: ',
    approachLabel: (style) => `Your ${style} Approach`,
    stepsLabel: 'Mission Steps',
    focusLabel: 'Focus',
    completeCta: 'Mark Mission Complete',
  },

  reflection: {
    eyebrow: 'Reflection',
    titleEm: 'In.',
    sub: 'The work means nothing until you name what it taught you. This is how it sticks.',
    promptKnown: (title) => `What did "${title}" teach you about yourself?`,
    promptNew: 'What did this mission teach you about yourself?',
    placeholder: 'Be honest. No one is grading this — you are.',
    hint: 'Write at least a sentence.',
    submitCta: 'Submit Reflection',
  },
};

// ── EXPLORER (7–10) · playful, simple, big encouragement ──
const explorer = {
  welcome: {
    eyebrow: 'Your Adventure Starts Here',
    greetingKnownPrefix: 'Hey, ',
    greetingNewName: 'Future Builder!',
    lede: 'Big dreamers do small things every day. Run the four pillars — then meet the Mirror.',
    nextDesc:
      'A few quick questions. The Mirror finds the thing you are already great at — and the thing we will grow together. Then you get a fun mission.',
    cta: 'Meet The Mirror',
  },

  mirrorIntro: {
    lede1: 'Before you start, you get to look in the Mirror.',
    sub1a: 'Not to feel bad about yourself.',
    lede2:
      'The Mirror shows where you are right now — so we can start the adventure right there with you.',
    dimsLabel: 'Six Areas · Just Be Honest',
    sub2:
      'There are no wrong answers. Only true ones. The more honest you are, the more fun this becomes.',
    rule2: { b: 'Tell the truth.', text: 'This is just for you — not a test.' },
    rule3: { b: 'Trust the Mirror.', text: 'Every answer shows your next step.' },
    lockin: "Let's go.",
    cta: 'Start The Mirror',
  },

  mirrorQuestions: {
    id1: 'I know who I am and what I care about.',
    id2: 'I can tell someone what makes me special in one sentence.',
    di1: 'I finish what I start, even when it gets boring.',
    di2: 'I work on my goals even on days I do not feel like it.',
    co1: 'I share my ideas, even in a big group.',
    co2: 'I believe in myself, even when no one else does yet.',
    fa1: 'I understand how money comes in and goes out.',
    fa2: 'I can pick a fair price so I still make money.',
    ad1: 'When my plan does not work, I try another way.',
    ad2: 'I use feedback to get better instead of getting upset.',
    cm1: 'I like building things with other people, not just alone.',
    cm2: 'People around me feel better when I show up.',
  },

  results: {
    xpFlash: 'MIRROR DONE!',
    anchorKicker: 'Your Superpower',
    edgeKicker: 'Your Growing Area',
    continueCta: 'Next',
    finisherCta: 'See It All',
    fullTitleEm: 'Sees You.',
    anchorLabel: 'Your Superpower',
    edgeLabel: 'Growing Area',
    styleLabel: 'How You Learn',
    missionLabel: 'Your Mission',
    scoresLabel: 'Your Six Areas',
  },

  mission: {
    approachLabel: (style) => `Your ${style} Way`,
    focusLabel: 'Why It Matters',
    completeCta: 'Finish My Mission',
  },

  reflection: {
    sub: 'The mission counts even more when you say what it taught you. That is how it sticks.',
    placeholder: 'Be honest. No one is grading this — just you.',
    hint: 'Write at least one sentence.',
  },
};

// ── LEADER (14–17) · sharper, ownership & leadership ──
const leader = {
  welcome: {
    greetingKnownPrefix: "Let's work, ",
    greetingNewName: 'Future Leader.',
    lede: 'Leaders are built in the reps no one claps for. Run the four pillars daily — then face the Mirror.',
    nextDesc:
      'Six dimensions. Honest answers. It names your Anchor Strength and your Growth Edge — then hands you a mission built to stretch you.',
  },

  mirrorIntro: {
    lede1: 'Before you lead anyone else, you look in the Mirror.',
    lede2:
      'The Mirror shows you where you stand right now — so the Process can meet you there and move you forward.',
    sub2:
      'There are no wrong answers. There are only real ones. The more honest you are, the harder the Process works for you.',
  },

  mirrorQuestions: {
    id2: 'I can name what sets me apart in one sentence.',
    di1: 'I finish what I start, even after the excitement fades.',
    di2: 'I show up for my goals on the days motivation does not.',
    co2: 'I bet on myself before anyone else does.',
    fa1: 'I understand how money moves through a venture.',
    fa2: 'I can price something so it actually turns a profit.',
    cm1: 'I build with people, and I bring others up with me.',
    cm2: 'The people around me are better because I lead.',
  },

  results: {
    anchorKicker: 'Where You Lead From',
    edgeKicker: 'Your Next Level',
  },

  reflection: {
    sub: 'The work means nothing until you name what it taught you. That is how a leader turns reps into wisdom.',
  },
};

// ── Y-A.E.P. (18–24) · professional, founder-minded ──
const yaep = {
  welcome: {
    greetingKnownPrefix: 'Welcome back, ',
    greetingNewName: 'Founder.',
    lede: 'Discipline compounds. Run the four pillars daily, then face the Mirror to map your starting point.',
    nextDesc:
      'Six dimensions. Honest self-assessment. It identifies your Anchor Strength and your Growth Edge — then assigns a mission calibrated to you.',
  },

  mirrorIntro: {
    lede1: 'Before you build anything, you take an honest look in the Mirror.',
    lede2:
      'The Mirror establishes your baseline today — so the Process can meet you there and compound from it.',
    dimsLabel: 'Six Dimensions · Honest Answers Only',
    sub2:
      'There are no wrong answers — only accurate ones. The more honest your read, the more precise your plan.',
    rule2: { b: 'Be honest.', text: 'This is a self-assessment, not an evaluation.' },
    rule3: { b: 'Trust the read.', text: 'Every answer informs your next move.' },
  },

  mirrorQuestions: {
    id2: 'I can articulate my unique value in a single sentence.',
    di1: 'I finish what I start, even once it stops being enjoyable.',
    di2: 'I execute on my goals on the days I do not feel like it.',
    co1: 'I advocate for my ideas in a room full of people.',
    co2: 'I invest in myself before anyone else will.',
    fa1: 'I understand how cash flows in and out of a business.',
    fa2: 'I can price an offer so it generates real profit.',
    ad1: 'When the plan breaks, I adapt and find another path quickly.',
    ad2: 'I treat feedback as data, not a personal attack.',
    cm2: 'The people in my network are better for working with me.',
  },

  reflection: {
    sub: 'Execution without reflection is just motion. Name what this taught you — that is how it compounds.',
    placeholder: 'Be honest. This is your record, not a grade.',
  },
};

const MODE_COPY = { explorer, builder, leader, yaep };

/**
 * Resolve the full copy object for a mode. Builder is the baseline;
 * any mode's overrides are merged one level deep over it, so a mode
 * only needs to specify the lines it changes.
 */
export function getModeCopy(mode) {
  const override = MODE_COPY[mode];
  if (!override || override === builder) return builder;

  const merged = {};
  for (const section of Object.keys(builder)) {
    merged[section] = { ...builder[section], ...(override[section] || {}) };
  }
  return merged;
}
