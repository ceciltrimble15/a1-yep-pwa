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
  const earnedCount = FINISHER.filter((f) => earnedLetter && f.word === earnedLetter).length;
  return (
    <div className={styles.wrap}>
      <div className={styles.head}>
        <span className={styles.label}>The FINISHER Path</span>
        <span className={styles.count}>
          {earnedCount} of {FINISHER.length} — Your Journey Starts Here
        </span>
      </div>
      <div className={styles.strip}>
        {FINISHER.map((f, i) => {
          const earned = earnedLetter && f.word === earnedLetter;
          return (
            <div
              key={i}
              className={`${styles.cell} ${earned ? styles.earned : styles.future}`}
              title={earned ? f.word : `${f.word} — still ahead`}
            >
              {f.letter}
            </div>
          );
        })}
      </div>
      <p className={styles.note}>
        Every mission unlocks the next letter. The rest of the path is{' '}
        <strong>still ahead of you</strong>.
      </p>
    </div>
  );
}
