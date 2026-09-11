import { useState } from 'react';
import { Send } from 'lucide-react';
import { useYEP, XP } from '../context/YEPContext';
import Shell from '../components/Shell';
import styles from './Reflection.module.css';
import ui from '../styles/ui.module.css';

const MIN = 12;

export default function Reflection() {
  const { currentMission, submitReflection, copy } = useYEP();
  const c = copy.reflection;
  const [text, setText] = useState('');
  const ready = text.trim().length >= MIN;

  return (
    <Shell>
      <div className={styles.eyebrow}>{c.eyebrow}</div>
      <h1 className={styles.title}>
        Lock It <em>{c.titleEm}</em>
      </h1>
      <p className={styles.sub}>{c.sub}</p>

      <div className={styles.prompt}>
        {currentMission ? c.promptKnown(currentMission.title) : c.promptNew}
      </div>

      <textarea
        className={styles.area}
        placeholder={c.placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.meta}>
        <span className={styles.count}>{text.trim().length} chars</span>
        {!ready && <span className={styles.hint}>{c.hint}</span>}
      </div>

      <button
        className={ui.btnPrimary}
        onClick={() => submitReflection(text.trim())}
        disabled={!ready}
      >
        <Send size={18} /> {c.submitCta} · +{XP.REFLECTION} XP
      </button>
    </Shell>
  );
}
