import assert from 'node:assert/strict';
import { mkdir, writeFile } from 'node:fs/promises';
import { chromium } from 'playwright';
import { preview } from 'vite';

const out = process.env.YEP_QA_OUTPUT || 'qa-output';
await mkdir(out, { recursive: true });
const server = process.env.YEP_TEST_URL ? null : await preview({ preview: { host: '127.0.0.1', port: 5183, strictPort: true } });
const url = process.env.YEP_TEST_URL || 'http://127.0.0.1:5183';
const browser = await chromium.launch({ ...(process.env.CHROMIUM_EXECUTABLE_PATH ? { executablePath: process.env.CHROMIUM_EXECUTABLE_PATH } : {}), args: process.env.CHROMIUM_EXECUTABLE_PATH ? ['--disable-dev-shm-usage', '--use-gl=angle', '--use-angle=swiftshader'] : [] });
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
  // Measure inherited card copy against both ends of each rendered gradient.
  const luminance = rgb => rgb.map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4).reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
  const rgb = color => color.match(/[\d.]+/g).slice(0, 3).map(Number);
  const ratios = [];
  for (const [width, height] of [[1366, 900], [390, 844], [768, 1024], [1024, 768]]) {
    const c = await browser.newContext({ viewport: { width, height } });
    const p = await open(c);
    await p.getByRole('button', { name: 'Program Home', exact: true }).click();
    await p.locator('img').evaluateAll(images => Promise.all(images.map(image => image.decode())));
    const cards = await p.locator('[aria-label="The four YEP learning lanes"] > button').evaluateAll(cards => cards.map(card => ({
      kind: card.dataset.kind, gradient: getComputedStyle(card).backgroundImage,
      copy: getComputedStyle(card.querySelector('[class*="laneTagline"]')).color,
      action: getComputedStyle(card.querySelector('[class*="laneBottom"]')).color,
    })));
    for (const card of cards) for (const color of [card.copy, card.action]) for (const stop of card.gradient.match(/rgb\([^)]+\)/g)) {
      const [low, high] = [luminance(rgb(color)), luminance(rgb(stop))].sort((a, b) => a - b);
      const ratio = (high + .05) / (low + .05);
      assert.ok(ratio >= 4.5, `${card.kind} card copy contrast ${ratio.toFixed(2)} below 4.5`);
      ratios.push({ viewport: `${width}x${height}`, card: card.kind, ratio: Number(ratio.toFixed(2)) });
    }
    await p.screenshot({ path: `${out}/contrast-${width}-home.png`, fullPage: true, animations: 'disabled', timeout: 30000 });
    await c.close();
  }
  results.push({ check: 'home card copy and actions contrast against gradient endpoints at four viewports', status: 'PASS', minimumRatio: Math.min(...ratios.map(r => r.ratio)), measurements: ratios });

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
  console.log(JSON.stringify(results.map(({ measurements, ...summary }) => summary), null, 2));
} finally {
  await writeFile(`${out}/resilience-results.json`, JSON.stringify(results, null, 2));
  await browser.close(); server?.httpServer.close();
}
