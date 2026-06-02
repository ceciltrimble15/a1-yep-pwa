import { Compass, Zap } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import styles from './GlobalBar.module.css';

/* Persistent status: active track + live XP. */
export default function GlobalBar() {
  const { track, xp } = useYEP();
  return (
    <div className={styles.bar}>
      <div className={styles.track}>
        <Compass className={styles.icon} size={16} />
        <span className={styles.trackLabel}>{track ? track.name : 'No track yet'}</span>
      </div>
      <div className={styles.spacer} />
      <div className={styles.xp}>
        <Zap size={14} color="#2979FF" fill="#2979FF" />
        <span className={styles.xpVal}>{xp}</span>
        <span className={styles.xpLabel}>XP</span>
      </div>
    </div>
  );
}
