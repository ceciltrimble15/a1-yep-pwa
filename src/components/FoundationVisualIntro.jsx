import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Headphones, Lightbulb, PauseCircle, PlayCircle, Sparkles, Volume2 } from 'lucide-react';
import { GuideAvatar } from './YEPGuide';
import styles from './FoundationVisualIntro.module.css';

const PREVIEW_STEPS = [
  { name: 'SEE', headline: 'Notice the world', detail: 'Look around. What do you notice?', icon: '01' },
  { name: 'THINK', headline: 'Choose what matters', detail: 'What catches your attention?', icon: '02' },
  { name: 'TRY', headline: 'Make a small move', detail: 'Pick something you want to explore.', icon: '03' },
  { name: 'GROW', headline: 'Keep learning', detail: 'Your first answer is just the beginning.', icon: '04' },
];

const QUESTION_SCENES = [
  { headline: 'What interests you?', cue: 'There are lots of doors to explore.', kind: 'interest' },
  { headline: 'What is your strength?', cue: 'Everybody brings something useful.', kind: 'strength' },
  { headline: 'How do you learn?', cue: 'Your way of learning matters.', kind: 'learning' },
  { headline: 'What will you try first?', cue: 'Small steps turn into big discoveries.', kind: 'goal' },
];
const FINISHED = { headline: 'Your next adventure is ready', cue: 'Use what you discovered to take your first Quest.', kind: 'done' };

