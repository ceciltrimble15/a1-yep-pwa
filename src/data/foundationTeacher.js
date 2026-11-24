// Scripted, age-appropriate teaching prompts for Foundation ages 7–10.
// No AI chat, no automatic microphone capture, no grading, no invented progress.
// Audio target: one short teaching idea, one question, then one learner action.
export const FOUNDATION_TEACHER = {
  dailyQuest: {
    1: {
      speech: "Hey, Explorer. Today we're problem spotters. Look at the lunch line. A problem is something that makes a task harder.",
      question: "What do you NOTICE? Tap one part of the picture that needs attention.",
      focusId: 'foundation-lunch-scene',
      focusLabel: 'Point to the lunch-line picture',
    },
    2: {
      speech: "Good noticing. Now think about people. A useful idea starts with asking who the problem affects.",
      question: "Who feels this problem? Choose the people in the activity.",
      focusId: 'foundation-people',
      focusLabel: 'Point to the people choices',
    },
    3: {
      speech: "Now build one idea. An idea is something we can try. We do not know if it works until we test it safely.",
      question: "What is ONE move you could try? Tap your idea.",
      focusId: 'foundation-ideas',
      focusLabel: 'Point to the idea choices',
    },
    4: {
      speech: "Now let us check how you would test your idea. Choose a safe next step. If the first choice needs work, I will give you a clue.",
      question: "How can you find out if your idea really helps people?",
      focusId: 'foundation-coach',
      focusLabel: 'Point to the coaching choices',
    },
    5: {
      speech: "You helped think about the lunch line. Now let us see whether the same idea works at a busy art table.",
      question: "How could you test one small change and find out whether it helped?",
      focusId: 'foundation-grow',
      focusLabel: 'Point to the new-situation choices',
    },
    6: {
      speech: "A good learner explains the reason behind a choice. Tell me what you learned and what you would check next.",
      question: "How would you know whether your idea helped? Write your own thoughts.",
      focusId: 'foundation-review',
      focusLabel: 'Point to the growth reflection',
    },
    7: {
      speech: "Your growth practice is saved. A facilitator can review your reflection. Next, safely test a new idea in S.T.E.M.Sin.",
      question: "Ready for S.T.E.M.Sin? Tap Continue.",
      focusId: 'foundation-complete',
      focusLabel: 'Point to your saved growth practice',
    },
  },
  stemSin: {
    1: {
      speech: "Welcome to S.T.E.M.Sin. Look at the art-table problem. Tools can help, but first we choose what to try.",
      question: "Which tool might help? Look at the picture, then tap Try this tool.",
      focusId: 'stem-tools',
      focusLabel: 'Point to the tool picture',
    },
    2: {
      speech: "Before we test, we make a prediction. A prediction is what we think might happen.",
      question: "What do you PREDICT this tool could improve? Tap one answer.",
      focusId: 'stem-prediction',
      focusLabel: 'Point to the prediction choices',
    },
    3: {
      speech: "Now reveal the practice example. The picture helps us think, but it is not proof that something happened in real life.",
      question: "Tap Show What Changes, then compare the pictures.",
      focusId: 'stem-ready',
      focusLabel: 'Point to your prediction',
    },
    4: {
      speech: "Compare before and after. Good problem-solvers check what actually changed instead of guessing.",
      question: "What looks different? Tap Explain What Happened.",
      focusId: 'stem-result',
      focusLabel: 'Point to the before-and-after pictures',
    },
    5: {
      speech: "Now choose what you would test next. Learning means using what you noticed to make the next test better.",
      question: "What should we TRY next? Choose an option, then save your work.",
      focusId: 'stem-next-test',
      focusLabel: 'Point to the next-test choices',
    },
    6: {
      speech: "Your practice choice is saved. A saved choice shows your thinking, not proof that you mastered the skill.",
      question: "Ready for Mirror Results? Tap Continue.",
      focusId: 'stem-complete',
      focusLabel: 'Point to your saved response',
    },
  },
};

export function foundationTeacherStep(lane, step) {
  return FOUNDATION_TEACHER[lane]?.[step] || null;
}
