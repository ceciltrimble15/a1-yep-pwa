import GlobalBar from './GlobalBar';
import styles from './Shell.module.css';

/* App frame: brand header + global status bar + screen content. */
export default function Shell({ children, showBar = true }) {
  return (
    <div className={styles.shell}>
      <header className={styles.header}>
        <div className={styles.brand}>
          <img className={styles.mark} src="/logo.png" alt="A/1 Suppliers" />
          <div>
            <div className={styles.brandText}>
              A/1 <em>YEP</em>
            </div>
            <div className={styles.tagline}>Always Forward. Never Back.</div>
          </div>
        </div>
      </header>
      {showBar && <GlobalBar />}
      <main className={styles.content}>{children}</main>
    </div>
  );
}
