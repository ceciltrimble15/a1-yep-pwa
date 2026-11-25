import test from 'node:test';
import assert from 'node:assert/strict';
import { VERIFIED_HISTORY_LESSONS, reviewHistoryAnswer, getVerifiedHistoryLesson, HISTORY_AGE_REQUIREMENTS } from './verifiedLessons.js';

test('three history lessons have unique identifiers and documented sources', () => {
  assert.equal(VERIFIED_HISTORY_LESSONS.length, 3);
  assert.equal(new Set(VERIFIED_HISTORY_LESSONS.map(l => l.id)).size, 3);
  assert.deepEqual(VERIFIED_HISTORY_LESSONS.map(l => l.name), ['James Forten', 'Paul Cuffe', 'Garrett Morgan']);
  VERIFIED_HISTORY_LESSONS.forEach(lesson => {
    assert.ok(lesson.sources.length >= 1);
    assert.ok(lesson.sources.every(s => s.url.startsWith('https://')));
    assert.ok(lesson.factChecks.length >= 2);
    assert.equal(lesson.scenes.length, 2);
    assert.ok(lesson.scenes.every(s => s.narration.length > 30));
    assert.ok(lesson.challenge.choices.some(c => c.correct));
    assert.equal(lesson.challenge.choices.filter(c => c.correct).length, 1);
    assert.ok(lesson.challenge.choices.every(c => c.feedback?.length > 12));
    assert.ok(lesson.reflection.length >= 25);
  });
});
test('choices return evidence-based feedback and reject unknown choices', () => {
  const first = VERIFIED_HISTORY_LESSONS[0];
  const correct = first.challenge.choices.find(c => c.correct);
  const wrong = first.challenge.choices.find(c => !c.correct);
  assert.equal(reviewHistoryAnswer(first.id, correct.id).correct, true);
  assert.equal(reviewHistoryAnswer(first.id, wrong.id).correct, false);
  assert.throws(() => reviewHistoryAnswer(first.id, 'not-real'));
  assert.throws(() => reviewHistoryAnswer('not-real', correct.id));
});
test('age progression stays explicit and lessons do not misstate firsts', () => {
  assert.deepEqual(Object.keys(HISTORY_AGE_REQUIREMENTS), ['7-10','11-13','14-17','18-24']);
  assert.equal(getVerifiedHistoryLesson('morgan-patent')?.name, 'Garrett Morgan');
  assert.equal(getVerifiedHistoryLesson('missing'), null);
  const text = JSON.stringify(VERIFIED_HISTORY_LESSONS).toLowerCase();
  assert.doesNotMatch(text, /first black business owner|invented the first traffic light/);
});
