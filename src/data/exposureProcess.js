// Exposure-first YEP POC: reflection is self-report, never an aptitude diagnosis.
// Real-world steps require facilitator permission. App marks are not verification.
export const REFLECTION_PROMPTS = [
  {
    id: 'noticed',
    heading: 'What caught your attention?',
    options: ['A business idea', 'A problem someone could solve', 'People working together', 'Something new I want to understand'],
  },
  {
    id: 'experienced',
    heading: 'What did you get to explore?',
    options: ['I saw an example', 'I asked or thought of a question', 'I tried an activity with guidance', 'I am still looking around'],
  },
  {
    id: 'curious',
    heading: 'What would you like to explore next?',
    options: ['Food, shops, or products', 'Art, clothing, or entertainment', 'Technology, building, or tools', 'Helping people in the community'],
  },
  {
    id: 'support',
    heading: 'What would help you take a next step?',
    options: ['See another example', 'Try a small task with help', 'Ask a trusted mentor a question', 'Take time to think about it'],
  },
];

const COMMON = {
  explorer: [
    { id: 'foundation-notice', title: 'Spot a Helpful Idea', objective: 'Notice a need in a shared space and imagine a safe improvement.', steps: ['Look around with your facilitator and notice one small problem.', 'Draw or explain a helpful idea to a trusted adult.', 'Tell what you observed and what you would try next.'], focus: 'Curiosity', finisherLetter: 'Focus' },
    { id: 'foundation-sort', title: 'The Organizer Challenge', objective: 'Explore how business owners keep materials ready for others.', steps: ['Ask a facilitator to help set up safe pretend supplies.', 'Sort the sample items and explain your plan.', 'Share what was easier to find and one idea to improve it.'], focus: 'Organization', finisherLetter: 'Execution' },
    { id: 'foundation-ask', title: 'Ask an Entrepreneur', objective: 'Discover how a business works from someone invited to teach you.', steps: ['Think of one question about a business.', 'With your facilitator, ask an invited entrepreneur or practice the question together.', 'Tell what you learned or what you still wonder.'], focus: 'Discovery', finisherLetter: 'Network' },
    { id: 'foundation-own', title: 'My Safe Idea', objective: 'Explore another idea with your facilitator.', steps: ['Explain your idea to a trusted facilitator.', 'Choose one safe pretend or supervised step together.', 'Share what happened or why you chose to wait.'], focus: 'Choice', finisherLetter: 'Innovation' },
  ],
  builder: [
    { id: 'builder-notice', title: 'Find a Real Need', objective: 'Notice a small problem and design an improvement.', steps: ['Observe a shared task with a facilitator.', 'Sketch one idea that could make the task easier.', 'Explain how you would test it safely.'], focus: 'Problem-solving', finisherLetter: 'Focus' },
    { id: 'builder-prototype', title: 'Make a First Version', objective: 'Try an early solution using sample materials.', steps: ['Choose a small, safe problem to explore.', 'Build a paper or pretend prototype with permission.', 'Describe what worked and one change you would make.'], focus: 'Experimenting', finisherLetter: 'Innovation' },
    { id: 'builder-mentor', title: 'Behind the Business', objective: 'Learn how someone creates value for other people.', steps: ['Choose a question about how a business serves people.', 'Ask a facilitator to arrange an approved guest conversation or example.', 'Describe one new thing you learned.'], focus: 'Exposure', finisherLetter: 'Network' },
    { id: 'builder-own', title: 'My Safe Next Step', objective: 'Choose a supervised action tied to your interest.', steps: ['Explain your idea to a facilitator.', 'Agree on a safe practice or demonstration.', 'Describe the result or explain why you did not try it yet.'], focus: 'Choice', finisherLetter: 'Execution' },
  ],
  leader: [
    { id: 'momentum-need', title: 'Investigate a Customer Need', objective: 'Explore what problem a business actually solves.', steps: ['Study a business example with a facilitator.', 'Identify who benefits and what problem is solved.', 'Propose one safe way to check the idea without contacting strangers.'], focus: 'Opportunity', finisherLetter: 'Focus' },
    { id: 'momentum-test', title: 'Prototype a Better Way', objective: 'Test a small solution using an approved scenario.', steps: ['Pick one workflow or product problem.', 'Build a sample sketch, mockup, or prototype.', 'Show it to your facilitator or an invited mentor and note feedback.'], focus: 'Iteration', finisherLetter: 'Innovation' },
    { id: 'momentum-mentor', title: 'Learn From an Operator', objective: 'Discover the real choices behind running a business.', steps: ['Prepare two questions about customers, costs, or operations.', 'Ask them in a supervised guest session or work from an approved case study.', 'Summarize one decision and one trade-off.'], focus: 'Exposure', finisherLetter: 'Network' },
    { id: 'momentum-own', title: 'Design Your Next Move', objective: 'Plan another age-appropriate experience with a facilitator.', steps: ['Describe what you want to explore.', 'Agree on a permitted, supervised action.', 'Record what you really tried—or that the plan is still pending.'], focus: 'Choice', finisherLetter: 'Execution' },
  ],
  yaep: [
    { id: 'adult-need', title: 'Validate a Problem', objective: 'Investigate a business need before proposing a solution.', steps: ['Describe a specific need and a possible customer.', 'Identify evidence you can lawfully gather with permission.', 'Summarize what you know and what you still need to check.'], focus: 'Opportunity', finisherLetter: 'Focus' },
    { id: 'adult-workflow', title: 'Map an Operation', objective: 'Find a practical improvement in a business workflow.', steps: ['Map an approved example from request to delivery.', 'Identify one bottleneck and one possible improvement.', 'Present a safe test plan without claiming it was implemented.'], focus: 'Systems', finisherLetter: 'Strategy' },
    { id: 'adult-mentor', title: 'Talk With a Business Owner', objective: 'Learn directly from real operating experience.', steps: ['Prepare questions about costs, customers, and constraints.', 'Arrange a permitted conversation or use an approved case study.', 'Document a business lesson and what evidence supports it.'], focus: 'Exposure', finisherLetter: 'Network' },
    { id: 'adult-own', title: 'Your Next Opportunity', objective: 'Design and evaluate your own authorized next step.', steps: ['Identify the opportunity and your next hypothesis.', 'Seek permission and choose a proportionate test.', 'Record actual observations without inventing sales or results.'], focus: 'Choice', finisherLetter: 'Execution' },
  ],
};

