import assert from 'node:assert/strict';
import React from 'react';
import { act, create } from 'react-test-renderer';
import { YEPProvider, useYEP } from '../src/context/YEPContext';
import { DailyQuest, StemSinQuest } from '../src/screens/PilotScreens';
import Home from '../src/screens/Home';
import MyDirection from '../src/screens/MyDirection';
import TrackSelector from '../src/screens/TrackSelector';
import { FOUNDATION_QUEST_ID, FOUNDATION_QUEST } from '../src/data/foundationQuest';
import VoiceCapture from '../src/components/VoiceCapture';
import YEPGuide from '../src/components/YEPGuide';
import PictureExample from '../src/components/LearningPicture';
import MirrorAssessment from '../src/screens/MirrorAssessment';
import MirrorResults from '../src/screens/MirrorResults';
import MirrorIntro from '../src/screens/MirrorIntro';
import FinisherMission from '../src/screens/FinisherMission';
import FacilitatorDashboard from '../src/screens/FacilitatorDashboard';
import Progress from '../src/screens/Progress';
import { DemoProfile, DemoAdminReview, DemoWeeklyModule, ResetDemo } from '../src/screens/DemoB05Screens';
import { mirrorQuestions } from '../src/data/mirrorQuestions';
import { getMission } from '../src/data/missions';

let stored = '{}';
let api;
let view;
let spoken = '';
globalThis.localStorage = { getItem: () => stored, setItem: (_, value) => { stored = value; }, removeItem: () => { stored = '{}'; } };
globalThis.window = { location: { search: '' }, speechSynthesis: { cancel() {}, speak(utterance) { spoken = utterance.text; } }, SpeechSynthesisUtterance: class { constructor(text) { this.text = text; } }, setTimeout: (callback) => callback(), scrollTo() {} };
globalThis.document = { getElementById: () => ({ focus() {}, scrollIntoView() {} }) };
const snapshot = () => JSON.parse(stored);
function Probe({ Component }) { api = useYEP(); return <Component key={api.mode} />; }
function mount(Component, seed) {
  if (view) act(() => view.unmount());
  if (seed) stored = JSON.stringify(seed);
  act(() => { view = create(<YEPProvider><Probe Component={Component} /></YEPProvider>); });
  return view;
}
const text = (node) => typeof node === 'string' ? node : (node?.children || []).map(text).join('');
const buttons = (label) => view.root.findAllByType('button').filter((node) => typeof label === 'string' ? (text(node).trim() === label || node.props['aria-label'] === label) : label.test(text(node)));
function click(label, index = 0) { const button = buttons(label)[index]; assert.ok(button, `button ${label}`); assert.ok(!button.props.disabled, `enabled ${label}`); act(() => button.props.onClick()); }
function enter(id, value) { const field = view.root.findByProps({ id }); act(() => field.props.onChange({ target: { value } })); }
const modes = ['explorer', 'builder', 'leader', 'yaep'];
const mission = getMission('Discipline', 'Hands-On');
const result = { Anchor: 'Identity', Edge: 'Discipline', Style: 'Hands-On', Focus: mission.focus, MissionID: mission.id };
const completed = { mode: 'builder', screen: 'progress', mirrorResult: result, currentMission: mission, missionStepsDone: Object.fromEntries(mission.steps.map((_, i) => [i, true])), missionComplete: true, reflection: 'A previous mission reflection.', reflectionSubmitted: true, finisherLetter: mission.finisherLetter };

