import { useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { mirrorQuestions, SCALE } from '../data/mirrorQuestions';
import Shell from '../components/Shell';
import styles from './MirrorAssessment.module.css';
import ui from '../styles/ui.module.css';

// Momentum cues keyed by the step just answered (0-indexed):
// after Q4 (step 3) and after Q8 (step 7). Confident, minimal — not gamified.
const CUES = {
  3: { title: "You're Getting Closer", text: 'Keep going.' },
  7: { title: 'Halfway Was Behind You', text: 'Finish strong.' },
};

export default function MirrorAssessment() {
  const { submitMirror } = useYEP();
  const [answers, setAnswers] = useState({});
  const [step, setStep] = useState(0);
  const [cue, setCue] = useState(null); // momentum interstitial between questions

  const q = mirrorQuestions[step];
  const total = mirrorQuestions.length;
  const isLast = step === total - 1;
  const current = answers[q.id];

  function choose(value) {
    setAnswers((a) => ({ ...a, [q.id]: value }));
  }

  function next() {
    if (!current) return;
    if (isLast) {
      submitMirror(answers);
    } else if (CUES[step]) {
      setCue(CUES[step]); // pause for encouragement before the next question
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
        <div className={styles.cue}>
          <div className={styles.cueMark}>{step + 1} / {total}</div>
          <h2 className={styles.cueTitle}>{cue.title}</h2>
          <p className={styles.cueText}>{cue.text}</p>
          <button className={ui.btnPrimary} onClick={continueFromCue}>
            Keep Going <ArrowRight size={20} />
          </button>
        </div>
      </Shell>
    );
  }

  return (
    <Shell>
      <div className={styles.progressWrap}>
        <div className={styles.progressTop}>
          <span className={styles.dim}>{q.dimension}</span>
          <span className={styles.count}>
            {step + 1} / {total}
          </span>
        </div>
        <div className={styles.bar}>
          <div className={styles.fill} style={{ width: `${((step + 1) / total) * 100}%` }} />
        </div>
      </div>

      <h2 key={q.id} className={styles.question}>
        {q.text}
      </h2>

      <div className={styles.options}>
        {SCALE.map((s) => {
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
          <button className={styles.back} onClick={() => setStep((s) => s - 1)}>
            <ArrowLeft size={18} />
          </button>
        )}
        <div className={styles.next}>
          <button className={ui.btnPrimary} onClick={next} disabled={!current}>
            {isLast ? 'See My Result' : 'Next'} <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </Shell>
  );
}
