import { ScanFace, Clock, ShieldCheck, Compass, ArrowRight } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { DIMENSIONS } from '../data/mirrorQuestions';
import Shell from '../components/Shell';
import styles from './MirrorIntro.module.css';
import ui from '../styles/ui.module.css';

/* Mirror Intro — builds trust and frames the assessment before Q1. */
export default function MirrorIntro() {
  const { navigate, copy } = useYEP();
  const c = copy.mirrorIntro;

  return (
    <Shell>
      <div className={styles.wrap}>
        <div className={styles.eyebrow}>{c.eyebrow}</div>
        <h1 className={styles.title}>
          The <em>{c.titleEm}</em>
        </h1>

        <p className={styles.lede}>{c.lede1}</p>
        <p className={styles.sub}>
          {c.sub1a}
          <br />
          {c.sub1b}
        </p>
        <p className={styles.lede}>{c.lede2}</p>

        <div className={styles.dimsLabel}>{c.dimsLabel}</div>
        <div className={styles.dims}>
          {DIMENSIONS.map((d) => (
            <span key={d} className={styles.chip}>
              {d}
            </span>
          ))}
        </div>

        <p className={styles.sub}>{c.sub2}</p>

        <div className={styles.rules}>
          <div className={styles.rule}>
            <Clock className={styles.rIcon} size={18} />
            <span className={styles.rText}>
              <b>{c.rule1.b}</b> {c.rule1.text}
            </span>
          </div>
          <div className={styles.rule}>
            <ShieldCheck className={styles.rIcon} size={18} />
            <span className={styles.rText}>
              <b>{c.rule2.b}</b> {c.rule2.text}
            </span>
          </div>
          <div className={styles.rule}>
            <Compass className={styles.rIcon} size={18} />
            <span className={styles.rText}>
              <b>{c.rule3.b}</b> {c.rule3.text}
            </span>
          </div>
        </div>

        <div className={styles.closing}>
          <div className={styles.ready}>{c.ready}</div>
          <div className={styles.lockin}>{c.lockin}</div>
          <div className={styles.motto}>{c.motto}</div>
        </div>

        <button className={ui.btnPrimary} onClick={() => navigate('mirror')}>
          <ScanFace size={20} /> {c.cta} <ArrowRight size={20} />
        </button>
      </div>
    </Shell>
  );
}
