import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { preview } from 'vite';
import { REFLECTION_PROMPTS } from '../src/data/exposureProcess.js';

// Run against `npm run build`, or set YEP_TEST_URL for an accessible hosted preview.
// No real participant information. Touch emulation is not physical-tablet acceptance.
const out = process.env.YEP_QA_OUTPUT || 'qa-output';
await mkdir(out, { recursive: true });
const server = process.env.YEP_TEST_URL ? null : await preview({ preview: { host: '127.0.0.1', port: 5182, strictPort: true } });
const url = process.env.YEP_TEST_URL || 'http://127.0.0.1:5182';
const browser = await chromium.launch({
  ...(process.env.CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH } : {}),
  args: ['--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader'],
});
const results = [];
const allViews = [
  { name: 'desktop', width: 1366, height: 900, touch: false },
  { name: 'phone', width: 390, height: 844, touch: true },
  { name: 'tablet-portrait', width: 768, height: 1024, touch: true },
  { name: 'tablet-landscape', width: 1024, height: 768, touch: true },
];
const modes = ['explorer', 'builder', 'leader', 'yaep'];
const views = allViews.filter(view => !process.env.YEP_TEST_VIEWS || process.env.YEP_TEST_VIEWS.split(',').includes(view.name));
const selectedModes = modes.filter(mode => !process.env.YEP_TEST_MODES || process.env.YEP_TEST_MODES.split(',').includes(mode));
const ages = ['7-10', '11-13', '14-17', '18-24'];
const session = async page => {
  // React persists draft updates in effects after painting the new step.
  await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
  return page.evaluate(() => JSON.parse(localStorage.getItem('yep_session_v1')));
};
async function check(page, condition, message) {
  await page.waitForFunction(condition, null, { timeout: 5000 });
  assert.ok(await page.evaluate(condition), message);
}
async function layout(page) {
  await page.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
  await page.waitForFunction(() => [...document.images].every(i => i.complete));
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'no page horizontal overflow');
  assert.equal(await page.locator('img').evaluateAll(images => images.filter(i => !i.complete || !i.naturalWidth).length), 0, 'image assets loaded');
}
async function start(page, mode, tap) {
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.getByRole('checkbox').check();
  await tap(page.getByRole('button', { name: new RegExp(`0${modes.indexOf(mode) + 1}\\s*AGES\\s*${ages[modes.indexOf(mode)]}`) }));
  await page.locator('#powerName').fill(`Demo ${mode}`);
  if (mode !== 'explorer') await tap(page.getByRole('button', { name: /Build & Sell/ }));
  await tap(page.getByRole('button', { name: mode === 'explorer' ? 'Start My YEP Introduction' : 'Enter The Process', exact: true }));
  await check(page, () => scrollY === 0, 'new screen starts at top');
}
async function exercise(view, mode) {
    const context = await browser.newContext({ viewport: { width: view.width, height: view.height }, hasTouch: view.touch, isMobile: view.touch });
    let page = await context.newPage();
    page.setDefaultTimeout(12000);
    const errors = [], writes = [];
    const observe = page => {
      page.on('pageerror', error => errors.push(error.message));
      page.on('request', request => { if (!['GET', 'HEAD'].includes(request.method())) writes.push(request.method() + ' ' + request.url()); });
    };
    observe(page);
    const tap = locator => view.touch ? locator.tap() : locator.click();
    await start(page, mode, tap);
    await layout(page);
    if (mode === 'explorer') {
      await tap(page.getByRole('button', { name: 'Start My First Check-In', exact: true }));
      for (const option of ['Building things', 'I keep trying', 'Trying it', 'Help somebody']) {
        await tap(page.getByRole('button', { name: new RegExp(option) }));
        await check(page, () => document.activeElement?.tagName === 'H2' && document.activeElement.getBoundingClientRect().top >= 0, 'new step guide visible and focused');
      }
      await tap(page.getByRole('button', { name: 'Start My First Daily Quest', exact: true }));
    } else await tap(page.getByRole('button', { name: 'Daily Quest', exact: true }));
    await tap(page.getByRole('button', { name: 'Show me', exact: true }));
    assert.equal(await page.locator('[aria-label="Guide example"]').count(), 1);
    await tap(page.getByRole('button', { name: 'Hide example', exact: true }));
    if (mode === 'explorer') await tap(page.getByRole('button', { name: /^Problem 1:/ }));
    else await tap(page.locator('[aria-label="Choose the problem you notice"] button').first());
    await check(page, () => document.activeElement?.tagName === 'H2' && document.activeElement.getBoundingClientRect().top >= 0, 'next guide visible');
    const draft = (await session(page)).pilotProgress.dailyQuestDraft;
    await page.reload({ waitUntil: 'domcontentloaded' });
    assert.deepEqual((await session(page)).pilotProgress.dailyQuestDraft, draft, 'unfinished problem survives refresh');
    await tap(page.getByRole('button', { name: mode === 'explorer' ? 'Both students and workers' : 'Both', exact: true }));
    await tap(page.locator('[aria-label="Choose a change to try"] button').first());
    if (mode === 'explorer') await tap(page.getByRole('button', { name: 'Finish My First Quest', exact: true }));
    else {
      await tap(page.getByRole('button', { name: 'Review My Choices', exact: true }));
      await tap(page.getByRole('button', { name: 'Finish & Save', exact: true }));
    }
    let saved = await session(page);
    assert.equal(saved.pilotProgress.dailyQuestComplete, true);
    assert.equal(saved.pilotProgress.dailyQuestEvidenceType, 'choices');
    assert.equal(saved.pilotProgress.dailyQuestText, '');
    assert.equal(saved.mirrorResult, null);
    assert.equal(saved.missionComplete, false);
    if (mode !== 'yaep') assert.equal(await page.getByRole('button', { name: 'Talk To YEP', exact: true }).count(), 0);
    const proof = saved.pilotProgress.dailyQuestChoiceProof;
    await tap(page.getByRole('button', { name: 'Program Home', exact: true }));
    await check(page, () => scrollY === 0, 'home reentry resets scroll');
    assert.equal(await page.locator('[aria-label="The four YEP learning lanes"] > button').count(), 4);
    await layout(page);
    if (mode === 'explorer') await page.screenshot({ path: `${out}/${view.name}-home.png`, fullPage: true, animations: 'disabled', timeout: 30000 });
    await tap(page.getByRole('button', { name: 'Daily Quest', exact: true }));
    assert.deepEqual((await session(page)).pilotProgress.dailyQuestChoiceProof, proof);
    // Close and reopen a tab on the same origin, retaining device-local storage.
    await page.close(); page = await context.newPage(); observe(page); page.setDefaultTimeout(12000);
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    assert.deepEqual((await session(page)).pilotProgress.dailyQuestChoiceProof, proof, 'saved proof survives tab reentry');
    if (mode === 'explorer') await page.screenshot({ path: `${out}/${view.name}-saved-quest.png`, fullPage: true, animations: 'disabled', timeout: 30000 });
    await tap(page.getByRole('button', { name: 'S.T.E.M.Sin', exact: true }).first());
    if (mode === 'explorer') await tap(page.getByRole('button', { name: 'Try Sorting Tray', exact: true }));
    else await tap(page.locator('[aria-label="Choose a tool to test"] button').first());
    await tap(page.locator('#stem-prediction button').first());
    await tap(page.getByRole('button', { name: 'Show What Changes', exact: true }));
    assert.equal((await session(page)).pilotProgress.stemSinComplete, false);
    await tap(page.getByRole('button', { name: 'Explain What Happened', exact: true }));
    await tap(page.getByRole('button', { name: 'Compare before and after', exact: true }));
    await tap(page.getByRole('button', { name: 'Save S.T.E.M.Sin Proof', exact: true }).first());
    saved = await session(page);
    assert.equal(saved.pilotProgress.stemSinComplete, true);
    assert.equal(saved.pilotProgress.stemSinEvidenceType, 'choices');
    await page.reload({ waitUntil: 'domcontentloaded' });
    assert.equal((await session(page)).pilotProgress.stemSinChoiceProof.nextTest, 'Compare before and after');
    await layout(page);
    await tap(page.getByRole('button', { name: 'Mirror Results', exact: true }));
    await tap(page.getByRole('button', { name: mode === 'explorer' ? 'Start My Mirror' : mode === 'yaep' ? 'Begin Assessment' : 'Take The Mirror', exact: true }));
    for (let i = 0; i < REFLECTION_PROMPTS.length; i++) {
      await tap(page.getByRole('button', { name: REFLECTION_PROMPTS[i].options[0], exact: true }));
      await tap(page.getByRole('button', { name: i === REFLECTION_PROMPTS.length - 1 ? 'Save My Check-In' : 'Next Question', exact: true }));
    }
    assert.equal((await session(page)).currentMission, null, 'check-in does not assign a mission');
    await tap(page.getByRole('button', { name: 'Choose My FINISHER Action', exact: true }));
    assert.equal(await page.getByRole('button', { name: 'Choose This Action', exact: true }).count(), 4);
    await tap(page.getByRole('button', { name: 'Choose This Action', exact: true }).first());
    assert.equal((await session(page)).currentMission.mode, mode);
    assert.equal(await page.getByRole('button', { name: 'Finish My Practice Checklist', exact: true }).isEnabled(), false);
    for (const button of await page.locator('#exposure-mission-steps button').all()) await tap(button);
    await tap(page.getByRole('button', { name: 'Finish My Practice Checklist', exact: true }));
    assert.equal((await session(page)).missionComplete, true);
    assert.equal((await session(page)).reflectionSubmitted, false, 'checklist never invents a submitted reflection');
    await layout(page);
    assert.deepEqual(errors, [], 'no uncaught page errors');
    assert.deepEqual(writes, [], 'no remote submission requests');
    results.push({ view: view.name, viewport: `${view.width}x${view.height}`, mode, touchEmulated: view.touch, status: 'PASS', checks: ['age pathway', 'illustrations', 'Show me', 'guided entry', 'draft refresh', 'choice-only save', 'home/lesson reentry', 'tab reopen', 'STEM prediction/reveal/save', 'Mirror check-in', 'age-appropriate chosen mission', 'checklist guard', 'no invented reflection', 'no remote writes', 'no horizontal overflow', 'no broken images', 'no uncaught page errors'] });
    console.log(`PASS ${view.name}/${mode}`);
    await context.close();
}
try {
  // Serial input avoids interference between emulated touch gestures.
  for (const mode of selectedModes) for (const view of views) await exercise(view, mode);
} catch (error) {
  results.push({ status: 'FAIL', error: error.stack });
  throw error;
} finally {
  await writeFile(`${out}/browser-results.json`, JSON.stringify({ testedAt: new Date().toISOString(), url, engine: await browser.version(), physicalTabletTests: 'NOT RUN', results }, null, 2));
  await browser.close();
  server?.httpServer.close();
}
