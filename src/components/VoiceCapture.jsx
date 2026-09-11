import { useEffect, useMemo, useRef, useState } from 'react';
import { CheckCircle2, Mic, MicOff, RotateCcw, ShieldCheck } from 'lucide-react';
import styles from './VoiceCapture.module.css';

function recognitionConstructor() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

function cleanTranscript(text = '') {
  return text.replace(/\s+/g, ' ').trim();
}

export default function VoiceCapture({
  prompt,
  onConfirm,
  currentValue = '',
  buttonLabel = 'Talk To YEP',
  confirmLabel = 'Use This Answer',
}) {
  const SpeechRecognition = useMemo(() => recognitionConstructor(), []);
  const recognitionRef = useRef(null);
  const finalTextRef = useRef('');
  const [status, setStatus] = useState('idle');
  const [draft, setDraft] = useState('');
  const [error, setError] = useState('');

  const supported = !!SpeechRecognition;
  const listening = status === 'listening';

  useEffect(() => () => {
    try {
      recognitionRef.current?.abort();
    } catch {
      // Browser may already have released the microphone.
    }
  }, []);

  function startListening() {
    if (!supported || listening) return;

    if ('speechSynthesis' in window) window.speechSynthesis.cancel();

    setError('');
    setDraft('');
    finalTextRef.current = '';

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;
    recognitionRef.current = recognition;

    recognition.onstart = () => setStatus('listening');
    recognition.onresult = (event) => {
      let interim = '';
      let finalText = finalTextRef.current;

      for (let i = event.resultIndex; i < event.results.length; i += 1) {
        const text = event.results[i][0]?.transcript || '';
        if (event.results[i].isFinal) finalText += ` ${text}`;
        else interim += ` ${text}`;
      }

      finalTextRef.current = cleanTranscript(finalText);
      setDraft(cleanTranscript(`${finalTextRef.current} ${interim}`));
    };
    recognition.onerror = (event) => {
      const message = event.error === 'not-allowed'
        ? 'Microphone permission is off. Allow microphone access in Chrome, then try again.'
        : event.error === 'no-speech'
          ? 'I did not hear a clear answer. Tap Try Again and speak toward the tablet.'
          : 'Voice capture stopped. Try again or type your answer.';
      setError(message);
      setStatus('idle');
    };
    recognition.onend = () => setStatus('idle');

    try {
      recognition.start();
    } catch {
      setStatus('idle');
      setError('Voice capture could not start. Try again or type your answer.');
    }
  }

  function stopListening() {
    try {
      recognitionRef.current?.stop();
    } catch {
      // Ignore duplicate stop calls.
    }
    setStatus('idle');
  }

  function tryAgain() {
    stopListening();
    finalTextRef.current = '';
    setDraft('');
    setError('');
  }

  function confirm() {
    const answer = cleanTranscript(draft);
    if (!answer) return;
    onConfirm(answer);
    setStatus('confirmed');
  }

  if (!supported) {
    return (
      <div className={styles.unsupported} data-audio-skip="true" role="status">
        <MicOff size={17} /> Talk to YEP is not available in this browser. You can still type your answer.
      </div>
    );
  }

  return (
    <section className={styles.voice} data-audio-skip="true" aria-label="Talk to YEP voice input">
      <div className={styles.topline}>
        <div className={styles.identity}>
          <span className={`${styles.micMark} ${listening ? styles.live : ''}`}><Mic size={19} /></span>
          <div>
            <strong>YEP VOICE</strong>
            <span>Hear it. Say it. See it. Do it.</span>
          </div>
        </div>
        <span className={styles.demoBadge}>V0.5 VOICE</span>
      </div>

      {prompt && <p className={styles.prompt}><strong>YEP asks:</strong> {prompt}</p>}
      <p className={styles.instruction}>
        {listening
          ? 'Listening now. Say your answer naturally.'
          : 'Tap the microphone, speak your answer, then check the words before you use them.'}
      </p>

      <div className={`${styles.transcript} ${draft ? styles.hasText : ''}`} aria-live="polite">
        {draft || (currentValue ? 'Your current typed answer stays in the box above until you confirm a new voice answer.' : 'Your words will appear here before anything is saved.')}
      </div>

      {error && <div className={styles.error}>{error}</div>}

      <div className={styles.controls}>
        {!listening ? (
          <button type="button" className={styles.talk} onClick={startListening}>
            <Mic size={18} /> {buttonLabel}
          </button>
        ) : (
          <button type="button" className={styles.stop} onClick={stopListening}>
            <MicOff size={18} /> Stop Listening
          </button>
        )}
        <button type="button" className={styles.secondary} onClick={tryAgain} disabled={!draft && !error}>
          <RotateCcw size={17} /> Try Again
        </button>
        <button type="button" className={styles.confirm} onClick={confirm} disabled={!draft.trim() || listening}>
          <CheckCircle2 size={17} /> {confirmLabel}
        </button>
      </div>

      <div className={styles.privacy}>
        <ShieldCheck size={15} />
        <span><strong>Demo privacy:</strong> the app does not save an audio recording. Your browser/device may process speech to create the transcript. Use sample or non-sensitive information only. Only confirmed text moves into the YEP response field.</span>
      </div>
    </section>
  );
}
