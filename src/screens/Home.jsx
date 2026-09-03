import { ScanFace } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
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
  const { powerName, navigate, pilotProgress, pilotBadges, mirrorResult } = useYEP();
  const weeklyDone = pilotProgress.weeklyCompleted.length >= 3;

  return (
    <Shell>
      <div className={styles.head}>
        <div className={styles.eyebrow}>YEP V1 Tablet Pilot</div>
        <h1 className={styles.title}>{powerName ? `Welcome, ${powerName}.` : 'Welcome To YEP.'}</h1>
        <p className={styles.sub}>
          This pilot proves the core YEP experience on a real device: identity, action, reflection, progress, rewards, mentor thinking, and admin review.
        </p>
      </div>

      <div className={styles.grid}>
        <HubCard
          title="Daily Quest"
          text="Complete one real-world action and save the result on this device."
          status={pilotProgress.dailyQuestComplete ? 'Complete' : 'Start'}
          done={pilotProgress.dailyQuestComplete}
          onClick={() => navigate('dailyQuest')}
        />
        <HubCard
          title="Weekly Module"
          text="Run the Focus & Identity sample module built around Power Name, Why, and Identity Map."
          status={weeklyDone ? 'Complete' : `${pilotProgress.weeklyCompleted.length}/3 Done`}
          done={weeklyDone}
          onClick={() => navigate('weeklyModule')}
        />
        <HubCard
          title="Boss Challenge"
          text="Build and practice a 60-second solution to a real problem."
          status={pilotProgress.bossComplete ? 'Complete' : 'Open'}
          done={pilotProgress.bossComplete}
          onClick={() => navigate('bossChallenge')}
        />
        <HubCard
          title="Mentor Spotlight"
          text="Learn what a mentor does and save one question you would bring to a mentor."
          status={pilotProgress.mentorQuestion ? 'Question Saved' : 'Open'}
          done={!!pilotProgress.mentorQuestion}
          onClick={() => navigate('mentorSpotlight')}
        />
        <HubCard
          title="Rewards / Badges"
          text="See which pilot badges were actually earned from completed actions."
          status={`${pilotBadges.length}/3 Unlocked`}
          done={pilotBadges.length === 3}
          onClick={() => navigate('rewards')}
        />
        <HubCard
          title="Participant Profile"
          text="Review Power Name, track, Mirror result, XP, and pilot progress."
          status="View"
          onClick={() => navigate('profile')}
        />
        <HubCard
          title="The Mirror + FINISHER"
          text="Run the existing assessment → mission → reflection → XP behavior loop."
          status={mirrorResult ? 'Started' : 'Start'}
          done={!!mirrorResult}
          onClick={() => navigate('mirrorIntro')}
        />
        <HubCard
          title="Admin Review"
          text="Review the active tablet pilot record and open the facilitator demo."
          status="Review"
          onClick={() => navigate('adminReview')}
        />
      </div>

      <div className={styles.note}>
        <ScanFace size={17} style={{ verticalAlign: '-3px', marginRight: 6 }} />
        Pilot rule: use sample or non-sensitive information only until intake, consent, privacy, and permissions are approved for real youth data.
      </div>
    </Shell>
  );
}