export default function FoundationVisualIntro({ step, powerName, narration, options = [] }) {
  const [preview, setPreview] = useState(0);
  const [speaking, setSpeaking] = useState(false);
  const [audioError, setAudioError] = useState('');
  const speechRef = useRef(null);
  const supported = typeof window !== 'undefined' && !!window.speechSynthesis && typeof window.SpeechSynthesisUtterance === 'function';
  const isWelcome = step < 0;
  const isDone = step >= 4;
  const state = isWelcome ? {
    headline: PREVIEW_STEPS[preview].headline,
    cue: PREVIEW_STEPS[preview].detail,
    kind: 'welcome',
  } : isDone ? FINISHED : QUESTION_SCENES[step] || QUESTION_SCENES[0];
  const name = powerName || 'Explorer';

  function stop() {
    const previous = speechRef.current;
    speechRef.current = null;
    if (previous && supported) {
      previous.onend = null;
      previous.onerror = null;
      window.speechSynthesis.cancel();
    }
    setSpeaking(false);
  }

  function hear() {
    if (!supported) return;
    if (speaking) {
      stop();
      return;
    }
    window.speechSynthesis.cancel();
    setAudioError('');
    const text = isWelcome
      ? 'Welcome to YEP, ' + name + '. ' + PREVIEW_STEPS[preview].headline + '. ' + PREVIEW_STEPS[preview].detail +
        ' Tap the numbered steps to explore. Then start your first check-in.'
      : narration + (options.length ? ' You can choose: ' + options.join('. ') + '.' : '');
    const utterance = new window.SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = .88;
    utterance.pitch = 1;
    speechRef.current = utterance;
    utterance.onend = () => { if (speechRef.current === utterance) { speechRef.current = null; setSpeaking(false); } };
    utterance.onerror = event => {
      if (speechRef.current !== utterance) return;
      speechRef.current = null;
      setSpeaking(false);
      if (!['canceled', 'interrupted'].includes(event.error)) setAudioError('This device cannot play the guide right now. You can still follow the visual steps.');
    };
    try {
      window.speechSynthesis.speak(utterance);
      setSpeaking(true);
    } catch {
      speechRef.current = null;
      setSpeaking(false);
      setAudioError('This device cannot play the guide right now. You can still follow the visual steps.');
    }
  }

  // A scene never keeps speaking after the learner moves to another question or exits.
  useEffect(() => {
    if (speechRef.current) stop();
    setAudioError('');
  }, [step, preview]);

  useEffect(() => () => {
    if (speechRef.current && supported) {
      const utterance = speechRef.current;
      speechRef.current = null;
      utterance.onend = null;
      utterance.onerror = null;
      window.speechSynthesis.cancel();
    }
  }, [supported]);

  return <section className={styles.wrap} data-speaking={speaking} data-scene={state.kind} aria-label="Interactive illustrated YEP first check-in">
    <div className={styles.stage}>
      <svg className={styles.city} viewBox="0 0 860 420" preserveAspectRatio="xMidYMid slice"
        role="img" aria-label="Illustrated city with community buildings, idea lights and a path toward the future">
        <defs>
          <linearGradient id="foundationSky" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#082554"/><stop offset=".58" stopColor="#24579a"/><stop offset="1" stopColor="#9cc8ec"/></linearGradient>
          <linearGradient id="foundationGround" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#21456f"/><stop offset="1" stopColor="#061d41"/></linearGradient>
        </defs>
        <rect width="860" height="420" fill="url(#foundationSky)"/>
        <circle className={styles.sun} cx="710" cy="75" r="115" fill="#f5c85d" opacity=".29"/>
        <g className={styles.cloud} fill="#c7e4ff" opacity=".36"><ellipse cx="155" cy="80" rx="100" ry="15"/><ellipse cx="460" cy="100" rx="75" ry="13"/></g>
        <g fill="#0a2d62" opacity=".9">
          <path d="M0 265V185h84v-45h76v125h47V115h93v150h60V166h77v99h59V105h83v160h54V145h92v120h60V172h75v93h40v155H0Z"/>
        </g>
        <g fill="#a9d6ff" opacity=".42">
          {Array.from({ length: 15 }, (_, i) => <rect key={i} x={210 + (i % 3) * 26 + (i > 8 ? 290 : 0)} y={155 + Math.floor(i / 3) * 27} width="9" height="12" rx="2"/>)}
        </g>
        <path d="M0 311Q210 284 420 319T860 310V420H0Z" fill="url(#foundationGround)"/>
        <path className={styles.pathGlow} d="M422 420Q465 350 567 337Q680 334 731 280" fill="none" stroke="#f9cf63" strokeWidth="18" strokeLinecap="round" strokeDasharray="22 14" opacity=".76"/>
        <g className={styles.sparkle} fill="#ffdf6a">
          <path d="M668 162l8 20 20 8-20 8-8 20-8-20-20-8 20-8Z"/>
          <path d="M572 46l5 12 13 5-13 5-5 13-5-13-13-5 13-5Z"/>
          <path d="M777 243l4 10 10 4-10 4-4 10-4-10-10-4 10-4Z"/>
        </g>
      </svg>
      <div className={styles.figure} aria-hidden="true"><GuideAvatar /></div>
      <div className={styles.bubble} aria-live="polite">
        <span className={styles.kicker}>{isWelcome ? 'YOUR FIRST LOOK' : isDone ? 'FINISHED CHECK-IN' : 'YOUR FIRST CHECK-IN · ' + (step + 1) + ' / 4'}</span>
        <strong>{state.headline}</strong>
        <p>{state.cue}</p>
      </div>
      <div className={styles.sceneTag}><Sparkles size={16} aria-hidden="true"/> THE PROCESS IS YOURS</div>
    </div>
    <div className={styles.controls}>
      <div className={styles.intro}>
        <span className={styles.introIcon}><Lightbulb size={22} aria-hidden="true"/></span>
        <div><strong>{isWelcome ? 'YEP starts with you.' : isDone ? 'You found your first direction.' : 'Look. Listen. Choose.'}</strong>
          <p>{isWelcome ? 'Tap each step to see how learning works.' : isDone ? 'The next step is your first real learning Quest.' : 'Look at the pictures below, then choose what fits you today.'}</p></div>
      </div>
      {isWelcome && <div className={styles.steps} role="group" aria-label="Explore how the learning process works">
        {PREVIEW_STEPS.map((item, index) => <button key={item.name} type="button" className={index === preview ? styles.stepActive : styles.step}
          aria-pressed={index === preview} onClick={() => setPreview(index)}>
          <span>{item.icon}</span><strong>{item.name}</strong>
        </button>)}
      </div>}
      <div className={styles.audioRow}>
        <button type="button" onClick={hear} disabled={!supported} className={styles.listen} aria-label={speaking ? 'Stop guide narration' : 'Hear it'}>
          {speaking ? <PauseCircle size={22} aria-hidden="true"/> : <Headphones size={22} aria-hidden="true"/>}
          {speaking ? 'Stop guide' : 'Hear it'}
        </button>
        <div className={styles.audioHint} role="status">
          <Volume2 size={17} aria-hidden="true"/>
          {audioError || (!supported ? 'Audio unavailable; use the visual steps.' : speaking ? 'Guide speaking. Tap Stop to pause.' : 'Voice plays only when you choose.')}
        </div>
      </div>
    </div>
  </section>;
}
