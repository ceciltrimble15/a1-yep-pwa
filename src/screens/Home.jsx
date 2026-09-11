import { ScanFace, ArrowRight } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import Shell from '../components/Shell';
import PillarBadges from '../components/PillarBadges';
import styles from './Home.module.css';
import ui from '../styles/ui.module.css';

export default function Home() {
  const { youthName, navigate, copy } = useYEP();
  const c = copy.welcome;

  return (
    <Shell>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>{c.eyebrow}</div>
        <h1 className={styles.welcome}>
          {youthName
            ? <>{c.greetingKnownPrefix}<em>{youthName}.</em></>
            : <>{c.greetingNewPrefix}<em>{c.greetingNewName}</em></>}
        </h1>
        <p className={styles.lede}>{c.lede}</p>
      </section>

      <div className={styles.flagHead}>
        <span className={styles.flagWord}>F.L.A.G.</span>
        <span className={styles.flagSub}>The Mindset</span>
      </div>
      <PillarBadges />

      <div className={styles.next}>
        <div className={styles.nextCard}>
          <div className={styles.nextLabel}>{c.nextLabel}</div>
          <div className={styles.nextTitle}>{c.nextTitle}</div>
          <p className={styles.nextDesc}>{c.nextDesc}</p>
        </div>
        <button className={ui.btnPrimary} onClick={() => navigate('mirrorIntro')}>
          <ScanFace size={20} /> {c.cta} <ArrowRight size={20} />
        </button>
      </div>
    </Shell>
  );
}
