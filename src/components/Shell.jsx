import GlobalBar from './GlobalBar';
import { useYEP } from '../context/YEPContext';
import { MODES } from '../data/modes';
import styles from './Shell.module.css';

export default function Shell({ children, showBar = true }) {
  const { mode } = useYEP();
  const program = MODES[mode] || MODES.builder;

  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <img className={styles.mark} src="/logo.png" alt="A/1 Suppliers" />
          <div className={styles.wordmark}>
            <div className={styles.organization}>A/1 SUPPLIERS</div>
            <div className={styles.programMark}>
              <strong>YEP</strong><span>/</span><strong>Y.A.E.P.</strong><span className={styles.processName}>· THE PROCESS</span>
            </div>
            <div className={styles.motto}>Supplying the Tools. Supporting the Hustle.</div>
          </div>
        </div>

        <div className={styles.activePathway} aria-label={`Active pathway: ${program.program}, ${program.label}`}>
          <span>ACTIVE PATHWAY</span>
          <strong>{program.program}</strong>
          <small>{program.label} · {program.ageRange}</small>
        </div>
      </header>
      {showBar && <GlobalBar />}
      <main className={styles.content}>{children}</main>
    </div>
  );
}
