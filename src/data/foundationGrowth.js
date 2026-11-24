// Foundation GROW checkpoint, ages 7-10. Reviewed scenario transfer and self-reflection.
// No claim of AI understanding or mastery. No external request or microphone capture.
export const FOUNDATION_GROW = {
  title: 'New place, same skill',
  scenario: 'At the art table, students keep waiting because scissors, glue, and paper are mixed together. A classmate cannot find the supplies they need.',
  question: 'What could help you learn whether a change makes the art table easier to use?',
  choices: [
    'Tell everyone the problem is gone after moving one box.',
    'Ask a teacher, organize one small area, and compare how easy supplies are to find before and after.',
    'Move every supply without checking with anyone.'
  ],
  correctIndex: 1,
  hints: [
    'Remember how you checked the lunch line. What would you compare to see whether people are helped?',
    'Start with permission, test a small change, and compare what happens before and after.'
  ],
  explanation: 'You used the same problem-solving idea in a new place: ask permission, try a small change, and compare what happens.',
  reflectionPrompt: 'What did you learn about testing a helpful idea? Explain it in your own words.',
  reflectionHelp: 'Tell us what you would check, who you would ask, or how you would know it helped.',
};

export function assessGrowthChoice(choiceIndex, attempt = 1) {
  if (!Number.isInteger(choiceIndex) || choiceIndex < 0 || choiceIndex >= FOUNDATION_GROW.choices.length) return null;
  const passed = choiceIndex === FOUNDATION_GROW.correctIndex;
  return {
    passed,
    feedback: passed ? FOUNDATION_GROW.explanation : FOUNDATION_GROW.hints[Math.min(Math.max(attempt - 1, 0), FOUNDATION_GROW.hints.length - 1)],
  };
}

// Only check that the learner supplied an explanation; never pretend keyword matching
// can judge the quality or truth of an open-ended child's response.
export function reviewGrowthReflection(text) {
  const response = String(text || '').trim();
  const words = response.split(/\s+/).filter(Boolean);
  return {
    provided: words.length >= 5 && response.length >= 20,
    status: words.length >= 5 && response.length >= 20 ? 'awaiting-facilitator-review' : 'needs-more-detail',
    feedback: words.length >= 5 && response.length >= 20
      ? 'You explained your thinking. A facilitator can read your words and help you practice this skill next.'
      : 'Tell us a little more. What would you check, and how would you know if your idea helped?'
  };
}