for (const mode of modes) {
  mount(DailyQuest, { mode, screen: 'dailyQuest', pilotProgress: { dailyQuestText: 'Previously saved sample proof', dailyQuestComplete: true } });
  assert.equal(view.root.findByProps({ id: 'daily-quest-answer' }).props.value, 'Previously saved sample proof', `${mode}: completed proof visible after restart`);
  enter('daily-quest-answer', 'Temporary draft change');
  assert.equal(api.pilotProgress.dailyQuestDraft.text, 'Temporary draft change');
  enter('daily-quest-answer', 'Previously saved sample proof');
  assert.equal(api.pilotProgress.dailyQuestDraft, null, 'reverting to finished Daily proof clears stale draft');
  mount(DailyQuest);
  assert.equal(view.root.findByProps({ id: 'daily-quest-answer' }).props.value, 'Previously saved sample proof');
  if (mode === 'yaep') {
    act(() => view.root.findByType(VoiceCapture).props.onConfirm('Confirmed sample voice answer'));
    assert.equal(view.root.findByProps({ id: 'daily-quest-answer' }).props.value, 'Confirmed sample voice answer', 'adult voice confirmation after completed-proof reentry stays usable');
  }
  enter('daily-quest-answer', 'Updated saved sample proof');
  click('Update My Proof');
  assert.equal(snapshot().laneProgress[mode].dailyQuestText, 'Updated saved sample proof');
  if (mode !== 'yaep') {
    assert.ok(JSON.stringify(view.toJSON()).includes('Youth voice input is locked'));
    assert.equal(buttons('Talk To YEP').length, 0);
  }
  mount(DemoWeeklyModule, { mode, screen: 'weeklyModule' });
  for (const button of view.root.findAllByType('button').filter((node) => node.props['aria-label'] && !node.props.disabled && !node.props['aria-label'].startsWith('Audio') && !node.props['aria-label'].startsWith('Open') && !node.props['aria-label'].startsWith('Listen'))) {
    if (button.props['aria-label'].startsWith('Pause') || button.props['aria-label'].startsWith('Stop') || button.props['aria-label'].startsWith('Replay')) continue;
    act(() => button.props.onClick());
  }
  assert.equal(api.pilotProgress.weeklyCompleted.length, 3, `${mode}: routed weekly module saves its activities`);
  mount(Home, { mode, screen: 'home' });
  for (const target of ['FINISHER Focus', 'Weekly Module', 'Boss Challenge', 'Mentor Spotlight', 'Admin Review', 'Choose Age Pathway', 'Reset Demo Participant']) assert.ok(JSON.stringify(view.toJSON()).includes(target), `${mode}: Home has ${target}`);
}
mount(DailyQuest, { mode: 'builder', screen: 'dailyQuest' });
click('Show me');
assert.ok(JSON.stringify(view.toJSON()).includes('A shared supply box is hard to use'));
click('Hear it');
assert.ok(spoken.includes('A shared supply box is hard to use'), 'spoken guide includes the opened example');
click(/Too much waiting/);
click('Both');
enter('daily-quest-answer', 'I could try one clear line with a sign.');
mount(DailyQuest);
assert.equal(view.root.findByProps({ id: 'daily-quest-answer' }).props.value, 'I could try one clear line with a sign.', 'unfinished Daily Quest draft returns at its current stage');
assert.equal(api.pilotProgress.dailyQuestComplete, false);
click('Review My Idea');
click('Finish & Save');
assert.equal(snapshot().pilotProgress.dailyQuestComplete, true);
mount(DailyQuest);
assert.equal(view.root.findByProps({ id: 'daily-quest-answer' }).props.value, 'I could try one clear line with a sign.');

mount(StemSinQuest, { mode: 'builder', screen: 'stemSin' });
// Follow the actual guided tool, prediction, practice, explanation and save flow.
const toolButton = view.root.findAllByType('button').find((node) => node.props['aria-pressed'] === false && text(node).includes('Label'));
assert.ok(toolButton);
act(() => toolButton.props.onClick());
click('Reduce search time');
mount(StemSinQuest);
assert.equal(api.pilotProgress.stemSinDraft.prediction, 'Reduce search time');
click('Change prediction');
click('Make the system clearer');
assert.equal(api.pilotProgress.stemSinDraft.prediction, 'Make the system clearer');
click('Show What Changes');
click('Explain What Happened');
enter('stem-sin-answer', 'Labels helped in practice. I would time a real test next.');
mount(StemSinQuest);
assert.equal(view.root.findByProps({ id: 'stem-sin-answer' }).props.value, 'Labels helped in practice. I would time a real test next.', 'unfinished STEM response survives reopening');
click('Save S.T.E.M.Sin Proof');
mount(StemSinQuest);
enter('stem-sin-answer', 'Temporary STEM draft change');
enter('stem-sin-answer', 'Labels helped in practice. I would time a real test next.');
assert.equal(api.pilotProgress.stemSinDraft, null, 'reverting to finished STEM proof clears stale draft');
mount(StemSinQuest);
assert.equal(view.root.findByProps({ id: 'stem-sin-answer' }).props.value, 'Labels helped in practice. I would time a real test next.');
enter('stem-sin-answer', 'Updated explanation of my practice result.');
click('Update S.T.E.M.Sin Proof');
assert.equal(snapshot().pilotProgress.stemSinText, 'Updated explanation of my practice result.');
click('Start My Mirror');
assert.equal(api.screen, 'mirrorIntro');
mount(StemSinQuest, { ...snapshot(), mirrorResult: result, currentMission: mission });
click('Go To Mirror Results');
assert.equal(api.screen, 'results');
assert.deepEqual(api.currentMission, mission);