const MIRROR_LEARNING = {
  explorer: {
    title: 'Look back. Notice. Choose.',
    speech: 'Your Mirror is not a grade. It helps you look back at what caught your attention and choose one safe thing to try next.',
    question: 'What is one thing you noticed about yourself or the problem?',
    transfer: 'Can you notice the same kind of need somewhere else with your facilitator?',
  },
  builder: {
    title: 'Turn reflection into a better next move.',
    speech: 'Use your Mirror to connect what you noticed, what you tried, and what you want to explore next. Reflection helps you improve the next version.',
    question: 'What would you keep, change, or test next?',
    transfer: 'Where else could the same problem-solving idea help?',
  },
  leader: {
    title: 'Use evidence, not guesses.',
    speech: 'Your Mirror helps you separate what actually happened from what you expected. That is how operators learn, adjust, and make stronger decisions.',
    question: 'What observation should change your next decision?',
    transfer: 'How would this lesson change your approach in a different project or customer problem?',
  },
  yaep: {
    title: 'Convert experience into operating judgment.',
    speech: 'Review what you observed, what remains uncertain, and what evidence you need next. Reflection should improve your next decision, not just describe the last one.',
    question: 'What assumption changed, and what evidence do you need before the next move?',
    transfer: 'How can you apply this lesson to another workflow, customer, or opportunity?',
  },
};

