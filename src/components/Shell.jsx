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
          <div>
            <div className={styles.brandText}>
              A/1 <em>{program.program}</em>
            </div>
            <div className={styles.tagline}>{program.programName} · {program.ageRange}</div>
          </div>
        </div>
      </header>
      {showBar && <GlobalBar />}
      <main className={styles.content}>{children}</main>
    </div>
  );
}
