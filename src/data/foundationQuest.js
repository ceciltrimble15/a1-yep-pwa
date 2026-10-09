export const FOUNDATION_QUEST_ID = 'explorer-lunch-line-v1';
export const FOUNDATION_QUEST = {
  id: FOUNDATION_QUEST_ID,
  title: 'A Better Lunch Line',
  prompt: 'Look at the lunch line. Notice one problem, think about who it affects, and choose one move you would try.',
  example: 'Students wait while everyone uses one serving spot. With permission, one possible test is a second pick-up spot. Look at what changes before deciding whether it helps.',
  finisher: 'Focus',
};
export const FOUNDATION_SCENARIO = {
  items: [
    { label: 'The line is long', detail: 'Students spend a lot of time waiting.' },
    { label: 'Everyone uses one spot', detail: 'One serving area can slow the whole line down.' },
    { label: 'The path is not clear', detail: 'It can be hard to know where to stand or go next.' },
  ],
};
export const FOUNDATION_PEOPLE = ['Students waiting in line', 'Cafeteria workers', 'Both students and workers'];
export const FOUNDATION_QUEST_IDEAS = [
  ['Open a second line', 'Put quick items first', 'Let groups go at different times'],
  ['Create two pick-up spots', 'Separate different food choices', 'Add a quick grab-and-go spot'],
  ['Add floor arrows', 'Use simple picture signs', 'Have a helper show the next step'],
];
// Earlier PR9 work keeps its original meaning when this new visual lesson is introduced.
export const LEGACY_FOUNDATION_QUEST = {
  id: 'explorer-daily', title: 'Little Problem Finder',
  prompt: 'Find one small problem you can see. Who needs help? Tell or write one thing you could try.',
  finisher: 'Focus',
};

export function hasLegacyFoundationQuest(progress) {
  const draft = progress.dailyQuestDraft;
  const earlierDraft = draft && draft.questId !== FOUNDATION_QUEST_ID &&
    (!!draft.text || draft.selectedProblem != null || !!draft.who || !!draft.tryChoice);
  return !!earlierDraft || !!(progress.dailyQuestComplete && progress.dailyQuestQuestId !== FOUNDATION_QUEST_ID);
}
