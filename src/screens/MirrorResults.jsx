import { ArrowRight, Eye, Lightbulb, RefreshCcw, Sparkles } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { getReflectionLearning, getReflectionSummary } from '../data/exposureProcess';
import Shell from '../components/Shell';
import YEPGuide from '../components/YEPGuide';
import ui from '../styles/ui.module.css';

const ICONS = [Eye, Sparkles, Lightbulb, RefreshCcw];

export default function MirrorResults() {
  const { mirrorResult, navigate, mode } = useYEP();
  const summary = getReflectionSummary(mirrorResult);
  const learning = getReflectionLearning(mode, mirrorResult);

  if (!summary || !learning) return (
    <Shell showAudio={false}>
      <YEPGuide
        title="Your Mirror"
        prompt="Your next step is to explore what you noticed. Start a check-in before choosing a FINISHER action."
        actionLabel="Start My Check-In"
        onAction={() => navigate('mirrorIntro')}
      />
    </Shell>
  );

  return <Shell showAudio={false}>
    <section data-lane={mode} style={{ maxWidth: 900, margin: '0 auto', padding: '14px 0 40px' }}>
      <p style={{ letterSpacing: '.13em', fontWeight: 900, color: 'var(--electric)' }}>03 · MIRROR RESULTS</p>
      <h1 style={{ fontSize: 'clamp(34px,5vw,52px)', lineHeight: 1.05, margin: '10px 0' }}>{learning.title}</h1>
      <p style={{ fontSize: 19, lineHeight: 1.55, maxWidth: 760 }}>
        This is a reflection, not a grade or a label. Your answers show what caught your attention today so you can make a stronger next move.
      </p>

      <YEPGuide
        title="Look back before you move forward"
        prompt={learning.speech}
        narration={learning.bridge}
        example={learning.transfer}
        actionLabel="Show My Mirror"
        onAction={() => document.getElementById('mirror-learning-cards')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
      />

      <div id="mirror-learning-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,310px),1fr))', gap: 14, margin: '22px 0' }}>
        {summary.map(({ id, label, answer }, index) => {
          const Icon = ICONS[index] || Sparkles;
          return <article key={id} style={{
            padding: 22,
            border: '1px solid var(--line-strong)',
            borderRadius: 22,
            background: 'var(--panel)',
            display: 'grid',
            gap: 10,
          }}>
            <div style={{ width: 48, height: 48, borderRadius: 16, display: 'grid', placeItems: 'center', background: 'var(--panel-soft, rgba(255,255,255,.06))' }}>
              <Icon size={25} aria-hidden="true" />
            </div>
            <p style={{ fontSize: 14, letterSpacing: '.06em', fontWeight: 900, opacity: .8, margin: 0 }}>{label.toUpperCase()}</p>
            <strong style={{ display: 'block', fontSize: 23, lineHeight: 1.25 }}>{answer}</strong>
          </article>;
        })}
      </div>

      <section style={{ display: 'grid', gap: 14, margin: '26px 0' }}>
        <div style={{ padding: 22, borderRadius: 22, border: '1px solid var(--line-strong)', background: 'var(--panel)' }}>
          <span style={{ fontSize: 13, letterSpacing: '.09em', fontWeight: 900, color: 'var(--electric)' }}>YOUR LEARNING QUESTION</span>
          <h2 style={{ fontSize: 26, lineHeight: 1.2, margin: '8px 0' }}>{learning.question}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.5, margin: 0 }}>Talk it through with your facilitator or keep it in mind as you choose your next mission.</p>
        </div>
        <div style={{ padding: 22, borderRadius: 22, border: '1px solid var(--line-strong)', background: 'var(--panel)' }}>
          <span style={{ fontSize: 13, letterSpacing: '.09em', fontWeight: 900, color: 'var(--electric)' }}>TRANSFER IT</span>
          <h2 style={{ fontSize: 24, lineHeight: 1.25, margin: '8px 0' }}>{learning.transfer}</h2>
          <p style={{ fontSize: 17, lineHeight: 1.5, margin: 0 }}>This is how YEP turns one experience into a skill you can use somewhere else.</p>
        </div>
      </section>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
        <button type="button" className={ui.btnPrimary} onClick={() => navigate('mission')}>
          Choose My FINISHER Action <ArrowRight size={19} />
        </button>
        <button type="button" className={ui.btnGhost} onClick={() => navigate('mirrorIntro')}>
          Reflect Again
        </button>
      </div>
    </section>
  </Shell>;
}
