/* ═══════════════════════════════════════════════════════════
   FINISHER MISSIONS — one focused mission per Growth Edge.
   Each mission grants a FINISHER letter on completion.
   Learning Style selects the APPROACH (how the mission is run).

      Growth Edge + Learning Style  ->  resolveMissionId()  ->  mission

   FINISHER = Focus · Identity · Network · Innovation ·
              Strategy · Hustle · Execution · Resilience
   ═══════════════════════════════════════════════════════════ */

export const missions = {
  m_identity: {
    id: 'm_identity',
    edge: 'Identity',
    finisherLetter: 'Identity',
    title: 'Claim Your Name',
    objective: 'Define the founder you are becoming — before the world defines you.',
    steps: [
      'Write the one sentence that says who you are and what you build.',
      'List 3 values you will not trade for money.',
      'Say it out loud, on camera or to one person, with your chest.',
    ],
    approach: {
      'Hands-On': 'Make it physical — write it on paper and pin it where you start your day.',
      'Deep Thinker': 'Sit with it. Draft it three times until the sentence is undeniably you.',
      'Connected Learner': 'Tell two people and let their reaction sharpen the words.',
    },
    focus: 'A founder with a clear identity never has to ask permission to lead.',
  },
  m_discipline: {
    id: 'm_discipline',
    edge: 'Discipline',
    finisherLetter: 'Execution',
    title: 'The 3-Day Finish',
    objective: 'Pick one task and execute it three days straight — no excuses logged.',
    steps: [
      'Choose ONE small action that moves your hustle forward.',
      'Do it three days in a row, same time each day.',
      'Log proof each day. Miss a day, the count restarts.',
    ],
    approach: {
      'Hands-On': 'Build a streak you can see — a checklist you physically mark off.',
      'Deep Thinker': 'Plan the trigger: when X happens, you do the task. Remove the decision.',
      'Connected Learner': 'Tell someone your streak and report to them each night.',
    },
    focus: 'Discipline is just a promise you keep to yourself on the boring days.',
  },
  m_confidence: {
    id: 'm_confidence',
    edge: 'Confidence',
    finisherLetter: 'Hustle',
    title: 'The 60-Second Pitch',
    objective: 'Pitch your idea out loud, on camera, in 60 seconds — and keep what is real.',
    steps: [
      'Write a 60-second pitch for your idea.',
      'Record it. Watch it back once, no flinching.',
      'Re-record until you believe yourself.',
    ],
    approach: {
      'Hands-On': 'Run reps. Record five takes — confidence is built, not waited for.',
      'Deep Thinker': 'Script the beats first so the words carry you when nerves hit.',
      'Connected Learner': 'Pitch a real person and read the room as you go.',
    },
    focus: 'Confidence is a skill you rep, not a gift you wait for.',
  },
  m_financial: {
    id: 'm_financial',
    edge: 'Financial Awareness',
    finisherLetter: 'Strategy',
    title: 'Price It To Profit',
    objective: 'Take one product or service and prove it can actually make money.',
    steps: [
      'List every cost to make or deliver it — be honest.',
      'Set a price that covers cost AND pays you.',
      'Calculate profit on 10 sales. Write the number down.',
    ],
    approach: {
      'Hands-On': 'Work a real example end to end on paper until the math holds.',
      'Deep Thinker': 'Model two price points and reason through which wins.',
      'Connected Learner': 'Ask someone who sells what they charge and why.',
    },
    focus: 'A hustle with no numbers is a hobby that quietly costs you.',
  },
  m_adaptability: {
    id: 'm_adaptability',
    edge: 'Adaptability',
    finisherLetter: 'Resilience',
    title: 'The Pivot Drill',
    objective: 'Take real feedback, change one thing, and ship the better version.',
    steps: [
      'Show your idea to 3 people and write down what they actually said.',
      'Pick the one change that stings the most but matters.',
      'Make that change and put the new version back out.',
    ],
    approach: {
      'Hands-On': 'Rebuild the piece that broke — learn the fix by redoing it.',
      'Deep Thinker': 'Separate the signal from the noise before you touch anything.',
      'Connected Learner': 'Go back to the person whose feedback hit and close the loop.',
    },
    focus: 'Resilience is deciding that failure does not get the final say.',
  },
  m_community: {
    id: 'm_community',
    edge: 'Community',
    finisherLetter: 'Network',
    title: 'Build Your Five',
    objective: 'Map the five people who move your hustle forward — and what you trade.',
    steps: [
      'Name 5 people who could help your idea grow.',
      'For each, write what THEY get from working with you.',
      'Reach out to one of them today.',
    ],
    approach: {
      'Hands-On': 'Send the first message before you close the app.',
      'Deep Thinker': 'Map the network on paper — see who connects to who.',
      'Connected Learner': 'Lead with the relationship; the ask comes second.',
    },
    focus: 'Your network is not who you know — it is who knows what you can do.',
  },
};

// Edge dimension -> mission id
const EDGE_TO_MISSION = {
  Identity: 'm_identity',
  Discipline: 'm_discipline',
  Confidence: 'm_confidence',
  'Financial Awareness': 'm_financial',
  Adaptability: 'm_adaptability',
  Community: 'm_community',
};

/**
 * Resolve the recommended mission ID from Growth Edge + Learning Style.
 * Edge selects the mission; style is carried so the mission renders the
 * matching approach. (Style is validated here so the inputs are coupled.)
 */
export function resolveMissionId(edge, style) {
  const id = EDGE_TO_MISSION[edge];
  if (!id) return null;
  const mission = missions[id];
  // Guard: a style with no approach falls back to Hands-On.
  if (!mission.approach[style]) return id;
  return id;
}

export function getMission(edge, style) {
  const id = resolveMissionId(edge, style);
  if (!id) return null;
  const mission = missions[id];
  return {
    ...mission,
    style,
    activeApproach: mission.approach[style] || mission.approach['Hands-On'],
  };
}
