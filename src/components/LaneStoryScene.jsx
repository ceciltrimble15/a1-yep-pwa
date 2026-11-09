import { useEffect, useId, useRef, useState } from 'react';
import { ArrowRight, Check, Compass, Eye, Flag, Lightbulb, MessageCircle, Target } from 'lucide-react';
import styles from './LaneStoryScene.module.css';

export const MIRROR_STAGES = [
  { label: 'I NOTICED', title: 'See what mattered', cue: 'What caught your attention?', icon: Eye },
  { label: 'I EXPLORED', title: 'Remember the experience', cue: 'What did you actually see, ask or try?', icon: Compass },
  { label: 'I LEARNED', title: 'Find the lesson', cue: 'What do you understand now?', icon: Lightbulb },
  { label: 'MY NEXT MOVE', title: 'Grow from here', cue: 'What is one safe next step?', icon: ArrowRight },
];

export const FINISHER_STAGES = [
  { label: 'CHOOSE', title: 'Choose a useful goal', cue: 'What matters enough to work on?', icon: Target },
  { label: 'PLAN', title: 'Choose your path', cue: 'What will you do first, with the right support?', icon: Compass },
  { label: 'DO', title: 'Try the real step', cue: 'What did you actually try or complete?', icon: Check },
  { label: 'LEARN', title: 'Use the result', cue: 'What will you keep or change next time?', icon: Flag },
];

const AGE_SCENES = {
  explorer: { label: 'FOUNDATION · AGES 7–10', character: 'A curious young learner', voice: 'Show me. Try it. Tell me what happened.' },
  builder: { label: 'BUILDER · AGES 11–13', character: 'A growing problem-solver', voice: 'Try a version. Notice the result. Improve.' },
  leader: { label: 'MOMENTUM · AGES 14–17', character: 'A developing young entrepreneur', voice: 'Test the idea. Compare what actually changed.' },
  yaep: { label: 'Y.A.E.P. · AGES 18–24', character: 'An emerging business leader', voice: 'Decide with evidence. Execute. Reassess.' },
};

function LearnerFigure({ mode, x = 92, y = 116, scale = 1 }) {
  const mature = mode === 'leader' || mode === 'yaep';
  const adult = mode === 'yaep';
  const glasses = mode === 'builder';
  return <g transform={'translate(' + x + ' ' + y + ') scale(' + scale + ')'} aria-hidden="true"><g className={styles.learnerMotion}>
    <ellipse cx="92" cy="299" rx="104" ry="19" fill="#0a234a" opacity=".25" />
    <path d="M30 300Q25 209 56 169L85 148H128L165 178Q184 228 179 300Z" fill={adult ? '#152c53' : '#154a97'} stroke="#082552" strokeWidth="5" />
    <path d="M67 174Q95 193 121 170" stroke={adult ? '#f2dcae' : '#ffda45'} strokeWidth="13" strokeLinecap="round" fill="none" />
    <path d="M56 204L25 290M154 207L183 287" stroke={adult ? '#152c53' : '#154a97'} strokeWidth="30" strokeLinecap="round" />
    <path d="M21 289q18 11 30 0M160 288q18 12 31 0" stroke="#835136" strokeWidth="18" strokeLinecap="round" />
    {adult && <path d="M108 160L92 207L112 214L127 172" fill="#e8eef9" />}
    <rect x="90" y="191" width="37" height="37" rx="8" fill="#f9c32c" stroke="#103f88" strokeWidth="3" />
    <text x="108" y="216" textAnchor="middle" fontSize="20" fontWeight="900" fill="#092957">Y</text>
    {!mature && <path d="M39 164Q2 184 5 235M152 164Q194 191 194 231" fill="none" stroke="#f1be31" strokeWidth="10" strokeLinecap="round" />}
    <path d="M87 145h31v31H87Z" fill="#8b5237" />
    <ellipse cx="103" cy="88" rx={mature ? 57 : 54} ry={mature ? 68 : 60} fill="#955c3e" />
    <ellipse cx="47" cy="95" rx="10" ry="15" fill="#955c3e" />
    <ellipse cx="157" cy="95" rx="10" ry="15" fill="#955c3e" />
    <path d={mature ? 'M48 86Q40 13 102 10Q167 13 160 88Q143 61 129 47Q94 61 48 86Z' : 'M47 92Q34 25 100 18Q162 11 163 91Q144 65 124 55Q78 73 47 92Z'} fill="#12151c" />
    {Array.from({ length: mature ? 6 : 10 }, (_, i) => {
      const angle = (i / (mature ? 5 : 9)) * Math.PI;
      const cx = 103 + 56 * Math.cos(angle);
      const cy = mature ? 40 - 21 * Math.sin(angle) : 52 - 30 * Math.sin(angle);
      return <circle key={i} cx={cx} cy={cy} r={mature ? 16 : 19} fill="#14171e" />;
    })}
    <path d="M69 88q15 -5 23 0M116 88q15 -5 23 0" fill="none" stroke="#332015" strokeWidth="4" strokeLinecap="round" />
    <ellipse cx="81" cy="97" rx="4" ry="6" fill="#171617" />
    <ellipse cx="129" cy="97" rx="4" ry="6" fill="#171617" />
    {glasses && <g fill="none" stroke="#152e52" strokeWidth="3"><rect x="64" y="86" width="33" height="24" rx="9"/><rect x="112" y="86" width="33" height="24" rx="9"/><path d="M97 97h15"/></g>}
    <path d="M104 100l-3 18h10" fill="none" stroke="#623a29" strokeWidth="3" strokeLinecap="round"/>
    <path d={mature ? 'M81 132q25 13 48 -3' : 'M82 129q20 21 46 0'} fill="none" stroke="#492319" strokeWidth="4" strokeLinecap="round" />
  </g></g>;
}

