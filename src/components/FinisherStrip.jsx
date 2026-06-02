import styles from './FinisherStrip.module.css';

/* The FINISHER journey. The letter earned this session lights up gold. */
export const FINISHER = [
  { letter: 'F', word: 'Focus' },
  { letter: 'I', word: 'Identity' },
  { letter: 'N', word: 'Network' },
  { letter: 'I', word: 'Innovation' },
  { letter: 'S', word: 'Strategy' },
  { letter: 'H', word: 'Hustle' },
  { letter: 'E', word: 'Execution' },
  { letter: 'R', word: 'Resilience' },
];

export default function FinisherStrip({ earnedLetter }) {
  return (
    <div className={styles.wrap}>
      <div className={styles.label}>The FINISHER Path</div>
      <div className={styles.strip}>
        {FINISHER.map((f, i) => {
          const earned = earnedLetter && f.word === earnedLetter;
          return (
            <div
              key={i}
              className={`${styles.cell} ${earned ? styles.earned : ''}`}
              title={f.word}
            >
              {f.letter}
            </div>
          );
        })}
      </div>
    </div>
  );
}
