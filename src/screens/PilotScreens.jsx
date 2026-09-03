import { useState } from 'react';
import { DAILY_QUEST, WEEKLY_MODULE, BOSS_CHALLENGE, MENTOR_SPOTLIGHT, PILOT_BADGES } from '../data/pilotContent';
import { useYEP } from '../context/YEPContext';
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
  const { navigate } = useYEP();
  return <button className={ui.btnGhost} onClick={() => navigate('home')}>Back To YEP Home</button>;
}

export function DailyQuest() {
  const { pilotProgress, completeDailyQuest } = useYEP();
  const [text, setText] = useState(pilotProgress.dailyQuestText);

  return (
    <Shell>
      <ScreenHead eyebrow="Daily Quest" title={DAILY_QUEST.title} sub={DAILY_QUEST.prompt} />
      <div className={styles.card}>
        <div className={styles.label}>FINISHER Focus</div>
        <div className={styles.value}>{DAILY_QUEST.finisher}</div>
      </div>
      <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="Write your problem and one possible solution..." />
      <div className={styles.actions}>
        <button className={ui.btnPrimary} disabled={!text.trim()} onClick={() => completeDailyQuest(text)}>
          {pilotProgress.dailyQuestComplete ? 'Update Completed Quest' : 'Complete Daily Quest'}
        </button>
        <BackHome />
      </div>
    </Shell>
  );
}