function MirrorArt({ mode, id, active }) {
  return <svg viewBox="0 0 920 460" className={styles.art} data-active-stage={active} role="img"
    aria-label="Illustrated YEP learner reflecting at a work table, with four connected steps from noticing to the next move">
    <defs>
      <linearGradient id={id + 'sky'} x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#154b9d"/><stop offset=".58" stopColor="#2683c1"/><stop offset="1" stopColor="#e3b45b"/></linearGradient>
      <linearGradient id={id + 'floor'} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#142955"/><stop offset="1" stopColor="#06152f"/></linearGradient>
      <radialGradient id={id + 'light'}><stop stopColor="#f9e49e" stopOpacity=".85"/><stop offset="1" stopColor="#f9e49e" stopOpacity="0"/></radialGradient>
    </defs>
    <rect width="920" height="460" rx="28" fill={'url(#' + id + 'floor)'} />
    <rect x="0" y="0" width="920" height="300" rx="28" fill={'url(#' + id + 'sky)'} />
    <circle cx="680" cy="72" r="170" fill={'url(#' + id + 'light)'} />
    <g opacity=".48" fill="#0d316c">
      <path d="M0 194h90v-70h42v70h55V97h67v97h38v-60h70v60h70v-96h66v96h56v-51h88v51h87v-84h77v84h84v106H0Z" />
      <path d="M25 193v-65h68M192 192v-93h65M497 192v-96h70M717 195v-76h70" fill="none" stroke="#9bd7ff" strokeWidth="4" strokeOpacity=".35" />
    </g>
    <path d="M0 284Q240 260 456 298T920 270V460H0Z" fill={'url(#' + id + 'floor)'} />
    <path d="M0 345Q280 312 920 346L920 460H0Z" fill="#08234b" />
    <path d="M45 333h460l30 29H0Z" fill="#b8824a" />
    <path d="M74 355v104M462 355v105" stroke="#66412f" strokeWidth="21" />
    <path d="M301 300h158l32 35H275Z" fill="#cae9f9" stroke="#516987" strokeWidth="7"/>
    <rect x="311" y="209" width="139" height="94" rx="9" fill="#bcddec" stroke="#254c7d" strokeWidth="8"/>
    <path d="M334 251h92" stroke="#6d9fcc" strokeWidth="9" strokeLinecap="round"/>
    <path d="M334 273h57" stroke="#83b9df" strokeWidth="7" strokeLinecap="round"/>
    <path d="M185 329l84 -26 65 33Z" fill="#fff0c2" stroke="#c19750" strokeWidth="4"/>
    <LearnerFigure mode={mode} x={50} y={92} scale={.83} />
    <g transform="translate(557 155)">
      <path d="M25 10h270q20 0 20 20v180q0 20 -20 20H25q-20 0 -20 -20V30q0 -20 20 -20Z" fill="#f4f8ff" stroke="#f8c54b" strokeWidth="8"/>
      <text x="160" y="47" textAnchor="middle" fontWeight="900" fontSize="22" fill="#16467f">LOOK BACK · MOVE AHEAD</text>
      {['I NOTICED', 'I EXPLORED', 'I LEARNED', 'NEXT MOVE'].map((t,i)=><g key={t} data-scene-milestone={i} data-active={active===i} transform={'translate(' + (28 + (i % 2) * 148) + ' ' + (68 + Math.floor(i/2)*65) + ')'}>
        <rect className={active===i ? styles.activeStepCard : styles.stepCard} width="126" height="53" rx="11" fill={['#f9d870','#a7d9ff','#c6b8ff','#a8edc2'][i]}/>
        {active===i && <circle className={styles.stepPulse} cx="21" cy="26" r="21" fill="none" stroke="#fff" strokeWidth="3"/>}
        <circle cx="21" cy="26" r="13" fill="#174a80"/>
        <text x="21" y="31" textAnchor="middle" fontSize="14" fontWeight="900" fill="#fff">{i+1}</text>
        <text x="76" y="31" textAnchor="middle" fontSize="12" fontWeight="900" fill="#153c70">{t}</text>
      </g>)}
    </g>
  </svg>;
}

