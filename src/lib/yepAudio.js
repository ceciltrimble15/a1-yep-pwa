const MODE_AUDIO = {
  explorer: { rate: 0.84, pitch: 1.04 },
  builder: { rate: 0.9, pitch: 1.01 },
  leader: { rate: 0.96, pitch: 1.0 },
  yaep: { rate: 1.0, pitch: 0.98 },
};

const VOICE_HINTS = [
  'samantha',
  'jenny',
  'aria',
  'ava',
  'google us english',
  'microsoft',
  'english united states',
];

export function getAudioProfile(mode) {
  return MODE_AUDIO[mode] || MODE_AUDIO.builder;
}

export function chooseGuideVoice(voices = []) {
  if (!Array.isArray(voices) || !voices.length) return null;
  const english = voices.filter((voice) => /^en([-_]|$)/i.test(voice.lang || ''));
  const pool = english.length ? english : voices;
  return pool
    .map((voice) => {
      const name = String(voice.name || '').toLowerCase();
      const lang = String(voice.lang || '').toLowerCase();
      let score = lang.startsWith('en-us') ? 20 : lang.startsWith('en') ? 10 : 0;
      const hintIndex = VOICE_HINTS.findIndex((hint) => name.includes(hint));
      if (hintIndex >= 0) score += 12 - hintIndex;
      if (voice.localService) score += 2;
      return { voice, score };
    })
    .sort((a, b) => b.score - a.score)[0]?.voice || pool[0] || null;
}

export function chunkSpeech(text, maxChars = 185) {
  const cleaned = String(text || '').replace(/\s+/g, ' ').trim();
  if (!cleaned) return [];
  const sentences = cleaned.match(/[^.!?]+[.!?]+|[^.!?]+$/g) || [cleaned];
  const chunks = [];
  let current = '';

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    const next = current ? current + ' ' + trimmed : trimmed;
    if (next.length <= maxChars) {
      current = next;
      continue;
    }
    if (current) chunks.push(current);
    current = trimmed;
  }
  if (current) chunks.push(current);
  return chunks;
}

// Audio is a teaching script, not a dump of everything printed on screen.
// Each pathway keeps its own level; do not silently make adult lessons childish.
export function buildGuideAudioClips({ teacher, prompt, narration, question, example, includeExample, mode = 'builder' }) {
  const teachText = teacher?.speech || prompt || '';
  const questionText = teacher?.question || question || '';
  const clips = [];

  if (teachText) {
    // A separate authored narrator line may be needed, but reading both a
    // teacher script and a nearly identical screen narration creates long,
    // repetitive audio for younger learners.
    const extra = narration && narration.trim() !== teachText.trim() ? narration.trim() : '';
    const lessonText = mode === 'explorer'
      ? teachText
      : extra ? teachText + ' ' + extra : teachText;
    clips.push({
      id: 'teach',
      label: 'Lesson',
      text: lessonText,
    });
  }
  if (questionText) {
    clips.push({
      id: 'question',
      label: 'Your turn',
      text: questionText,
    });
  }
  if (includeExample && example) {
    clips.push({
      id: 'example',
      label: 'Example',
      text: 'Here is one example. ' + example + ' Your own idea can be different.',
    });
  }
  return clips;
}
