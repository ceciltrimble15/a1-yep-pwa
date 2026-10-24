import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { preview } from 'vite';

const out = process.env.YEP_QA_OUTPUT || 'qa-output';
await mkdir(out, { recursive: true });
const server = process.env.YEP_TEST_URL ? null : await preview({ preview: { host: '127.0.0.1', port: 5183, strictPort: true } });
const url = process.env.YEP_TEST_URL || 'http://127.0.0.1:5183';
const browser = await chromium.launch({ ...(process.env.CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH } : {}), args: ['--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader'] });
const results = [];
async function open(context) {
  const page = await context.newPage(); page.setDefaultTimeout(8000);
  await page.goto(url, { waitUntil: 'domcontentloaded' });
  await page.getByRole('checkbox').check();
  await page.locator('#powerName').fill('Demo Comet');
  await page.getByRole('button', { name: /Build & Sell/ }).click();
  await page.getByRole('button', { name: 'Enter The Process', exact: true }).click();
  await page.getByRole('button', { name: 'Mirror Results', exact: true }).click();
  return page;
}
try {
  // Real browser speech API: record visible failure/active state, never claim audible output.
  let context = await browser.newContext(); let page = await open(context);
  await page.getByRole('button', { name: 'Listen To This Screen', exact: true }).click();
  await page.waitForFunction(() => document.body.innerText.includes('Audio could not play') || document.body.innerText.includes('Reading this screen'));
  results.push({ check: 'real browser speech API', observed: await page.locator('[aria-label="Audio guide controls"]').innerText(), audiblePlayback: 'NOT VERIFIED' });
  await context.close();

  // Deterministic API double covers control wiring, not the device speech engine.
  context = await browser.newContext();
  await context.addInitScript(() => {
    window.SpeechSynthesisUtterance = class { constructor(text) { this.text = text; } };
    Object.defineProperty(window, 'speechSynthesis', { configurable: true, value: {
      speaking: false, paused: false, calls: [], last: null,
      speak(utterance) { this.last = utterance; this.calls.push({ text: utterance.text, rate: utterance.rate }); this.speaking = true; utterance.onstart?.(); },
      cancel() { this.speaking = false; this.paused = false; this.last?.onerror?.({ error: 'canceled' }); },
      pause() { this.paused = true; }, resume() { this.paused = false; },
    } });
  });
  page = await open(context);
  await page.getByRole('button', { name: 'Listen To This Screen', exact: true }).click();
  await page.getByRole('button', { name: 'Pause audio', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Resume audio', exact: true }).isEnabled(), true);
  await page.getByRole('button', { name: 'Resume audio', exact: true }).click();
  await page.getByRole('button', { name: 'Replay audio', exact: true }).click();
  assert.equal(await page.evaluate(() => speechSynthesis.calls.length), 2);
  await page.getByRole('button', { name: 'Stop audio', exact: true }).click();
  assert.equal(await page.getByRole('button', { name: 'Stop audio', exact: true }).isEnabled(), false);
  await page.getByRole('button', { name: /Audio speed 1 times/ }).click();
  await page.getByRole('button', { name: 'Replay audio', exact: true }).click();
  assert.equal(await page.evaluate(() => speechSynthesis.last.rate), 1.15);
  await page.evaluate(() => speechSynthesis.last.onerror({ error: 'synthesis-unavailable' }));
  await page.getByRole('status').filter({ hasText: 'Audio could not play' }).waitFor();
  await page.getByRole('button', { name: 'Listen To This Screen', exact: true }).click();
  await page.getByRole('button', { name: 'Program Home', exact: true }).click();
  assert.equal(await page.evaluate(() => speechSynthesis.speaking), false, 'navigation stops screen audio');
  await page.getByRole('button', { name: 'Daily Quest', exact: true }).click();
  await page.getByRole('button', { name: 'Hear it', exact: true }).click();
  await page.getByRole('button', { name: 'Stop lesson audio', exact: true }).click();
  await page.getByRole('button', { name: /Hear the word/ }).click();
  await page.getByRole('button', { name: 'Stop vocabulary audio', exact: true }).click();
  results.push({ check: 'audio play/pause/resume/replay/stop/speed, lesson and vocabulary controls, error fallback, cancellation on navigation', status: 'PASS', method: 'browser with deterministic speech API double; not audible playback' });
  await context.close();

  context = await browser.newContext();
  await context.addInitScript(() => { Object.defineProperty(window, 'speechSynthesis', { value: undefined }); delete window.speechSynthesis; });
  page = await open(context);
  await page.getByRole('status').filter({ hasText: 'not available in this browser' }).waitFor();
  results.push({ check: 'unsupported speech fallback', status: 'PASS' });
  await context.close();

  context = await browser.newContext();
  await context.addInitScript(() => { Storage.prototype.setItem = function () { throw new DOMException('Test storage unavailable', 'QuotaExceededError'); }; });
  page = await open(context);
  await page.getByRole('alert').filter({ hasText: 'could not save your latest work' }).waitFor();
  results.push({ check: 'storage quota/blocked write warning', status: 'PASS' });
  await context.close();

  context = await browser.newContext(); page = await open(context);
  await page.getByRole('button', { name: 'FINISHER Mission', exact: true }).click();
  await page.getByRole('button', { name: 'Choose This Action', exact: true }).first().click();
  await page.locator('#exposure-mission-steps button').first().click();
  await page.waitForFunction(() => JSON.parse(localStorage.getItem('yep_session_v1')).missionStepsDone[0]);
  const chosenId = await page.evaluate(() => JSON.parse(localStorage.getItem('yep_session_v1')).currentMission.id);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => !!document.querySelector('#exposure-mission-steps'));
  assert.equal(await page.evaluate(() => JSON.parse(localStorage.getItem('yep_session_v1')).currentMission.id), chosenId);
  assert.equal(await page.locator('#exposure-mission-steps button').first().getAttribute('aria-pressed'), 'true');
  results.push({ check: 'chosen FINISHER action and checklist survive refresh before Mirror', status: 'PASS' });
  await context.close();

  context = await browser.newContext(); page = await open(context);
  await page.evaluate(async () => { await navigator.serviceWorker.ready; });
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => !!navigator.serviceWorker.controller);
  await context.setOffline(true);
  await page.reload({ waitUntil: 'domcontentloaded' });
  assert.equal(await page.getByRole('heading', { name: 'Check Your Growth', exact: true }).count(), 1);
  await page.getByRole('button', { name: 'Program Home', exact: true }).click();
  assert.equal(await page.locator('[aria-label="The four YEP learning lanes"] > button').count(), 4);
  results.push({ check: 'warm cached offline reload and home navigation', status: 'PASS', limitation: 'first visit requires a connection; physical offline/audio acceptance pending' });
  await context.close();
  console.log(JSON.stringify(results, null, 2));
} finally {
  await writeFile(`${out}/resilience-results.json`, JSON.stringify(results, null, 2));
  await browser.close(); server?.httpServer.close();
}
