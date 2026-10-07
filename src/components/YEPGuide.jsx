import { useEffect, useState } from 'react';
import { Volume2, ChevronRight, Eye, Square } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { MODES } from '../data/modes';
import PictureExample from './LearningPicture';
import styles from './YEPGuide.module.css';

function GuideAvatar() {
  return (
    <svg className={styles.guideAvatarArt} viewBox="0 0 120 120" role="img" aria-label="YEP guide avatar">
      <circle cx="60" cy="60" r="56" fill="#0F2460" />
      <path d="M24 103c8-21 22-31 36-31s28 10 36 31" fill="#2A4EAF" />
      <circle cx="60" cy="52" r="28" fill="#70462F" />
      <path d="M33 47c2-18 13-29 28-29 16 0 28 10 29 28-7-7-18-12-29-12-11 0-21 4-28 13Z" fill="#111827" />
      <path d="M36 39c6-13 14-20 25-20 13 0 23 8 27 22-8-6-17-9-27-9-9 0-18 2-25 7Z" fill="#05070B" />
      <circle cx="50" cy="53" r="2.5" fill="#111827" />
      <circle cx="70" cy="53" r="2.5" fill="#111827" />
      <path d="M52 66c5 4 11 4 16 0" fill="none" stroke="#2B1710" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M41 88c12 8 26 8 38 0" fill="none" stroke="#D4A017" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

export default function YEPGuide({ prompt, step, title = 'One step at a time', example, pictureKind, narration = '', actionLabel, onAction, onTry }) {
  const { mode } = useYEP();
  const program = MODES[mode] || MODES.builder;
  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
  const [audioError, setAudioError] = useState('');
  const [showExample, setShowExample] = useState(false);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    setAudioError('');
    setShowExample(false);
    setSpeaking(false);
    return () => { if (supported) window.speechSynthesis.cancel(); };
  }, [prompt, supported]);

  function hearGuide() {
    if (!supported) return;
    if (speaking) { window.speechSynthesis.cancel(); setSpeaking(false); return; }
    setAudioError('');
    window.speechSynthesis.cancel();
    const explanation = `${prompt} ${narration} ${showExample && example ? `Here is one example. ${example} Your own idea can be different.` : ''}`;
    const utterance = new window.SpeechSynthesisUtterance(explanation);
    utterance.rate = mode === 'explorer' ? 0.85 : 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (event) => {
      setSpeaking(false);
      if (!['canceled', 'interrupted'].includes(event.error)) setAudioError('Audio could not play. Read the guide above and keep going.');
    };
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <section className={styles.panel} data-lane={mode} aria-label="YEP lesson guide">
      <div className={styles.identity}>
        <GuideAvatar />
        <div><span>YOUR YEP GUIDE</span><strong>{program.tier}</strong><small>Step {step}</small></div>
      </div>
      <div className={styles.teaching}>
        <h2>{title}</h2>
        <p className={styles.prompt} aria-live="polite">{prompt}</p>
        <div className={styles.actions}>
          {example && <button type="button" className={styles.explain} aria-expanded={showExample} onClick={() => setShowExample(!showExample)}><Eye size={23} aria-hidden="true" />{showExample ? 'Hide example' : 'Show me'}</button>}
          {supported && <button type="button" className={styles.explain} onClick={hearGuide}>{speaking ? <Square size={22} aria-hidden="true" /> : <Volume2 size={23} aria-hidden="true" />}{speaking ? 'Stop audio' : 'Hear it'}</button>}
          {(onAction || onTry) && <button type="button" className={styles.try} onClick={onAction || onTry}>{actionLabel || 'Try it'}<ChevronRight size={24} aria-hidden="true" /></button>}
        </div>
        {!supported && <p className={styles.hint}>Read-aloud is unavailable here. The guide text and examples still work.</p>}
        {audioError && <p className={styles.hint} role="status">{audioError}</p>}
        {showExample && <div className={styles.example} aria-label="Guide example"><span>ONE EXAMPLE</span>{pictureKind && <PictureExample kind={pictureKind} />}<p>{example}</p><small>Use this to understand the step. Your own idea can be different.</small></div>}
      </div>
    </section>
  );
}
