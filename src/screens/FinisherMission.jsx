import { Check, Flag, ArrowRight } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import Shell from '../components/Shell';
import YEPGuide from '../components/YEPGuide';
import styles from './FinisherMission.module.css';
import ui from '../styles/ui.module.css';

export default function FinisherMission() {
  const { currentMission, missionStepsDone, toggleMissionStep, completeMission, missionComplete, navigate } = useYEP();

  if (!currentMission) {
    return (
      <Shell showAudio={false}>
        <YEPGuide step={1} prompt="No mission is assigned yet. Start the Mirror, answer honestly, then we will walk through your FINISHER mission together." actionLabel="Start My Mirror" onAction={() => navigate('mirrorIntro')} />
      </Shell>
    );
  }

  const m = currentMission;
  const allDone = m.steps.every((_, i) => missionStepsDone[i]);
  const nextStep = m.steps.findIndex((_, i) => !missionStepsDone[i]);
  const guidePrompt = allDone
    ? 'You marked every mission step as done. Check that you actually did the work, then reflect on what you learned.'
    : `Your next action is step ${nextStep + 1}: ${m.steps[nextStep]} Mark it only after you have done it. I will then point you to the next step.`;
  function followGuide() {
    if (allDone) { completeMission(); return; }
    const next = document.getElementById(`mission-step-${nextStep}`);
    next?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    next?.focus({ preventScroll: true });
  }

  return (
    <Shell showAudio={false}>
      <div className={styles.eyebrow}>FINISHER Mission</div>
      <h1 className={styles.title}>{m.title}</h1>
      <p className={styles.objective}>{m.objective}</p>

      <YEPGuide title={allDone ? 'Think about what you learned' : 'Try this mission step'} example={m.activeApproach} step={allDone ? 'REFLECT' : `${nextStep + 1} OF ${m.steps.length}`} prompt={guidePrompt} actionLabel={allDone ? 'Reflect On My Mission' : 'Show My Next Step'} onAction={followGuide} />

      <div className={styles.letterTag}>
        <span className={styles.letterBadge}>{m.finisherLetter[0]}</span>
        <span className={styles.letterText}>FINISHER: {m.finisherLetter}</span>
      </div>

      <div className={styles.approach}>
        <div className={styles.approachLabel}>Your {m.style} Approach</div>
        <div className={styles.approachText}>{m.activeApproach}</div>
      </div>

      <div className={styles.stepsLabel}>Mission Steps</div>
      <div className={styles.steps}>
        {m.steps.map((step, i) => {
          const isDone = !!missionStepsDone[i];
          return (
            <button
              key={i}
              id={`mission-step-${i}`}
              aria-pressed={isDone}
              aria-current={i === nextStep ? 'step' : undefined}
              className={`${styles.step} ${isDone ? styles.stepDone : ''}`}
              onClick={() => toggleMissionStep(i)}
            >
              <span className={`${styles.check} ${isDone ? styles.checkDone : ''}`}>
                {isDone && <Check size={15} strokeWidth={3} />}
              </span>
              <span className={styles.stepText}>{step}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.focus}>
        <div className={styles.focusLabel}>Focus</div>
        <div className={styles.focusText}>{m.focus}</div>
      </div>

      <div className={styles.cta}>
        <button className={ui.btnPrimary} onClick={completeMission} disabled={!allDone}>
          <Flag size={19} /> {missionComplete ? 'Continue To Reflection' : 'Mark Mission Complete'} <ArrowRight size={19} />
        </button>
      </div>
    </Shell>
  );
}
