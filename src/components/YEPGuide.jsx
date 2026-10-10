import { useEffect, useState } from 'react';
import { Volume2, ChevronRight, Eye, Square } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { MODES } from '../data/modes';
import PictureExample, { LearningPicture } from './LearningPicture';
import styles from './YEPGuide.module.css';

function GuideAvatar() {
  return (
    <svg className={styles.guideAvatarArt} viewBox="0 0 160 160" role="img" aria-label="Friendly Black YEP guide">
      <defs>
        <linearGradient id="guideBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2F7DF5" />
          <stop offset="100%" stopColor="#0B1D3A" />
        </linearGradient>
        <linearGradient id="guideHoodie" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#173E86" />
          <stop offset="100%" stopColor="#081A36" />
        </linearGradient>
      </defs>
      <circle cx="80" cy="80" r="76" fill="url(#guideBg)" />
      <circle cx="80" cy="80" r="70" fill="none" stroke="#D4A017" strokeWidth="4" opacity=".9" />
      <path d="M26 151c7-33 27-49 54-49s47 16 54 49Z" fill="url(#guideHoodie)" />
      <path d="M57 109c7 9 15 14 23 14s16-5 23-14l12 10-15 32H60l-15-32Z" fill="#123367" />
      <path d="M68 115l12 11 12-11 6 36H62Z" fill="#F7F9FF" opacity=".92" />
      <circle cx="80" cy="72" r="37" fill="#8B593C" />
      <ellipse cx="43" cy="74" rx="6" ry="10" fill="#8B593C" />
      <ellipse cx="117" cy="74" rx="6" ry="10" fill="#8B593C" />
      <path d="M43 65c1-29 16-45 38-45 23 0 38 17 39 45-9-10-22-16-39-16-16 0-29 6-38 16Z" fill="#090B10" />
      <path d="M47 48c5-16 17-27 33-28 18-1 31 10 36 29-12-7-25-10-37-10-12 0-23 3-32 9Z" fill="#050609" />
      <path d="M50 52c5-18 18-29 31-29 14 0 26 9 32 27-8-6-19-9-32-9-12 0-23 4-31 11Z" fill="#111318" opacity=".9" />
      <path d="M58 67c4-3 9-4 14-2" fill="none" stroke="#2B1710" strokeWidth="3.5" strokeLinecap="round" />
      <path d="M88 65c5-2 10-1 14 2" fill="none" stroke="#2B1710" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="66" cy="72" rx="3.5" ry="4" fill="#111827" />
      <ellipse cx="95" cy="72" rx="3.5" ry="4" fill="#111827" />
      <path d="M80 73c-2 7-3 12-1 15 2 2 5 2 8 1" fill="none" stroke="#5B3324" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M65 94c9 8 21 8 30 0" fill="none" stroke="#4A241C" strokeWidth="3" strokeLinecap="round" />
      <path d="M71 96c6 3 12 3 18 0" fill="none" stroke="#F2D4C5" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="80" cy="139" r="12" fill="#D4A017" />
      <text x="80" y="145" textAnchor="middle" fontSize="17" fontWeight="900" fill="#0B1D3A">Y</text>
      <path d="M117 78c8 4 12 11 12 20" fill="none" stroke="#D4A017" strokeWidth="4" strokeLinecap="round" />
      <circle cx="130" cy="101" r="5" fill="#D4A017" />
    </svg>
  );
}

export default function YEPGuide({ prompt, step, title = 'One step at a time', example, pictureKind, beforeOnly = false, narration = '', actionLabel, onAction, onTry, bright = false }) {
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
    <section className={`${styles.panel} ${bright ? styles.bright : ''}`} data-lane={mode} aria-label="YEP lesson guide">
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
        {showExample && <div className={styles.example} aria-label="Guide example"><span>ONE EXAMPLE</span>{pictureKind && (beforeOnly ? <LearningPicture kind={pictureKind} label="Illustrated starting challenge, before any solution is tested" /> : <PictureExample kind={pictureKind} />)}<p>{example}</p><small>Use this to understand the step. Your own idea can be different.</small></div>}
      </div>
    </section>
  );
}
