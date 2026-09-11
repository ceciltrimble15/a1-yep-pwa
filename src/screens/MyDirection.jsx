import { useMemo, useState } from 'react';
import { Compass, Lightbulb, Network, BadgeDollarSign, Cpu, Shuffle, ArrowLeft } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { MODES } from '../data/modes';
import { EXPOSURE_WORLDS, getDirectionGuide } from '../data/directionGuidance';
import Shell from '../components/Shell';
import styles from './PilotScreens.module.css';
import ui from '../styles/ui.module.css';

function GuideCard({ icon: Icon, title, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon size={20} /> {title}
      </div>
      <div className={styles.cardText}>{children}</div>
    </div>
  );
}

export default function MyDirection() {
  const { directionProfile, saveDirectionProfile, mode, setScreen } = useYEP();
  const [interest, setInterest] = useState(directionProfile.interest || '');
  const [why, setWhy] = useState(directionProfile.why || '');
  const [saved, setSaved] = useState(false);
  const program = MODES[mode] || MODES.builder;
  const guide = useMemo(() => getDirectionGuide(interest, mode), [interest, mode]);

  function save() {
    saveDirectionProfile({ interest: interest.trim(), why: why.trim() });
    setSaved(true);
  }

  return (
    <Shell>
      <div className={styles.head}>
        <div className={styles.eyebrow}>{program.program} · {program.label} · My Direction</div>
        <h1 className={styles.title}>Explore What Could Fit You.</h1>
        <p className={styles.sub}>
          My Direction does not decide your future. It starts with what you are curious about, connects it to real work, money, technology, people, and the FINISHER Process, then deliberately exposes you to other worlds you may not know yet.
        </p>
      </div>

      <div className={styles.note}>
        <strong>V0.5 guidance rule:</strong> this is a structured local exploration guide, not a live AI chat and not a prediction about what you should become. You are allowed to deepen, change, or completely pivot your direction.
      </div>

      <div className={styles.profileGrid} style={{ marginTop: 16 }}>
        <div className={styles.card}>
          <label className={styles.label} htmlFor="direction-interest">What are you curious about right now?</label>
          <textarea
            id="direction-interest"
            className={styles.textarea}
            style={{ minHeight: 110 }}
            value={interest}
            onChange={(e) => { setInterest(e.target.value); setSaved(false); }}
            placeholder="Example: I think I might want to be an architect."
            maxLength={240}
          />
        </div>
        <div className={styles.card}>
          <label className={styles.label} htmlFor="direction-why">Why does that interest you?</label>
          <textarea
            id="direction-why"
            className={styles.textarea}
            style={{ minHeight: 110 }}
            value={why}
            onChange={(e) => { setWhy(e.target.value); setSaved(false); }}
            placeholder="What about it catches your attention?"
            maxLength={320}
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button className={ui.btnPrimary} onClick={save} disabled={!interest.trim()}>
          <Compass size={20} /> {saved ? 'Direction Saved' : 'Build My Exposure Map'}
        </button>
      </div>

      <div className={styles.note}>
        <strong>{guide.cluster.label}:</strong> {guide.lane.headline}
      </div>

      <div className={styles.grid} style={{ marginTop: 16 }}>
        <GuideCard icon={Lightbulb} title="Try The Work">{guide.cluster.tryIt}</GuideCard>
        <GuideCard icon={BadgeDollarSign} title="Money + Ownership Lens">{guide.cluster.money}</GuideCard>
        <GuideCard icon={Cpu} title="Technology Lens">{guide.cluster.technology}</GuideCard>
        <GuideCard icon={Network} title="People + Network Lens">{guide.cluster.people}</GuideCard>
        <GuideCard icon={Compass} title="Adjacent Doors">
          {guide.cluster.adjacent.join(' · ')}
        </GuideCard>
        <GuideCard icon={Shuffle} title="Outside Your Current Interest">
          <strong>{guide.outside.label}:</strong> {guide.outside.prompt}
        </GuideCard>
      </div>

      <div className={styles.note}>
        <strong>Questions for this pathway:</strong>
        <ul style={{ margin: '8px 0 0 18px', padding: 0 }}>
          {guide.lane.questions.map((question) => <li key={question}>{question}</li>)}
        </ul>
      </div>

      <div className={styles.head} style={{ marginTop: 28 }}>
        <div className={styles.eyebrow}>Exposure Wheel</div>
        <h2 className={styles.cardTitle}>You Do Not Only Explore One Career.</h2>
        <p className={styles.sub}>YEP / Y.A.E.P. keeps opening doors across these worlds so you can discover interests you did not know you had.</p>
      </div>

      <div className={styles.grid}>
        {EXPOSURE_WORLDS.map((world) => (
          <div className={styles.card} key={world.id}>
            <div className={styles.cardTitle}>{world.label}</div>
            <div className={styles.cardText}>{world.prompt}</div>
          </div>
        ))}
      </div>

      <div className={styles.note}>
        <strong>The Process stays the same:</strong> Interest → Exposure → Try It → Build Something → Money + Technology + People → Reflect → Deepen or Pivot.
      </div>

      <div className={styles.actions}>
        <button className={ui.btnGhost} onClick={() => setScreen('home')}><ArrowLeft size={18} /> Back To Program Home</button>
      </div>
    </Shell>
  );
}
