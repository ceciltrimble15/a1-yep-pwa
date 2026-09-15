import { ScanFace, Clock, ShieldCheck, Compass, ArrowRight, Sparkles } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { DIMENSIONS } from '../data/mirrorQuestions';
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
    lede: 'The Mirror helps you see what is strong and what needs more reps.',
    sub: 'No perfect answers. Give the answer that is most true right now.',
    rule1: ['About two minutes.', 'One question at a time.'],
    rule2: ['Be honest.', 'This is for growth, not a grade.'],
    rule3: ['Use the read.', 'Your answers point to the next challenge.'],
    ready: 'Ready?',
    button: 'Take The Mirror',
  },
  leader: {
    eyebrow: 'Before You Start',
    title: 'The Mirror',
    lede: 'Read where you are before you decide where to go next.',
    sub: 'Do not perform for the score. Give the most accurate answer you can.',
    rule1: ['About two minutes.', 'One question at a time.'],
    rule2: ['Be honest.', 'This is for you, not a grade.'],
    rule3: ['Use the evidence.', 'Every answer helps sharpen your next move.'],
    ready: 'Ready?',
    button: 'Take The Mirror',
  },
  yaep: {
    eyebrow: 'Current Position',
    title: 'The Mirror',
    lede: 'Assess your current strengths, gaps, and next move.',
    sub: 'Treat this as a short self-audit. Accuracy matters more than looking good.',
    rule1: ['About two minutes.', 'One question at a time.'],
    rule2: ['Be accurate.', 'This is development data, not a grade.'],
    rule3: ['Act on the read.', 'Use the result to choose an accountable next step.'],
    ready: 'Ready?',
    button: 'Begin Assessment',
  },
};

export default function MirrorIntro() {
  const { navigate, mode } = useYEP();
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

        <div className={styles.dimsLabel}>Six Areas We Look At</div>
        <div className={styles.dims}>
          {DIMENSIONS.map((d) => <span key={d} className={styles.chip}>{d}</span>)}
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

        <button className={ui.btnPrimary} onClick={() => navigate('mirror')}>
          <ScanFace size={20} /> {copy.button} <ArrowRight size={20} />
        </button>
      </div>
    </Shell>
  );
}