mount(StemSinQuest, { mode: 'builder', pilotProgress: { stemSinComplete: true, stemSinText: 'Legacy explanation without a saved tool' } });
enter('stem-sin-answer', 'Updated legacy explanation without inventing a tool.');
click('Update S.T.E.M.Sin Proof');
assert.equal(snapshot().pilotProgress.stemSinText, 'Updated legacy explanation without inventing a tool.');
assert.equal(snapshot().pilotProgress.stemSinChoice, '');

mount(MirrorAssessment, { mode: 'builder', screen: 'mirror' });
click('Usually');
click('Next');
click('Sometimes');
assert.equal(snapshot().pilotProgress.mirrorDraft.step, 1);
mount(MirrorAssessment);
assert.equal(buttons('Sometimes')[0].props['aria-pressed'], true, 'unfinished Mirror answer restored');
act(() => api.setMode('explorer'));
assert.equal(api.pilotProgress.mirrorDraft, null, 'draft stays in its lane');
act(() => api.setMode('builder'));
assert.equal(api.pilotProgress.mirrorDraft.step, 1);

mount(MirrorResults, completed);
click('Take a New Mirror');
assert.equal(api.screen, 'mirrorIntro');
assert.equal(api.reflectionSubmitted, true, 'opening replacement introduction preserves the current result');
mount(MirrorIntro);
assert.ok(JSON.stringify(view.toJSON()).includes('Completing a new Mirror replaces'));
click('Take The Mirror');
assert.equal(api.screen, 'mirror');
assert.equal(api.missionComplete, true, 'starting a replacement draft preserves the current mission until submission');
mount(MirrorAssessment);
for (let index = 0; index < mirrorQuestions.length; index++) {
  click('Usually');
  click(index === mirrorQuestions.length - 1 ? 'See My Result' : 'Next');
  if (buttons('Keep Going').length) click('Keep Going');
}
assert.equal(api.screen, 'results');
mount(MirrorResults);
assert.equal(api.reflection, '');
assert.equal(api.reflectionSubmitted, false);
assert.equal(api.finisherLetter, '');
assert.equal(api.missionComplete, false);
assert.deepEqual(api.missionStepsDone, {});
assert.equal(api.pilotProgress.mirrorDraft, null);
click('Hear it');
assert.ok(spoken.includes('strength'));
click('See My Growth Area');
click('See My FINISHER Focus');
click('See Full Result');
click('Open My FINISHER Mission');
assert.equal(api.screen, 'mission');
mount(FinisherMission);
act(() => api.completeMission());
assert.equal(api.missionComplete, false, 'cannot finish unfinished checklist');
assert.equal(view.root.findAllByProps({ 'aria-current': 'step' }).length, 1);
click('Show My Next Step');
for (let i = 0; i < api.currentMission.steps.length; i++) act(() => api.toggleMissionStep(i));
click('Reflect On My Mission');
assert.equal(api.missionComplete, true);
act(() => api.submitReflection('I learned to try, check, and improve my work.'));
assert.equal(api.reflectionSubmitted, true);
act(() => api.toggleMissionStep(0));
assert.equal(api.missionComplete, false);
assert.equal(api.reflectionSubmitted, false);
assert.equal(api.finisherLetter, '');

