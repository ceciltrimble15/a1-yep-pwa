import { ScanFace, Clock, ShieldCheck, Compass, ArrowRight } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { DIMENSIONS } from '../data/mirrorQuestions';
import Shell from '../components/Shell';
import styles from './MirrorIntro.module.css';
import ui from '../styles/ui.module.css';

/* Mirror Intro — builds trust and frames the assessment before Q1. */
export default function MirrorIntro() {
  const { navigate } = useYEP();

  return (
    <Shell>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>Before You Start</div>
        <h1 className={styles.title}>
          The <em>Mirror.</em>
        </h1>

        <p className={styles.lede}>Before you start, you have to look in the Mirror.</p>
        <p className={styles.sub}>
          Not to judge yourself.
          <br />
          Not to compare yourself to anyone else.
        </p>
        <p className={styles.lede}>
          The Mirror shows you where you are right now — so the Process can meet you there.
        </p>

        <div className={styles.dimsLabel}>Six Areas · Honest Answers Only</div>
        <div className={styles.dims}>
          {DIMENSIONS.map((d) => (
            <span key={d} className={styles.chip}>
              {d}
            </span>
          ))}
        </div>

        <p className={styles.sub}>
          There are no wrong answers. There are only real ones. The more honest you are, the more the
          Process works for you.
        </p>

        <div className={styles.rules}>
          <div className={styles.rule}>
            <Clock className={styles.rIcon} size={18} />
            <span className={styles.rText}>
              <b>About two minutes.</b> One question at a time.
            </span>
          </div>
          <div className={styles.rule}>
            <ShieldCheck className={styles.rIcon} size={18} />
            <span className={styles.rText}>
              <b>Be honest.</b> This is for you, not a grade.
            </span>
          </div>
          <div className={styles.rule}>
            <Compass className={styles.rIcon} size={18} />
            <span className={styles.rText}>
              <b>Trust the read.</b> Every answer points you toward your next move.
            </span>
          </div>
        </div>

        <div className={styles.closing}>
          <div className={styles.ready}>Ready?</div>
          <div className={styles.lockin}>Lock in.</div>
          <div className={styles.motto}>Always Forward. Never Back.</div>
        </div>

        <button className={ui.btnPrimary} onClick={() => navigate('mirror')}>
          <ScanFace size={20} /> Take The Mirror <ArrowRight size={20} />
        </button>
      </div>
    </Shell>
  );
}
