import { useEffect, useMemo, useRef, useState } from 'react';
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
    () => typeof window !== 'undefined' && !!window.speechSynthesis && typeof window.SpeechSynthesisUtterance === 'function',
    [],
  );
  const [status, setStatus] = useState('idle');
  const [rateIndex, setRateIndex] = useState(1);
  const [lastText, setLastText] = useState('');
  const [audioError, setAudioError] = useState('');

  const current = useRef(null);
  const startTimer = useRef(null);

  function cancel() {
    clearTimeout(startTimer.current);
    if (current.current) {
      current.current = null;
      window.speechSynthesis.cancel();
    }
  }

  useEffect(() => cancel, []);

  function speak(text = null) {
    if (!supported) return;
    document.dispatchEvent?.(new Event('yep-stop-narration'));
    const readable = text || getReadableText(targetRef?.current);
    if (!readable) return;
    cancel();
    window.speechSynthesis.cancel();
    setAudioError('');
    setLastText(readable);
    const utterance = new window.SpeechSynthesisUtterance(readable);
    current.current = utterance;
    utterance.rate = RATES[rateIndex];
    function finish(error) {
      if (current.current !== utterance) return;
      clearTimeout(startTimer.current);
      current.current = null;
      setStatus('idle');
      if (error && !['canceled', 'interrupted'].includes(error)) {
        setAudioError('Audio could not play. Read the screen or ask a facilitator to read with you.');
      }
    }
    utterance.onstart = () => {
      if (current.current !== utterance) return;
      clearTimeout(startTimer.current);
      setStatus('speaking');
    };
    utterance.onend = () => finish();
    utterance.onerror = event => finish(event.error);
    setStatus('pending');
    startTimer.current = setTimeout(() => {
      finish('timeout');
      window.speechSynthesis.cancel();
    }, 5000);
    try {
      window.speechSynthesis.speak(utterance);
    } catch {
      finish('unavailable');
    }
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
    cancel();
    setStatus('idle');
  }
  function changeRate() {
    const next = (rateIndex + 1) % RATES.length;
    setRateIndex(next);
    if (current.current) stop();
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
          <span>{status === 'paused' ? 'Paused' : status === 'speaking' ? 'Reading this screen' : status === 'pending' ? 'Preparing audio' : 'Hear the Process'}</span>
        </div>
      </div>
      <div className={styles.controls}>
        <button type="button" className={styles.primary} onClick={() => speak()} aria-label={label}><Play size={16} fill="currentColor" /> {label}</button>
        <button type="button" className={styles.control} onClick={togglePause} disabled={!isActive} aria-label={status === 'paused' ? 'Resume audio' : 'Pause audio'}>{status === 'paused' ? <Play size={16} /> : <Pause size={16} />} <span>{status === 'paused' ? 'Resume' : 'Pause'}</span></button>
        <button type="button" className={styles.control} onClick={replay} disabled={!lastText} aria-label="Replay audio"><RotateCcw size={16} /> <span>Replay</span></button>
        <button type="button" className={styles.control} onClick={stop} disabled={!isActive && status !== 'pending'} aria-label="Stop audio"><Square size={14} fill="currentColor" /> <span>Stop</span></button>
        <button type="button" className={styles.rate} onClick={changeRate} aria-label={`Audio speed ${RATES[rateIndex]} times. Tap to change.`}><Gauge size={16} /> {RATES[rateIndex]}x</button>
      </div>
      {audioError && <p className={styles.error} role="status">{audioError}</p>}
    </div>
  );
}