export function WeeklyModule() {
  const { pilotProgress, toggleWeeklyActivity } = useYEP();
  const allDone = WEEKLY_MODULE.activities.every((a) => pilotProgress.weeklyCompleted.includes(a.id));

  return (
    <Shell>
      <ScreenHead eyebrow="Weekly Module" title={WEEKLY_MODULE.title} sub={WEEKLY_MODULE.description} />
      <div className={styles.stack}>
        {WEEKLY_MODULE.activities.map((activity) => {
          const done = pilotProgress.weeklyCompleted.includes(activity.id);
          return (
            <button key={activity.id} className={styles.activity} onClick={() => toggleWeeklyActivity(activity.id)}>
              <span className={`${styles.check} ${done ? styles.checkDone : ''}`}>{done ? '✓' : ''}</span>
              <span>
                <span className={styles.cardTitle}>{activity.title}</span>
                <span className={styles.cardText}>{activity.text}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className={styles.note}>{allDone ? 'Week 1 sample module complete. Identity Builder badge unlocked.' : 'Complete all three activities to finish this pilot module.'}</div>
      <div className={styles.actions}><BackHome /></div>
    </Shell>
  );
}

export function BossChallenge() {
  const { pilotProgress, completeBossChallenge } = useYEP();
  const [text, setText] = useState(pilotProgress.bossText);

  return (
    <Shell>
      <ScreenHead eyebrow="Boss Challenge" title={BOSS_CHALLENGE.title} sub={BOSS_CHALLENGE.prompt} />
      <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="Write the four points of your 60-second solution..." />
      <div className={styles.actions}>
        <button className={ui.btnPrimary} disabled={!text.trim()} onClick={() => completeBossChallenge(text)}>
          {pilotProgress.bossComplete ? 'Update Boss Challenge' : 'Complete Boss Challenge'}
        </button>
        <BackHome />
      </div>
    </Shell>
  );
}

export function MentorSpotlight() {
  const { pilotProgress, saveMentorQuestion } = useYEP();
  const [question, setQuestion] = useState(pilotProgress.mentorQuestion);

  return (
    <Shell>
      <ScreenHead eyebrow="Mentor Spotlight" title={MENTOR_SPOTLIGHT.title} sub={MENTOR_SPOTLIGHT.body} />
      <div className={styles.card}>
        <div className={styles.cardTitle}>Your Mentor Question</div>
        <div className={styles.cardText}>{MENTOR_SPOTLIGHT.challenge}</div>
      </div>
      <textarea className={styles.textarea} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What would you ask a mentor?" />
      <div className={styles.actions}>
        <button className={ui.btnPrimary} disabled={!question.trim()} onClick={() => saveMentorQuestion(question)}>Save Mentor Question</button>
        <BackHome />
      </div>
    </Shell>
  );
}

export function Rewards() {
  const { pilotBadges } = useYEP();

  return (
    <Shell>
      <ScreenHead eyebrow="Rewards" title="Pilot Badge Log" sub="Badges are earned by completing real pilot actions. No purchase or cash value is attached in this V1 test." />
      <div className={styles.badgeGrid}>
        {PILOT_BADGES.map((badge) => {
          const unlocked = pilotBadges.includes(badge.id);
          return (
            <div key={badge.id} className={`${styles.badge} ${unlocked ? '' : styles.badgeLocked}`}>
              <div className={styles.cardTitle}>{unlocked ? '✓ ' : '○ '}{badge.name}</div>
              <div className={styles.cardText}>{badge.unlock}</div>
              <span className={`${styles.status} ${unlocked ? styles.done : ''}`}>{unlocked ? 'Unlocked' : 'Locked'}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.actions}><BackHome /></div>
    </Shell>
  );
}

export function Profile() {
  const { powerName, track, xp, mirrorResult, pilotBadges, pilotProgress } = useYEP();
  const weeklyDone = pilotProgress.weeklyCompleted.length;

  return (
    <Shell>
      <ScreenHead eyebrow="Participant Profile" title={powerName || 'Your YEP Profile'} sub="Pilot profile data is stored on this device for testing. Do not use real sensitive youth information in this build." />
      <div className={styles.profileGrid}>
        <div className={styles.card}><div className={styles.label}>Power Name</div><div className={styles.value}>{powerName || 'Not set'}</div></div>
        <div className={styles.card}><div className={styles.label}>Track</div><div className={styles.value}>{track?.name || 'Not set'}</div></div>
        <div className={styles.card}><div className={styles.label}>Mirror XP</div><div className={styles.value}>{xp}</div></div>
        <div className={styles.card}><div className={styles.label}>Anchor</div><div className={styles.value}>{mirrorResult?.Anchor || 'Not completed'}</div></div>
        <div className={styles.card}><div className={styles.label}>Pilot Badges</div><div className={styles.value}>{pilotBadges.length} / {PILOT_BADGES.length}</div></div>
        <div className={styles.card}><div className={styles.label}>Weekly Activities</div><div className={styles.value}>{weeklyDone} / {WEEKLY_MODULE.activities.length}</div></div>
      </div>
      <div className={styles.actions}><BackHome /></div>
    </Shell>
  );
}

export function AdminReview() {
  const { activeYouth, pilotProgress, pilotBadges, navigate } = useYEP();
  const weeklyComplete = pilotProgress.weeklyCompleted.length >= WEEKLY_MODULE.activities.length;

  return (
    <Shell>
      <ScreenHead eyebrow="Admin Review" title="Tablet Pilot Readout" sub="This screen reviews the active device pilot record only. It is not the final source-of-truth backend." />
      <div className={styles.profileGrid}>
        <div className={styles.card}><div className={styles.label}>Participant</div><div className={styles.value}>{activeYouth.name}</div></div>
        <div className={styles.card}><div className={styles.label}>Daily Quest</div><div className={styles.value}>{pilotProgress.dailyQuestComplete ? 'Complete' : 'Open'}</div></div>
        <div className={styles.card}><div className={styles.label}>Weekly Module</div><div className={styles.value}>{weeklyComplete ? 'Complete' : `${pilotProgress.weeklyCompleted.length}/3`}</div></div>
        <div className={styles.card}><div className={styles.label}>Boss Challenge</div><div className={styles.value}>{pilotProgress.bossComplete ? 'Complete' : 'Open'}</div></div>
        <div className={styles.card}><div className={styles.label}>Badges</div><div className={styles.value}>{pilotBadges.length}</div></div>
        <div className={styles.card}><div className={styles.label}>Mirror / FINISHER Loop</div><div className={styles.value}>{activeYouth.reflectionSubmitted ? 'Complete' : 'Not complete'}</div></div>
      </div>
      <div className={styles.note}>The existing Facilitator Dashboard remains available as a separate demo view. Seeded youth records there are demonstration data, not real participants.</div>
      <div className={styles.actions}>
        <button className={ui.btnPrimary} onClick={() => navigate('dashboard')}>Open Facilitator Demo</button>
        <BackHome />
      </div>
    </Shell>
  );
}
