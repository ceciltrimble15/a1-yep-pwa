// A chosen response is evidence of that selection, not a written explanation or a mastery score.
export function proofStatus(progress, kind) {
  if (!progress[`${kind}Complete`]) return 'Open';
  return progress[`${kind}EvidenceType`] === 'choices' ? 'Picture/tap choices saved' : 'Response saved';
}

export function proofDescription(progress, kind) {
  const words = progress[`${kind}Text`] || '';
  const choices = progress[`${kind}ChoiceProof`];
  const detail = !choices ? '' : kind === 'dailyQuest'
    ? `Chosen problem: ${choices.problem}. Who it affects: ${choices.who}. Action to try: ${choices.action}.`
    : `Chosen tool: ${choices.tool}. Prediction: ${choices.prediction}. Next test: ${choices.nextTest}.`;
  if (!detail) return words;
  return `Picture/tap choices: ${detail} ${words ? `Own words: ${words}` : 'No written explanation was provided.'}`;
}
