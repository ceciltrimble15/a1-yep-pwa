import { useState } from 'react';
import { Send } from 'lucide-react';
import { getProgramContent } from '../data/pilotContent';
import { useYEP, XP } from '../context/YEPContext';
import Shell from '../components/Shell';
import styles from './Reflection.module.css';
import ui from '../styles/ui.module.css';

const MIN = 12;

export default function Reflection() {
  const { currentMission, submitReflection, mode, reflection: savedReflection } = useYEP();
  const { reflection } = getProgramContent(mode);
  const [text, setText] = useState(savedReflection);
  const ready = text.trim().length >= MIN;

  return (
    <Shell>
      <div className={styles.eyebrow}>Reflection</div>
      <h1 className={styles.title}>
        {reflection.title}
      </h1>
      <p className={styles.sub}>
        {reflection.prompt}
      </p>

      <div className={styles.prompt}>
        {currentMission
          ? `What did "${currentMission.title}" teach you about yourself?`
          : 'What did this mission teach you about yourself?'}
      </div>

      <textarea
        className={styles.area}
        placeholder={reflection.placeholder}
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className={styles.meta}>
        <span className={styles.count}>{text.trim().length} chars</span>
        {!ready && <span className={styles.hint}>Write at least a sentence.</span>}
      </div>

      <button
        className={ui.btnPrimary}
        onClick={() => submitReflection(text.trim())}
        disabled={!ready}
      >
        <Send size={18} /> Submit Reflection · +{XP.REFLECTION} XP
      </button>
    </Shell>
  );
}
