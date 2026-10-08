import { useEffect, useState } from 'react';
import { Clock3, UsersRound, Eye, Lightbulb, ChevronRight, CheckCircle2, BookOpenCheck } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { FOUNDATION_QUEST, FOUNDATION_QUEST_ID, FOUNDATION_SCENARIO, FOUNDATION_PEOPLE, FOUNDATION_QUEST_IDEAS } from '../data/foundationQuest';
import { proofDescription } from '../data/proofEvidence';
import Shell from '../components/Shell';
import YEPGuide from '../components/YEPGuide';
import VoiceCapture from '../components/VoiceCapture';
import styles from './PilotScreens.module.css';
import ui from '../styles/ui.module.css';

function FoundationQuestScene({ selectedIndex, onSelect }) {
  const scenario = { items: FOUNDATION_SCENARIO.items.map((item, index) => ({ ...item, icon: [Clock3, UsersRound, Eye][index] })) };
  return (
    <section className={styles.foundationQuestScene} aria-label="A Better Lunch Line visual problem scene">
      <div className={styles.foundationQuestSceneHead}>
        <span>SEE IT</span>
        <h2>Look at the lunch line.</h2>
        <p>Tap one thing that catches your attention.</p>
      </div>

      <div className={styles.foundationLunchQuestArt}>
        <svg viewBox="0 0 960 430" role="img" aria-label="Illustrated school cafeteria lunch line with three things to notice">
          <defs>
            <linearGradient id="lunchWall" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#66B9FF" />
              <stop offset="100%" stopColor="#164E96" />
            </linearGradient>
            <linearGradient id="lunchFloor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#D9E7F5" />
              <stop offset="100%" stopColor="#A8BED8" />
            </linearGradient>
          </defs>
          <rect width="960" height="430" rx="30" fill="url(#lunchWall)" />
          <rect y="290" width="960" height="140" fill="url(#lunchFloor)" />
          <rect x="630" y="95" width="250" height="170" rx="18" fill="#F7F9FF" />
          <rect x="654" y="126" width="202" height="42" rx="10" fill="#D4A017" />
          <text x="755" y="153" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0F2460">CAFETERIA</text>
          <rect x="660" y="188" width="190" height="46" rx="10" fill="#2A4EAF" />
          <circle cx="805" cy="202" r="19" fill="#70462F" />
          <rect x="787" y="218" width="36" height="48" rx="14" fill="#111827" />

          <path d="M170 325 C255 292 374 292 470 324" fill="none" stroke="#F7F9FF" strokeWidth="10" strokeLinecap="round" opacity=".7" />
          {[0,1,2,3,4,5].map((n) => {
            const x = 150 + n * 82;
            const y = 246 + (n % 2) * 10;
            return (
              <g key={n}>
                <circle cx={x} cy={y} r="23" fill={n % 2 ? '#70462F' : '#9B6547'} />
                <rect x={x-21} y={y+22} width="42" height="63" rx="17" fill={n % 3 === 0 ? '#0F2460' : n % 3 === 1 ? '#2A4EAF' : '#1A6D8E'} />
              </g>
            );
          })}
          <path d="M118 362 H560" stroke="#0F2460" strokeWidth="5" strokeDasharray="18 14" opacity=".55" />

          <g opacity={selectedIndex === null || selectedIndex === 0 ? 1 : .32}>
            <circle cx="315" cy="238" r="88" fill="none" stroke="#D4A017" strokeWidth="8" />
            <circle cx="315" cy="110" r="26" fill="#D4A017" />
            <text x="315" y="119" textAnchor="middle" fontSize="26" fontWeight="900" fill="#0F2460">1</text>
          </g>
          <g opacity={selectedIndex === null || selectedIndex === 1 ? 1 : .32}>
            <circle cx="752" cy="190" r="106" fill="none" stroke="#D4A017" strokeWidth="8" />
            <circle cx="875" cy="92" r="26" fill="#D4A017" />
            <text x="875" y="101" textAnchor="middle" fontSize="26" fontWeight="900" fill="#0F2460">2</text>
          </g>
          <g opacity={selectedIndex === null || selectedIndex === 2 ? 1 : .32}>
            <ellipse cx="350" cy="358" rx="248" ry="48" fill="none" stroke="#D4A017" strokeWidth="8" />
            <circle cx="85" cy="358" r="26" fill="#D4A017" />
            <text x="85" y="367" textAnchor="middle" fontSize="26" fontWeight="900" fill="#0F2460">3</text>
          </g>
        </svg>
      </div>

      <div className={styles.foundationQuestNoticeChoices} aria-label="Choose the problem you notice">
        {scenario.items.map(({ icon: Icon, label, detail }, index) => (
          <button
            type="button"
            key={label}
            className={selectedIndex === index ? styles.foundationQuestNoticeSelected : undefined}
            onClick={() => onSelect(index)}
            aria-pressed={selectedIndex === index}
          >
            <span>{index + 1}</span>
            <Icon size={22} aria-hidden="true" />
            <div><strong>{label}</strong><small>{detail}</small></div>
          </button>
        ))}
      </div>
    </section>
  );
}

