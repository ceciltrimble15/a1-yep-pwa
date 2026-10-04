import { CheckCircle2, ScanFace, Flag, Send, Users, RotateCcw } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import Shell from '../components/Shell';
import FinisherStrip from '../components/FinisherStrip';
import styles from './Progress.module.css';
import ui from '../styles/ui.module.css';

export default function Progress() {
  const { mirrorResult, missionComplete, reflectionSubmitted, finisherLetter, navigate, resetSession } =
    useYEP();

  const done = !!mirrorResult && missionComplete && reflectionSubmitted;

  const rows = [
    { name: 'Completed The Mirror', icon: ScanFace, done: !!mirrorResult },
    { name: 'Completed FINISHER Mission', icon: Flag, done: missionComplete },
    { name: 'Submitted Reflection', icon: Send, done: reflectionSubmitted },
  ];

  const completedCount = rows.filter((row) => row.done).length;

  return (
    <Shell>
      <div className={styles.complete}>
        <div className={`${styles.ring} ${done ? '' : styles.inProgressRing}`}>
          <div className={styles.ringXp}>{completedCount}</div>
          <div className={styles.ringLabel}>/ {rows.length} COMPLETE</div>
        </div>

        {done ? (
          <>
            <div className={styles.completeTag}>
              <CheckCircle2 size={16} /> Session Complete
            </div>
            <h1 className={styles.title}>
              You <em>Finished.</em>
            </h1>
            <p className={styles.sub}>
              You completed the Mirror, finished the mission, and submitted your reflection. That work is saved on this tablet.
            </p>
          </>
        ) : (
          <>
            <h1 className={styles.title}>Keep Going.</h1>
            <p className={styles.sub}>Finish the remaining real steps in your Process.</p>
          </>
        )}
      </div>

      <div className={styles.breakdown}>
        <div className={styles.bLabel}>Process Completion</div>
        {rows.map((row) => {
          const Icon = row.icon;
          return (
            <div
              key={row.name}
              className={`${styles.bRow} ${row.done ? styles.bRowDone : styles.pending}`}
            >
              <Icon className={styles.bIcon} size={18} />
              <span className={styles.bName}>{row.name}</span>
              <span className={styles.bXp}>{row.done ? 'Complete' : 'Open'}</span>
            </div>
          );
        })}
      </div>

      {finisherLetter && (
        <div className={styles.finisher}>
          <FinisherStrip earnedLetter={finisherLetter} />
        </div>
      )}

      <div className={styles.actions}>
        <button className={ui.btnPrimary} onClick={() => navigate('dashboard')}>
          <Users size={19} /> Facilitator Dashboard
        </button>
        <button className={ui.btnGhost} onClick={resetSession}>
          <RotateCcw size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} /> Start A New Session
        </button>
      </div>
    </Shell>
  );
}
