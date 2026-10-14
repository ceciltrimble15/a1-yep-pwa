// Scripted, age-appropriate teaching prompts for Foundation ages 7–10.
// No AI chat, no automatic microphone capture, no grading, no invented progress.
// The child moves through the *existing* lessons by tapping real activity choices.
export const FOUNDATION_TEACHER = {
  dailyQuest: {
    1: {
      speech: "Hey, Explorer! I'm your YEP Guide. Today we're problem spotters! Look at the lunch line. Some kids are waiting, and everyone is trying to get lunch. A problem is something that makes a task harder. Let's look closely before we decide what to do.",
      question: "What do you NOTICE in the picture? Tap one part of the lunch line that needs attention.",
      focusId: 'foundation-lunch-scene',
      focusLabel: 'Point to the lunch-line picture',
    },
    2: {
      speech: "You noticed something! Now let's think about the people. A good idea starts with asking who needs help. More than one person might be affected.",
      question: "Who feels this problem? Choose the people in the activity.",
      focusId: 'foundation-people',
      focusLabel: 'Point to the people choices',
    },
    3: {
      speech: "Now we build an idea. An idea is something we might try to improve a situation. We don't know if it works yet, and that's okay. We can learn by testing with permission.",
      question: "What is ONE move you could try? Tap your idea below.",
      focusId: 'foundation-ideas',
      focusLabel: 'Point to the idea choices',
    },
    4: {
      speech: "Nice work thinking! Let's look at your three choices: what you noticed, who needs help, and what you would try. A choice is a plan, not proof that it worked.",
      question: "Does your plan match what you meant? Review it, then choose Finish.",
      focusId: 'foundation-review',
      focusLabel: 'Point to your choices',
    },
    5: {
      speech: "You finished this practice! Your choices were saved on this tablet. The next part of the Process is testing an idea. Real results come from things we actually try.",
      question: "Ready to explore S.T.E.M.Sin? Tap the continue button.",
      focusId: 'foundation-complete',
      focusLabel: 'Point to your saved work',
    },
  },
  stemSin: {
    1: {
      speech: "Hi again, Explorer! Welcome to S.T.E.M.Sin. Today we get to be inventors. Look at the art-table problem. Tools can help us make things better, but first we choose what to try. Tap Next tool to see more tools.",
      question: "Which tool might help? Look at the picture, then tap Try this tool.",
      focusId: 'stem-tools',
      focusLabel: 'Point to the tool picture',
    },
    2: {
      speech: "You chose a tool. Before we use it, we make a prediction. A prediction means saying what we think might happen. We can change our minds when we see new information.",
      question: "What do you PREDICT this tool could improve? Tap one answer.",
      focusId: 'stem-prediction',
      focusLabel: 'Point to the prediction choices',
    },
    3: {
      speech: "Let's see what you predicted. Now we can reveal a pretend practice example. Remember: a picture helps us think. It is not proof something happened in real life.",
      question: "Tap Show What Changes, then look closely at the before-and-after pictures.",
      focusId: 'stem-ready',
      focusLabel: 'Point to your prediction',
    },
    4: {
      speech: "Look at the pictures. What changed after the tool was used? We should always check whether our prediction matches what we can actually see.",
      question: "What looks different in the example? Tap Explain What Happened.",
      focusId: 'stem-result',
      focusLabel: 'Point to the before-and-after pictures',
    },
    5: {
      speech: "Now it's your turn to decide what you would test next. Choose a next step, or tell your idea with words if you want. There is no pretend right answer.",
      question: "What should we TRY next? Choose an option, then save your work.",
      focusId: 'stem-next-test',
      focusLabel: 'Point to the next-test choices',
    },
    6: {
      speech: "You saved your practice choice on this tablet. That's a step in your Process, not proof you mastered the skill. Talk about what you would test in real life with a trusted adult.",
      question: "Ready for Mirror Results? Tap the continue button.",
      focusId: 'stem-complete',
      focusLabel: 'Point to your saved response',
    },
  },
};

export function foundationTeacherStep(lane, step) {
  return FOUNDATION_TEACHER[lane]?.[step] || null;
}