function MissionArt({ mode, id, active }) {
  return <svg viewBox="0 0 920 460" className={styles.art} data-active-stage={active} role="img"
    aria-label="Illustrated FINISHER journey through a city and up a mountain to a gold finish flag with four visible milestones">
    <defs>
      <linearGradient id={id + 'sky'} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#152c73"/><stop offset=".6" stopColor="#5e73be"/><stop offset="1" stopColor="#efbd58"/></linearGradient>
      <linearGradient id={id + 'earth'} x1="0" y1="0" x2="0" y2="1"><stop stopColor="#315e6f"/><stop offset="1" stopColor="#112950"/></linearGradient>
      <filter id={id + 'glow'} x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="8"/></filter>
    </defs>
    <rect width="920" height="460" rx="28" fill={'url(#' + id + 'sky)'} />
    <circle cx="731" cy="89" r="83" fill="#fce29c" opacity=".82" />
    <path d="M0 300L175 179L284 257L458 91L547 185L685 50L903 279L920 460H0Z" fill="#37678b"/>
    <path d="M288 309L476 130L534 216L683 45L920 280L920 460H0Z" fill={'url(#' + id + 'earth)'} />
    <path d="M463 122l22 23 13 -10 -40 -44 -37 38 24 -5Z M682 50l31 42-29-8-27 10Z" fill="#e0ebf7" opacity=".8" />
    <g fill="#1a416a" opacity=".8"><path d="M0 337h68v-73h45v73h41v-95h54v95h42v-66h58v66h45v124H0Z"/></g>
    <path d="M150 460Q315 393 397 345Q515 271 600 290Q706 306 685 244Q667 195 762 175Q809 159 733 101" fill="none" stroke="#f8c53c" strokeWidth="31" opacity=".37" filter={'url(#' + id + 'glow)'} />
    <path d="M150 460Q315 393 397 345Q515 271 600 290Q706 306 685 244Q667 195 762 175Q809 159 733 101" fill="none" className={styles.missionTrail} stroke="#f8d564" strokeWidth="13" strokeLinecap="round" strokeDasharray="22 12" />
    <path d="M732 99V42" stroke="#fff4b8" strokeWidth="6" strokeLinecap="round"/>
    <path d="M734 44l65 13 -65 19Z" fill="#f4ba22" stroke="#fff8bd" strokeWidth="3"/>
    <g>
      {[
        [375,351,'1'],[575,289,'2'],[693,215,'3'],[742,119,'4']
      ].map(([x,y,t],i)=><g key={t} data-scene-milestone={i} data-active={active===i}>
        {active===i && <circle className={styles.stepPulse} cx={x} cy={y} r="34" fill="none" stroke="#fff2b4" strokeWidth="5"/>}
        <circle className={active===i ? styles.activeMissionMarker : styles.missionMarker} cx={x} cy={y} r="23" fill="#0d2d57" stroke="#ffe16f" strokeWidth="5"/>
        <text x={x} y={y+8} textAnchor="middle" fontSize="21" fontWeight="900" fill="#fff">{t}</text>
      </g>)}
    </g>
    <LearnerFigure mode={mode} x={76} y={155} scale={.86}/>
    <path d="M40 429q70-26 148 0" fill="none" stroke="#efce7f" strokeWidth="6" opacity=".55"/>
  </svg>;
}

