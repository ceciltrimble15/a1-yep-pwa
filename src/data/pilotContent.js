export const PROGRAM_CONTENT = {
  yep: {
    dailyQuest: {
      id: 'problem-spotter',
      title: 'Problem Spotter',
      prompt: 'Find one real problem at home, school, in your neighborhood, or in a business. Write it in one clear sentence, then name one way technology or better organization could help.',
      finisher: 'Focus',
    },
    weeklyModule: {
      id: 'week-1-focus-identity',
      title: 'Week 1 — Focus & Identity',
      description: 'Know who you are becoming before you start building what you want.',
      activities: [
        { id: 'power-name', title: 'Power Name', text: 'Explain why your Power Name fits who you are becoming.' },
        { id: 'why', title: 'Define Your Why', text: 'Write the problem you care about solving in one sentence.' },
        { id: 'identity-map', title: 'Identity Map', text: 'List one skill, one interest, and one value you can use to move forward.' },
      ],
    },
    stemSin: {
      id: 'build-something-that-solves-a-problem',
      title: 'S.T.E.M.Sin Technology Quest — Build Something That Solves a Problem',
      prompt: 'Choose one problem from your Problem Spotter work. Name one tool, app, device, AI/computer idea, or simple system you could use to test a solution. Explain what it would do and who it would help. You do not need to code it for this proof.',
      finisher: 'Innovation',
    },
    bossChallenge: {
      id: 'sixty-second-solution',
      title: 'Boss Challenge — 60-Second Solution',
      prompt: 'Explain the problem, your solution, who it helps, and the first step you would take. Practice saying it in 60 seconds or less.',
    },
    mentorSpotlight: {
      title: 'What a Mentor Does',
      body: 'A mentor does not do the work for you. A strong mentor asks questions, shares experience, challenges your thinking, helps you see options, and expects you to follow through.',
      challenge: 'Before your next session, write one question you would ask a mentor about your idea or goal.',
    },
  },
  yaep: {
    dailyQuest: {
      id: 'opportunity-spotter',
      title: 'Opportunity Spotter',
      prompt: 'Identify one real problem, unmet need, or opportunity in your workplace, community, market, or daily life. State who it affects and one practical way you could create value around it.',
      finisher: 'Focus',
    },
    weeklyModule: {
      id: 'week-1-position-purpose',
      title: 'Week 1 — Position & Purpose',
      description: 'Clarify what you can bring to the market, workplace, or community and why it matters.',
      activities: [
        { id: 'power-name', title: 'Power Name', text: 'Define the professional or entrepreneurial identity your Power Name represents.' },
        { id: 'why', title: 'Define Your Why', text: 'Name the problem, opportunity, or future you are committed to pursuing.' },
        { id: 'identity-map', title: 'Asset Map', text: 'List one skill, one relationship, and one resource you can use to move forward.' },
      ],
    },
    stemSin: {
      id: 'turn-a-tool-into-value',
      title: 'S.T.E.M.Sin Technology Quest — Turn a Tool Into Value',
      prompt: 'Choose one opportunity from your Opportunity Spotter work. Identify a digital tool, AI/computer workflow, device, or system that could help create or deliver value. Explain the user, the task, and the result you would test first.',
      finisher: 'Innovation',
    },
    bossChallenge: {
      id: 'sixty-second-value-pitch',
      title: 'Boss Challenge — 60-Second Value Pitch',
      prompt: 'Explain the opportunity, the value you can create, who benefits, and your next concrete move. Practice saying it clearly in 60 seconds or less.',
    },
    mentorSpotlight: {
      title: 'Using Mentorship Strategically',
      body: 'A strong mentor can challenge your thinking, open perspective, share experience, and hold you accountable. The goal is not dependency — it is better decisions and stronger execution.',
      challenge: 'Write one specific question you would ask a mentor about your business, career, money, or next move.',
    },
  },
};

export const PILOT_BADGES = [
  { id: 'daily-quest', name: 'Quest Starter', unlock: 'Complete the Daily Quest' },
  { id: 'weekly-module', name: 'Identity Builder', unlock: 'Complete all Week 1 activities' },
  { id: 'boss-challenge', name: 'Boss Move', unlock: 'Complete the Boss Challenge' },
];

export function getProgramContent(mode) {
  return mode === 'yaep' ? PROGRAM_CONTENT.yaep : PROGRAM_CONTENT.yep;
}

export const DAILY_QUEST = PROGRAM_CONTENT.yep.dailyQuest;
export const WEEKLY_MODULE = PROGRAM_CONTENT.yep.weeklyModule;
export const STEM_SIN = PROGRAM_CONTENT.yep.stemSin;
export const BOSS_CHALLENGE = PROGRAM_CONTENT.yep.bossChallenge;
export const MENTOR_SPOTLIGHT = PROGRAM_CONTENT.yep.mentorSpotlight;