const FINISHER_LEARNING = {
  Focus: {
    skill: 'Focus',
    meaning: 'Choose what matters before you move.',
    check: 'Can you clearly explain the need, goal, or decision you are working on?',
  },
  Identity: {
    skill: 'Identity',
    meaning: 'Know what you stand for and how you want to show up.',
    check: 'Does your action match the kind of person or leader you want to become?',
  },
  Network: {
    skill: 'Network',
    meaning: 'Learn through trusted people, mentors, and relationships.',
    check: 'Who can help you learn without taking over the work?',
  },
  Innovation: {
    skill: 'Innovation',
    meaning: 'Create, test, and improve a useful idea.',
    check: 'What changed between your first idea and your better version?',
  },
  Strategy: {
    skill: 'Strategy',
    meaning: 'Choose a path and think ahead before using time or resources.',
    check: 'Why is this next move better than the other options you considered?',
  },
  Hustle: {
    skill: 'Hustle',
    meaning: 'Bring consistent effort to the work that matters.',
    check: 'What action can you repeat without confusing activity with progress?',
  },
  Execution: {
    skill: 'Execution',
    meaning: 'Turn the plan into a real, completed step.',
    check: 'What did you actually complete, not just plan or discuss?',
  },
  Resilience: {
    skill: 'Resilience',
    meaning: 'Learn from setbacks and keep moving with a better approach.',
    check: 'What will you change after something did not work as expected?',
  },
};

const MISSION_STAGE_COPY = {
  explorer: {
    speech: 'Choose one safe mission. Do one step at a time with your facilitator. Mark a step only after you practiced it or really did it.',
    question: 'What are you trying to learn by doing this mission?',
    transfer: 'After you finish, name one other place you could use the same skill.',
  },
  builder: {
    speech: 'Choose a mission that connects to what you noticed. Plan it, try it safely, then explain what happened and what you would improve.',
    question: 'What would count as a real attempt for this mission?',
    transfer: 'After you finish, identify one new situation where the same skill could help.',
  },
  leader: {
    speech: 'Choose a mission that creates useful evidence. Separate planning from action, record what really happened, and use the result to choose your next move.',
    question: 'What evidence will tell you whether your move was useful?',
    transfer: 'After you finish, explain how the lesson changes your next project or business decision.',
  },
  yaep: {
    speech: 'Choose an authorized mission with a clear objective, a proportionate test, and honest evidence. Completion means the step happened, not that the outcome was successful.',
    question: 'What result, observation, or constraint will inform your next decision?',
    transfer: 'After you finish, translate the lesson into a repeatable operating principle.',
  },
};

export function getExposureMissions(mode) {
  return (COMMON[mode] || COMMON.builder).map((mission) => ({ ...mission, mode, requiresFacilitator: mode !== 'yaep' }));
}

export function getReflectionSummary(mirrorResult) {
  if (mirrorResult?.kind !== 'exposure-reflection-v1') return null;
  return REFLECTION_PROMPTS.map((prompt) => ({
    id: prompt.id,
    label: prompt.heading,
    answer: prompt.options[mirrorResult.answers?.[prompt.id]] || 'Not selected',
  }));
}

export function getReflectionLearning(mode, mirrorResult) {
  const summary = getReflectionSummary(mirrorResult);
  if (!summary) return null;
  const copy = MIRROR_LEARNING[mode] || MIRROR_LEARNING.builder;
  const answer = Object.fromEntries(summary.map((item) => [item.id, item.answer]));
  return {
    ...copy,
    noticed: answer.noticed,
    experienced: answer.experienced,
    curious: answer.curious,
    support: answer.support,
    bridge: `You noticed: ${answer.noticed}. You explored: ${answer.experienced}. Next, you want to explore: ${answer.curious}.`,
  };
}

export function getMissionLearning(mission, mode) {
  if (!mission) return null;
  const stage = MISSION_STAGE_COPY[mode] || MISSION_STAGE_COPY.builder;
  const skill = FINISHER_LEARNING[mission.finisherLetter] || {
    skill: mission.finisherLetter || mission.focus,
    meaning: 'Practice one useful skill through a real or supervised action.',
    check: 'What did you actually do, and what did you learn from it?',
  };
  return {
    ...stage,
    skill,
    focus: mission.focus,
    missionTitle: mission.title,
  };
}
