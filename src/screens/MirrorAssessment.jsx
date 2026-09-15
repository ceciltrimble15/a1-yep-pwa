import { useState } from 'react';
import { ArrowRight, ArrowLeft, Sparkles, Lightbulb, Target, BriefcaseBusiness } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { getMirrorQuestions, getMirrorScale } from '../data/mirrorQuestions';
import { MODES } from '../data/modes';
import Shell from '../components/Shell';
import styles from './MirrorAssessment.module.css';
import ui from '../styles/ui.module.css';

const CUES = {
  explorer: {
    3: { title: 'You’re Doing Great', text: 'Keep going. Just pick what feels true for you.' },
    7: { title: 'Almost There', text: 'A few more and you get to see how you are growing.' },
  },
  builder: {
    3: { title: 'Good Work', text: 'Keep moving. Be real with your answers.' },
    7: { title: 'You’re Close', text: 'Finish strong and check your growth.' },
  },
  leader: {
    3: { title: "You're Getting Closer", text: 'Keep going.' },
    7: { title: 'Halfway Was Behind You', text: 'Finish strong.' },
  },
  yaep: {
    3: { title: "You're Getting Closer", text: 'Keep going.' },
    7: { title: 'Halfway Was Behind You', text: 'Finish strong.' },
  },
};

const LANE_ICONS = {
  explorer: Sparkles,
  builder: Lightbulb,
  leader: Target,
  yaep: BriefcaseBusiness,
};

const LANE_HEADLINES = {
  explorer: {
    title: "Let's See How You're Growing",
    helper: 'There are no wrong answers. Pick what feels true for you.',
  },
  builder: {
    title: 'Check Your Growth',
    helper: 'Be real. This helps you see what you are building and what to work on next.',
  },
  leader: {
    title: 'Read Where You Are',
    helper: 'Answer honestly so the next move is based on something real.',
  },
  yaep: {
    title: 'Assess Your Current Position',
    helper: 'Use the Mirror to identify strengths, gaps, and your next accountable move.',
  },
};

export default function MirrorAssessment() {
  const { submitMirror, mode } = useYEP();
  const questions = getMirrorQuestions(mode);
  const scale = getMirrorScale(mode);
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [cue, setCue] = useState(null);

  const q = questions[step];
  const total = questions.length;
  const isLast = step === total - 1;
  const current = answers[q.id];
  const LaneIcon = LANE_ICONS[mode] || Lightbulb;
  const headline = LANE_HEADLINES[mode] || LANE_HEADLINES.builder;
  const cueSet = CUES[mode] || CUES.builder;
  const program = MODES[mode] || MODES.builder;

  function choose(value) {
    setAnswers((a) => ({ ...a, [q.id]: value }));
  }

  function next() {
    if (!current) return;
    if (isLast) {
      submitMirror(answers);
    } else if (cueSet[step]) {
      setCue(cueSet[step]);
    } else {
      setStep((s) => s + 1);
    }
  }

  function continueFromCue() {
    setCue(null);
    setStep((s) => s + 1);
  }

  if (cue) {
    return (
      <Shell>
        <div className={styles.laneWrap} data-lane={mode}>
          <div className={styles.cue}>
            <div className={styles.laneBadge}><LaneIcon size={18} /> {program.tier} · Ages {program.ageRange}</div>
            <div className={styles.cueMark}>{step + 1} / {total}</div>
            <h2 className={styles.cueTitle}>{cue.title}</h2>
            <p className={styles.cueText}>{cue.text}</p>
            <button className={ui.btnPrimary} onClick={continueFromCue}>
              Keep Going <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className={styles.laneWrap} data-lane={mode}>
        <div className={styles.mirrorHero}>
          <div className={styles.laneBadge}><LaneIcon size={18} /> {program.tier} · Ages {program.ageRange}</div>
          <h1 className={styles.heroTitle}>{headline.title}</h1>
          <p className={styles.heroHelper}>{headline.helper}</p>
        </div>

        <div className={styles.progressWrap}>
          <div className={styles.progressTop}>
            <span className={styles.dim}>{q.dimension}</span>
            <span className={styles.count}>{step + 1} / {total}</span>
          </div>
          <div className={styles.bar}>
            <div className={styles.fill} style={{ width: `${((step + 1) / total) * 100}%` }} />
          </div>
        </div>

        <h2 key={q.id} className={styles.question}>{q.text}</h2>

        <div className={styles.options}>
          {scale.map((s) => {
            const active = current === s.value;
            return (
              <button
                key={s.value}
                className={`${styles.opt} ${active ? styles.optActive : ''}`}
                onClick={() => choose(s.value)}
              >
                {s.label}
                <span className={`${styles.dot} ${active ? styles.dotActive : ''}`} />
              </button>
            );
          })}
        </div>

        <div className={styles.nav}>
          {step > 0 && (
            <button className={styles.back} onClick={() => setStep((s) => s - 1)} aria-label="Previous question">
              <ArrowLeft size={18} />
            </button>
          )}
          <div className={styles.next}>
            <button className={ui.btnPrimary} onClick={next} disabled={!current}>
              {isLast ? 'See My Result' : 'Next'} <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </Shell>
  );
}
