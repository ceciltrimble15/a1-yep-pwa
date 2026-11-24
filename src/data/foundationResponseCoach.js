// Deterministic, reviewed Foundation coaching. This is not AI grading or a mastery award.
export const LUNCH_LINE_COACH = [
  {
    question: 'You spotted a long line. How could you find out if your idea helps?',
    choices: [
      'Try one small change with a cafeteria worker and compare waiting before and after.',
      'Change everything without asking anyone.',
      'Say the line is fixed without checking.'
    ],
    correctIndex: 0,
    hints: [
      'How would we know whether the line got faster? We need to look before and after.',
      'Ask a cafeteria worker for help. Try one small change safely, then compare.'
    ],
    explanation: 'You made a testable plan. With permission, compare how long the line takes before and after the change.'
  },
  {
    question: 'Everyone uses one serving spot. What should you do before changing the setup?',
    choices: [
      'Open new serving spots without asking.',
      'Ask cafeteria staff, try one approved change, and watch what happens.',
      'Assume extra serving spots will always be better.'
    ],
    correctIndex: 1,
    hints: [
      'Who runs the serving counter? They can tell us what is safe and possible.',
      'Talk to staff, request permission, and check whether the small test helps.'
    ],
    explanation: 'You considered the workers and the students. Asking first and testing the change helps us learn safely.'
  },
  {
    question: 'The walking path is confusing. How could you check whether a new sign works?',
    choices: [
      'Put up signs anywhere and never check.',
      'Tell everyone they are wrong for getting confused.',
      'Ask permission, test one clear sign, and see whether students can find their way.'
    ],
    correctIndex: 2,
    hints: [
      'A useful sign should help somebody find where to go. How can you check that?',
      'With permission, try one sign and observe whether students understand the path.'
    ],
    explanation: 'You chose to test with real people. A sign only helps if people can understand and follow it.'
  },
];

export function coachLunchLine(problemIndex, choiceIndex, attempt = 1) {
  const lesson = LUNCH_LINE_COACH[problemIndex];
  if (!lesson || !Number.isInteger(choiceIndex) || choiceIndex < 0 || choiceIndex >= lesson.choices.length) return null;
  const passed = choiceIndex === lesson.correctIndex;
  return {
    passed,
    message: passed ? lesson.explanation : lesson.hints[Math.min(Math.max(attempt - 1, 0), lesson.hints.length - 1)],
    next: passed ? 'Review your idea and save this practice response.' : 'Try another choice. You can ask a facilitator for help.',
  };
}
