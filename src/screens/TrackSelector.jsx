import { useState } from 'react';
import { Hammer, Megaphone, LineChart, ArrowRight, Check } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import styles from './TrackSelector.module.css';
import ui from '../styles/ui.module.css';

/* YEP tracks — the lane a youth runs their process in. */
export const TRACKS = [
  { id: 'build', name: 'Build & Sell', desc: 'Make a product. Put it in the market.', icon: Hammer },
  { id: 'brand', name: 'Brand & Influence', desc: 'Build a name people follow and trust.', icon: Megaphone },
  { id: 'money', name: 'Money & Markets', desc: 'Master the numbers behind the hustle.', icon: LineChart },
];

export default function TrackSelector() {
  const { selectTrack } = useYEP();
  const [name, setName] = useState('');
  const [picked, setPicked] = useState(null);

  function start() {
    const track = TRACKS.find((t) => t.id === picked);
    if (!track) return;
    selectTrack(track, name.trim());
  }

  return (
    <div className={styles.wrap}>
      <img className={styles.logo} src="/logo.png" alt="A/1 Suppliers" />
      <h1 className={styles.title}>
        Start Your <em>Process.</em>
      </h1>
      <p className={styles.sub}>
        Pick your track. The Mirror reads you. The mission moves you. Always Forward. Never Back.
      </p>

      <div className={styles.nameField}>
        <label className={styles.nameLabel} htmlFor="yname">
          Your Name <span style={{ opacity: 0.6 }}>(optional)</span>
        </label>
        <input
          id="yname"
          className={styles.nameInput}
          placeholder="What should we call you?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={24}
        />
      </div>

      <div className={styles.tracksLabel}>Choose Your YEP Track</div>
      <div className={styles.tracks}>
        {TRACKS.map((t) => {
          const Icon = t.icon;
          const sel = picked === t.id;
          return (
            <button
              key={t.id}
              className={`${styles.track} ${sel ? styles.selected : ''}`}
              onClick={() => setPicked(t.id)}
            >
              <span className={styles.tIcon}>
                {sel ? <Check size={22} /> : <Icon size={22} />}
              </span>
              <span className={styles.tMeta}>
                <span className={styles.tName}>{t.name}</span>
                <span className={styles.tDesc}>{t.desc}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.footer}>
        <button className={ui.btnPrimary} onClick={start} disabled={!picked}>
          Lock In <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
