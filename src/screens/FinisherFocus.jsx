import { useYEP } from '../context/YEPContext';
import { getProgramContent } from '../data/pilotContent';
import Shell from '../components/Shell';
import styles from './PilotScreens.module.css';
import ui from '../styles/ui.module.css';

export default function FinisherFocus() {
  const { mode, pilotProgress, mirrorResult, currentMission, missionComplete, navigate } = useYEP();
  const { dailyQuest, stemSin } = getProgramContent(mode);
  return (
    <Shell>
      <h1 className={styles.title}>FINISHER Focus</h1>
      <p className={styles.sub}>Your saved work and assigned direction, together in one place.</p>
      <div className={styles.stack}>
        <section className={styles.card}>
          <h2>Daily Quest → {dailyQuest.finisher}</h2>
          <p>{pilotProgress.dailyQuestComplete ? 'Complete' : 'Not completed'}</p>
          <p>{pilotProgress.dailyQuestText || 'No Daily Quest response saved yet.'}</p>
        </section>
        <section className={styles.card}>
          <h2>S.T.E.M.Sin → {stemSin.finisher}</h2>
          <p>{pilotProgress.stemSinComplete ? 'Complete' : 'Not completed'}</p>
          <p>{pilotProgress.stemSinText || 'No S.T.E.M.Sin response saved yet.'}</p>
        </section>
        <section className={styles.card}>
          <h2>Mirror Growth Edge / assigned FINISHER direction</h2>
          <p>Growth Edge: {mirrorResult?.Edge || 'Not assigned yet'}</p>
          <p>FINISHER direction: {currentMission?.finisherLetter || 'Not assigned yet'}</p>
          <p>{currentMission?.focus || mirrorResult?.Focus || 'Complete the existing Mirror to receive your direction.'}</p>
        </section>
        <section className={styles.card}>
          <h2>FINISHER mission status</h2>
          <p>{currentMission ? (missionComplete ? 'Complete' : 'Assigned — not completed') : 'No mission assigned'}</p>
          {currentMission && <p>{currentMission.title}</p>}
        </section>
      </div>
      <div className={styles.actions}>
        <button className={ui.btnPrimary} disabled={!currentMission} onClick={() => navigate('mission')}>Continue to My FINISHER Mission</button>
        {!currentMission && <button className={ui.btnGhost} onClick={() => navigate('mirrorIntro')}>Open the Existing Mirror</button>}
        <button className={ui.btnGhost} onClick={() => navigate('home')}>Back To Program Home</button>
      </div>
    </Shell>
  );
}
