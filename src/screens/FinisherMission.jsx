import { useState } from 'react';
import { Check, Flag, ArrowRight } from 'lucide-react';
import { useYEP, XP } from '../context/YEPContext';
import Shell from '../components/Shell';
import styles from './FinisherMission.module.css';
import ui from '../styles/ui.module.css';

export default function FinisherMission() {
  const { currentMission, completeMission } = useYEP();
  const [done, setDone] = useState({});

  if (!currentMission) {
    return (
      <Shell>
        <p style={{ color: 'var(--silver)' }}>No mission assigned. Complete the Mirror first.</p>
      </Shell>
    );
  }

  const m = currentMission;
  const allDone = m.steps.every((_, i) => done[i]);

  function toggle(i) {
    setDone((d) => ({ ...d, [i]: !d[i] }));
  }

  return (
    <Shell>
      <div className={styles.eyebrow}>FINISHER Mission</div>
      <h1 className={styles.title}>{m.title}</h1>
      <p className={styles.objective}>{m.objective}</p>

      <div className={styles.letterTag}>
        <span className={styles.letterBadge}>{m.finisherLetter[0]}</span>
        <span className={styles.letterText}>Unlocks: {m.finisherLetter}</span>
      </div>

      <div className={styles.approach}>
        <div className={styles.approachLabel}>Your {m.style} Approach</div>
        <div className={styles.approachText}>{m.activeApproach}</div>
      </div>

      <div className={styles.stepsLabel}>Mission Steps</div>
      <div className={styles.steps}>
        {m.steps.map((step, i) => {
          const isDone = !!done[i];
          return (
            <button
              key={i}
              className={`${styles.step} ${isDone ? styles.stepDone : ''}`}
              onClick={() => toggle(i)}
            >
              <span className={`${styles.check} ${isDone ? styles.checkDone : ''}`}>
                {isDone && <Check size={15} strokeWidth={3} />}
              </span>
              <span className={styles.stepText}>{step}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.focus}>
        <div className={styles.focusLabel}>Focus</div>
        <div className={styles.focusText}>{m.focus}</div>
      </div>

      <div className={styles.cta}>
        <button className={ui.btnPrimary} onClick={completeMission} disabled={!allDone}>
          <Flag size={19} /> Mark Mission Complete · +{XP.MISSION} XP <ArrowRight size={19} />
        </button>
      </div>
    </Shell>
  );
}
