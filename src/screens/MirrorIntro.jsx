import { ScanFace, Clock, ShieldCheck, Compass, ArrowRight } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { DIMENSIONS } from '../data/mirrorQuestions';
import Shell from '../components/Shell';
import styles from './MirrorIntro.module.css';
import ui from '../styles/ui.module.css';

/* Mirror Intro — builds trust and frames the assessment before Q1.
   NOTE: copy is on-brand placeholder pending final sign-off. */
export default function MirrorIntro() {
  const { navigate } = useYEP();

  return (
    <Shell>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>Before You Start</div>
        <h1 className={styles.title}>
          The <em>Mirror.</em>
        </h1>

        <p className={styles.lede}>
          The Mirror isn't a test. It's a read on who you already are.
        </p>
        <p className={styles.sub}>
          Twelve honest questions across six dimensions. It finds your strongest edge and the place
          your work begins — then hands you a mission built for you. There are no right answers. Only true ones.
        </p>

        <div className={styles.dimsLabel}>The Six Dimensions</div>
        <div className={styles.dims}>
          {DIMENSIONS.map((d) => (
            <span key={d} className={styles.chip}>
              {d}
            </span>
          ))}
        </div>

        <div className={styles.rules}>
          <div className={styles.rule}>
            <Clock className={styles.rIcon} size={18} />
            <span className={styles.rText}>
              <b>About two minutes.</b> One question at a time. No going backward you can't undo.
            </span>
          </div>
          <div className={styles.rule}>
            <ShieldCheck className={styles.rIcon} size={18} />
            <span className={styles.rText}>
              <b>Be honest.</b> This is for you, not a grade. The more real you are, the better your mission fits.
            </span>
          </div>
          <div className={styles.rule}>
            <Compass className={styles.rIcon} size={18} />
            <span className={styles.rText}>
              <b>Trust the read.</b> Every answer points you toward your next move.
            </span>
          </div>
        </div>

        <button className={ui.btnPrimary} onClick={() => navigate('mirror')}>
          <ScanFace size={20} /> Begin The Mirror <ArrowRight size={20} />
        </button>
      </div>
    </Shell>
  );
}
