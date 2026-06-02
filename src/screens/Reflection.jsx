import { useState } from 'react';
import { Send } from 'lucide-react';
import { useYEP, XP } from '../context/YEPContext';
import Shell from '../components/Shell';
import styles from './Reflection.module.css';
import ui from '../styles/ui.module.css';

const MIN = 12;

export default function Reflection() {
  const { currentMission, submitReflection } = useYEP();
  const [text, setText] = useState('');
  const ready = text.trim().length >= MIN;

  return (
    <Shell>
      <div className={styles.eyebrow}>Reflection</div>
      <h1 className={styles.title}>
        Lock It <em>In.</em>
      </h1>
      <p className={styles.sub}>
        The work means nothing until you name what it taught you. This is how it sticks.
      </p>

      <div className={styles.prompt}>
        {currentMission
          ? `What did "${currentMission.title}" teach you about yourself?`
          : 'What did this mission teach you about yourself?'}
      </div>

      <textarea
        className={styles.area}
        placeholder="Be honest. No one is grading this — you are."
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
