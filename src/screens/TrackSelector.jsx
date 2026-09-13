import { useState } from 'react';
import { Hammer, Megaphone, LineChart, ArrowRight, Check, ShieldCheck } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { MODES } from '../data/modes';
import styles from './TrackSelector.module.css';
import ui from '../styles/ui.module.css';

const A1_LOGO = '/a1-suppliers-logo.png';

export const TRACKS = [
  { id: 'build', name: 'Build & Sell', desc: 'Make a product. Put it in the market.', icon: Hammer },
  { id: 'brand', name: 'Brand & Influence', desc: 'Build a name people follow and trust.', icon: Megaphone },
  { id: 'money', name: 'Money & Markets', desc: 'Master the numbers behind the hustle.', icon: LineChart },
];

const PATHWAYS = ['explorer', 'builder', 'leader', 'yaep'];

export default function TrackSelector() {
  const { selectTrack, setMode, mode, track, powerName: savedPowerName, navigate } = useYEP();
  const [powerName, setPowerName] = useState(savedPowerName || '');
  const [picked, setPicked] = useState(track?.id || null);
  const [pathway, setPathway] = useState(mode);
  const [safeguardsAccepted, setSafeguardsAccepted] = useState(false);

  function start() {
    const selectedTrack = TRACKS.find((t) => t.id === picked);
    const identity = powerName.trim();
    if (!selectedTrack || !identity || !safeguardsAccepted) return;
    setMode(pathway);
    selectTrack(selectedTrack, '', identity);
  }

  return (
    <div className={styles.wrap}>
      <section className={styles.brandHero}>
        <img className={styles.logo} src={A1_LOGO} alt="A/1 Suppliers" />
        <div className={styles.introCopy}>
          <div className={styles.organization}>A/1 SUPPLIERS</div>
          <div className={styles.programLine}>YEP / Y.A.E.P. · THE PROCESS</div>
          <div className={styles.motto}>Supplying the Tools. Supporting the Hustle.</div>
          <div className={styles.founder}>Cecil Trimble · Founder & CEO</div>

          <h1 className={styles.title}>
            Build the Person.<br />
            <em>Build the Process.</em><br />
            Open the World.
          </h1>

          <p className={styles.sub}>
            Your process. Your direction. A/1 Suppliers supplies exposure, and YEP / Y.A.E.P. teaches you how to use the tools — technology, mentorship, money, ownership, skills, relationships, and real-world experience — to support your hustle and keep moving.
          </p>

          <div className={styles.processStrip} aria-label="The Process lifelong learning loop">
            <span>EXPLORE</span><b>→</b><span>EXPERIENCE</span><b>→</b><span>LEARN</span><b>→</b><span>REFLECT</span><b>→</b><span>ADAPT</span><b>→</b><span>EXPLORE AGAIN</span>
          </div>

          <div className={styles.a1Rule}>
            <strong>THE A/1 RULE</strong>
            <span>You cannot choose from a world you have never been exposed to.</span>
          </div>
        </div>
      </section>

      <section className={styles.safeguardBox}>
        <div className={styles.safeguardHead}>
          <ShieldCheck size={22} />
          <div>
            <strong>Demo Privacy + Safeguard Notice</strong>
            <span>This tablet is a controlled test build, not a production participant database.</span>
          </div>
        </div>
        <p>
          Use a made-up Power Name and non-sensitive answers only. Do not enter legal names, addresses, personal contact information, IDs, medical information, passwords, financial information, or other sensitive data. Youth microphone input is locked in this demo until an approved parent/guardian consent and privacy process is in place.
        </p>
        <button type="button" className={styles.safeguardLink} onClick={() => navigate('privacySafeguards')}>
          Read A/1 Privacy + Safeguards
        </button>
        <label className={styles.safeguardCheck}>
          <input type="checkbox" checked={safeguardsAccepted} onChange={(e) => setSafeguardsAccepted(e.target.checked)} />
          <span>I understand this is a demo and I will use sample or non-sensitive information only.</span>
        </label>
        <small>This acknowledgment is not parental consent and does not replace the final privacy/consent documents for real participants.</small>
      </section>

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
              {sel && <Check size={20} />}
            </button>
          );
        })}
      </div>

      <div className={styles.identityGrid}>
        <div className={styles.nameField}>
          <label className={styles.nameLabel} htmlFor="powerName">Demo Power Name</label>
          <input
            id="powerName"
            className={styles.nameInput}
            placeholder="Example: Vision Builder"
            value={powerName}
            onChange={(e) => setPowerName(e.target.value)}
            maxLength={28}
            autoComplete="off"
          />
          <small>Use a made-up name for V0.5. Do not enter a participant's legal name.</small>
        </div>
      </div>

      <div className={styles.tracksLabel}>Choose Your Track</div>
      <div className={styles.tracks}>
        {TRACKS.map((t) => {
          const Icon = t.icon;
          const sel = picked === t.id;
          return (
            <button key={t.id} className={`${styles.track} ${sel ? styles.selected : ''}`} onClick={() => setPicked(t.id)}>
              <span className={styles.tIcon}>{sel ? <Check size={24} /> : <Icon size={24} />}</span>
              <span className={styles.tMeta}>
                <span className={styles.tName}>{t.name}</span>
                <span className={styles.tDesc}>{t.desc}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className={styles.footer}>
        <button className={ui.btnPrimary} onClick={start} disabled={!picked || !powerName.trim() || !safeguardsAccepted}>
          Enter The Process <ArrowRight size={22} />
        </button>
      </div>
    </div>
  );
}
