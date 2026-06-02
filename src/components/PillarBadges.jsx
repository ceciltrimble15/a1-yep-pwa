import styles from './PillarBadges.module.css';

/* F.L.A.G. — the four pillars of the YEP mindset, shown on Home. */
export const FLAG = [
  { letter: 'F', word: 'Focus', desc: 'Know what matters. Ignore the rest.' },
  { letter: 'L', word: 'Lock In', desc: 'Commit fully. Half-in is all-out.' },
  { letter: 'A', word: 'Always Forward', desc: 'Momentum over perfection.' },
  { letter: 'G', word: 'Grind', desc: 'Out-work the doubt. Every day.' },
];

export default function PillarBadges() {
  return (
    <div className={styles.grid}>
      {FLAG.map((p) => (
        <div key={p.letter} className={styles.pillar}>
          <div className={styles.badge}>{p.letter}</div>
          <div className={styles.meta}>
            <div className={styles.word}>{p.word}</div>
            <div className={styles.desc}>{p.desc}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
