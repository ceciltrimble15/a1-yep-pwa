import { useYEP } from '../context/YEPContext';
import { getProgramContent, PILOT_BADGES } from '../data/pilotContent';
import { MODES } from '../data/modes';
import Shell from '../components/Shell';
import styles from './PilotScreens.module.css';
import ui from '../styles/ui.module.css';

function ScreenHead({ eyebrow, title, sub }) {
  return (
    <div className={styles.head}>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <h1 className={styles.title}>{title}</h1>
      {sub && <p className={styles.sub}>{sub}</p>}
    </div>
  );
}

function BackHome() {
  const { setScreen } = useYEP();
  return <button className={ui.btnGhost} onClick={() => setScreen('home')}>Back To Program Home</button>;
}

function StatusCard({ label, value }) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value}</div>
    </div>
  );
}

function ProofCard({ label, status, text }) {
  return (
    <div className={styles.card}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{status}</div>
      <div className={styles.cardText}>{text || 'No saved response yet.'}</div>
    </div>
  );
}

export function DemoWeeklyModule() {
  const { pilotProgress, toggleWeeklyActivity, mode } = useYEP();
  const { weeklyModule, instructions, example, expectations } = getProgramContent(mode);
  const allDone = weeklyModule.activities.every((a) => pilotProgress.weeklyCompleted.includes(a.id));

  return (
    <Shell>
      <ScreenHead eyebrow={`${MODES[mode]?.program || 'YEP'} · Weekly Module`} title={weeklyModule.title} sub={weeklyModule.description} />
      <div className={styles.note}><p>{instructions}</p><p><strong>Example:</strong> {example}</p><p>{expectations}</p></div>
      <div className={styles.note}><strong>Workbook ↔ App:</strong> Work each matching workbook activity first. Mark it complete here only after the participant has actually done the corresponding work.</div>
      <div className={styles.stack}>
        {weeklyModule.activities.map((activity) => {
          const done = pilotProgress.weeklyCompleted.includes(activity.id);
          return (
            <button
              key={activity.id}
              className={styles.activity}
              disabled={done}
              onClick={() => {
                if (!done) toggleWeeklyActivity(activity.id);
              }}
              aria-label={`${activity.title}${done ? ' complete' : ''}`}
            >
              <span className={`${styles.check} ${done ? styles.checkDone : ''}`}>{done ? '✓' : ''}</span>
              <span>
                <span className={styles.cardTitle}>{activity.title}</span>
                <span className={styles.cardText}>{activity.text}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className={styles.note}>
        {allDone
          ? 'Week 1 proof module complete. Identity Builder is locked for this demo participant until Reset Demo Participant is used.'
          : 'Complete all three activities to finish this demo module. Completed activities cannot be accidentally unchecked.'}
      </div>
      <div className={styles.actions}><BackHome /></div>
    </Shell>
  );
}

export function DemoProfile() {
  const {
    powerName,
    track,
    xp,
    mirrorResult,
    currentMission,
    missionComplete,
    reflectionSubmitted,
    finisherLetter,
    pilotBadges,
    pilotProgress,
    directionProfile,
    mode,
  } = useYEP();
  const program = MODES[mode] || MODES.builder;
  const { weeklyModule } = getProgramContent(mode);
  const weeklyDone = pilotProgress.weeklyCompleted.length;

  return (
    <Shell>
      <ScreenHead
        eyebrow={`${program.program} · My Process / Profile`}
        title={powerName || 'Your Process Profile'}
        sub="YEP / Y.A.E.P. Tablet Demo V0.5 — a participant-facing read on where you are in the Process. Use sample/non-sensitive data only."
      />
      <div className={styles.profileGrid}>
        <StatusCard label="Program" value={program.program} />
        <StatusCard label="Age Pathway" value={program.label} />
        <StatusCard label="Power Name" value={powerName || 'Not set'} />
        <StatusCard label="Track" value={track?.name || 'Not set'} />
        <StatusCard label="My Direction" value={directionProfile?.interest || 'Not explored yet'} />
        <StatusCard label="Why It Interests Me" value={directionProfile?.why || 'Not recorded yet'} />
        <StatusCard label="Mirror Anchor" value={mirrorResult?.Anchor || 'Not completed'} />
        <StatusCard label="Mirror Growth Edge" value={mirrorResult?.Edge || 'Not completed'} />
        <StatusCard label="Learning Style" value={mirrorResult?.Style || 'Not completed'} />
        <StatusCard label="Assigned FINISHER Direction" value={finisherLetter || mirrorResult?.Edge || 'Not assigned'} />
        <StatusCard label="FINISHER Mission" value={currentMission ? `${missionComplete ? 'Complete' : 'Assigned'} — ${currentMission.title}` : 'Not assigned'} />
        <StatusCard label="Daily Quest" value={pilotProgress.dailyQuestComplete ? 'Complete' : 'Open'} />
        <StatusCard label="Week 1" value={`${weeklyDone} / ${weeklyModule.activities.length} complete`} />
        <StatusCard label="S.T.E.M.Sin" value={pilotProgress.stemSinComplete ? 'Complete' : 'Open'} />
        <StatusCard label="Boss Challenge" value={pilotProgress.bossComplete ? 'Complete' : 'Open'} />
        <StatusCard label="Mentor Question" value={pilotProgress.mentorQuestion ? 'Saved' : 'Open'} />
        <StatusCard label="Reflection" value={reflectionSubmitted ? 'Submitted' : 'Open'} />
        <StatusCard label="Mirror XP" value={xp} />
        <StatusCard label="Proof Badges" value={`${pilotBadges.length} / ${PILOT_BADGES.length}`} />
      </div>
      <div className={styles.note}>My Process answers one question: <strong>Where am I in my Process?</strong></div>
      <div className={styles.actions}><BackHome /></div>
    </Shell>
  );
}

export function DemoAdminReview() {
  const {
    activeYouth,
    pilotProgress,
    pilotBadges,
    currentMission,
    missionComplete,
    reflectionSubmitted,
    finisherLetter,
    mirrorResult,
    directionProfile,
    setScreen,
    mode,
  } = useYEP();
  const program = MODES[mode] || MODES.builder;
  const { weeklyModule } = getProgramContent(mode);
  const weeklyComplete = pilotProgress.weeklyCompleted.length >= weeklyModule.activities.length;

  return (
    <Shell>
      <ScreenHead
        eyebrow="Admin Review · Demo V0.5"
        title="Workbook + Tablet Proof Readout"
        sub="Read-only review of the active tablet demo record. This is not the final multi-user source-of-truth backend."
      />
      <div className={styles.profileGrid}>
        <StatusCard label="Program" value={program.program} />
        <StatusCard label="Pathway" value={program.label} />
        <StatusCard label="Participant / Power Name" value={activeYouth.powerName || activeYouth.name} />
        <StatusCard label="My Direction" value={directionProfile?.interest || 'Not explored yet'} />
        <StatusCard label="Direction Reason" value={directionProfile?.why || 'Not recorded yet'} />
        <StatusCard label="Week 1" value={weeklyComplete ? 'Complete' : `${pilotProgress.weeklyCompleted.length}/${weeklyModule.activities.length} complete`} />
        <StatusCard label="Badges" value={`${pilotBadges.length} / ${PILOT_BADGES.length}`} />
        <StatusCard label="Mirror Anchor" value={mirrorResult?.Anchor || 'Not completed'} />
        <StatusCard label="Growth Edge" value={mirrorResult?.Edge || 'Not completed'} />
        <StatusCard label="Learning Style" value={mirrorResult?.Style || 'Not completed'} />
        <StatusCard label="Assigned FINISHER Direction" value={finisherLetter || mirrorResult?.Edge || 'Not assigned'} />
        <StatusCard label="FINISHER Mission" value={currentMission ? `${missionComplete ? 'Complete' : 'Assigned'} — ${currentMission.title}` : 'Not assigned'} />
        <StatusCard label="Reflection" value={reflectionSubmitted ? 'Submitted' : 'Open'} />
      </div>

      <div className={styles.stack}>
        <ProofCard label="Daily Quest Proof" status={pilotProgress.dailyQuestComplete ? 'Complete' : 'Open'} text={pilotProgress.dailyQuestText} />
        <ProofCard label="S.T.E.M.Sin Proof" status={pilotProgress.stemSinComplete ? 'Complete' : 'Open'} text={pilotProgress.stemSinText} />
        <ProofCard label="Boss Challenge Proof" status={pilotProgress.bossComplete ? 'Complete' : 'Open'} text={pilotProgress.bossText} />
        <ProofCard label="Mentor Question Proof" status={pilotProgress.mentorQuestion ? 'Saved' : 'Open'} text={pilotProgress.mentorQuestion} />
      </div>

      <div className={styles.note}>
        Week 1 currently stores completion IDs, not the participant's full written workbook responses. This demo shows only evidence actually persisted by the tablet.
      </div>
      <div className={styles.note}>Admin Review answers one question: <strong>Show me the evidence behind what this participant completed.</strong></div>
      <div className={styles.actions}>
        <button className={ui.btnPrimary} onClick={() => setScreen('dashboard')}>Open Facilitator Demo</button>
        <BackHome />
      </div>
    </Shell>
  );
}

export function ResetDemo() {
  const { resetSession, setScreen } = useYEP();
  return (
    <Shell>
      <ScreenHead
        eyebrow="Tablet Demo V0.5 · Safety Gate"
        title="Reset Demo Participant"
        sub="This is the destructive reset for the current local tablet demo record."
      />
      <div className={styles.note}>
        <strong>This will permanently clear the participant's locally saved demo progress from this tablet</strong>, including identity, My Direction, four-lane activity progress, Mirror/FINISHER progress, badges, responses, reflection, and XP. This cannot be undone.
      </div>
      <div className={styles.note}>The app stays installed. The tablet returns to the clean pathway/start screen for the next tester.</div>
      <div className={styles.actions}>
        <button className={ui.btnGhost} onClick={() => setScreen('home')}>Cancel</button>
        <button className={ui.btnPrimary} onClick={resetSession}>Reset & Clear Demo</button>
      </div>
    </Shell>
  );
}
