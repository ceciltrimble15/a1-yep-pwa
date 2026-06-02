import { Trophy, ScanFace, Flag, Send, Users, RotateCcw } from 'lucide-react';
import { useYEP, XP } from '../context/YEPContext';
import Shell from '../components/Shell';
import FinisherStrip from '../components/FinisherStrip';
import styles from './Progress.module.css';
import ui from '../styles/ui.module.css';

const TOTAL = XP.MIRROR + XP.MISSION + XP.REFLECTION; // 150

export default function Progress() {
  const { xp, mirrorResult, missionComplete, reflectionSubmitted, finisherLetter, navigate, resetSession } =
    useYEP();

  const done = xp >= TOTAL;

  const rows = [
    { name: 'Completed The Mirror', xp: XP.MIRROR, icon: ScanFace, done: !!mirrorResult },
    { name: 'Completed FINISHER Mission', xp: XP.MISSION, icon: Flag, done: missionComplete },
    { name: 'Submitted Reflection', xp: XP.REFLECTION, icon: Send, done: reflectionSubmitted },
  ];

  return (
    <Shell>
      <div className={styles.complete}>
        <div className={`${styles.ring} ${done ? '' : styles.inProgressRing}`}>
          <div className={styles.ringXp}>{xp}</div>
          <div className={styles.ringLabel}>/ {TOTAL} XP</div>
        </div>

        {done ? (
          <>
            <div className={styles.completeTag}>
              <Trophy size={16} /> Session Complete
            </div>
            <h1 className={styles.title}>
              You <em>Finished.</em>
            </h1>
            <p className={styles.sub}>
              Full 150 XP. You faced the Mirror, ran the mission, and locked it in. Always Forward. Never Back.
            </p>
          </>
        ) : (
          <>
            <h1 className={styles.title}>Keep Going.</h1>
            <p className={styles.sub}>You're building momentum. Finish the loop to hit 150 XP.</p>
          </>
        )}
      </div>

      <div className={styles.breakdown}>
        <div className={styles.bLabel}>XP Earned</div>
        {rows.map((r) => {
          const Icon = r.icon;
          return (
            <div
              key={r.name}
              className={`${styles.bRow} ${r.done ? styles.bRowDone : styles.pending}`}
            >
              <Icon className={styles.bIcon} size={18} />
              <span className={styles.bName}>{r.name}</span>
              <span className={styles.bXp}>{r.done ? `+${r.xp}` : `+${r.xp}`}</span>
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