for (const Component of [DemoProfile, DemoAdminReview]) {
  mount(Component, { mode: 'builder', mirrorResult: result, currentMission: mission });
  assert.ok(JSON.stringify(view.toJSON()).includes('Execution'));
}
mount(FacilitatorDashboard, completed);
assert.ok(!/\bXP\b/.test(JSON.stringify(view.toJSON())), 'dashboard contains no XP');
mount(Home, completed);
assert.equal(buttons(/Mission ready/i).length, 0, 'completed mission is not labeled ready');
mount(Progress, completed);
const before = snapshot();
click('Start A New Session');
assert.equal(api.screen, 'resetDemo');
assert.equal(api.reflection, before.reflection, 'reset link does not erase proof');
mount(ResetDemo);
click('Cancel');
assert.equal(api.screen, 'home');
assert.equal(api.reflection, before.reflection);
mount(DailyQuest, { ...completed, screen: 'dailyQuest' });
for (let i = 0; i < buttons('Mirror Results').length; i++) {
  click('Mirror Results', i);
  assert.equal(api.screen, 'results', 'every Daily Quest Mirror route preserves results');
}
// Choice-based entry stays separate from written proof and never completes the Mirror/mission/reflection.
for (const mode of modes) {
  mount(DailyQuest, { mode, screen: 'dailyQuest' });
  click('Show me');
  assert.equal(api.pilotProgress.dailyQuestComplete, false, 'viewing an example is not a submitted response');
  const problems = view.root.findByProps({ 'aria-label': 'Choose the problem you notice' }).findAllByType('button');
  act(() => problems[0].props.onClick());
  click(mode === 'explorer' ? 'Both students and workers' : 'Both');
  const actions = view.root.findByProps({ 'aria-label': 'Choose a change to try' }).findAllByType('button');
  act(() => actions[0].props.onClick());
  if (mode === 'explorer') click('Finish My First Quest');
  else { click('Review My Choices'); click('Finish & Save'); }
  assert.equal(api.pilotProgress.dailyQuestText, '');
  assert.equal(api.pilotProgress.dailyQuestEvidenceType, 'choices');
  assert.ok(api.pilotProgress.dailyQuestChoiceProof.problem);
  assert.equal(api.reflectionSubmitted, false);
  mount(DailyQuest);
  if (mode === 'explorer') { click('Review My Response'); click('Back One Step'); }
  assert.equal(view.root.findByProps({ id: 'daily-quest-answer' }).props.value, '');
  const revised = view.root.findByProps({ 'aria-label': 'Choose a change to try' }).findAllByType('button')[1];
  const revisedLabel = text(revised).trim();
  act(() => revised.props.onClick());
  click('Update My Proof');
  assert.equal(api.pilotProgress.dailyQuestChoiceProof.action, revisedLabel);
  mount(DemoAdminReview);
  assert.ok(JSON.stringify(view.toJSON()).includes('No written explanation was provided.'));
  mount(StemSinQuest);
  const tools = view.root.findByProps({ 'aria-label': 'Choose a tool to test' }).findAllByType('button');
  act(() => tools[0].props.onClick());
  const predictions = view.root.findByProps({ id: 'stem-prediction' }).findAllByType('button');
  act(() => predictions[0].props.onClick());
  click('Show What Changes');
  assert.equal(api.pilotProgress.stemSinComplete, false, 'a shown practice result is not a learner response');
  click('Explain What Happened');
  click('Compare before and after');
  click('Save S.T.E.M.Sin Proof');
  assert.equal(api.pilotProgress.stemSinText, '');
  assert.equal(api.pilotProgress.stemSinEvidenceType, 'choices');
  assert.equal(api.pilotProgress.stemSinChoiceProof.nextTest, 'Compare before and after');
  mount(StemSinQuest);
  click('Change the tool');
  click('Update S.T.E.M.Sin Proof');
  assert.equal(api.pilotProgress.stemSinChoiceProof.nextTest, 'Change the tool');
  assert.equal(api.mirrorResult, null);
  assert.equal(api.missionComplete, false);
  assert.equal(api.reflectionSubmitted, false);
}
const pictureKinds = { explorer: ['supplies','labels','holder'], builder: ['supplies','checklist','reach'], leader: ['form','status','reminder'], yaep: ['form','status','reminder'] };
for (const mode of modes) {
  mount(DailyQuest, { mode });
  assert.equal(view.root.findByType(YEPGuide).props.pictureKind, mode === 'explorer' ? 'waiting' : mode === 'builder' ? 'supplies' : 'workflow', 'unselected Daily picture matches the lane example');
  for (let index = 0; index < 3; index++) {
    mount(StemSinQuest, { mode });
    const options = view.root.findByProps({ 'aria-label': 'Choose a tool to test' }).findAllByType('button');
    act(() => options[index].props.onClick());
    click('Show me');
    assert.equal(view.root.findByType(YEPGuide).props.pictureKind, pictureKinds[mode][index]);
    assert.ok(view.root.findAllByType(PictureExample).some((picture) => picture.props.kind === pictureKinds[mode][index]), 'each selected tool has its matching illustration');
  }
}
// Incoming Foundation entry has no entrepreneur-track gate, and the check-in persists one response at a time.
mount(TrackSelector, { mode: 'explorer', screen: 'track' });
enter('powerName', 'Sample Explorer');
act(() => view.root.findByProps({ type: 'checkbox' }).props.onChange({ target: { checked: true } }));
click('Start My YEP Introduction');
assert.equal(api.track, null);
assert.equal(api.screen, 'myDirection');
mount(MyDirection);
click('Start My First Check-In');
click('Hear it');
assert.ok(spoken.includes('Building things') && spoken.includes('Solving problems'), 'intake narration includes actual choices');
click('Building things');
assert.equal(api.directionProfile.interest, 'Building things');
mount(Home);
assert.equal(buttons('Continue My First Check-In').length, 1);
mount(MyDirection);
assert.ok(JSON.stringify(view.toJSON()).includes('What feels like a strength?'));
click('I keep trying');
click('Trying it');
click('Help somebody');
assert.deepEqual({ strength: api.directionProfile.strength, learning: api.directionProfile.learning, goal: api.directionProfile.goal }, { strength: 'I keep trying', learning: 'Trying it', goal: 'Help somebody' });
click('Start My First Daily Quest');
assert.equal(api.screen, 'dailyQuest');
mount(DailyQuest);
assert.ok(JSON.stringify(view.toJSON()).includes(FOUNDATION_QUEST.title));
assert.equal(api.pilotProgress.dailyQuestComplete, false);
click(/The line is long/);
mount(DailyQuest);
assert.ok(JSON.stringify(view.toJSON()).includes('Who feels this problem?'));
click('Both students and workers');
enter('daily-quest-answer', 'I would try a picture menu while we wait.');
mount(DailyQuest);
assert.equal(view.root.findByProps({ id: 'daily-quest-answer' }).props.value, 'I would try a picture menu while we wait.');
click('Review My Own Idea');
click('Finish My First Quest');
assert.equal(api.pilotProgress.dailyQuestQuestId, FOUNDATION_QUEST_ID);
assert.equal(api.pilotProgress.dailyQuestEvidenceType, 'words_and_choices');
assert.equal(api.pilotProgress.dailyQuestText, 'I would try a picture menu while we wait.');
assert.equal(api.pilotProgress.dailyQuestChoiceProof.action, 'Own written idea');
assert.equal(api.mirrorResult, null);
assert.equal(api.reflectionSubmitted, false);
mount(DailyQuest);
click('Review My Response');
enter('daily-quest-answer', 'Temporary edit');
enter('daily-quest-answer', 'I would try a picture menu while we wait.');
assert.equal(api.pilotProgress.dailyQuestDraft, null, 'new Foundation edit/revert discards stale draft');
mount(DailyQuest);
assert.ok(JSON.stringify(view.toJSON()).includes('I would try a picture menu while we wait.'));
// Do not relabel an older PR9 Foundation draft or proof as the lunch-line quest.
const oldDraft = { text: 'A tray keeps crayons together.', selectedProblem: 0, who: 'Both', tryChoice: 'Put things in order', guideStep: 3 };
mount(DailyQuest, { mode: 'explorer', screen: 'dailyQuest', pilotProgress: { dailyQuestDraft: oldDraft } });
assert.ok(JSON.stringify(view.toJSON()).includes('Little Problem Finder'));
assert.ok(!JSON.stringify(view.toJSON()).includes('A Better Lunch Line'));
assert.equal(view.root.findByProps({ id: 'daily-quest-answer' }).props.value, oldDraft.text);
mount(Home);
assert.equal(view.root.findByType(YEPGuide).props.title, 'Little Problem Finder');
mount(DailyQuest);
click('Review My Idea');
click('Finish & Save');
assert.equal(api.pilotProgress.dailyQuestQuestId, null);
assert.equal(api.pilotProgress.dailyQuestChoiceProof.problem, 'Supplies everywhere');
mount(DailyQuest);
assert.ok(JSON.stringify(view.toJSON()).includes('Little Problem Finder'));
assert.equal(api.pilotProgress.dailyQuestText, oldDraft.text);
act(() => view.unmount());
console.log('Tablet regression checks passed: four-lane proof reentry and navigation; guided Daily/STEM/Mirror/FINISHER flow; saved proof editing; draft recovery/isolation; mission/reflection reset and guards; honest status; XP removal; youth voice lock; reset cancellation.');
