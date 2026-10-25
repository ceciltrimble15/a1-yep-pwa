import { ArrowRight, Check, CheckCircle2, Compass, Flag, Lightbulb, Target } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { getExposureMissions, getMissionLearning } from '../data/exposureProcess';
import Shell from '../components/Shell';
import YEPGuide from '../components/YEPGuide';
import ui from '../styles/ui.module.css';

const PATH = [
  { label: 'CHOOSE', detail: 'Pick a meaningful goal.', icon: Target },
  { label: 'PLAN', detail: 'Know the next move.', icon: Compass },
  { label: 'DO', detail: 'Take the real or supervised step.', icon: CheckCircle2 },
  { label: 'LEARN', detail: 'Use what happened to improve.', icon: Lightbulb },
];

export default function FinisherMission() {
  const { mode, currentMission, selectMission, missionStepsDone, toggleMissionStep, completeMission, missionComplete, navigate } = useYEP();
  const choices = getExposureMissions(mode);

  if (!currentMission || currentMission.mode !== mode) return <Shell showAudio={false}>
    <section data-lane={mode} style={{ maxWidth: 940, margin: '0 auto', padding: '14px 0 40px' }}>
      <p style={{ fontWeight: 900, letterSpacing: '.12em', color: 'var(--electric)' }}>04 · FINISHER MISSION</p>
      <h1 style={{ fontSize: 'clamp(34px,5vw,52px)', lineHeight: 1.05, margin: '10px 0' }}>Choose the skill you want to put into action.</h1>
      <p style={{ fontSize: 19, lineHeight: 1.55, maxWidth: 800 }}>
        FINISHER is where learning becomes a next move. Choose one mission, complete only the steps you actually practice or perform, then reflect on what the experience taught you.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,minmax(0,1fr))', gap: 10, margin: '22px 0', overflowX: 'auto' }}>
        {PATH.map(({ label, detail, icon: Icon }) => <div key={label} style={{ minWidth: 150, padding: 16, borderRadius: 18, border: '1px solid var(--line-strong)', background: 'var(--panel)' }}>
          <Icon size={24} aria-hidden="true" />
          <strong style={{ display: 'block', marginTop: 8, fontSize: 16 }}>{label}</strong>
          <small style={{ display: 'block', marginTop: 5, lineHeight: 1.35, opacity: .82 }}>{detail}</small>
        </div>)}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,310px),1fr))', gap: 14 }}>
        {choices.map((option) => {
          const learning = getMissionLearning(option, mode);
          return <article key={option.id} style={{ background: 'var(--panel)', border: '1px solid var(--line-strong)', borderRadius: 22, padding: 22, display: 'flex', flexDirection: 'column', gap: 11 }}>
            <span style={{ fontSize: 13, letterSpacing: '.09em', color: 'var(--electric)', fontWeight: 900 }}>
              {learning.skill.skill.toUpperCase()} · {option.focus.toUpperCase()}
            </span>
            <h2 style={{ fontSize: 25, lineHeight: 1.15, margin: 0 }}>{option.title}</h2>
            <p style={{ fontSize: 17, lineHeight: 1.45, margin: 0 }}>{option.objective}</p>
            <div style={{ padding: 14, borderRadius: 16, background: 'var(--panel-soft, rgba(255,255,255,.06))' }}>
              <strong style={{ display: 'block', fontSize: 15 }}>What this practices</strong>
              <span style={{ display: 'block', marginTop: 5, fontSize: 16, lineHeight: 1.4 }}>{learning.skill.meaning}</span>
            </div>
            <button type="button" className={ui.btnPrimary} onClick={() => selectMission(option.id)}>
              Choose This Mission <ArrowRight size={18} />
            </button>
          </article>;
        })}
      </div>
      <button type="button" className={ui.btnGhost} style={{ marginTop: 22 }} onClick={() => navigate('results')}>Back to My Mirror</button>
    </section>
  </Shell>;

  const m = currentMission;
  const learning = getMissionLearning(m, mode);
  const allDone = m.steps.every((_, i) => missionStepsDone[i]);
  const next = m.steps.findIndex((_, i) => !missionStepsDone[i]);

  return <Shell showAudio={false}>
    <section data-lane={mode} style={{ maxWidth: 880, margin: '0 auto', padding: '12px 0 38px' }}>
      <p style={{ fontWeight: 900, letterSpacing: '.12em', color: 'var(--electric)' }}>FINISHER · {learning.skill.skill.toUpperCase()}</p>
      <h1 style={{ fontSize: 'clamp(34px,5vw,50px)', lineHeight: 1.05, margin: '10px 0' }}>{m.title}</h1>
      <p style={{ fontSize: 20, lineHeight: 1.5, marginBottom: 16 }}>{m.objective}</p>

      <div style={{ padding: 18, borderRadius: 20, border: '1px solid var(--line-strong)', background: 'var(--panel)', marginBottom: 18 }}>
        <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '.09em', color: 'var(--electric)' }}>FINISHER SKILL</span>
        <h2 style={{ margin: '7px 0 4px', fontSize: 27 }}>{learning.skill.skill}</h2>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.45 }}>{learning.skill.meaning}</p>
      </div>

      <YEPGuide
        title="Learn it by doing it"
        prompt={learning.speech}
        narration={allDone ? learning.skill.check : `Next step: ${m.steps[next]}`}
        question={learning.question}
        example={learning.transfer}
        actionLabel={allDone ? 'Go to Reflection' : 'Show My Next Step'}
        onAction={() => allDone ? completeMission() : document.getElementById('exposure-mission-steps')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      />

      <div style={{ padding: 18, borderRadius: 20, border: '1px solid var(--line-strong)', background: 'var(--panel)', margin: '20px 0' }}>
        <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '.09em', color: 'var(--electric)' }}>LEARNING QUESTION</span>
        <p style={{ fontSize: 20, lineHeight: 1.45, margin: '7px 0 0' }}>{learning.question}</p>
      </div>

      <div id="exposure-mission-steps" style={{ display: 'grid', gap: 12, margin: '22px 0' }}>
        {m.steps.map((step, index) => <button
          type="button"
          key={index}
          aria-pressed={!!missionStepsDone[index]}
          onClick={() => toggleMissionStep(index)}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'flex-start',
            gap: 14,
            textAlign: 'left',
            padding: 20,
            borderRadius: 18,
            minHeight: 78,
            border: missionStepsDone[index] ? '2px solid var(--electric)' : '1px solid var(--line-strong)',
            background: 'var(--panel)',
            color: 'var(--text)',
            fontSize: 18,
            lineHeight: 1.4,
          }}
        >
          <span style={{ flexShrink: 0, width: 28, height: 28, display: 'grid', placeItems: 'center', borderRadius: 999, border: '1px solid var(--line-strong)' }}>
            {missionStepsDone[index] ? <Check size={19} /> : index + 1}
          </span>
          <span>
            <strong style={{ display: 'block', marginBottom: 4 }}>{missionStepsDone[index] ? 'Marked complete' : index === next ? 'Next move' : 'Mission step'}</strong>
            {step}
          </span>
        </button>)}
      </div>

      {allDone && <section style={{ padding: 20, borderRadius: 20, border: '1px solid var(--line-strong)', background: 'var(--panel)', margin: '18px 0' }}>
        <span style={{ fontSize: 13, fontWeight: 900, letterSpacing: '.09em', color: 'var(--electric)' }}>BEFORE YOU FINISH</span>
        <h2 style={{ fontSize: 24, lineHeight: 1.2, margin: '7px 0' }}>{learning.skill.check}</h2>
        <p style={{ margin: 0, fontSize: 17, lineHeight: 1.45 }}>{learning.transfer}</p>
      </section>}

      <p style={{ fontSize: 15, lineHeight: 1.5, margin: '20px 0' }}>
        A checked step means the participant marked it complete. It is not independent proof of a visit, sale, test, contact, or outcome.
      </p>

      <button type="button" className={ui.btnPrimary} onClick={completeMission} disabled={!allDone}>
        <Flag size={18} /> {missionComplete ? 'Continue to Reflection' : 'Finish My Mission'} <ArrowRight size={18} />
      </button>
      {!missionComplete && <button type="button" className={ui.btnGhost} style={{ marginTop: 14 }} onClick={() => navigate('home')}>Return Home</button>}
    </section>
  </Shell>;
}
