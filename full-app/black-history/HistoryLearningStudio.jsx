import { useEffect, useRef, useState } from 'react';
import { VERIFIED_HISTORY_LESSONS, reviewHistoryAnswer, HISTORY_AGE_REQUIREMENTS } from './verifiedLessons';
import styles from './HistoryLearningStudio.module.css';

/* Future full-app teaching component. Intentionally not mounted into current POC router. */
function TeachingScene({ type, speaking }) {
  return <svg viewBox="0 0 520 270" role="img" aria-label="Illustrated business history learning scene" className={styles.scene}>
    <rect width="520" height="270" rx="20" fill="#143B78"/>
    <circle cx="455" cy="46" r="68" fill="#FFD36F" opacity=".24"/>
    {['workshop','ledger'].includes(type) && <>
      <path d="M30 210L130 58h250l112 152" stroke="#D6E7FB" strokeWidth="7" fill="#477AB1"/>
      <path d="M147 70V215M367 70V215M34 210H490" stroke="#E8F4FE" strokeWidth="6"/>
      {[135,205,275].map((x,i)=><path key={x} d={`M${x} 195l52 -88 36 88Z`} fill={['#F5D58B','#C8E9E8','#B5C7F1'][i]} stroke="#E6EDF9" strokeWidth="3"/>)}
      <rect x="70" y="216" width="382" height="15" rx="6" fill="#E5BD73"/>
    </>}
    {['route','fleet'].includes(type) && <>
      <path d="M0 221Q100 184 200 220T520 218V270H0Z" fill="#64A5C3"/>
      <path d="M77 140h322l-46 61H128Z" fill="#DDB16E"/>
      <path d="M235 45V140M235 52l-112 85h112Z" fill="#DBEAF2" stroke="#E8F4FF" strokeWidth="5"/>
      <path d="M239 56l102 80H239Z" fill="#A4D8ED"/>
      <path d="M77 214H412" stroke="#E8C979" strokeWidth="6" strokeLinecap="round"/>
    </>}
    {['intersection','patent'].includes(type) && <>
      <path d="M209 0h102v270H209ZM0 102h520v78H0Z" fill="#667E9A"/>
      <path d="M260 0v91M260 189v81M0 141h185M337 141h183" stroke="#F5DC86" strokeWidth="5" strokeDasharray="20 12"/>
      <path d="M359 203V62" stroke="#C0DBEE" strokeWidth="9"/>
      <rect x="337" y="31" width="44" height="82" rx="9" fill="#1D2B47" stroke="#B7CCE5" strokeWidth="4"/>
      <circle cx="359" cy="48" r="10" fill="#EC855F"/><circle cx="359" cy="73" r="10" fill="#EACB60"/><circle cx="359" cy="98" r="10" fill="#67D5A1"/>
    </>}
    <g transform="translate(20 25)"><circle cx="65" cy="56" r="40" fill="#905C3C"/><path d="M26 60q-5-55 40-55 46 0 40 55-18-20-40-20-20 0-40 20Z" fill="#101522"/><path d="M17 245q4-130 48-130 49 0 55 130Z" fill="#E3B958"/><circle cx="52" cy="56" r="3" fill="#192233"/><circle cx="80" cy="56" r="3" fill="#192233"/><path d="M51 79q14 10 28 0" fill="none" stroke="#4B2B23" strokeWidth="4" className={speaking?styles.talking:''}/></g>
  </svg>;
}
export default function HistoryLearningStudio() {
  const [lessonId, setLessonId] = useState(VERIFIED_HISTORY_LESSONS[0].id);
  const [ageBand, setAgeBand] = useState('11-13');
  const [sceneIndex, setSceneIndex] = useState(0);
  const [answer,setAnswer] = useState('');
  const [reflection,setReflection] = useState('');
  const [speaking,setSpeaking] = useState(false);
  const [message,setMessage] = useState('');
  const audioRef=useRef(null);
  const lesson=VERIFIED_HISTORY_LESSONS.find(l=>l.id===lessonId);
  const scene=lesson.scenes[sceneIndex];
  const result=answer?reviewHistoryAnswer(lesson.id,answer):null;
  const supported=typeof window!=='undefined'&&!!window.speechSynthesis&&!!window.SpeechSynthesisUtterance;
  function stop() {
    const old=audioRef.current; audioRef.current=null;
    if(old){old.onstart=null;old.onend=null;old.onerror=null;}
    if(typeof window!=='undefined'&&window.speechSynthesis) window.speechSynthesis.cancel();
    setSpeaking(false);
  }
  useEffect(()=>()=>{const old=audioRef.current;audioRef.current=null;if(old){old.onstart=null;old.onend=null;old.onerror=null;}if(typeof window!=='undefined'&&window.speechSynthesis)window.speechSynthesis.cancel();},[]);
  function selectLesson(id){ stop();setLessonId(id);setSceneIndex(0);setAnswer('');setReflection('');setMessage('');}
  function nextScene(i){stop();setSceneIndex(i);setMessage('');}
  function narrate(){ if(!supported){setMessage('Audio is not supported on this device. Read the lesson text instead.');return;}
    stop();setMessage('Preparing voice...');
    try {const speech=new window.SpeechSynthesisUtterance(scene.narration);speech.lang='en-US';speech.rate=.9;audioRef.current=speech;
      speech.onstart=()=>{if(audioRef.current===speech){setSpeaking(true);setMessage('Guide speaking');}};
      speech.onend=()=>{if(audioRef.current===speech){setSpeaking(false);setMessage('Audio finished');audioRef.current=null;}};
      speech.onerror=e=>{if(audioRef.current===speech){setSpeaking(false);audioRef.current=null;setMessage('Voice unavailable. Read the lesson and continue.');}};
      window.speechSynthesis.speak(speech);
    }catch{setMessage('Audio could not start. The lesson text is available.');}
  }
  return <section className={styles.studio} aria-label="Verified Black business history learning studio">
    <div className={styles.heading}><small>YEP · BUSINESS HISTORY · FULL APP DEVELOPMENT</small><h2>Builders. Owners. Problem Solvers.</h2><p>Learn how Black American men built enterprises, then solve a business problem yourself. This activity is a development example and does not award FINISHER points yet.</p></div>
    <div className={styles.lessonPicker} aria-label="Select a verified entrepreneur">
      {VERIFIED_HISTORY_LESSONS.map(item=><button type="button" key={item.id} aria-pressed={item.id===lessonId} onClick={()=>selectLesson(item.id)}><b>{item.name}</b><small>{item.category}</small></button>)}
    </div>
    <label className={styles.age}>Learning age pathway <select value={ageBand} onChange={e=>setAgeBand(e.target.value)}>{Object.keys(HISTORY_AGE_REQUIREMENTS).map(x=><option key={x} value={x}>{x} years</option>)}</select></label>
    <div className={styles.lesson}>
      <div className={styles.context}><span>{lesson.name} · {lesson.years}</span><h3>{lesson.title}</h3><p>{lesson.hook}</p></div>
      <div className={styles.picture}><TeachingScene type={scene.scene} speaking={speaking}/></div>
      <nav className={styles.steps} aria-label="Lesson scene navigation">{lesson.scenes.map((item,i)=><button key={item.title} aria-current={i===sceneIndex?'step':undefined} onClick={()=>nextScene(i)}>{i+1}. {item.title}</button>)}</nav>
      <div className={styles.narration} aria-live="polite"><strong>{scene.title}</strong><p>{scene.narration}</p><em>{scene.question}</em><div className={styles.audio}><button type="button" onClick={speaking?stop:narrate}>{speaking?'Stop guide':'Listen to guide'}</button><span role="status">{message}</span></div></div>
      <div className={styles.receipts}><h4>Check the receipts</h4><ul>{lesson.factChecks.map(f=><li key={f.claim}>{f.claim} <small>{f.citation}</small></li>)}</ul>{lesson.sources.map(f=><a key={f.url} href={f.url} target="_blank" rel="noopener noreferrer">{f.label}</a>)}</div>
      <fieldset className={styles.challenge}><legend><strong>YOUR TURN:</strong> {lesson.challenge.question}</legend>{lesson.challenge.choices.map(choice=><label key={choice.id} data-picked={answer===choice.id}><input type="radio" name={lesson.id} value={choice.id} checked={answer===choice.id} onChange={()=>setAnswer(choice.id)} />{choice.label}</label>)}{result&&<p role="status" className={styles.feedback}>{result.feedback}</p>}</fieldset>
      <div className={styles.reflect}><label htmlFor="history-reflection">{lesson.reflection}</label><textarea id="history-reflection" value={reflection} onChange={e=>setReflection(e.target.value)} maxLength={600} placeholder="Write or explain your idea..." /><p>{HISTORY_AGE_REQUIREMENTS[ageBand].directions}</p><strong>{result?.correct&&reflection.trim().length>=12?'Learning evidence ready for facilitator review. No XP awarded.':'Choose a supported business decision and explain your thinking to complete this practice.'}</strong></div>
    </div>
  </section>;
}
