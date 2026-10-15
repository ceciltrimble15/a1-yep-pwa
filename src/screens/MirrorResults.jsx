import { useYEP } from '../context/YEPContext';
import { getReflectionSummary } from '../data/exposureProcess';
import { ArrowRight, Compass } from 'lucide-react';
import Shell from '../components/Shell';
import YEPGuide from '../components/YEPGuide';
import ui from '../styles/ui.module.css';

export default function MirrorResults() {
  const { mirrorResult, navigate, mode } = useYEP();
  const summary = getReflectionSummary(mirrorResult);
  if (!summary) return <Shell showAudio={false}><YEPGuide title="Your Mirror" prompt="Your next step is to explore what you noticed. Start a check-in or go straight to FINISHER choices." actionLabel="Start My Check-In" onAction={()=>navigate('mirrorIntro')}/><button type="button" className={ui.btnGhost} onClick={()=>navigate('mission')}>Explore FINISHER Choices</button></Shell>;
  return <Shell showAudio={false}>
    <section data-lane={mode} style={{maxWidth:780,margin:'0 auto',padding:'14px 0 40px'}}>
      <p style={{letterSpacing:'.13em',fontWeight:800,color:'var(--electric)'}}>MIRROR RESULTS · YOUR REFLECTION</p>
      <h1 style={{fontSize:'clamp(32px,5vw,48px)',lineHeight:1.12,margin:'12px 0'}}>Here's what interested you today.</h1>
      <p style={{fontSize:20,lineHeight:1.5,marginBottom:24}}>You chose these answers. They don't label you or decide your future. You can explore something different next time.</p>
      <div style={{display:'grid',gap:14}}>
        {summary.map(({label,answer})=><div key={label} style={{padding:22,border:'1px solid var(--line-strong)',borderRadius:18,background:'var(--panel)'}}>
          <p style={{fontSize:15,letterSpacing:'.02em',opacity:.84}}>{label}</p>
          <strong style={{display:'block',fontSize:24,marginTop:7,lineHeight:1.3}}>{answer}</strong>
        </div>)}
      </div>
      <p style={{margin:'24px 0',fontSize:18,lineHeight:1.5}}>Now choose a safe next step that feels meaningful to you. A facilitator can help you try it.</p>
      <button type="button" className={ui.btnPrimary} onClick={()=>navigate('mission')}>Choose My FINISHER Action <ArrowRight size={19}/></button>
      <button type="button" className={ui.btnGhost} onClick={()=>navigate('mirrorIntro')} style={{marginTop:12}}>Reflect Again</button>
    </section>
  </Shell>;
}
