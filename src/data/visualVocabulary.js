// Author-approved example vocabulary for the VISUAL YEP proof of concept.
// The permanent curriculum/definition review workflow belongs in the separate backend.
// This is presentational support only: words, definitions and chants are not scored or saved.
export const VISUAL_VOCABULARY = {
  explorer: {
    dailyQuest: { word: 'NOTICE', meaning: 'Look closely and spot something worth thinking about.', beat: 'Look around. Slow it down. Notice what is all around.', example: 'Notice the pencils rolling off the table.', picture: 'supplies' },
    stemSin: { word: 'SORT', meaning: 'Put things in groups so they are easier to find.', beat: 'Sort it here. Sort it there. Put the things where they belong with care.', example: 'Sort markers and crayons into separate groups.', picture: 'supplies' },
    mirror: { word: 'REFLECT', meaning: 'Think back about what you did and what you learned.', beat: 'Look back. Think it through. What did you learn? What might you do?', example: 'Reflect on the problem you chose.', picture: 'help' },
    mission: { word: 'FINISH', meaning: 'Follow through on a step and say what you really did.', beat: 'Make a plan. Try your best. Check your work. Then take a rest.', example: 'Finish by checking off a step you actually tried.', picture: 'reach' },
  },
  builder: {
    dailyQuest: { word: 'PROBLEM', meaning: 'Something that makes a task harder or leaves a need unmet.', beat: 'Spot the snag. Name the need. A useful idea starts with what you see.', example: 'Waiting too long to find a supply can be a problem.', picture: 'waiting' },
    stemSin: { word: 'PROTOTYPE', meaning: 'An early version of an idea that you can test and improve.', beat: 'Build a little. Test a lot. Change your plan with what you have got.', example: 'Try a labeled supply box as a prototype.', picture: 'labels' },
    mirror: { word: 'EVIDENCE', meaning: 'What you saw, heard, or recorded that helps explain what happened.', beat: 'Do not just guess. Look and see. Check the proof before you agree.', example: 'A note about what worked is evidence, not a made-up score.', picture: 'help' },
    mission: { word: 'ACTION', meaning: 'A real step you take toward your goal.', beat: 'Make your plan. Take your turn. Try one step and tell what you learn.', example: 'Action means doing the step, not just choosing it on the tablet.', picture: 'reach' },
  },
  leader: {
    dailyQuest: { word: 'NEED', meaning: 'Something a person requires or could genuinely benefit from.', beat: 'Ask who needs it. Ask them why. Check the reason before you try.', example: 'A club organizer may need one dependable sign-up list.', picture: 'help' },
    stemSin: { word: 'PROTOTYPE', meaning: 'An early version of a solution built to learn what works.', beat: 'Make it small. Give it a try. Test what works, then ask why.', example: 'A sample sign-up form can be a prototype.', picture: 'form' },
    mirror: { word: 'EVIDENCE', meaning: 'Information you can check that supports or challenges a claim.', beat: 'Check the claim. Trace the clue. Evidence helps you test what is true.', example: 'Compare sign-up errors before and after a change.', picture: 'status' },
    mission: { word: 'FOLLOW-THROUGH', meaning: 'Carrying out an agreed step and checking the result.', beat: 'Set the goal. Take the step. Check what worked and what comes next.', example: 'Complete one agreed test and explain what happened.', picture: 'reach' },
  },
  yaep: {
    dailyQuest: { word: 'DEMAND', meaning: 'A customer's willingness and ability to obtain a product or service.', beat: 'Hear the need. Test the claim. Interest and sales are not the same.', example: 'Questions about a service suggest interest; paid orders give stronger evidence.', picture: 'waiting' },
    stemSin: { word: 'WORKFLOW', meaning: 'The ordered steps people follow to complete a task.', beat: 'Map the step. Find the delay. Test a simpler, better way.', example: 'Map what happens from a customer request to a reply.', picture: 'workflow' },
    mirror: { word: 'TRADE-OFF', meaning: 'What you give up when you choose one option over another.', beat: 'Compare the cost. Compare the gain. Explain the choice and what remains.', example: 'A faster reply system may cost more to operate.', picture: 'status' },
    mission: { word: 'EXECUTE', meaning: 'Carry out a plan with real actions and verify what happened.', beat: 'Make the plan. Do the task. Check the outcome. Questions? Ask.', example: 'Test a sample customer follow-up step and record the actual result.', picture: 'reach' },
  },
};

const LANE_FOR_SCREEN = {
  dailyQuest: 'dailyQuest',
  stemSin: 'stemSin',
  mirrorIntro: 'mirror',
  mission: 'mission',
};

export function getVisualVocabulary(mode, screen) {
  const lane = LANE_FOR_SCREEN[screen];
  if (!lane) return null;
  return (VISUAL_VOCABULARY[mode] || VISUAL_VOCABULARY.builder)[lane] || null;
}