export default function FoundationDailyQuest() {
  const { pilotProgress, completeDailyQuest, saveLessonDraft, navigate } = useYEP();
  const proof = pilotProgress.dailyQuestChoiceProof;
  const draft = pilotProgress.dailyQuestDraft?.questId === FOUNDATION_QUEST_ID ? pilotProgress.dailyQuestDraft : null;
  const savedIndex = FOUNDATION_SCENARIO.items.findIndex((item) => item.label === proof?.problem);
  const [selectedProblem, setSelectedProblem] = useState(draft?.selectedProblem ?? (savedIndex >= 0 ? savedIndex : null));
  const [who, setWho] = useState(draft?.who ?? proof?.who ?? '');
  const [idea, setIdea] = useState(draft?.tryChoice ?? proof?.action ?? '');
  const [text, setText] = useState(draft?.text ?? pilotProgress.dailyQuestText);
  const complete = pilotProgress.dailyQuestComplete;
  const [step, setStep] = useState(draft?.guideStep || (complete ? 5 : 1));
  const selected = FOUNDATION_SCENARIO.items[selectedProblem] || null;
  const ideas = selected ? FOUNDATION_QUEST_IDEAS[selectedProblem] : [];
  const canSave = !!(selected && who && idea);
  const hasChanges = text !== pilotProgress.dailyQuestText || selected?.label !== proof?.problem || who !== (proof?.who || '') || idea !== (proof?.action || '');

  useEffect(() => {
    if (!complete || hasChanges) saveLessonDraft('dailyQuest', { questId: FOUNDATION_QUEST_ID, text, selectedProblem, who, tryChoice: idea, guideStep: step });
    else if (pilotProgress.dailyQuestDraft) saveLessonDraft('dailyQuest', null);
  }, [text, selectedProblem, who, idea, step, complete, hasChanges]);

  function chooseProblem(index) { setSelectedProblem(index); setWho(''); setIdea(''); setStep(2); }
  function chooseWho(value) { setWho(value); setStep(3); }
  function chooseIdea(value) { setIdea(value); setStep(4); }
  function useOwnIdea() { if (text.trim()) { setIdea('Own written idea'); setStep(4); } }
  function save() {
    if (!canSave) return;
    if (completeDailyQuest(text, { problem: selected.label, who, action: idea }, FOUNDATION_QUEST_ID)) { setText(text.trim()); setStep(5); }
  }

  const prompts = {
    1: 'Look at the lunch line. Tap one thing that catches your attention. A useful idea starts with noticing a real need.',
    2: `You noticed: ${selected?.label || 'a problem'}. Who feels this problem?`,
    3: 'Choose one move you would try. You can write your own idea instead. There is more than one useful answer.',
    4: 'Review what you chose: a problem, the people affected, and a move to try. You do not need to know whether it works yet; that needs a real test.',
    5: 'Your response is saved on this tablet. Show it to a nearby peer or facilitator, then use S.T.E.M.Sin to explore how to test an idea.',
  };
  const narration = step === 1 ? FOUNDATION_SCENARIO.items.map((item, i) => `Picture ${i + 1}: ${item.label}. ${item.detail}`).join(' ')
    : step === 2 ? `Choose: ${FOUNDATION_PEOPLE.join('. ')}.`
      : step === 3 ? `You can try: ${ideas.join('. ')}. Your own words are optional.`
        : step === 4 ? `Problem: ${selected?.label || ''}. People: ${who}. Move to try: ${idea}. ${text ? `Your own words: ${text}` : 'No written answer was provided.'}`
          : proofDescription(pilotProgress, 'dailyQuest');

  return <Shell showAudio={false}>
    <section className={styles.foundationQuestStage}>
      <header className={styles.foundationQuestHeader}>
        <div><span>YOUR FIRST DAILY QUEST</span><h1>{FOUNDATION_QUEST.title}</h1><p>See it. Notice it. Choose a move. Finish.</p></div>
        <div className={styles.foundationQuestMiniFlow} aria-label="First Daily Quest progress">
          {['SEE', 'PEOPLE', 'IDEA', 'FINISH'].map((label, index) => <span key={label} data-state={step > index + 1 ? 'done' : step === index + 1 ? 'active' : 'next'}><b>{index + 1}</b>{label}</span>)}
        </div>
      </header>
      <YEPGuide title={step === 5 ? 'Your response is saved' : ['See the lunch line', 'Think about people', 'Choose a move', 'Review your response'][step - 1]}
        prompt={prompts[step]} step={step === 5 ? 'SAVED' : `${step} OF 4`} narration={narration}
        example={selected ? `One possible move is: ${ideas[0]}. Discuss it with a facilitator and ask permission before a real test. You can choose a different idea.` : FOUNDATION_QUEST.example}
        pictureKind={selectedProblem === 2 ? 'help' : 'waiting'}
        actionLabel={step === 5 ? 'Go To S.T.E.M.Sin' : undefined}
        onAction={step === 5 ? () => navigate('stemSin') : undefined} />

      {step === 1 && <FoundationQuestScene selectedIndex={selectedProblem} onSelect={chooseProblem} />}
      {step === 2 && <section className={styles.foundationQuestChoiceStage}>
        <span>THINK ABOUT PEOPLE</span><h2>Who feels this problem?</h2><p>You noticed: <strong>{selected?.label}</strong></p>
        <div className={styles.foundationQuestBigChoices} aria-label="Choose who is affected">{FOUNDATION_PEOPLE.map((option) => <button type="button" key={option} aria-pressed={who === option} onClick={() => chooseWho(option)}><UsersRound size={24} /><strong>{option}</strong><ChevronRight size={19} /></button>)}</div>
      </section>}
      {step === 3 && <section className={styles.foundationQuestChoiceStage}>
        <span>BUILD AN IDEA</span><h2>What would you try first?</h2><p>Pick one move, or describe your own. Later, you can test it and change it.</p>
        <div className={styles.foundationQuestBigChoices} aria-label="Choose a change to try">{ideas.map((option) => <button type="button" key={option} aria-pressed={idea === option} onClick={() => chooseIdea(option)}><Lightbulb size={24} /><strong>{option}</strong><ChevronRight size={19} /></button>)}</div>
        <label htmlFor="daily-quest-answer">Your own idea, optional</label>
        <textarea id="daily-quest-answer" className={styles.dailyQuestTextarea} value={text} onChange={(event) => setText(event.target.value)} placeholder="I noticed… I would try…" />
        <VoiceCapture prompt={FOUNDATION_QUEST.prompt} currentValue={text} onConfirm={setText} />
        <button type="button" className={ui.btnGhost} disabled={!text.trim()} onClick={useOwnIdea}>Review My Own Idea</button>
      </section>}
      {step === 4 && <section className={styles.foundationQuestReview}>
        <span>YOUR CHOICES</span><h2>Problem → People → Idea</h2>
        <div className={styles.foundationQuestReviewGrid}>
          <div><small>I NOTICED</small><strong>{selected?.label}</strong></div>
          <div><small>IT AFFECTS</small><strong>{who}</strong></div>
          <div><small>I WOULD TRY</small><strong>{idea}</strong></div>
        </div>
        <label htmlFor="daily-quest-answer">Your own words, optional</label>
        <textarea id="daily-quest-answer" className={styles.dailyQuestTextarea} value={text} onChange={(event) => setText(event.target.value)} placeholder="Add your own words if you want." />
        <VoiceCapture prompt={FOUNDATION_QUEST.prompt} currentValue={text} onConfirm={setText} />
        <p>{text.trim() ? 'Your own words and selected choices will be saved.' : 'Only your selected choices will be saved. No written explanation or mastery claim is created.'}</p>
        <button type="button" className={styles.foundationQuestFinish} disabled={!canSave || (idea === 'Own written idea' && !text.trim())} onClick={save}>{complete ? 'Update My Proof' : 'Finish My First Quest'}<CheckCircle2 size={20} /></button>
      </section>}
      {step === 5 && <section className={styles.foundationQuestComplete}>
        <CheckCircle2 size={42} /><span>RESPONSE SAVED</span><h2>You chose a move to try.</h2><p>{proofDescription(pilotProgress, 'dailyQuest')}</p>
        <p>A selected idea is a starting point, not evidence that it works. Discuss who it could help and what you would test next.</p>
        <button type="button" className={ui.btnGhost} onClick={() => setStep(4)}>Review My Response</button>
      </section>}
      {step > 1 && step < 5 && <div className={styles.actions}>
        <button type="button" className={ui.btnGhost} onClick={() => setStep(step - 1)}>Back One Step</button>
        <button type="button" className={ui.btnGhost} onClick={() => setStep(1)}>Choose Another Problem</button>
      </div>}
      <p className={styles.draftNote}>{step === 5 ? 'Saved on this tablet.' : 'Your selections and draft are kept on this tablet as you go.'}</p>
      <footer className={styles.foundationQuestSupport}><BookOpenCheck size={18} /><span><strong>App:</strong> see + choose + experience. <strong>Workbook:</strong> think + write + discuss with support.</span></footer>
    </section>
  </Shell>;
}
