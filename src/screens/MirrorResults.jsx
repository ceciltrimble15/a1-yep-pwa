import { Zap, Anchor as AnchorIcon, TrendingUp, Brain, Target, ArrowRight } from 'lucide-react';
import { useYEP, XP } from '../context/YEPContext';
import { DIMENSIONS } from '../data/mirrorQuestions';
import { anchorProfiles, edgeProfiles, styleProfiles } from '../data/mirrorProfiles';
import Shell from '../components/Shell';
import styles from './MirrorResults.module.css';
import ui from '../styles/ui.module.css';

const MAX_SCORE = 8; // 2 statements x max 4

export default function MirrorResults() {
  const { mirrorResult, mirrorScores, currentMission, navigate } = useYEP();

  if (!mirrorResult) {
    return (
      <Shell>
        <p style={{ color: 'var(--silver)' }}>No result yet. Face the Mirror first.</p>
      </Shell>
    );
  }

  const { Anchor, Edge, Style } = mirrorResult;
  const anchor = anchorProfiles[Anchor];
  const edge = edgeProfiles[Edge];
  const style = styleProfiles[Style];

  return (
    <Shell>
      <div className={styles.xpFlash}>
        <Zap size={14} fill="#2979FF" /> +{XP.MIRROR} XP — MIRROR COMPLETE
      </div>
      <h1 className={styles.title}>
        The Mirror <em>Read You.</em>
      </h1>

      <div className={styles.cards}>
        <div className={`${styles.resCard} ${styles.anchor}`}>
          <div className={styles.rLabel}>
            <AnchorIcon size={14} /> Anchor Strength
          </div>
          <div className={styles.rValue}>{anchor.title}</div>
          <div className={styles.rLine}>{anchor.line}</div>
        </div>

        <div className={styles.resCard}>
          <div className={styles.rLabel}>
            <TrendingUp size={14} /> Growth Edge
          </div>
          <div className={styles.rValue}>{edge.title}</div>
          <div className={styles.rLine}>{edge.line}</div>
        </div>

        <div className={styles.resCard}>
          <div className={styles.rLabel}>
            <Brain size={14} /> Learning Style
          </div>
          <div className={styles.rValue}>{style.title}</div>
          <div className={styles.rLine}>{style.line}</div>
        </div>
      </div>

      {mirrorScores && (
        <div className={styles.scores}>
          <div className={styles.scoresLabel}>Your Six Dimensions</div>
          {DIMENSIONS.map((d) => {
            const pct = (mirrorScores[d] / MAX_SCORE) * 100;
            const cls =
              d === Anchor ? styles.meterHigh : d === Edge ? styles.meterLow : '';
            return (
              <div key={d} className={styles.row}>
                <span className={styles.rowName}>{d}</span>
                <span className={styles.track}>
                  <span className={`${styles.meter} ${cls}`} style={{ width: `${pct}%` }} />
                </span>
              </div>
            );
          })}
        </div>
      )}

      {currentMission && (
        <div className={styles.missionCard}>
          <div className={styles.mLabel}>
            <Target size={12} style={{ verticalAlign: '-1px', marginRight: 5 }} />
            Your Recommended Mission
          </div>
          <div className={styles.mTitle}>{currentMission.title}</div>
          <div className={styles.mObjective}>{currentMission.objective}</div>
        </div>
      )}

      <div className={styles.cta}>
        <button className={ui.btnPrimary} onClick={() => navigate('mission')}>
          Start The Mission <ArrowRight size={20} />
        </button>
      </div>
    </Shell>
  );
}
