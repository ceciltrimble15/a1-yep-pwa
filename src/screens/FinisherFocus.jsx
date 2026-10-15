import { useYEP } from '../context/YEPContext';
import { proofDescription, proofStatus } from '../data/proofEvidence';
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
      <p className={styles.sub}>Your saved work and the next step you choose, together in one place.</p>
      <div className={styles.stack}>
        <section className={styles.card}>
          <h2>Daily Quest → {dailyQuest.finisher}</h2>
          <p>{proofStatus(pilotProgress, 'dailyQuest')}</p>
          <p>{proofDescription(pilotProgress, 'dailyQuest') || 'No Daily Quest response saved yet.'}</p>
        </section>
        <section className={styles.card}>
          <h2>S.T.E.M.Sin → {stemSin.finisher}</h2>
          <p>{proofStatus(pilotProgress, 'stemSin')}</p>
          <p>{proofDescription(pilotProgress, 'stemSin') || 'No S.T.E.M.Sin response saved yet.'}</p>
        </section>
        <section className={styles.card}>
          <h2>Mirror Reflection / chosen FINISHER action</h2>
          <p>Mirror: {mirrorResult ? 'Your check-in is saved' : 'Not completed yet'}</p>
          <p>FINISHER choice: {currentMission?.title || 'Choose your next experience'}</p>
          <p>{currentMission?.objective || 'Your interest and your next step belong to you.'}</p>
        </section>
        <section className={styles.card}>
          <h2>FINISHER mission status</h2>
          <p>{currentMission ? (missionComplete ? 'Practice checklist marked' : 'Chosen — not completed') : 'No action chosen'}</p>
          {currentMission && <p>{currentMission.title}</p>}
        </section>
      </div>
      <div className={styles.actions}>
        <button className={ui.btnPrimary}  onClick={() => navigate('mission')}>Choose or Continue FINISHER</button>
        {!mirrorResult && <button className={ui.btnGhost} onClick={() => navigate('mirrorIntro')}>Open My Mirror</button>}
        <button className={ui.btnGhost} onClick={() => navigate('home')}>Back To Program Home</button>
      </div>
    </Shell>
  );
}
