import { useEffect, useState } from 'react';
import { Volume2, Square, BookOpenText } from 'lucide-react';
import VisualTeachingScene from './VisualTeachingScene';
import { getVisualVocabulary } from '../data/visualVocabulary';
import styles from './VisualVocabulary.module.css';

// One strong word, plain definition, image and memorable rhythm per core learning lane.
// No voice capture, invented achievements, database writes or new learning progression.
export default function VisualVocabulary({ mode, screen }) {
  const card = getVisualVocabulary(mode, screen);
  const [speaking, setSpeaking] = useState(false);
  const [audioError, setAudioError] = useState('');
  const supported = typeof window !== 'undefined'
    && 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;

  useEffect(() => {
    setSpeaking(false);
    setAudioError('');
    return () => {
      // Only cancel narration initiated by this card, not other app audio.
      if (typeof window !== 'undefined' && window.speechSynthesis?.speaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [mode, screen]);

  if (!card) return null;

  function speak() {
    if (!supported) return;
    if (speaking) {
      window.speechSynthesis.cancel();
      setSpeaking(false);
      return;
    }
    window.speechSynthesis.cancel();
    setAudioError('');
    const utterance = new window.SpeechSynthesisUtterance(
      `${card.word}. It means: ${card.meaning} ${card.beat} For example: ${card.example}`
    );
    utterance.rate = mode === 'explorer' ? 0.82 : 0.94;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = (event) => {
      setSpeaking(false);
      if (!['canceled', 'interrupted'].includes(event.error)) {
        setAudioError('Read the word and the rhythm above if audio is unavailable.');
      }
    };
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  }

  return (
    <section className={styles.card} data-lane={mode} aria-label="YEP visual vocabulary moment">
      <div className={styles.titleRow}>
        <span className={styles.kicker}><BookOpenText size={19} aria-hidden="true" /> YEP WORD + RHYTHM</span>
        <span className={styles.readTag}>LOOK · SAY · UNDERSTAND</span>
      </div>
      <div className={styles.lesson}>
        <div className={styles.definition}>
          <h2 className={styles.word}>{card.word}<span className={styles.equals} aria-hidden="true"> = </span></h2>
          <p className={styles.meaning}>{card.meaning}</p>
          <p className={styles.sample}><strong>For example:</strong> {card.example}</p>
        </div>
        <div className={styles.picture}>
          <VisualTeachingScene kind={card.picture} label={`Illustrated example for the word ${card.word}`} />
        </div>
      </div>
      <div className={styles.rhythm}>
        <div>
          <span className={styles.beatLabel}>SAY IT WITH A BEAT</span>
          <p>{card.beat}</p>
        </div>
        {supported && <button className={styles.listen} type="button" onClick={speak}
          aria-label={speaking ? 'Stop vocabulary audio' : `Hear the word ${card.word}, its meaning, and the rhythm`}>
          {speaking ? <Square size={20} aria-hidden="true" /> : <Volume2 size={22} aria-hidden="true" />}
          {speaking ? 'Stop word audio' : 'Hear this word'}
        </button>}
      </div>
      {!supported && <p className={styles.support}>Read aloud together: audio is not supported in this browser.</p>}
      {audioError && <p className={styles.support} role="status">{audioError}</p>}
    </section>
  );
}
