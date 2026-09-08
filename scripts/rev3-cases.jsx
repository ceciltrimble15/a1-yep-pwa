import assert from 'node:assert/strict';
import { renderToStaticMarkup } from 'react-dom/server';
import { PROGRAM_CONTENT, getProgramContent, STEM_SIN_LABEL } from '../src/data/pilotContent';
import { migrateLaneProgress } from '../src/data/laneProgress';
import { YEPProvider } from '../src/context/YEPContext';
import FinisherFocus from '../src/screens/FinisherFocus';
import { DailyQuest, WeeklyModule, StemSinQuest, BossChallenge, MentorSpotlight } from '../src/screens/PilotScreens';
import Reflection from '../src/screens/Reflection';
import { getMission } from '../src/data/missions';

let saved = {};
globalThis.localStorage = { getItem: () => JSON.stringify(saved) };
globalThis.window = { location: { search: '' } };
const modes = ['explorer','builder','leader','yaep'];
assert.deepEqual(Object.keys(PROGRAM_CONTENT), modes);
for (const field of ['instructions','example','expectations','dailyQuest','weeklyModule','stemSin','bossChallenge','mentorSpotlight','reflection']) {
  assert.equal(new Set(modes.map(m=>JSON.stringify(getProgramContent(m)[field]))).size,4, `${field} must differ meaningfully by lane`);
}
const render = (Component) => renderToStaticMarkup(<YEPProvider><Component /></YEPProvider>);
for (const mode of modes) {
  saved = {mode};
  for (const [Component, field] of [[DailyQuest,'dailyQuest'],[WeeklyModule,'weeklyModule'],[StemSinQuest,'stemSin'],[BossChallenge,'bossChallenge'],[MentorSpotlight,'mentorSpotlight'],[Reflection,'reflection']]) {
    const html = render(Component);
    const title = getProgramContent(mode)[field].title.replaceAll('&','&amp;');
    assert.ok(html.includes(title), `${mode}/${field} renders its content`);
  }
  assert.ok(render(StemSinQuest).includes(STEM_SIN_LABEL));
}
const legacy = {mode:'builder',pilotProgress:{dailyQuestText:'Legacy proof',dailyQuestComplete:true,weeklyCompleted:['why']}};
const migrated = migrateLaneProgress(legacy);
assert.equal(migrated.builder.dailyQuestText,'Legacy proof');
assert.equal(migrated.explorer,undefined);
assert.deepEqual(migrateLaneProgress({laneProgress:migrated}),migrated);
// A URL-selected new lane must not claim proof from the saved legacy lane.
saved = legacy;
window.location.search='?mode=explorer';
assert.ok(!render(DailyQuest).includes('Legacy proof'));
window.location.search='';
const mission = getMission('Identity','Hands-On');
assert.ok(mission,'existing mission fixture');
saved = {mode:'builder',mirrorResult:{Edge:'Identity',Focus:'Existing direction'},currentMission:mission,missionComplete:false,xp:50,pilotProgress:{dailyQuestText:'Saved daily proof',dailyQuestComplete:true,stemSinText:'Saved technology proof',stemSinComplete:true}};
const before=JSON.stringify(saved);
const focus=render(FinisherFocus);
for(const expected of ['Saved daily proof','Saved technology proof',mission.title,'Assigned — not completed','50','Continue to My FINISHER Mission']) assert.ok(focus.includes(expected),expected);
assert.equal(JSON.stringify(saved),before,'readout must not mutate persisted data');
saved.missionComplete=true;
assert.ok(!render(FinisherFocus).includes('Assigned — not completed'));
saved={mode:'builder'};
const empty=render(FinisherFocus);
assert.ok(empty.includes('No mission assigned'));
assert.match(empty, /disabled=""[^>]*>Continue to My FINISHER Mission/);
console.log('REV 3 checks passed: four rendered content lanes, legacy migration, lane isolation, saved/empty/completed FINISHER Focus states.');
