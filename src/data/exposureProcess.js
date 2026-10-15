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

export function getExposureMissions(mode) {
  return (COMMON[mode] || COMMON.builder).map((mission) => ({ ...mission, mode, requiresFacilitator: mode !== 'yaep' }));
}

export function getReflectionSummary(mirrorResult) {
  if (mirrorResult?.kind !== 'exposure-reflection-v1') return null;
  return REFLECTION_PROMPTS.map((prompt) => ({
    label: prompt.heading,
    answer: prompt.options[mirrorResult.answers?.[prompt.id]] || 'Not selected',
  }));
}
