import { ScanFace } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { MODES } from '../data/modes';
import { getProgramContent } from '../data/pilotContent';
import Shell from '../components/Shell';
import styles from './PilotScreens.module.css';

function HubCard({ title, text, status, done, onClick }) {
  return (
    <button className={styles.card} onClick={onClick}>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardText}>{text}</div>
      {status && <span className={`${styles.status} ${done ? styles.done : ''}`}>{status}</span>}
    </button>
  );
}

export default function Home() {
  const { powerName, navigate, pilotProgress, pilotBadges, mirrorResult, mode } = useYEP();
  const program = MODES[mode] || MODES.builder;
  const { weeklyModule, stemSin } = getProgramContent(mode);
  const weeklyDone = pilotProgress.weeklyCompleted.length >= weeklyModule.activities.length;

  return (
    <Shell>
      <div className={styles.head}>
        <div className={styles.eyebrow}>{program.program} · {program.label}</div>
        <h1 className={styles.title}>{powerName ? `Welcome, ${powerName}.` : `Welcome To ${program.program}.`}</h1>
        <p className={styles.sub}>
          This proof connects workbook thinking to tablet action, saved progress, rewards, reflection, and facilitator review.
        </p>
      </div>

      <div className={styles.note}>
        <strong>Proof Flow:</strong> Workbook entry → matching app action → saved progress → badge/status → Admin Review.
      </div>

      <div className={styles.grid}>
        <HubCard
          title="Daily Quest"
          text={mode === 'yaep' ? 'Identify a real opportunity and record the value you could create.' : 'Complete one real-world action and save the result on this device.'}
          status={pilotProgress.dailyQuestComplete ? 'Complete' : 'Start'}
          done={pilotProgress.dailyQuestComplete}
          onClick={() => navigate('dailyQuest')}
        />
        <HubCard
          title="Weekly Module"
          text={`Run the ${weeklyModule.title} proof module.`}
          status={weeklyDone ? 'Complete' : `${pilotProgress.weeklyCompleted.length}/${weeklyModule.activities.length} Done`}
          done={weeklyDone}
          onClick={() => navigate('weeklyModule')}
        />
        <HubCard
          title="S.T.E.M.Sin Technology Quest"
          text={stemSin.title}
          status={pilotProgress.stemSinComplete ? 'Complete' : 'Open'}
          done={pilotProgress.stemSinComplete}
          onClick={() => navigate('stemSin')}
        />
        <HubCard
          title="Boss Challenge"
          text={mode === 'yaep' ? 'Build and practice a 60-second value pitch.' : 'Build and practice a 60-second solution to a real problem.'}
          status={pilotProgress.bossComplete ? 'Complete' : 'Open'}
          done={pilotProgress.bossComplete}
          onClick={() => navigate('bossChallenge')}
        />
        <HubCard
          title="Mentor Spotlight"
          text="Learn how mentorship strengthens decisions and save one question you would bring to a mentor."
          status={pilotProgress.mentorQuestion ? 'Question Saved' : 'Open'}
          done={!!pilotProgress.mentorQuestion}
          onClick={() => navigate('mentorSpotlight')}
        />
        <HubCard
          title="Rewards / Badges"
          text="See which proof badges were actually earned from completed actions."
          status={`${pilotBadges.length}/3 Unlocked`}
          done={pilotBadges.length === 3}
          onClick={() => navigate('rewards')}
        />
        <HubCard
          title="My Process / Profile"
          text="Review program, age pathway, Power Name, track, Mirror result, XP, S.T.E.M.Sin, and proof progress."
          status="View"
          onClick={() => navigate('profile')}
        />
        <HubCard
          title="The Mirror + FINISHER"
          text="Run the assessment → mission → reflection → XP behavior loop."
          status={mirrorResult ? 'Started' : 'Start'}
          done={!!mirrorResult}
          onClick={() => navigate('mirrorIntro')}
        />
        <HubCard
          title="Admin Review"
          text="Review the active tablet proof record and confirm which program pathway is being demonstrated."
          status="Review"
          onClick={() => navigate('adminReview')}
        />
      </div>

      <div className={styles.note}>
        <ScanFace size={17} style={{ verticalAlign: '-3px', marginRight: 6 }} />
        Proof rule: use sample or non-sensitive information only until intake, consent, privacy, and permissions are approved for real participant data.
      </div>
    </Shell>
  );
}
