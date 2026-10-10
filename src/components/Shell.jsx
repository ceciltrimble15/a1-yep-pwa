import { useRef } from 'react';
import { Flag, FlaskConical, ScanFace, Sparkles } from 'lucide-react';
import GlobalBar from './GlobalBar';
import AudioGuide from './AudioGuide';
import { useYEP } from '../context/YEPContext';
import { MODES } from '../data/modes';
import styles from './Shell.module.css';

const A1_LOGO = '/a1-suppliers-logo.png';

const RAIL_ITEMS = [
  { key: 'daily', label: 'Daily Quest', screen: 'dailyQuest', icon: Sparkles },
  { key: 'stem', label: 'S.T.E.M.Sin', screen: 'stemSin', icon: FlaskConical },
  { key: 'mirror', label: 'Mirror Results', screen: 'mirrorIntro', icon: ScanFace },
  { key: 'finisher', label: 'FINISHER Mission', screen: 'mission', icon: Flag },
];

function isRailActive(screen, key) {
  if (key === 'daily') return screen === 'dailyQuest';
  if (key === 'stem') return screen === 'stemSin';
  if (key === 'mirror') return ['mirrorIntro', 'mirror', 'results'].includes(screen);
  if (key === 'finisher') return ['finisherFocus', 'mission', 'reflection', 'progress'].includes(screen);
  return false;
}

export default function Shell({ children, showBar = true, showAudio = true, showPathway = true, visualHome = false }) {
  const { mode, screen, navigate, mirrorResult, pilotProgress, missionComplete, reflectionSubmitted } = useYEP();
  const program = MODES[mode] || MODES.builder;
  const audioTargetRef = useRef(null);
  const savedSteps = { daily: pilotProgress.dailyQuestComplete, stem: pilotProgress.stemSinComplete, mirror: !!mirrorResult, finisher: missionComplete && reflectionSubmitted };

  return (
    <div className={`${styles.shell} ${visualHome ? styles.visualHome : ''}`}>
      <header className={styles.header} data-audio-skip="true">
        <div className={styles.brand}>
          <img className={styles.mark} src={A1_LOGO} alt="A/1 Suppliers" />
          <div className={styles.wordmark}>
            <div className={styles.organization}>A/1 SUPPLIERS</div>
            <div className={styles.programMark}>
              <strong>YEP</strong><span>/</span><strong>Y.A.E.P.</strong><span className={styles.processName}>· THE PROCESS</span>
            </div>
            <div className={styles.motto}>Supplying the Tools. Supporting the Hustle.</div>
            <div className={styles.founder}>Cecil Trimble · Founder & CEO</div>
          </div>
        </div>

        {showPathway && (
          <div className={styles.activePathway} aria-label={`Active pathway: ${program.program}, ${program.label}`}>
            <span>ACTIVE PATHWAY</span>
            <strong>{program.program}</strong>
            <small>{program.label} · {program.ageRange}</small>
          </div>
        )}
      </header>

      <div className={styles.appFrame}>
        <aside className={styles.tabletRail} data-audio-skip="true" aria-label="YEP primary lanes">
          <div className={styles.railBrand}>
            <img src={A1_LOGO} alt="" />
            <div>
              <strong>A/1 Suppliers</strong>
              <span>YEP</span>
              <small>Young Entrepreneurs Process</small>
            </div>
          </div>

          <button type="button" className={styles.homeButton} onClick={() => navigate('home')}>Program Home</button>
          <nav className={styles.railNav}>
            {RAIL_ITEMS.map((item, index) => {
              const Icon = item.icon;
              const active = isRailActive(screen, item.key);
              return (
                <button
                  key={item.key}
                  type="button"
                  aria-label={item.label}
                  aria-current={active ? 'page' : undefined}
                  className={active ? styles.railButtonActive : styles.railButton}
                  onClick={() => navigate(item.key === 'mirror' && mirrorResult ? 'results' : item.screen)}
                >
<b className={styles.railNumber} aria-hidden="true">{index + 1}</b>
                  <span>{item.label}<small>{savedSteps[item.key] ? 'Saved' : active ? 'Current step' : 'Open'}</small></span>
                </button>
              );
            })}
          </nav>

          <div className={styles.railPath}>
            <span>ACTIVE PATHWAY</span>
            <strong>{program.program}</strong>
            <small>{program.label} · Ages {program.ageRange}</small>
          </div>

          <div className={styles.railClose}>
            <strong>Same core process.</strong>
            <span>Try → Solve → Reflect → Finish</span>
          </div>
        </aside>

        <div className={styles.mainColumn}>
          {showBar && <div data-audio-skip="true"><GlobalBar /></div>}
          {showAudio && <AudioGuide targetRef={audioTargetRef} />}
          <main ref={audioTargetRef} className={styles.content}>{children}</main>
        </div>
      </div>
    </div>
  );
}
