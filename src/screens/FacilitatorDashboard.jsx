import { Check, Clock, Flag, ArrowLeft } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import Shell from '../components/Shell';
import styles from './FacilitatorDashboard.module.css';
import ui from '../styles/ui.module.css';

function StatusChip({ ok, label }) {
  return (
    <span className={`${styles.chip} ${ok ? styles.chipOk : styles.chipPending}`}>
      {ok ? <Check size={12} strokeWidth={3} /> : <Clock size={12} />} {label}
    </span>
  );
}

export default function FacilitatorDashboard() {
  const { demoYouth, navigate } = useYEP();

  const cohortXp = demoYouth.reduce((sum, y) => sum + (y.xp || 0), 0);
  const finishers = demoYouth.filter((y) => y.missionComplete && y.reflectionSubmitted).length;

  return (
    <Shell>
      <div className={styles.head}>
        <div className={styles.eyebrow}>Facilitator View</div>
        <h1 className={styles.title}>Cohort Dashboard</h1>
        <p className={styles.sub}>Live read on every youth running their process.</p>
      </div>

      <div className={styles.summary}>
        <div className={styles.stat}>
          <div className={styles.statNum}>{demoYouth.length}</div>
          <div className={styles.statLabel}>Youth</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>{finishers}</div>
          <div className={styles.statLabel}>Finishers</div>
        </div>
        <div className={styles.stat}>
          <div className={styles.statNum}>{cohortXp}</div>
          <div className={styles.statLabel}>Cohort XP</div>
        </div>
      </div>

      <div className={styles.list}>
        {demoYouth.map((y) => {
          const full = y.xp >= 150;
          const hasLetter = y.finisherLetter && y.finisherLetter !== '—';
          return (
            <div key={y.id} className={`${styles.card} ${y.isActive ? styles.active : ''}`}>
              <div className={styles.cardTop}>
                <span className={`${styles.avatar} ${y.isActive ? styles.avatarActive : ''}`}>
                  {y.name.charAt(0)}
                </span>
                <div className={styles.nameWrap}>
                  <div className={styles.name}>{y.name}</div>
                  <div className={styles.track2}>{y.track}</div>
                </div>
                {y.isActive && <span className={styles.liveTag}>Live</span>}
                <span className={`${styles.xpBadge} ${full ? styles.xpBadgeGold : ''}`}>
                  {y.xp} XP
                </span>
              </div>

              <div className={styles.grid}>
                <div className={styles.cell}>
                  <div className={styles.cLabel}>Anchor</div>
                  <div className={styles.cVal}>{y.anchor}</div>
                </div>
                <div className={styles.cell}>
                  <div className={styles.cLabel}>Edge</div>
                  <div className={styles.cVal}>{y.edge}</div>
                </div>
                <div className={styles.cell}>
                  <div className={styles.cLabel}>Style</div>
                  <div className={styles.cVal}>{y.style}</div>
                </div>
              </div>

              <div className={styles.statusRow}>
                <StatusChip ok={y.missionComplete} label="Mission" />
                <StatusChip ok={y.reflectionSubmitted} label="Reflection" />
                <span
                  className={`${styles.chip} ${hasLetter ? styles.chipLetter : styles.chipPending}`}
                >
                  <Flag size={11} /> {hasLetter ? y.finisherLetter : 'No letter yet'}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.footer}>
        <button className={ui.btnGhost} onClick={() => navigate('progress')}>
          <ArrowLeft size={16} style={{ verticalAlign: '-3px', marginRight: 6 }} /> Back To Progress
        </button>
      </div>
    </Shell>
  );
}
