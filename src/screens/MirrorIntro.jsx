import { ScanFace, Clock, ShieldCheck, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { MODES } from '../data/modes';
import Shell from '../components/Shell';
import styles from './MirrorIntro.module.css';
import ui from '../styles/ui.module.css';

const COPY = {
  explorer: {
    eyebrow: 'A Quick Check-In',
    title: 'Your Mirror',
    lede: "Let's see how you're growing.",
    sub: 'This is not a test. There are no wrong answers. Just choose what feels true for you.',
    rule1: ['About two minutes.', 'One question at a time.'],
    rule2: ['Be real.', 'You are not getting a grade.'],
    rule3: ['Keep growing.', 'Your answers help you find your next step.'],
    ready: 'Ready to look at your growth?',
    button: 'Start My Mirror',
  },
  builder: {
    eyebrow: 'Before You Start',
    title: 'Check Your Growth',
    lede: 'The Mirror helps you explore what interested you today.',
    sub: 'No perfect answers. Give the answer that is most true right now.',
    rule1: ['About two minutes.', 'One question at a time.'],
    rule2: ['Be honest.', 'This is for growth, not a grade.'],
    rule3: ['Follow your interest.', 'Your answers point to the next challenge.'],
    ready: 'Ready?',
    button: 'Take The Mirror',
  },
  leader: {
    eyebrow: 'Before You Start',
    title: 'The Mirror',
    lede: 'Reflect on what you noticed before you choose your next experience.',
    sub: 'Do not perform for the score. Give the most accurate answer you can.',
    rule1: ['About two minutes.', 'One question at a time.'],
    rule2: ['Be honest.', 'This is for you, not a grade.'],
    rule3: ['Use the evidence.', 'Your answers help you choose what to explore.'],
    ready: 'Ready?',
    button: 'Take The Mirror',
  },
  yaep: {
    eyebrow: 'Current Position',
    title: 'The Mirror',
    lede: 'Reflect on the experience that interested you and choose a next step.',
    sub: 'This is a check-in, not a test, score or prediction about you.',
    rule1: ['About two minutes.', 'One question at a time.'],
    rule2: ['Be accurate.', 'This is development data, not a grade.'],
    rule3: ['Choose your next step.', 'Use the result to choose an accountable next step.'],
    ready: 'Ready?',
    button: 'Begin Assessment',
  },
};

export default function MirrorIntro() {
  const { navigate, mode, mirrorResult } = useYEP();
  const program = MODES[mode] || MODES.builder;
  const copy = COPY[mode] || COPY.builder;

  return (
    <Shell>
      <div className={styles.wrap} data-lane={mode}>
        <div className={styles.eyebrow}>{copy.eyebrow}</div>
        <div className={styles.laneTag}><Sparkles size={16} /> {program.tier} · Ages {program.ageRange}</div>
        <h1 className={styles.title}>{copy.title}</h1>

        <p className={styles.lede}>{copy.lede}</p>
        <p className={styles.sub}>{copy.sub}</p>

        <div className={styles.dimsLabel}>What Today's Mirror Is About</div>
        <div className={styles.dims}>
          {['What caught your attention', 'What you explored', 'What interests you', 'What support you want'].map((d) => <span key={d} className={styles.chip}>{d}</span>)}
        </div>

        <div className={styles.rules}>
          <div className={styles.rule}>
            <Clock className={styles.rIcon} size={18} />
            <span className={styles.rText}><b>{copy.rule1[0]}</b> {copy.rule1[1]}</span>
          </div>
          <div className={styles.rule}>
            <ShieldCheck className={styles.rIcon} size={18} />
            <span className={styles.rText}><b>{copy.rule2[0]}</b> {copy.rule2[1]}</span>
          </div>
          <div className={styles.rule}>
            <Compass className={styles.rIcon} size={18} />
            <span className={styles.rText}><b>{copy.rule3[0]}</b> {copy.rule3[1]}</span>
          </div>
        </div>

        <div className={styles.closing}>
          <div className={styles.ready}>{copy.ready}</div>
          <div className={styles.motto}>Always Forward. Never Back.</div>
        </div>

        {mirrorResult && (
          <>
            <button className={ui.btnGhost} onClick={() => navigate('results')}>View Saved Mirror Results</button>
            <p className={styles.sub}>Starting a new check-in resets your selected FINISHER practice. Your other saved lane work stays. View your saved result to continue your existing work.</p>
          </>
        )}
        <button className={ui.btnPrimary} onClick={() => navigate('mirror')}>
          <ScanFace size={20} /> {copy.button} <ArrowRight size={20} />
        </button>
      </div>
    </Shell>
  );
}
