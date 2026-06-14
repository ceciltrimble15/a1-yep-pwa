import { ScanFace, ArrowRight } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import Shell from '../components/Shell';
import PillarBadges from '../components/PillarBadges';
import styles from './Home.module.css';
import ui from '../styles/ui.module.css';

export default function Home() {
  const { youthName, navigate } = useYEP();

  return (
    <Shell>
      <section className={styles.hero}>
        <div className={styles.eyebrow}>Your Process Starts Here</div>
        <h1 className={styles.welcome}>
          {youthName ? <>What's good, <em>{youthName}.</em></> : <>Welcome, <em>Future Founder.</em></>}
        </h1>
        <p className={styles.lede}>
          Lock in. Let's finish. Run the four pillars every day — then face the Mirror.
        </p>
      </section>

      <div className={styles.flagHead}>
        <span className={styles.flagWord}>F.L.A.G.</span>
        <span className={styles.flagSub}>The Mindset</span>
      </div>
      <PillarBadges />

      <div className={styles.next}>
        <div className={styles.nextCard}>
          <div className={styles.nextLabel}>Next Step</div>
          <div className={styles.nextTitle}>The Mirror</div>
          <p className={styles.nextDesc}>
            Six dimensions. Honest answers. It finds your Anchor Strength and your Growth Edge —
            then hands you a mission built for you.
          </p>
        </div>
        <button className={ui.btnPrimary} onClick={() => navigate('mirrorIntro')}>
          <ScanFace size={20} /> Face The Mirror <ArrowRight size={20} />
        </button>
      </div>
    </Shell>
  );
}
