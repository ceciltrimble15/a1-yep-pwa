import { useState } from 'react';
import { ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { REFLECTION_PROMPTS } from '../data/exposureProcess';
import Shell from '../components/Shell';
import ui from '../styles/ui.module.css';

export default function MirrorAssessment() {
  const { submitMirror, saveMirrorDraft, pilotProgress, mode } = useYEP();
  const saved = pilotProgress.mirrorDraft;
  const [answers, setAnswers] = useState(saved?.answers || {});
  const [step, setStep] = useState(Math.max(0, Math.min(REFLECTION_PROMPTS.length - 1, saved?.step || 0)));
  const prompt = REFLECTION_PROMPTS[step];
  const selected = answers[prompt.id];

  function choose(index) {
    const next = { ...answers, [prompt.id]: index };
    setAnswers(next);
    saveMirrorDraft({ answers: next, step });
  }
  function move(nextStep) {
    setStep(nextStep);
    saveMirrorDraft({ answers, step: nextStep });
  }
  return <Shell>
    <section data-lane={mode} style={{maxWidth:740, margin:'0 auto',padding:'12px 0 42px'}}>
      <p style={{fontWeight:800,letterSpacing:'.1em',color:'var(--electric)'}}>MIRROR · TODAY'S CHECK-IN</p>
      <h1 style={{fontSize:'clamp(30px,5vw,46px)',lineHeight:1.1,margin:'14px 0'}}>Your experience. Your voice.</h1>
      <p style={{fontSize:19,lineHeight:1.5,marginBottom:24}}>No labels. No grades. There is no one right answer. Your interests can change.</p>
      <div style={{borderRadius:20,border:'1px solid var(--line-strong)',background:'var(--panel)',padding:'clamp(16px,4vw,28px)'}}>
        <p style={{fontWeight:800,marginBottom:14}}>QUESTION {step+1} OF {REFLECTION_PROMPTS.length}</p>
        <h2 style={{fontSize:'clamp(23px,4vw,34px)',lineHeight:1.25,marginBottom:22}}>{prompt.heading}</h2>
        <div style={{display:'grid',gap:12}}>
          {prompt.options.map((option,index)=><button type="button" key={option} aria-pressed={selected===index} onClick={()=>choose(index)}
            style={{textAlign:'left',width:'100%',minHeight:65,padding:'18px 20px',fontSize:19,lineHeight:1.4,borderRadius:16,border:selected===index?'3px solid var(--electric)':'2px solid var(--line-strong)',background:selected===index?'var(--panel-2)':'var(--panel)',color:'var(--text)',fontWeight:selected===index?800:500}}>
              {selected===index?'✓  ':''}{option}
            </button>)}
        </div>
      </div>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:12,marginTop:22,flexWrap:'wrap'}}>
        {step>0?<button type="button" className={ui.btnGhost} onClick={()=>move(step-1)}><ArrowLeft size={18}/> Back</button>:<span/>}
        <button type="button" className={ui.btnPrimary} disabled={selected===undefined} onClick={()=>step===REFLECTION_PROMPTS.length-1?submitMirror(answers):move(step+1)}>
          {step===REFLECTION_PROMPTS.length-1?'Save My Check-In':'Next Question'} <ArrowRight size={18}/>
        </button>
      </div>
      <p style={{marginTop:20,fontSize:15,opacity:.8}}><Sparkles size={16} style={{display:'inline'}}/> Your answers are a reflection of today, not a diagnosis or prediction.</p>
    </section>
  </Shell>;
}
