import { Compass, ShieldCheck } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import styles from './GlobalBar.module.css';

/* Persistent status: active track + privacy access. */
export default function GlobalBar() {
  const { track, navigate } = useYEP();
  return (
    <div className={styles.bar}>
      <div className={styles.track}>
        <Compass className={styles.icon} size={16} />
        <span className={styles.trackLabel}>{track ? track.name : 'No track yet'}</span>
      </div>
      <div className={styles.spacer} />
      <button className={styles.privacy} type="button" onClick={() => navigate('privacySafeguards')} aria-label="Open A/1 privacy and safeguards">
        <ShieldCheck size={14} />
        <span>Privacy</span>
      </button>
    </div>
  );
}
