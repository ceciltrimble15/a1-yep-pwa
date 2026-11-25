import test from 'node:test';
import assert from 'node:assert/strict';
import { INTERNET_AGE_LESSONS } from './internetAgeLessons.js';
import { VERIFIED_HISTORY_LESSONS } from './verifiedLessons.js';

test('modern Black American technology history complements earlier business history', () => {
  assert.equal(INTERNET_AGE_LESSONS.length, 4);
  assert.equal(new Set([...VERIFIED_HISTORY_LESSONS, ...INTERNET_AGE_LESSONS].map(lesson => lesson.id)).size, 7);
  assert.deepEqual(INTERNET_AGE_LESSONS.map(l => l.name), ['Mark Dean', 'David L. Steward', 'John W. Thompson', 'Robert F. Smith']);
});
test('each modern lesson has evidence, visual teaching scenes, a business decision and reflection', () => {
  for (const lesson of INTERNET_AGE_LESSONS) {
    assert.ok(lesson.sources.length > 0);
    assert.ok(lesson.sources.every(s => /^https:\/\//.test(s.url)));
    assert.ok(lesson.factChecks.length >= 2);
    assert.ok(lesson.scenes.length >= 2);
    assert.ok(lesson.scenes.every(s => s.narration.length >= 35 && s.question));
    assert.equal(lesson.challenge.choices.filter(c => c.correct).length, 1);
    assert.ok(lesson.challenge.choices.every(c => c.feedback));
    assert.ok(lesson.reflection.length >= 25);
  }
});
test('modern lessons do not claim an individual invented the internet', () => {
  const copy = JSON.stringify(INTERNET_AGE_LESSONS).toLowerCase();
  assert.doesNotMatch(copy, /was the inventor of the internet|invented the internet/);
});
