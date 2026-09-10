import { useEffect, useMemo, useState } from 'react';
import { Headphones, Pause, Play, RotateCcw, Square, Gauge } from 'lucide-react';
import styles from './AudioGuide.module.css';

const RATES = [0.85, 1, 1.15];

function getReadableText(target) {
  if (!target) return '';
  const clone = target.cloneNode(true);
  clone.querySelectorAll('[data-audio-skip="true"]').forEach((node) => node.remove());
  clone.querySelectorAll('script, style, noscript').forEach((node) => node.remove());
  return (clone.innerText || clone.textContent || '')
    .replace(/\s+/g, ' ')
    .replace(/→/g, ', then ')
    .replace(/·/g, ', ')
    .trim();
}

export default function AudioGuide({ targetRef, label = 'Listen To This Screen' }) {
  const supported = useMemo(
    () => typeof window !== 'undefined' && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window,
    [],
  );
  const [status, setStatus] = useState('idle');
  const [rateIndex, setRateIndex] = useState(1);
  const [lastText, setLastText] = useState('');

  useEffect(() => () => {
    if (supported) window.speechSynthesis.cancel();
  }, [supported]);

  function speak(text = null) {
    if (!supported) return;
    const readable = text || getReadableText(targetRef?.current);
    if (!readable) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(readable);
    utterance.rate = RATES[rateIndex];
    utterance.pitch = 1;
    utterance.volume = 1;
    utterance.onstart = () => setStatus('speaking');
    utterance.onend = () => setStatus('idle');
    utterance.onerror = () => setStatus('idle');
    setLastText(readable);
    window.speechSynthesis.speak(utterance);
  }

  function togglePause() {
    if (!supported) return;
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setStatus('speaking');
      return;
    }
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.pause();
      setStatus('paused');
    }
  }

  function replay() { speak(lastText || null); }
  function stop() {
    if (!supported) return;
    window.speechSynthesis.cancel();
    setStatus('idle');
  }
  function changeRate() {
    const next = (rateIndex + 1) % RATES.length;
    setRateIndex(next);
    if (window.speechSynthesis?.speaking || window.speechSynthesis?.paused) {
      window.speechSynthesis.cancel();
      setStatus('idle');
    }
  }

  if (!supported) {
    return <div className={styles.unsupported} data-audio-skip="true" role="status"><Headphones size={17} /> Audio read-aloud is not available in this browser.</div>;
  }

  const isActive = status === 'speaking' || status === 'paused';

  return (
    <div className={styles.guide} data-audio-skip="true" aria-label="Audio guide controls">
      <div className={styles.identity}>
        <span className={styles.iconWrap}><Headphones size={19} /></span>
        <div>
          <strong>A/1 AUDIO GUIDE</strong>
          <span>{status === 'paused' ? 'Paused' : status === 'speaking' ? 'Reading this screen' : 'Hear the Process'}</span>
        </div>
      </div>
      <div className={styles.controls}>
        <button type="button" className={styles.primary} onClick={() => speak()} aria-label={label}><Play size={16} fill="currentColor" /> {label}</button>
        <button type="button" className={styles.control} onClick={togglePause} disabled={!isActive} aria-label={status === 'paused' ? 'Resume audio' : 'Pause audio'}>{status === 'paused' ? <Play size={16} /> : <Pause size={16} />} <span>{status === 'paused' ? 'Resume' : 'Pause'}</span></button>
        <button type="button" className={styles.control} onClick={replay} disabled={!lastText} aria-label="Replay audio"><RotateCcw size={16} /> <span>Replay</span></button>
        <button type="button" className={styles.control} onClick={stop} disabled={!isActive} aria-label="Stop audio"><Square size={14} fill="currentColor" /> <span>Stop</span></button>
        <button type="button" className={styles.rate} onClick={changeRate} aria-label={`Audio speed ${RATES[rateIndex]} times. Tap to change.`}><Gauge size={16} /> {RATES[rateIndex]}x</button>
      </div>
    </div>
  );
}
