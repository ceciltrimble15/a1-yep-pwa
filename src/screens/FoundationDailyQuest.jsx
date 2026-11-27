import { useLayoutEffect, useState } from 'react';
import { Clock3, UsersRound, Eye, Lightbulb, ChevronRight, CheckCircle2, BookOpenCheck } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { FOUNDATION_QUEST, FOUNDATION_QUEST_ID, FOUNDATION_SCENARIO, FOUNDATION_PEOPLE, FOUNDATION_QUEST_IDEAS } from '../data/foundationQuest';
import { proofDescription } from '../data/proofEvidence';
import { LUNCH_LINE_COACH, coachLunchLine } from '../data/foundationResponseCoach';
import { FOUNDATION_GROW, assessGrowthChoice, reviewGrowthReflection } from '../data/foundationGrowth';
import Shell from '../components/Shell';
import YEPGuide from '../components/YEPGuide';
import { foundationTeacherStep } from '../data/foundationTeacher';
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
        <svg viewBox="0 0 1120 560" role="img" aria-label="Illustrated school cafeteria with a long lunch line, one crowded serving spot, and an unclear walking path">
          <defs>
            <linearGradient id="lunchWall" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#7FD0FF" />
              <stop offset="58%" stopColor="#4D8ED8" />
              <stop offset="100%" stopColor="#214B92" />
            </linearGradient>
            <linearGradient id="lunchFloor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#E8F0F7" />
              <stop offset="100%" stopColor="#B8C9D8" />
            </linearGradient>
            <linearGradient id="counterTop" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#F3D26C" />
              <stop offset="100%" stopColor="#D4A017" />
            </linearGradient>
            <filter id="hotspotGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#07152A" floodOpacity=".35" />
            </filter>
          </defs>

          <rect width="1120" height="560" rx="32" fill="url(#lunchWall)" />
          <rect y="354" width="1120" height="206" fill="url(#lunchFloor)" />

          <rect x="58" y="58" width="260" height="118" rx="18" fill="#DDF3FF" opacity=".9" />
          <rect x="78" y="76" width="100" height="82" rx="10" fill="#91D3FF" />
          <rect x="195" y="76" width="102" height="82" rx="10" fill="#91D3FF" />
          <path d="M188 76V158" stroke="#5B8AB8" strokeWidth="6" />

          <rect x="420" y="48" width="300" height="102" rx="18" fill="#102B5D" opacity=".92" />
          <text x="570" y="83" textAnchor="middle" fontSize="22" fontWeight="900" fill="#F5C94A">TODAY'S LUNCH</text>
          <text x="570" y="113" textAnchor="middle" fontSize="17" fontWeight="700" fill="#F7F9FF">Hot lunch · Fruit · Milk</text>
          <text x="570" y="137" textAnchor="middle" fontSize="14" fontWeight="700" fill="#C9D8EF">Pick up → Pay → Go</text>

          <rect x="760" y="92" width="306" height="244" rx="24" fill="#F7F9FF" />
          <rect x="778" y="112" width="270" height="48" rx="12" fill="url(#counterTop)" />
          <text x="913" y="143" textAnchor="middle" fontSize="19" fontWeight="900" fill="#0B1D3A">SERVING COUNTER</text>
          <rect x="790" y="200" width="250" height="92" rx="16" fill="#315FAE" />
          <rect x="814" y="185" width="52" height="32" rx="8" fill="#F6F7FB" />
          <rect x="882" y="185" width="52" height="32" rx="8" fill="#F6F7FB" />
          <rect x="950" y="185" width="52" height="32" rx="8" fill="#F6F7FB" />

          <g>
            <circle cx="850" cy="198" r="20" fill="#70462F" />
            <path d="M829 193c2-14 10-23 21-23 12 0 21 9 22 23-6-5-13-8-22-8-8 0-15 3-21 8Z" fill="#111827" />
            <rect x="828" y="217" width="44" height="58" rx="15" fill="#102B5D" />
            <path d="M838 245h24" stroke="#F5C94A" strokeWidth="5" strokeLinecap="round" />
          </g>
          <g>
            <circle cx="990" cy="198" r="20" fill="#8E5D3E" />
            <path d="M969 193c2-14 10-23 21-23 12 0 21 9 22 23-6-5-13-8-22-8-8 0-15 3-21 8Z" fill="#1A1A1A" />
            <rect x="968" y="217" width="44" height="58" rx="15" fill="#2E7D6C" />
          </g>

          <rect x="728" y="314" width="348" height="28" rx="12" fill="#D4A017" />
          <rect x="748" y="342" width="308" height="18" rx="8" fill="#173E86" opacity=".7" />

          <g opacity=".96">
            <ellipse cx="694" cy="376" rx="46" ry="18" fill="#8096A9" opacity=".3" />
            <ellipse cx="585" cy="407" rx="46" ry="18" fill="#8096A9" opacity=".3" />
            <ellipse cx="468" cy="433" rx="46" ry="18" fill="#8096A9" opacity=".3" />
            <ellipse cx="350" cy="458" rx="46" ry="18" fill="#8096A9" opacity=".3" />
            <ellipse cx="238" cy="476" rx="46" ry="18" fill="#8096A9" opacity=".3" />
            <ellipse cx="136" cy="493" rx="46" ry="18" fill="#8096A9" opacity=".3" />
          </g>

          {[
            { x: 700, y: 308, skin: '#8B593C', shirt: '#173E86', hair: '#090B10' },
            { x: 590, y: 338, skin: '#70462F', shirt: '#C0593F', hair: '#111827' },
            { x: 472, y: 365, skin: '#9B6547', shirt: '#2A7D6A', hair: '#1A1A1A' },
            { x: 355, y: 390, skin: '#6E432E', shirt: '#734AA0', hair: '#090B10' },
            { x: 242, y: 408, skin: '#8B593C', shirt: '#D19A27', hair: '#111827' },
            { x: 140, y: 425, skin: '#70462F', shirt: '#315FAE', hair: '#090B10' },
          ].map((p, index) => (
            <g key={index}>
              <circle cx={p.x} cy={p.y} r="24" fill={p.skin} />
              <path d={`M${p.x-24} ${p.y-7}c3-17 12-27 24-27s22 10 24 27c-7-6-15-9-24-9s-17 3-24 9Z`} fill={p.hair} />
              <rect x={p.x-23} y={p.y+22} width="46" height="72" rx="17" fill={p.shirt} />
              <rect x={p.x-27} y={p.y+47} width="54" height="9" rx="4" fill="#F7F9FF" opacity=".8" />
              <rect x={p.x-18} y={p.y+35} width="36" height="22" rx="5" fill="#D7E1EC" />
            </g>
          ))}

          <path d="M98 510 C235 470 356 469 482 432 C596 399 679 377 742 349" fill="none" stroke="#173E86" strokeWidth="6" strokeDasharray="18 18" opacity=".4" />
          <path d="M122 520 C295 535 414 502 526 468" fill="none" stroke="#D4A017" strokeWidth="8" strokeDasharray="18 16" opacity=".62" />
          <path d="M286 522 C394 486 486 481 585 436" fill="none" stroke="#D4A017" strokeWidth="8" strokeDasharray="18 16" opacity=".48" />
          <path d="M510 514 C564 470 628 443 694 420" fill="none" stroke="#D4A017" strokeWidth="8" strokeDasharray="18 16" opacity=".36" />

          <g opacity={selectedIndex == null || selectedIndex === 0 ? 1 : .22} filter="url(#hotspotGlow)">
            <ellipse cx="407" cy="413" rx="332" ry="116" fill="none" stroke="#F5C94A" strokeWidth="9" />
            <circle cx="104" cy="308" r="30" fill="#F5C94A" />
            <text x="104" y="318" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0B1D3A">1</text>
          </g>

          <g opacity={selectedIndex == null || selectedIndex === 1 ? 1 : .22} filter="url(#hotspotGlow)">
            <rect x="752" y="76" width="330" height="286" rx="34" fill="none" stroke="#F5C94A" strokeWidth="9" />
            <circle cx="1030" cy="68" r="30" fill="#F5C94A" />
            <text x="1030" y="78" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0B1D3A">2</text>
          </g>

          <g opacity={selectedIndex == null || selectedIndex === 2 ? 1 : .22} filter="url(#hotspotGlow)">
            <path d="M84 510 C273 469 447 519 631 423" fill="none" stroke="#F5C94A" strokeWidth="12" strokeLinecap="round" strokeDasharray="20 18" />
            <circle cx="86" cy="520" r="30" fill="#F5C94A" />
            <text x="86" y="530" textAnchor="middle" fontSize="28" fontWeight="900" fill="#0B1D3A">3</text>
          </g>

          <rect x="70" y="202" width="256" height="80" rx="18" fill="#0B1D3A" opacity=".9" />
          <text x="92" y="232" fontSize="16" fontWeight="900" fill="#F5C94A">LOOK CLOSELY</text>
          <text x="92" y="258" fontSize="17" fontWeight="800" fill="#F7F9FF">Where is the slowdown?</text>
        </svg>

        <div className={styles.foundationQuestHotspots} aria-label="Tap a highlighted part of the scene">
          {FOUNDATION_SCENARIO.items.map((item, index) => (
            <button
              type="button"
              key={item.label}
              data-index={index}
              data-selected={selectedIndex === index ? 'true' : 'false'}
              aria-label={`Problem ${index + 1}: ${item.label}. ${item.detail}`}
              onClick={() => onSelect(index)}
            >
              <span>{index + 1}</span>
              <strong>{item.label}</strong>
            </button>
          ))}
        </div>
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
  const [step, setStep] = useState(draft?.guideStep ? Math.min(draft.guideStep, 6) : complete ? 7 : 1);
  const [coachChoice, setCoachChoice] = useState(draft?.coachChoice ?? pilotProgress.dailyQuestCoachedResponse?.lastChoice ?? null);
  const [coachAttempts, setCoachAttempts] = useState(draft?.coachAttempts ?? pilotProgress.dailyQuestCoachedResponse?.attempts ?? 0);
  const [coachPassed, setCoachPassed] = useState(draft?.coachPassed ?? !!pilotProgress.dailyQuestCoachedResponse?.reviewed);
  const [coachFeedback, setCoachFeedback] = useState(draft?.coachFeedback || '');
  const [growthChoice, setGrowthChoice] = useState(draft?.growthChoice ?? pilotProgress.dailyQuestGrowthProof?.lastChoice ?? null);
  const [growthAttempts, setGrowthAttempts] = useState(draft?.growthAttempts ?? pilotProgress.dailyQuestGrowthProof?.attempts ?? 0);
  const [growthPassed, setGrowthPassed] = useState(draft?.growthPassed ?? !!pilotProgress.dailyQuestGrowthProof?.transferPassed);
  const [growthFeedback, setGrowthFeedback] = useState(draft?.growthFeedback || '');
  const [growthReflection, setGrowthReflection] = useState(draft?.growthReflection || pilotProgress.dailyQuestGrowthProof?.reflection || '');
  const reflectionReview = reviewGrowthReflection(growthReflection);
  const selected = FOUNDATION_SCENARIO.items[selectedProblem] || null;
  const ideas = selected ? FOUNDATION_QUEST_IDEAS[selectedProblem] : [];
  const canSave = !!(selected && who && idea && coachPassed && growthPassed && reflectionReview.provided);
  const hasChanges = text !== pilotProgress.dailyQuestText || selected?.label !== proof?.problem || who !== (proof?.who || '') || idea !== (proof?.action || '') || growthReflection !== (pilotProgress.dailyQuestGrowthProof?.reflection || '');

  useLayoutEffect(() => {
    if (!complete || hasChanges) saveLessonDraft('dailyQuest', { questId: FOUNDATION_QUEST_ID, text, selectedProblem, who, tryChoice: idea, guideStep: step, coachChoice, coachAttempts, coachPassed, coachFeedback, growthChoice, growthAttempts, growthPassed, growthFeedback, growthReflection });
    else if (pilotProgress.dailyQuestDraft) saveLessonDraft('dailyQuest', null);
  }, [text, selectedProblem, who, idea, step, complete, hasChanges, coachChoice, coachAttempts, coachPassed, coachFeedback, growthChoice, growthAttempts, growthPassed, growthFeedback, growthReflection]);

  function resetCoach() { setCoachChoice(null); setCoachAttempts(0); setCoachPassed(false); setCoachFeedback(''); resetGrowth(); }
  function resetGrowth() { setGrowthChoice(null); setGrowthAttempts(0); setGrowthPassed(false); setGrowthFeedback(''); setGrowthReflection(''); }
  function chooseProblem(index) { setSelectedProblem(index); setWho(''); setIdea(''); resetCoach(); setStep(2); }
  function chooseWho(value) { setWho(value); resetCoach(); setStep(3); }
  function chooseIdea(value) { setIdea(value); resetCoach(); setStep(4); }
  function useOwnIdea() { if (text.trim()) { setIdea('Own written idea'); resetCoach(); setStep(4); } }
  function respondToCoach(choiceIndex) {
    if (coachPassed) return;
    const nextAttempts = coachAttempts + 1;
    const feedback = coachLunchLine(selectedProblem, choiceIndex, nextAttempts);
    if (!feedback) return;
    setCoachChoice(choiceIndex);
    setCoachAttempts(nextAttempts);
    setCoachPassed(feedback.passed);
    setCoachFeedback(feedback.message);
  }
  function respondToGrowth(index) {
    if (growthPassed) return;
    const nextAttempts = growthAttempts + 1;
    const feedback = assessGrowthChoice(index, nextAttempts);
    if (!feedback) return;
    setGrowthChoice(index);
    setGrowthAttempts(nextAttempts);
    setGrowthPassed(feedback.passed);
    setGrowthFeedback(feedback.feedback);
  }
  function save() {
    if (!canSave) return;
    const growthProof = { kind: 'foundation-growth-transfer-v1', scenario: 'art-supplies', attempts: growthAttempts, lastChoice: growthChoice, transferPassed: growthPassed, reflection: growthReflection.trim(), reflectionStatus: 'awaiting-facilitator-review', mastery: 'not-verified' };
    if (completeDailyQuest(text, { problem: selected.label, who, action: idea }, FOUNDATION_QUEST_ID, {
      kind: 'foundation-guided-response-v1', scenario: selectedProblem, attempts: coachAttempts,
      lastChoice: coachChoice, reviewed: true, status: 'practice-response-only'
    }, growthProof)) { setText(text.trim()); setStep(7); }
  }

  const prompts = {
    1: 'Look at the lunch line. Tap one thing that catches your attention. A useful idea starts with noticing a real need.',
    2: `You noticed: ${selected?.label || 'a problem'}. Who feels this problem?`,
    3: 'Choose one move you would try. You can write your own idea instead. There is more than one useful answer.',
    4: 'Let us test your thinking. Choose how to find out whether your idea would help. If it needs work, I will give you a hint.',
    5: 'Now take your thinking somewhere new. Look at the art-table problem, then choose a safe test.',
    6: 'Explain what you learned in your own words. Then review your plan and save the practice.',
    7: 'Your practice and reflection are saved on this tablet. A facilitator can review your thinking before you try a real-world skill.',
  };
  const narration = step === 1 ? FOUNDATION_SCENARIO.items.map((item, i) => `Picture ${i + 1}: ${item.label}. ${item.detail}`).join(' ')
    : step === 2 ? `Choose: ${FOUNDATION_PEOPLE.join('. ')}.`
      : step === 3 ? `You can try: ${ideas.join('. ')}. Your own words are optional.`
        : step === 4 ? (LUNCH_LINE_COACH[selectedProblem]?.question || 'Choose how to test your idea.')
      : step === 5 ? FOUNDATION_GROW.scenario
      : step === 6 ? FOUNDATION_GROW.reflectionPrompt
        : proofDescription(pilotProgress, 'dailyQuest');

  return <Shell showAudio={false}>
    <section className={styles.foundationQuestStage}>
      <header className={styles.foundationQuestHeader}>
        <div><span>YOUR FIRST DAILY QUEST</span><h1>{FOUNDATION_QUEST.title}</h1><p>See it. Notice it. Choose a move. Finish.</p></div>
        <div className={styles.foundationQuestMiniFlow} aria-label="First Daily Quest progress">
          {['SEE', 'THINK', 'PLAN', 'TRY', 'GROW', 'REFLECT'].map((label, index) => <span key={label} data-state={step > index + 1 ? 'done' : step === index + 1 ? 'active' : 'next'}><b>{index + 1}</b>{label}</span>)}
        </div>
      </header>
      <YEPGuide teacher={step === 5 && growthFeedback ? {
        ...foundationTeacherStep('dailyQuest', step), speech: growthFeedback,
        question: growthPassed ? 'Explain what you learned next.' : 'Try again. How could you safely check the result?'
      } : step === 4 && coachFeedback ? {
        ...foundationTeacherStep('dailyQuest', step),
        speech: coachFeedback,
        question: coachPassed ? 'Review your practice response, then continue.' : 'Try another choice. What can we compare before and after?'
      } : foundationTeacherStep('dailyQuest', step)} title={step === 7 ? 'Your growth practice is saved' : ['See the lunch line', 'Think about people', 'Choose a move', 'Try your thinking', 'Grow in a new situation', 'Reflect and review'][step - 1]}
        prompt={prompts[step]} step={step === 7 ? 'SAVED' : `${step} OF 6`} narration={narration}
        example={selected ? `One possible move is: ${ideas[0]}. Discuss it with a facilitator and ask permission before a real test. You can choose a different idea.` : FOUNDATION_QUEST.example}
        pictureKind={selectedProblem === 2 ? 'help' : 'waiting'}
        actionLabel={step === 7 ? 'Go To S.T.E.M.Sin' : undefined}
        onAction={step === 7 ? () => navigate('stemSin') : undefined} />

      {step === 1 && <div id="foundation-lunch-scene"><FoundationQuestScene selectedIndex={selectedProblem} onSelect={chooseProblem} /></div>}
      {step === 2 && <section id="foundation-people" className={styles.foundationQuestChoiceStage}>
        <span>THINK ABOUT PEOPLE</span><h2>Who feels this problem?</h2><p>You noticed: <strong>{selected?.label}</strong></p>
        <div className={styles.foundationQuestBigChoices} aria-label="Choose who is affected">{FOUNDATION_PEOPLE.map((option) => <button type="button" key={option} aria-pressed={who === option} onClick={() => chooseWho(option)}><UsersRound size={24} /><strong>{option}</strong><ChevronRight size={19} /></button>)}</div>
      </section>}
      {step === 3 && <section id="foundation-ideas" className={styles.foundationQuestChoiceStage}>
        <span>BUILD AN IDEA</span><h2>What would you try first?</h2><p>Pick one move, or describe your own. Later, you can test it and change it.</p>
        <div className={styles.foundationQuestBigChoices} aria-label="Choose a change to try">{ideas.map((option) => <button type="button" key={option} aria-pressed={idea === option} onClick={() => chooseIdea(option)}><Lightbulb size={24} /><strong>{option}</strong><ChevronRight size={19} /></button>)}</div>
        <label htmlFor="daily-quest-answer">Your own idea, optional</label>
        <textarea id="daily-quest-answer" className={styles.dailyQuestTextarea} value={text} onChange={(event) => setText(event.target.value)} placeholder="I noticed… I would try…" />
        <VoiceCapture prompt={FOUNDATION_QUEST.prompt} currentValue={text} onConfirm={setText} />
        <button type="button" className={ui.btnGhost} disabled={!text.trim()} onClick={useOwnIdea}>Review My Own Idea</button>
      </section>}
      {step === 4 && <section id="foundation-coach" className={styles.foundationQuestChoiceStage} aria-label="Responsive teaching checkpoint">
        <span>TRY YOUR THINKING</span><h2>{LUNCH_LINE_COACH[selectedProblem]?.question}</h2>
        <p>Choose an answer. Your guide will explain or give you a clue to help you try again.</p>
        <div className={styles.foundationQuestBigChoices} aria-label="Choose how to test your idea">
          {(LUNCH_LINE_COACH[selectedProblem]?.choices || []).map((choice, index) => (
            <button type="button" key={choice} aria-pressed={coachChoice === index}
              disabled={coachPassed} onClick={() => respondToCoach(index)}>
              <Lightbulb size={24} /><strong>{choice}</strong><ChevronRight size={19} />
            </button>
          ))}
        </div>
        {coachFeedback && <div role="status" aria-live="polite" className={styles.foundationCoachFeedback} data-result={coachPassed ? 'ready' : 'retry'}>
          <strong>{coachPassed ? 'YOU REASONED THROUGH IT' : 'HERE IS A CLUE'}</strong>
          <p>{coachFeedback}</p>
          <small>{coachPassed ? 'This demonstrates a practice response, not real-world mastery.' : 'Try another option. You can ask a facilitator for help.'}</small>
        </div>}
        {coachPassed && <button type="button" className={styles.foundationQuestFinish} onClick={() => setStep(5)}>Grow My Thinking <ChevronRight size={20} /></button>}
      </section>}
      {step === 5 && <section id="foundation-grow" className={styles.foundationQuestChoiceStage} aria-label="Growth learning checkpoint">
        <span>GROW · NEW SITUATION</span><h2>{FOUNDATION_GROW.title}</h2>
        <p>{FOUNDATION_GROW.scenario}</p>
        <h3>{FOUNDATION_GROW.question}</h3>
        <div className={styles.foundationQuestBigChoices} aria-label="Choose your growth answer">
          {FOUNDATION_GROW.choices.map((choice, index) => <button type="button" key={choice}
            aria-pressed={growthChoice === index} disabled={growthPassed} onClick={() => respondToGrowth(index)}>
            <Lightbulb size={24}/><strong>{choice}</strong><ChevronRight size={19}/>
          </button>)}
        </div>
        {growthFeedback && <div role="status" aria-live="polite" className={styles.foundationCoachFeedback} data-result={growthPassed ? 'ready' : 'retry'}>
          <strong>{growthPassed ? 'YOU APPLIED YOUR LEARNING' : 'LET US THINK AGAIN'}</strong>
          <p>{growthFeedback}</p>
          <small>{growthPassed ? 'This is a guided transfer exercise, not proof of independent mastery.' : 'Try another idea or ask a facilitator for support.'}</small>
        </div>}
        {growthPassed && <button type="button" className={styles.foundationQuestFinish} onClick={() => setStep(6)}>Reflect on My Growth <ChevronRight size={20}/></button>}
      </section>}
      {step === 6 && <section id="foundation-review" className={styles.foundationQuestReview}>
        <span>GROW · REFLECT AND REVIEW</span><h2>What changed in your thinking?</h2>
        <p>{FOUNDATION_GROW.reflectionPrompt}</p>
        <label htmlFor="foundation-growth-reflection">My learning reflection</label>
        <textarea id="foundation-growth-reflection" className={styles.dailyQuestTextarea} value={growthReflection}
          onChange={(event) => setGrowthReflection(event.target.value)}
          placeholder="I learned to check my idea by…"/>
        <p role="status" aria-live="polite">{reflectionReview.feedback}</p>
        <p>Your own words will be saved for facilitator review, not automatically graded by AI.</p>
        <h3>Review your first problem and your plan</h3>
        <div className={styles.foundationQuestReviewGrid}>
          <div><small>I NOTICED</small><strong>{selected?.label}</strong></div>
          <div><small>IT AFFECTS</small><strong>{who}</strong></div>
          <div><small>I WOULD TRY</small><strong>{idea}</strong></div>
        </div>
        <label htmlFor="daily-quest-answer">Your own words, optional</label>
        <textarea id="daily-quest-answer" className={styles.dailyQuestTextarea} value={text} onChange={(event) => setText(event.target.value)} placeholder="Add your own words if you want." />
        <VoiceCapture prompt={FOUNDATION_QUEST.prompt} currentValue={text} onConfirm={setText} />
        <p>{text.trim() ? 'Your words, choices, and guided practice response will be saved.' : 'Your selected choices and guided practice response will be saved. No mastery claim is created.'}</p>
        <p>Guided reasoning attempts: {coachAttempts}. New-situation attempts: {growthAttempts}. A facilitator must verify any actual practical skill.</p>
        <button type="button" className={styles.foundationQuestFinish} disabled={!canSave || (idea === 'Own written idea' && !text.trim())} onClick={save}>{complete ? 'Update My Proof' : 'Finish My First Quest'}<CheckCircle2 size={20} /></button>
      </section>}
      {step === 7 && <section id="foundation-complete" className={styles.foundationQuestComplete}>
        <CheckCircle2 size={42} /><span>RESPONSE SAVED</span><h2>You chose a move to try.</h2><p>{proofDescription(pilotProgress, 'dailyQuest')}</p>
        <p>GROW reflection: {pilotProgress.dailyQuestGrowthProof?.reflection || 'No reflection recorded'}</p>
        <p>Learning practice saved for facilitator review. A selected idea and a guided correct answer are not independent mastery.</p>
        <button type="button" className={ui.btnGhost} onClick={() => setStep(6)}>Review My Response</button>
      </section>}
      {step > 1 && step < 7 && <div className={styles.actions}>
        <button type="button" className={ui.btnGhost} onClick={() => setStep(step - 1)}>Back One Step</button>
        <button type="button" className={ui.btnGhost} onClick={() => setStep(1)}>Choose Another Problem</button>
      </div>}
      <p className={styles.draftNote}>{step === 7 ? 'Saved on this tablet. Facilitator verification remains separate.' : 'Your selections, coaching attempts, and draft are kept on this tablet as you go.'}</p>
      <footer className={styles.foundationQuestSupport}><BookOpenCheck size={18} /><span><strong>App:</strong> see + choose + experience. <strong>Workbook:</strong> think + write + discuss with support.</span></footer>
    </section>
  </Shell>;
}
