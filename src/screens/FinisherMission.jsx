import { Check, Flag, ArrowRight } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { getExposureMissions } from '../data/exposureProcess';
import Shell from '../components/Shell';
import YEPGuide from '../components/YEPGuide';
import ui from '../styles/ui.module.css';

export default function FinisherMission() {
  const {mode,currentMission,selectMission,missionStepsDone,toggleMissionStep,completeMission,missionComplete,navigate}=useYEP();
  const choices=getExposureMissions(mode);
  if(!currentMission || currentMission.mode!==mode) return <Shell showAudio={false}>
    <section data-lane={mode} style={{maxWidth:850,margin:'0 auto',padding:'14px 0 40px'}}>
      <p style={{fontWeight:800,letterSpacing:'.12em',color:'var(--electric)'}}>FINISHER · YOUR NEXT MOVE</p>
      <h1 style={{fontSize:'clamp(30px,5vw,46px)',margin:'12px 0'}}>Choose what you want to try.</h1>
      <p style={{fontSize:19,lineHeight:1.55,marginBottom:20}}>These are options, not assigned labels. Pick one that connects to what you've seen or want to explore. Ask a facilitator before doing anything outside the app.</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(min(100%,310px),1fr))',gap:14}}>
        {choices.map((option)=><article key={option.id} style={{background:'var(--panel)',border:'1px solid var(--line-strong)',borderRadius:20,padding:22,display:'flex',flexDirection:'column',gap:12}}>
          <span style={{fontSize:13,letterSpacing:'.08em',color:'var(--electric)',fontWeight:800}}>{option.focus.toUpperCase()}</span>
          <h2 style={{fontSize:24,lineHeight:1.2}}>{option.title}</h2>
          <p style={{fontSize:18,lineHeight:1.45,flexGrow:1}}>{option.objective}</p>
          <button type="button" className={ui.btnPrimary} onClick={()=>selectMission(option.id)}>Choose This Action <ArrowRight size={18}/></button>
        </article>)}
      </div>
      <button type="button" className={ui.btnGhost} style={{marginTop:22}} onClick={()=>navigate('results')}>Back to My Reflection</button>
    </section>
  </Shell>;
  const m=currentMission,allDone=m.steps.every((_,i)=>missionStepsDone[i]);
  const next=m.steps.findIndex((_,i)=>!missionStepsDone[i]);
  return <Shell showAudio={false}>
    <section data-lane={mode} style={{maxWidth:780,margin:'0 auto',padding:'12px 0 38px'}}>
      <p style={{fontWeight:800,letterSpacing:'.12em',color:'var(--electric)'}}>FINISHER · MY CHOSEN ACTION</p>
      <h1 style={{fontSize:'clamp(32px,5vw,46px)',margin:'12px 0'}}>{m.title}</h1>
      <p style={{fontSize:20,lineHeight:1.5,marginBottom:24}}>{m.objective}</p>
      <YEPGuide title="Try it safely" prompt={allDone?'You marked the steps. Review whether they actually happened or were planning practice before continuing.':`Your next step to consider: ${m.steps[next]}`} actionLabel={allDone?'Go to Reflection':'Show My Steps'} onAction={()=>allDone?completeMission():document.getElementById('exposure-mission-steps')?.scrollIntoView({behavior:'smooth'})}/>
      <div id="exposure-mission-steps" style={{display:'grid',gap:12,margin:'22px 0'}}>
        {m.steps.map((step,index)=><button type="button" key={index} aria-pressed={!!missionStepsDone[index]} onClick={()=>toggleMissionStep(index)} style={{width:'100%',display:'flex',gap:14,textAlign:'left',padding:20,borderRadius:16,minHeight:76,border:missionStepsDone[index]?'2px solid var(--electric)':'1px solid var(--line-strong)',background:'var(--panel)',color:'var(--text)',fontSize:19,lineHeight:1.4}}>
          <span style={{flexShrink:0}}>{missionStepsDone[index]?<Check size={24}/>:String(index+1)+'.'}</span>{step}
        </button>)}
      </div>
      <p style={{fontSize:16,lineHeight:1.5,margin:'20px 0'}}>This is a participant-marked practice checklist, not independently verified evidence of a real-world visit, sale, test, or completed task.</p>
      <button type="button" className={ui.btnPrimary} onClick={completeMission} disabled={!allDone}><Flag size={18}/> {missionComplete?'Continue to Reflection':'Finish My Practice Checklist'} <ArrowRight size={18}/></button>
      {!missionComplete&&<button type="button" className={ui.btnGhost} style={{marginTop:14}} onClick={()=>selectMission('')||navigate('home')}>Return Home</button>}
    </section>
  </Shell>;
}
