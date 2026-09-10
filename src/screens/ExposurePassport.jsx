import { Compass, Eye, PlayCircle, RotateCcw, ArrowLeft } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { EXPOSURE_WORLDS, getDirectionGuide } from '../data/directionGuidance';
import { MODES } from '../data/modes';
import Shell from '../components/Shell';
import styles from './PilotScreens.module.css';
import ui from '../styles/ui.module.css';

function CountCard({ label, value, text }) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
      <div className={styles.cardText}>{text}</div>
    </div>
  );
}

export default function ExposurePassport() {
  const { directionProfile, exposureLog, mode, setScreen } = useYEP();
  const program = MODES[mode] || MODES.builder;
  const guide = getDirectionGuide(directionProfile?.interest || '', mode);
  const curious = exposureLog.filter((entry) => entry.reaction === 'curious');
  const wantsToTry = exposureLog.filter((entry) => entry.reaction === 'try');
  const notNow = exposureLog.filter((entry) => entry.reaction === 'not-now');
  const unseen = EXPOSURE_WORLDS.filter((world) => !exposureLog.some((entry) => entry.worldId === world.id));
  const nextWorld = unseen[0] || guide.outside;

  return (
    <Shell>
      <div className={styles.head}>
        <div className={styles.eyebrow}>{program.program} · Exposure Passport</div>
        <h1 className={styles.title}>Keep Opening Doors.</h1>
        <p className={styles.sub}>
          This is not a career score. It is a record of what you have seen, what caught your attention, what you want to try, and what you can explore next.
        </p>
      </div>

      <div className={styles.profileGrid}>
        <CountCard label="Current Direction" value={directionProfile?.interest || 'Open'} text={directionProfile?.why || 'You do not have to know yet.'} />
        <CountCard label="Worlds Seen" value={`${exposureLog.length} / ${EXPOSURE_WORLDS.length}`} text="Every new world gives you more choices." />
        <CountCard label="Curious" value={curious.length} text="Things worth learning more about." />
        <CountCard label="Want To Try" value={wantsToTry.length} text="Turn one of these into a real experience." />
        <CountCard label="Not For Me Right Now" value={notNow.length} text="Learning what does not fit is still useful evidence." />
        <CountCard label="Still Unseen" value={unseen.length} text="The system should keep exposing you beyond what you already know." />
      </div>

      <div className={styles.note}>
        <strong>Your next exposure:</strong> {nextWorld.label} — {nextWorld.prompt}
      </div>

      <div className={styles.grid} style={{ marginTop: 16 }}>
        <div className={styles.card}>
          <div className={styles.cardTitle}><Eye size={20} style={{ verticalAlign: '-4px', marginRight: 7 }} />See It</div>
          <div className={styles.cardText}>Learn what this world actually looks like: jobs, businesses, tools, people, places, and problems.</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}><PlayCircle size={20} style={{ verticalAlign: '-4px', marginRight: 7 }} />Try It</div>
          <div className={styles.cardText}>Do a small challenge, build something, interview somebody, visit a place, or test a real task.</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}><Compass size={20} style={{ verticalAlign: '-4px', marginRight: 7 }} />Connect It</div>
          <div className={styles.cardText}>Ask how money, technology, ownership, people, and the FINISHER Process connect to what you just saw.</div>
        </div>
        <div className={styles.card}>
          <div className={styles.cardTitle}><RotateCcw size={20} style={{ verticalAlign: '-4px', marginRight: 7 }} />Reflect + Move</div>
          <div className={styles.cardText}>Decide whether to deepen, pivot, or simply keep the knowledge and open another door.</div>
        </div>
      </div>

      <div className={styles.note}>
        <strong>A/1 rule:</strong> You never have to force a forever answer. The goal is to become someone who can enter something unfamiliar, learn, adapt, and keep moving.
      </div>

      <div className={styles.actions}>
        <button className={ui.btnPrimary} onClick={() => setScreen('myDirection')}><Compass size={18} /> Explore Another World</button>
        <button className={ui.btnGhost} onClick={() => setScreen('home')}><ArrowLeft size={18} /> Back To Program Home</button>
      </div>
    </Shell>
  );
}
