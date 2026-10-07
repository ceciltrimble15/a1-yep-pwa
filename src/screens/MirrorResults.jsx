import { useState } from 'react';
import { Anchor as AnchorIcon, TrendingUp, Brain, Target, ArrowRight } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { DIMENSIONS } from '../data/mirrorQuestions';
import { anchorProfiles, edgeProfiles, styleProfiles } from '../data/mirrorProfiles';
import Shell from '../components/Shell';
import YEPGuide from '../components/YEPGuide';
import styles from './MirrorResults.module.css';
import ui from '../styles/ui.module.css';

const MAX_SCORE = 8; // 2 statements x max 4

export default function MirrorResults() {
  const { mirrorResult, mirrorScores, currentMission, navigate } = useYEP();
  // Reveal sequence: 1=Anchor, 2=Edge, 3=FINISHER focus, 4=full card.
  const [step, setStep] = useState(1);

  if (!mirrorResult) {
    return (
      <Shell showAudio={false}>
        <YEPGuide step={1} prompt="Start the Mirror to see your strengths and choose a FINISHER mission. There are no right or wrong answers." actionLabel="Start My Mirror" onAction={() => navigate('mirrorIntro')} />
      </Shell>
    );
  }

  const { Anchor, Edge, Style } = mirrorResult;
  const anchor = anchorProfiles[Anchor];
  const edge = edgeProfiles[Edge];
  const style = styleProfiles[Style];
  const letterWord = currentMission ? currentMission.finisherLetter : '';
  const letterGlyph = letterWord ? letterWord[0] : '';
  const prompts = {
    1: `Your answers point to ${anchor.title} as a strength. Think of a moment when you used it. Next, we will look at something to practice.`,
    2: `${edge.title} is an area to practice. This is a starting point for growth. Next, connect it to a FINISHER action.`,
    3: currentMission ? `Your FINISHER focus is ${letterWord}. Your mission is ${currentMission.title}. Look over your full result before you begin.` : 'Review your full result, then return to the Mirror to choose a mission.',
    4: currentMission ? `Bring your strength into ${currentMission.title}. Open the mission, do each step, and mark only the work you have actually done.` : 'Your result is saved. Start the Mirror when you are ready to choose a mission.',
  };
  const guide = <>
    <YEPGuide title={['See your strength', 'Choose a growth area', 'Connect it to action', 'Your next mission'][step - 1]} example={step < 3 ? 'Think of one recent moment that fits this description. What did you do, and what would you practice next?' : currentMission?.activeApproach} step={`${step} OF 4`} prompt={prompts[step]} actionLabel={step < 4 ? ['See My Growth Area', 'See My FINISHER Focus', 'See Full Result'][step - 1] : (currentMission ? 'Open My FINISHER Mission' : 'Start My Mirror')} onAction={() => step < 4 ? setStep(step + 1) : navigate(currentMission ? 'mission' : 'mirrorIntro')} />
    <button type="button" className={ui.btnGhost} onClick={() => navigate('mirrorIntro')}>Take a New Mirror</button>
  </>;


  const Dots = ({ active }) => (
    <div className={styles.dots}>
      {[1, 2, 3].map((n) => (
        <span key={n} className={`${styles.dot} ${n === active ? styles.dotOn : ''}`} />
      ))}
    </div>
  );

  // ── Step 1 · Anchor Strength ──────────────────────────────
  if (step === 1) {
    return (
      <Shell showAudio={false}>
        {guide}
        <div className={styles.reveal}>
          <div className={styles.revealEyebrow}>Your Mirror</div>
          <div className={styles.revealKicker}>
            <AnchorIcon size={14} /> Your Strength
          </div>
          <div className={styles.revealValue}>{anchor.title}</div>
          <p className={styles.revealQuote}>{anchor.line}</p>
          <button className={ui.btnPrimary} onClick={() => setStep(2)}>
            Continue <ArrowRight size={20} />
          </button>
          <Dots active={1} />
        </div>
      </Shell>
    );
  }

  // ── Step 2 · Growth Edge ──────────────────────────────────
  if (step === 2) {
    return (
      <Shell showAudio={false}>
        {guide}
        <div className={styles.reveal}>
          <div className={styles.revealKicker}>
            <TrendingUp size={14} /> Your Growth Area
          </div>
          <div className={styles.revealValue}>{edge.title}</div>
          <p className={styles.revealQuote}>{edge.line}</p>
          <button className={ui.btnPrimary} onClick={() => setStep(3)}>
            Continue <ArrowRight size={20} />
          </button>
          <Dots active={2} />
        </div>
      </Shell>
    );
  }

  // ── Step 3 · First FINISHER Focus ─────────────────────────
  if (step === 3) {
    return (
      <Shell showAudio={false}>
        {guide}
        <div className={styles.reveal}>
          <div className={styles.revealKicker}>
            <Target size={14} /> Your First FINISHER Focus
          </div>
          <div className={styles.letterBadge}>{letterGlyph}</div>
          <div className={styles.letterWord}>{letterWord}</div>
          {currentMission && (
            <>
              <div className={styles.unlockLabel}>Mission Unlocked</div>
              <div className={styles.unlockTitle}>{currentMission.title}</div>
            </>
          )}
          <button className={ui.btnPrimary} onClick={() => setStep(4)}>
            See Full Result <ArrowRight size={20} />
          </button>
          <Dots active={3} />
        </div>
      </Shell>
    );
  }

  // ── Step 4 · Full result card (identity first, chart below fold) ──
  return (
    <Shell showAudio={false}>
      {guide}
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

      {mirrorScores && (
        <div className={styles.scores}>
          <div className={styles.scoresLabel}>Your Six Dimensions</div>
          {DIMENSIONS.map((d) => {
            const pct = (mirrorScores[d] / MAX_SCORE) * 100;
            const cls = d === Anchor ? styles.meterHigh : d === Edge ? styles.meterLow : '';
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

      <div className={styles.cta}>
        <button className={ui.btnPrimary} onClick={() => navigate('mission')}>
          Start The Mission <ArrowRight size={20} />
        </button>
      </div>
    </Shell>
  );
}