export default function LaneStoryScene({ kind = 'mirror', mode = 'builder', active = 0, onActiveChange, details = [] }) {
  const id = useId().replace(/:/g, '');
  const utteranceRef = useRef(null);
  const [sceneSpeaking, setSceneSpeaking] = useState(false);
  const [sceneAudioError, setSceneAudioError] = useState('');
  const supported = typeof window !== 'undefined' && !!window.speechSynthesis && typeof window.SpeechSynthesisUtterance === 'function';
  const stages = kind === 'mirror' ? MIRROR_STAGES : FINISHER_STAGES;
  const stage = stages[Math.max(0, Math.min(3, active))];
  const stageCopy = AGE_SCENES[mode] || AGE_SCENES.builder;
  const isMirror = kind === 'mirror';

  function stopStageAudio() {
    const last = utteranceRef.current;
    utteranceRef.current = null;
    if (last && supported) {
      last.onend = null;
      last.onerror = null;
      window.speechSynthesis.cancel();
    }
    setSceneSpeaking(false);
  }

  function playStageAudio() {
    if (!supported) return;
    stopStageAudio();
    // Never autoplay. A learner explicitly asks to hear the selected stage.
    window.speechSynthesis.cancel();
    setSceneAudioError('');
    const copy = [stage.label, stage.title, stage.cue, details[active]].filter(Boolean).join('. ');
    const utterance = new window.SpeechSynthesisUtterance(copy);
    utterance.lang = 'en-US';
    utterance.rate = mode === 'explorer' ? 0.86 : mode === 'builder' ? 0.92 : 1;
    utteranceRef.current = utterance;
    utterance.onend = () => {
      if (utteranceRef.current === utterance) {
        utteranceRef.current = null;
        setSceneSpeaking(false);
      }
    };
    utterance.onerror = (event) => {
      if (utteranceRef.current === utterance) {
        utteranceRef.current = null;
        setSceneSpeaking(false);
        if (!['canceled', 'interrupted'].includes(event.error)) {
          setSceneAudioError('Voice is unavailable on this device. The stage text is still here to read.');
        }
      }
    };
    try {
      window.speechSynthesis.speak(utterance);
      setSceneSpeaking(true);
    } catch {
      utteranceRef.current = null;
      setSceneSpeaking(false);
      setSceneAudioError('Voice is unavailable on this device. The stage text is still here to read.');
    }
  }

  useEffect(() => {
    if (utteranceRef.current) stopStageAudio();
    setSceneAudioError('');
  }, [active, kind, mode]);

  useEffect(() => () => {
    if (utteranceRef.current && supported) {
      const last = utteranceRef.current;
      utteranceRef.current = null;
      last.onend = null;
      last.onerror = null;
      window.speechSynthesis.cancel();
    }
  }, [supported]);

  return <section className={styles.wrap} data-lane={mode} data-active-step={active} aria-label={isMirror ? 'Illustrated Mirror Results learning journey' : 'Illustrated FINISHER mission path'}>
    <div className={styles.scene}>
      {isMirror ? <MirrorArt mode={mode} id={id} active={active}/> : <MissionArt mode={mode} id={id} active={active}/>}
      <div className={styles.sceneHeading}>
        <span>{stageCopy.label}</span>
        <h2>{isMirror ? 'MY MIRROR · REAL GROWTH' : 'MY FINISHER JOURNEY'}</h2>
        <p>{stageCopy.voice}</p>
      </div>
      <div key={kind + '-' + active} className={styles.sceneCallout} aria-live="polite">
        <span>SCENE {active + 1} / 4 · {stage.label}</span>
        <strong>{stage.title}</strong>
      </div>
    </div>
    <div className={styles.interact}>
      <div className={styles.interactHeader}>
        <span>{isMirror ? 'TAP EACH MIRROR STEP' : 'EXPLORE YOUR MISSION PATH'}</span>
        <strong>{stage.title}</strong>
        <p>{stage.cue}</p>
      </div>
      <div className={styles.steps} role="group" aria-label="Choose a step on the visual learning path">
        {stages.map((item, index) => {
          const Icon = item.icon;
          return <button type="button" key={item.label}
            className={index === active ? styles.stepActive : styles.step}
            aria-pressed={index === active}
            onClick={() => onActiveChange?.(index)}
          >
            <span className={styles.stepCircle}><Icon size={22} aria-hidden="true"/></span>
            <span className={styles.stepLabel}>{item.label}</span>
          </button>;
        })}
      </div>
      <div className={styles.stageControls}>
        <span>Explore one step at a time. Sound is optional.</span>
        {supported && <>
          <button type="button" className={styles.audioButton} onClick={sceneSpeaking ? stopStageAudio : playStageAudio}>{sceneSpeaking ? 'Stop step audio' : 'Hear this step'}</button>
          <button type="button" className={styles.audioButton} onClick={playStageAudio}>Replay step</button>
        </>}
      </div>
      {sceneAudioError && <p role="alert" className={styles.audioError}>{sceneAudioError}</p>}
      {details[active] && <div className={styles.detail} role="status">
        <MessageCircle size={19} aria-hidden="true"/><span>{details[active]}</span>
      </div>}
      <p className={styles.truth}>Learning practice — not a score, verified business result, or proof of a completed real-world activity.</p>
    </div>
  </section>;
}
