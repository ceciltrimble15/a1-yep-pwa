export const DAILY_QUEST = {
  id: 'problem-spotter',
  title: 'Problem Spotter',
  prompt: 'Find one real problem at home, school, in your neighborhood, or in a business. Write it in one clear sentence, then name one way technology or better organization could help.',
  finisher: 'Focus',
};

export const WEEKLY_MODULE = {
  id: 'week-1-focus-identity',
  title: 'Week 1 — Focus & Identity',
  description: 'Know who you are becoming before you start building what you want.',
  activities: [
    { id: 'power-name', title: 'Power Name', text: 'Explain why your Power Name fits who you are becoming.' },
    { id: 'why', title: 'Define Your Why', text: 'Write the problem you care about solving in one sentence.' },
    { id: 'identity-map', title: 'Identity Map', text: 'List one skill, one interest, and one value you can use to move forward.' },
  ],
};

export const BOSS_CHALLENGE = {
  id: 'sixty-second-solution',
  title: 'Boss Challenge — 60-Second Solution',
  prompt: 'Explain the problem, your solution, who it helps, and the first step you would take. Practice saying it in 60 seconds or less.',
};

export const MENTOR_SPOTLIGHT = {
  title: 'What a Mentor Does',
  body: 'A mentor does not do the work for you. A strong mentor asks questions, shares experience, challenges your thinking, helps you see options, and expects you to follow through.',
  challenge: 'Before your next session, write one question you would ask a mentor about your idea or goal.',
};

export const PILOT_BADGES = [
  { id: 'daily-quest', name: 'Quest Starter', unlock: 'Complete the Daily Quest' },
  { id: 'weekly-module', name: 'Identity Builder', unlock: 'Complete all Week 1 activities' },
  { id: 'boss-challenge', name: 'Boss Move', unlock: 'Complete the Boss Challenge' },
];
