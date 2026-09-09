import { useState } from 'react';
import { Hammer, Megaphone, LineChart, ArrowRight, Check } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { MODES } from '../data/modes';
import styles from './TrackSelector.module.css';
import ui from '../styles/ui.module.css';

export const TRACKS = [
  { id: 'build', name: 'Build & Sell', desc: 'Make a product. Put it in the market.', icon: Hammer },
  { id: 'brand', name: 'Brand & Influence', desc: 'Build a name people follow and trust.', icon: Megaphone },
  { id: 'money', name: 'Money & Markets', desc: 'Master the numbers behind the hustle.', icon: LineChart },
];

const PATHWAYS = ['explorer', 'builder', 'leader', 'yaep'];

export default function TrackSelector() {
  const { selectTrack, setMode, mode, track, youthName, powerName: savedPowerName } = useYEP();
  const [name, setName] = useState(youthName || '');
  const [powerName, setPowerName] = useState(savedPowerName || '');
  const [picked, setPicked] = useState(track?.id || null);
  const [pathway, setPathway] = useState(mode);

  function start() {
    const selectedTrack = TRACKS.find((t) => t.id === picked);
    const identity = powerName.trim();
    if (!selectedTrack || !identity) return;
    setMode(pathway);
    selectTrack(selectedTrack, name.trim(), identity);
  }

  return (
    <div className={styles.wrap}>
      <img className={styles.logo} src="/logo.png" alt="A/1 Suppliers" />
      <div className={styles.brandLine}>A/1 Suppliers · YEP + Y.A.E.P. Tablet Demo V0.5</div>
      <h1 className={styles.title}>
        Choose Your <em>Process.</em>
      </h1>
      <p className={styles.sub}>
        Choose the age pathway, confirm the Power Name and track, then enter the controlled demo experience.
      </p>

      <div className={styles.tracksLabel}>Choose Your Program Pathway</div>
      <div className={styles.pathways}>
        {PATHWAYS.map((id) => {
          const option = MODES[id];
          const sel = pathway === id;
          return (
            <button
              key={id}
              type="button"
              className={`${styles.pathway} ${sel ? styles.pathwaySelected : ''}`}
              onClick={() => setPathway(id)}
            >
              <span className={styles.pathwayProgram}>{option.program}</span>
              <span className={styles.pathwayLabel}>{option.label}</span>
              {sel && <Check size={18} />}
            </button>
          );
        })}
      </div>

      <div className={styles.nameField}>
        <label className={styles.nameLabel} htmlFor="yname">
          Your Name <span style={{ opacity: 0.6 }}>(optional for demo)</span>
        </label>
        <input
          id="yname"
          className={styles.nameInput}
          placeholder="What should we call you?"
          value={name}
          onChange={(e) => setName(e.target.value)}
          maxLength={24}
          autoComplete="off"
        />
      </div>

      <div className={styles.nameField}>
        <label className={styles.nameLabel} htmlFor="powerName">
          Your Power Name
        </label>
        <input
          id="powerName"
          className={styles.nameInput}
          placeholder="Example: Vision Builder"
          value={powerName}
          onChange={(e) => setPowerName(e.target.value)}
          maxLength={28}
          autoComplete="off"
        />
      </div>

      <div className={styles.tracksLabel}>Choose Your Track</div>
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
        <button className={ui.btnPrimary} onClick={start} disabled={!picked || !powerName.trim()}>
          Enter This Pathway <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
}
