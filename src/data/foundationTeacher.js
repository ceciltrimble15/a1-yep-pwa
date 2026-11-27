// Scripted, age-appropriate teaching prompts for Foundation ages 7–10.
// No AI chat, no automatic microphone capture, no grading, no invented progress.
// Audio target: one short teaching idea, one question, then one learner action.
export const FOUNDATION_TEACHER = {
  dailyQuest: {
    1: {
      speech: "Look at the lunch line. Where do kids have to wait?",
      question: "What do you NOTICE? Tap one part of the picture that needs attention.",
      focusId: 'foundation-lunch-scene',
      focusLabel: 'Point to the lunch-line picture',
    },
    2: {
      speech: "Who has to wait? Pick the people you noticed.",
      question: "Who feels this problem? Choose the people in the activity.",
      focusId: 'foundation-people',
      focusLabel: 'Point to the people choices',
    },
    3: {
      speech: "Pick one change you would like to try.",
      question: "What is ONE move you could try? Tap your idea.",
      focusId: 'foundation-ideas',
      focusLabel: 'Point to the idea choices',
    },
    4: {
      speech: "How could you check whether your idea helps?",
      question: "How can you find out if your idea really helps people?",
      focusId: 'foundation-coach',
      focusLabel: 'Point to the coaching choices',
    },
    5: {
      speech: "Look at the art table. Pick one safe way to test a change.",
      question: "How could you test one small change and find out whether it helped?",
      focusId: 'foundation-grow',
      focusLabel: 'Point to the new-situation choices',
    },
    6: {
      speech: "Tell how you would know if your idea helped.",
      question: "How would you know whether your idea helped? Write your own thoughts.",
      focusId: 'foundation-review',
      focusLabel: 'Point to the growth reflection',
    },
    7: {
      speech: "Your plan is saved. Next, pick a tool for the art table.",
      question: "Ready for S.T.E.M.Sin? Tap Continue.",
      focusId: 'foundation-complete',
      focusLabel: 'Point to your saved growth practice',
    },
  },
  stemSin: {
    1: {
      speech: "Look at the tools. Pick one you would like to test.",
      question: "Which tool might help? Look at the picture, then tap Try this tool.",
      focusId: 'stem-tools',
      focusLabel: 'Point to the tool picture',
    },
    2: {
      speech: "What do you think your tool could change?",
      question: "What do you PREDICT this tool could improve? Tap one answer.",
      focusId: 'stem-prediction',
      focusLabel: 'Point to the prediction choices',
    },
    3: {
      speech: "Open the example to see one possible change.",
      question: "Tap Show What Changes, then compare the pictures.",
      focusId: 'stem-ready',
      focusLabel: 'Point to your prediction',
    },
    4: {
      speech: "Look at both pictures. What looks different?",
      question: "What looks different? Tap Explain What Happened.",
      focusId: 'stem-result',
      focusLabel: 'Point to the before-and-after pictures',
    },
    5: {
      speech: "Pick a way to check your idea.",
      question: "What should we TRY next? Choose an option, then save your work.",
      focusId: 'stem-next-test',
      focusLabel: 'Point to the next-test choices',
    },
    6: {
      speech: "Your tool and test plan are saved. Open your Mirror.",
      question: "Ready for Mirror Results? Tap Continue.",
      focusId: 'stem-complete',
      focusLabel: 'Point to your saved response',
    },
  },
};

export function foundationTeacherStep(lane, step) {
  return FOUNDATION_TEACHER[lane]?.[step] || null;
}
