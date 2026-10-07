import { useState } from 'react';
import { Sparkles, Lightbulb, Target, BriefcaseBusiness, Eye, PenLine, CheckCircle2, Flag, BookOpenCheck, FlaskConical, ScanFace, PackageOpen, Trash2, UsersRound, Clock3, Smartphone, MessageCircle, Store, Wrench, Volume2, ChevronRight } from 'lucide-react';
import { getProgramContent } from '../data/pilotContent';
import { MODES } from '../data/modes';
import { useYEP } from '../context/YEPContext';
import Shell from '../components/Shell';
import VoiceCapture from '../components/VoiceCapture';
import styles from './PilotScreens.module.css';
import ui from '../styles/ui.module.css';

const LANE_ICONS = {
  explorer: Sparkles,
  builder: Lightbulb,
  leader: Target,
  yaep: BriefcaseBusiness,
};

const QUEST_LABELS = {
  explorer: {
    kicker: 'Your First Quest',
    title: 'A Better Lunch Line',
    helper: 'Look at one real situation. Notice what is happening, think about who it affects, and choose one thing you would try.',
    placeholder: 'I noticed… I would try…',
    action: 'Finish My First Quest',
  },
  builder: {
    kicker: 'Daily Challenge',
    title: 'Spot It. Think It Through. Try Something.',
    helper: 'Don’t guess. Spot a real problem, name who deals with it, and choose one small move you could test.',
    placeholder: 'The problem is… It affects… One thing I could test is…',
    action: 'Complete Daily Quest',
  },
  leader: {
    kicker: 'Daily Quest',
    title: 'Find the Need Behind the Problem',
    helper: 'Look for the need behind the problem. Who feels it, what do you know, and what still needs to be tested?',
    placeholder: 'The need is… My evidence is… I still need to test…',
    action: 'Complete Daily Quest',
  },
  yaep: {
    kicker: 'Opportunity Scan',
    title: 'Identify Value Worth Testing',
    helper: 'Find a real need. Who has it, how are they handling it now, and what value could you test?',
    placeholder: 'The opportunity is… The user is… The current workaround is…',
    action: 'Complete Opportunity Quest',
  },
};

const VISUAL_SCENARIOS = {
  explorer: {
    eyebrow: 'LOOK AT THE LUNCH LINE',
    title: 'What do you notice?',
    lead: 'There is no perfect answer. Start with one thing you can see.',
    items: [
      { icon: Clock3, label: 'The line is long', detail: 'Students spend a lot of time waiting.' },
      { icon: UsersRound, label: 'Everyone uses one spot', detail: 'One serving area can slow the whole line down.' },
      { icon: Eye, label: 'The path is not clear', detail: 'It can be hard to know where to stand or go next.' },
    ],
    footer: 'Notice one thing. Think about people. Then choose one move you would try.',
  },
  builder: {
    eyebrow: 'SEE THE PROBLEM',
    title: 'What is slowing people down?',
    lead: 'Look for something that creates confusion, wasted time, or extra work.',
    items: [
      { icon: Clock3, label: 'Too much waiting', detail: 'People lose time.' },
      { icon: PackageOpen, label: 'Hard to find things', detail: 'The system is not clear.' },
      { icon: UsersRound, label: 'People keep asking', detail: 'A process may be missing.' },
    ],
    footer: 'Name the user, the problem, and one small change worth testing.',
  },
  leader: {
    eyebrow: 'SEE THE NEED',
    title: 'What is the evidence telling you?',
    lead: 'Separate what you know from what you are assuming before you build a solution.',
    items: [
      { icon: MessageCircle, label: 'Repeated complaints', detail: 'People keep naming the same issue.' },
      { icon: Clock3, label: 'Time keeps getting lost', detail: 'The current process has friction.' },
      { icon: Wrench, label: 'Workarounds everywhere', detail: 'People are fixing the same gap by hand.' },
    ],
    footer: 'What evidence do you have, and what still needs to be tested?',
  },
  yaep: {
    eyebrow: 'SEE THE OPPORTUNITY',
    title: 'Where is value being missed?',
    lead: 'Find the gap between what people need and how they are handling it right now.',
    items: [
      { icon: Store, label: 'Customer need', detail: 'A task is not being handled well.' },
      { icon: Smartphone, label: 'Broken workflow', detail: 'Messages or requests get lost.' },
      { icon: Clock3, label: 'Time or money leaking', detail: 'The current process costs too much effort.' },
    ],
    footer: 'Who is the user, what is the workaround, and what value could you test?',
  },
};


const FOUNDATION_QUEST_IDEAS = [
  ['Open a second line', 'Put quick items first', 'Let groups go at different times'],
  ['Create two pick-up spots', 'Separate different food choices', 'Add a quick grab-and-go spot'],
  ['Add floor arrows', 'Use simple picture signs', 'Have a helper show the next step'],
];

const STEM_LABS = {
  explorer: {
    eyebrow: 'PRACTICE LAB',
    title: 'Make supplies easier to find',
    scene: 'The art table has one mixed pile of supplies. Someone keeps stopping to ask where things belong.',
    user: 'A learner who wants to find the right supply without waiting for help.',
    tools: [
      { icon: PackageOpen, label: 'Sorting Tray', detail: 'Put similar supplies into separate sections.', result: 'The mixed pile becomes three clear groups.' },
      { icon: Eye, label: 'Picture Labels', detail: 'Add a simple picture to show what belongs where.', result: 'The practice bins become easier to recognize at a glance.' },
      { icon: Wrench, label: 'Simple Holder', detail: 'Use a basic holder to keep rolling items in one place.', result: 'Loose items stop spreading across the practice table.' },
    ],
    predictions: ['Find things faster', 'Ask fewer questions', 'Keep the space organized'],
  },
  builder: {
    eyebrow: 'TEST THE CHANGE',
    title: 'Make a shared supply box easier to use',
    scene: 'People open the same box, move things around, and lose time looking for what they need.',
    user: 'A classmate or teammate trying to get one item quickly.',
    tools: [
      { icon: PackageOpen, label: 'Labeled Sections', detail: 'Give each item type a clear section.', result: 'The practice box changes from one mixed area into labeled groups.' },
      { icon: CheckCircle2, label: 'Quick Checklist', detail: 'Show what should be in the box before and after use.', result: 'The practice check makes missing items easier to notice.' },
      { icon: Clock3, label: 'Fast-Find Rule', detail: 'Put the most-used items where they are easiest to reach.', result: 'The practice path to common items becomes shorter.' },
    ],
    predictions: ['Reduce search time', 'Make the system clearer', 'Reduce missing items'],
  },
  leader: {
    eyebrow: 'PROTOTYPE WITH EVIDENCE',
    title: 'Stop club sign-ups from getting lost',
    scene: 'A school club collects names in different places. Some people are counted twice and others disappear from the list.',
    user: 'A club organizer who needs one clear view of who signed up.',
    tools: [
      { icon: Smartphone, label: 'Simple Form', detail: 'Use one sample form for every sign-up.', result: 'The practice sign-ups land in one consistent format.' },
      { icon: CheckCircle2, label: 'Status Board', detail: 'Show who is new, confirmed, or still needs follow-up.', result: 'The practice list separates sign-ups by status.' },
      { icon: MessageCircle, label: 'Reminder Step', detail: 'Add one follow-up reminder after the first sign-up.', result: 'The practice workflow now shows a clear next action.' },
    ],
    predictions: ['Reduce lost sign-ups', 'Make follow-up clearer', 'Improve completion time'],
  },
  yaep: {
    eyebrow: 'TURN A TOOL INTO VALUE',
    title: 'Stop estimate requests from disappearing',
    scene: 'A service business gets requests through messages and calls. Busy staff can miss who needs a reply.',
    user: 'A business owner who needs a reliable way to capture and follow up on requests.',
    tools: [
      { icon: Smartphone, label: 'Request Form', detail: 'Capture the same basic information every time.', result: 'The practice requests arrive in one consistent format.' },
      { icon: Store, label: 'Request Tracker', detail: 'Put each request into a visible status.', result: 'The practice workflow now shows new, contacted, and completed requests.' },
      { icon: MessageCircle, label: 'Follow-up Reminder', detail: 'Create a clear reminder when a request has no response.', result: 'The practice workflow surfaces an unanswered request instead of losing it.' },
    ],
    predictions: ['Reply faster', 'Lose fewer requests', 'Make follow-up easier to manage'],
  },
};

function GuideAvatar() {
  return (
    <svg className={styles.guideAvatarArt} viewBox="0 0 120 120" role="img" aria-label="YEP guide avatar">
      <circle cx="60" cy="60" r="56" fill="#0F2460" />
      <path d="M24 103c8-21 22-31 36-31s28 10 36 31" fill="#2A4EAF" />
      <circle cx="60" cy="52" r="28" fill="#70462F" />
      <path d="M33 47c2-18 13-29 28-29 16 0 28 10 29 28-7-7-18-12-29-12-11 0-21 4-28 13Z" fill="#111827" />
      <path d="M36 39c6-13 14-20 25-20 13 0 23 8 27 22-8-6-17-9-27-9-9 0-18 2-25 7Z" fill="#05070B" />
      <circle cx="50" cy="53" r="2.5" fill="#111827" />
      <circle cx="70" cy="53" r="2.5" fill="#111827" />
      <path d="M52 66c5 4 11 4 16 0" fill="none" stroke="#2B1710" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M41 88c12 8 26 8 38 0" fill="none" stroke="#D4A017" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}

function VisualScenario({ mode, selectedIndex, onSelect }) {
  const scenario = VISUAL_SCENARIOS[mode] || VISUAL_SCENARIOS.builder;
  return (
    <section className={styles.visualScenario} data-lane={mode} aria-label="Visual problem-finding example">
      <div className={styles.visualScenarioHeader}>
        <div>
          <span>{scenario.eyebrow}</span>
          <h2>{scenario.title}</h2>
          <p>{scenario.lead}</p>
        </div>
        <div className={styles.visualScenarioCue} aria-hidden="true">
          <Eye size={28} strokeWidth={2.1} />
          <strong>SEE IT</strong>
        </div>
      </div>

      <div className={styles.broadcastScene}>
        <svg
          className={styles.broadcastSceneArt}
          viewBox="0 0 1000 430"
          role="img"
          aria-label="Illustrated community workspace with three numbered problem areas to notice"
        >
          <defs>
            <linearGradient id="sceneBg" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#173f7c" />
              <stop offset="100%" stopColor="#081a38" />
            </linearGradient>
            <linearGradient id="sceneFloor" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#18345c" />
              <stop offset="100%" stopColor="#0d2346" />
            </linearGradient>
            <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect x="0" y="0" width="1000" height="430" rx="28" fill="url(#sceneBg)" />
          <rect x="0" y="285" width="1000" height="145" fill="url(#sceneFloor)" />
          <rect x="55" y="70" width="270" height="140" rx="18" fill="#244f8f" opacity=".78" />
          <rect x="78" y="94" width="104" height="90" rx="12" fill="#d4dae6" opacity=".9" />
          <rect x="196" y="94" width="104" height="90" rx="12" fill="#b0b8c8" opacity=".56" />
          <rect x="382" y="192" width="260" height="42" rx="12" fill="#315b91" />
          <rect x="400" y="230" width="18" height="88" rx="9" fill="#203d69" />
          <rect x="605" y="230" width="18" height="88" rx="9" fill="#203d69" />
          <rect x="432" y="154" width="84" height="54" rx="10" fill="#d4a017" opacity=".82" />
          <rect x="495" y="144" width="92" height="63" rx="10" fill="#7d90b8" />
          <rect x="535" y="163" width="82" height="45" rx="10" fill="#a8b9dd" />
          <rect x="705" y="190" width="108" height="122" rx="16" fill="#1b3155" />
          <rect x="724" y="210" width="70" height="18" rx="9" fill="#6e86b4" />
          <rect x="724" y="239" width="70" height="18" rx="9" fill="#4f6794" />
          <rect x="724" y="268" width="70" height="18" rx="9" fill="#3e547d" />
          <circle cx="846" cy="167" r="30" fill="#c8d6f5" />
          <rect x="817" y="197" width="58" height="94" rx="24" fill="#2a4eaf" />
          <rect x="805" y="285" width="28" height="70" rx="14" fill="#1f3f78" />
          <rect x="859" y="285" width="28" height="70" rx="14" fill="#1f3f78" />
          <path d="M112 315 C136 294 167 294 193 315" fill="none" stroke="#8799bd" strokeWidth="10" strokeLinecap="round" />
          <path d="M114 329 C142 314 172 314 196 329" fill="none" stroke="#687da7" strokeWidth="8" strokeLinecap="round" />
          <circle cx="126" cy="340" r="9" fill="#b0b8c8" />
          <circle cx="153" cy="348" r="8" fill="#d4dae6" />
          <circle cx="181" cy="341" r="9" fill="#9aaacc" />

          <g filter="url(#softGlow)" opacity={selectedIndex === null || selectedIndex === 0 ? 1 : .3}>
            <circle cx="525" cy="176" r="58" fill="none" stroke="#d4a017" strokeWidth="7" />
            <circle cx="525" cy="176" r="46" fill="none" stroke="#d4a017" strokeOpacity=".35" strokeWidth="3" />
            <circle cx="525" cy="89" r="25" fill="#d4a017" />
            <text x="525" y="98" textAnchor="middle" fill="#0f2460" fontSize="26" fontWeight="900">1</text>
          </g>
          <g filter="url(#softGlow)" opacity={selectedIndex === null || selectedIndex === 1 ? 1 : .3}>
            <circle cx="154" cy="332" r="61" fill="none" stroke="#d4a017" strokeWidth="7" />
            <circle cx="154" cy="332" r="49" fill="none" stroke="#d4a017" strokeOpacity=".35" strokeWidth="3" />
            <circle cx="89" cy="270" r="25" fill="#d4a017" />
            <text x="89" y="279" textAnchor="middle" fill="#0f2460" fontSize="26" fontWeight="900">2</text>
          </g>
          <g filter="url(#softGlow)" opacity={selectedIndex === null || selectedIndex === 2 ? 1 : .3}>
            <circle cx="846" cy="244" r="76" fill="none" stroke="#d4a017" strokeWidth="7" />
            <circle cx="846" cy="244" r="64" fill="none" stroke="#d4a017" strokeOpacity=".35" strokeWidth="3" />
            <circle cx="915" cy="157" r="25" fill="#d4a017" />
            <text x="915" y="166" textAnchor="middle" fill="#0f2460" fontSize="26" fontWeight="900">3</text>
          </g>
        </svg>

        <div className={styles.broadcastOverlay} aria-label="Choose something you notice in the visual scene">
          {scenario.items.map(({ icon: Icon, label, detail }, index) => (
            <button
              type="button"
              key={label}
              className={selectedIndex === index ? styles.broadcastCalloutSelected : styles.broadcastCallout}
              onClick={() => onSelect(index)}
              aria-pressed={selectedIndex === index}
            >
              <div className={styles.broadcastCalloutNumber}>{index + 1}</div>
              <Icon size={23} strokeWidth={2.15} aria-hidden="true" />
              <div>
                <strong>{label}</strong>
                <small>{detail}</small>
              </div>
            </button>
          ))}
        </div>

        <div className={styles.broadcastFlow} aria-label="How to read the scene">
          <span>SEE</span>
          <i aria-hidden="true">→</i>
          <span>NOTICE</span>
          <i aria-hidden="true">→</i>
          <span>WHO IT AFFECTS</span>
          <i aria-hidden="true">→</i>
          <span>IDEA</span>
        </div>
      </div>

      <div className={styles.visualScenarioFooter}>
        <Lightbulb size={20} aria-hidden="true" />
        <strong>{scenario.footer}</strong>
      </div>
    </section>
  );
}

function FoundationQuestScene({ selectedIndex, onSelect }) {
  const scenario = VISUAL_SCENARIOS.explorer;
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

      <div className={styles.foundationQuestNoticeChoices}>
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

function YEPGuide({ prompt, step, onHear, actionLabel, onAction }) {
  return (
    <section className={styles.guidePanel} aria-live="polite">
      <div className={styles.guideAvatarWrap}>
        <GuideAvatar />
        <span>YEP GUIDE</span>
      </div>
      <div className={styles.guideBubble}>
        <span className={styles.guideStep}>GUIDE STEP {step}</span>
        <p>{prompt}</p>
        <div className={styles.guideActions}>
          <button type="button" className={styles.guideHear} onClick={onHear}>
            <Volume2 size={17} aria-hidden="true" /> Hear Guide
          </button>
          {actionLabel && (
            <button type="button" className={styles.guideNext} onClick={onAction}>
              {actionLabel} <ChevronRight size={17} aria-hidden="true" />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

function ScreenHead({ eyebrow, title, sub }) {
  return (
    <div className={styles.head}>
      <div className={styles.eyebrow}>{eyebrow}</div>
      <h1 className={styles.title}>{title}</h1>
      {sub && <p className={styles.sub}>{sub}</p>}
    </div>
  );
}

function QuestLaneHero({ mode }) {
  const program = MODES[mode] || MODES.builder;
  const copy = QUEST_LABELS[mode] || QUEST_LABELS.builder;
  const Icon = LANE_ICONS[mode] || Lightbulb;
  return (
    <div className={styles.questHero} data-lane={mode}>
      <div className={styles.questLane}><Icon size={18} /> {program.tier} · Ages {program.ageRange}</div>
      <div className={styles.questKicker}>{copy.kicker}</div>
      <h1 className={styles.questTitle}>{copy.title}</h1>
      <p className={styles.questHelper}>{copy.helper}</p>
    </div>
  );
}

function BackHome() {
  const { navigate } = useYEP();
  return <button className={ui.btnGhost} onClick={() => navigate('home')}>Back To Program Home</button>;
}

function WorkbookCallout({ text }) {
  return <div className={styles.note}><strong>Workbook ↔ App:</strong> {text}</div>;
}

function LaneGuidance() {
  const { mode } = useYEP();
  const { instructions, example, expectations } = getProgramContent(mode);
  return <div className={styles.note}><p>{instructions}</p><p><strong>Example:</strong> {example}</p><p>{expectations}</p></div>;
}

export function DailyQuest() {
  const { pilotProgress, completeDailyQuest, mode, navigate } = useYEP();
  const { dailyQuest } = getProgramContent(mode);
  const copy = QUEST_LABELS[mode] || QUEST_LABELS.builder;
  const scenario = VISUAL_SCENARIOS[mode] || VISUAL_SCENARIOS.builder;
  const [text, setText] = useState(pilotProgress.dailyQuestText);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [affectedBy, setAffectedBy] = useState('');
  const [ideaChoice, setIdeaChoice] = useState('');
  const [guideStep, setGuideStep] = useState(
    pilotProgress.dailyQuestComplete ? (mode === 'explorer' ? 5 : 4) : 1
  );
  const complete = pilotProgress.dailyQuestComplete;
  const program = MODES[mode] || MODES.builder;

  const selected = selectedProblem === null ? null : scenario.items[selectedProblem];
  const foundationGuidePrompt = complete
    ? 'You finished your first YEP quest. You saw something, thought about people, chose a move, and finished. That is the Process starting to work.'
    : guideStep === 1
      ? 'Now that I know a little about you, let us try your first quest. Look at the lunch line and tap one thing that catches your attention.'
      : guideStep === 2
        ? 'You noticed "' + (selected?.label || 'something important') + '." Good. Who feels that problem?'
        : guideStep === 3
          ? 'Now choose one move you would try first. You are not looking for a perfect answer. You are practicing how to move from a problem to an idea.'
          : 'Look at what you built: something you noticed, who it affects, and one move you would try. That is a real problem-solving step.';

  const standardGuidePrompt = complete
    ? 'You finished this Daily Quest and saved your proof. Next, take that same problem-solving mindset into S.T.E.M.Sin.'
    : guideStep === 1
      ? 'Start by looking at the scene. Tap one numbered problem that catches your attention. I will move with you from there.'
      : guideStep === 2
        ? 'You spotted "' + (selected?.label || 'a problem') + '." Good. Now ask yourself: who does this affect, and why does it matter?'
        : guideStep === 3 && !text.trim()
          ? 'Now build your idea. Use your own words or Talk To YEP. Tell me what you would try to make the problem better.'
          : guideStep === 3
            ? 'You have an idea. Read it back once and make sure it sounds like you. Then check it with me.'
            : 'Your idea is ready. Finish and save it as your Daily Quest proof. After that, I will move you into S.T.E.M.Sin.';

  const guidePrompt = mode === 'explorer' ? foundationGuidePrompt : standardGuidePrompt;

  function hearGuide() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(guidePrompt);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  function chooseProblem(index) {
    setSelectedProblem(index);
    setAffectedBy('');
    setIdeaChoice('');
    setGuideStep(2);
  }

  function chooseWho(value) {
    setAffectedBy(value);
    setGuideStep(3);
  }

  function chooseFoundationIdea(value) {
    setIdeaChoice(value);
    setGuideStep(4);
  }

  function saveFoundationQuest() {
    if (!selected || !affectedBy || !ideaChoice) return;
    const proof = `I noticed ${selected.label}. It affects ${affectedBy.toLowerCase()}. I would try: ${ideaChoice}.`;
    const saved = completeDailyQuest(proof);
    if (saved) {
      setText(proof);
      setGuideStep(5);
    }
  }

  function advanceGuide() {
    if (complete) {
      navigate('stemSin');
      return;
    }
    if (guideStep === 2) {
      setGuideStep(3);
      window.setTimeout(() => document.getElementById('daily-quest-answer')?.focus(), 40);
      return;
    }
    if (guideStep === 3 && text.trim()) {
      setGuideStep(4);
      return;
    }
    if (guideStep === 4 && text.trim()) saveQuest();
  }

  function saveQuest() {
    const saved = completeDailyQuest(text);
    if (saved) setGuideStep(4);
  }

  if (mode === 'explorer') {
    const ideaOptions = selectedProblem === null ? [] : FOUNDATION_QUEST_IDEAS[selectedProblem] || [];
    return (
      <Shell>
        <section className={styles.foundationQuestStage}>
          <header className={styles.foundationQuestHeader}>
            <div>
              <span>YOUR FIRST DAILY QUEST</span>
              <h1>A Better Lunch Line</h1>
              <p>See it. Notice it. Choose a move. Finish.</p>
            </div>
            <div className={styles.foundationQuestMiniFlow} aria-label="First Daily Quest progress">
              {['SEE', 'PEOPLE', 'IDEA', 'FINISH'].map((label, index) => (
                <span key={label} data-state={guideStep > index + 1 || complete ? 'done' : guideStep === index + 1 ? 'active' : 'next'}>
                  <b>{index + 1}</b>{label}
                </span>
              ))}
            </div>
          </header>

          <YEPGuide
            prompt={guidePrompt}
            step={guideStep}
            onHear={hearGuide}
            actionLabel={complete ? 'Take Me To S.T.E.M.Sin' : null}
            onAction={() => navigate('stemSin')}
          />

          {!complete && guideStep === 1 && (
            <FoundationQuestScene selectedIndex={selectedProblem} onSelect={chooseProblem} />
          )}

          {!complete && guideStep === 2 && selected && (
            <section className={styles.foundationQuestChoiceStage}>
              <span>THINK ABOUT PEOPLE</span>
              <h2>Who feels this problem?</h2>
              <p>You noticed: <strong>{selected.label}</strong></p>
              <div className={styles.foundationQuestBigChoices}>
                {['Students waiting in line', 'Cafeteria workers', 'Both students and workers'].map((option) => (
                  <button type="button" key={option} onClick={() => chooseWho(option)}>
                    <UsersRound size={24} aria-hidden="true" />
                    <strong>{option}</strong>
                    <ChevronRight size={19} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>
          )}

          {!complete && guideStep === 3 && selected && (
            <section className={styles.foundationQuestChoiceStage}>
              <span>BUILD AN IDEA</span>
              <h2>What would you try first?</h2>
              <p>Pick one move. Later, you can test it and change it.</p>
              <div className={styles.foundationQuestBigChoices}>
                {ideaOptions.map((option) => (
                  <button type="button" key={option} onClick={() => chooseFoundationIdea(option)}>
                    <Lightbulb size={24} aria-hidden="true" />
                    <strong>{option}</strong>
                    <ChevronRight size={19} aria-hidden="true" />
                  </button>
                ))}
              </div>
            </section>
          )}

          {!complete && guideStep === 4 && selected && (
            <section className={styles.foundationQuestReview}>
              <span>LOOK WHAT YOU BUILT</span>
              <h2>Problem → People → Idea</h2>
              <div className={styles.foundationQuestReviewGrid}>
                <div><small>I NOTICED</small><strong>{selected.label}</strong></div>
                <div><small>IT AFFECTS</small><strong>{affectedBy}</strong></div>
                <div><small>I WOULD TRY</small><strong>{ideaChoice}</strong></div>
              </div>
              <p>You do not have to know if the idea works yet. The next part of YEP teaches you how to test and learn.</p>
              <button type="button" className={styles.foundationQuestFinish} onClick={saveFoundationQuest}>
                Finish My First Quest <CheckCircle2 size={20} />
              </button>
            </section>
          )}

          {complete && (
            <section className={styles.foundationQuestComplete}>
              <CheckCircle2 size={42} aria-hidden="true" />
              <span>FIRST QUEST COMPLETE</span>
              <h2>You moved from seeing a problem to choosing a move.</h2>
              <p>{pilotProgress.dailyQuestText}</p>
              <div className={styles.foundationQuestWin}>
                <b>SEE</b><i>→</i><b>PEOPLE</b><i>→</i><b>IDEA</b><i>→</i><b>FINISH</b>
              </div>
              <button type="button" className={styles.foundationQuestFinish} onClick={() => navigate('stemSin')}>
                Next: Test An Idea In S.T.E.M.Sin <ChevronRight size={20} />
              </button>
            </section>
          )}

          <footer className={styles.foundationQuestSupport}>
            <BookOpenCheck size={18} aria-hidden="true" />
            <span><strong>App:</strong> see + choose + experience. <strong>Workbook:</strong> think + write + discuss with support.</span>
          </footer>
        </section>
      </Shell>
    );
  }

  return (
    <Shell>
      <section className={styles.dailyQuestStage} data-lane={mode}>
        <div className={styles.dailyQuestMasthead}>
          <div className={styles.dailyQuestTitleBlock}>
            <div className={styles.dailyQuestBadge}>
              <Flag size={18} aria-hidden="true" />
              Daily Quest
            </div>
            <h1>{copy.title}</h1>
            <p>{copy.helper}</p>
            <div className={styles.dailyQuestPathway}>
              <span>{program.program}</span>
              <b>{program.tier}</b>
              <small>Ages {program.ageRange}</small>
            </div>
          </div>

          <div className={styles.questFlowCard} aria-label="Daily Quest flow">
            <span className={styles.questFlowLabel}>TODAY'S FLOW</span>
            <div className={styles.questFlowNodes}>
              <div className={styles.questFlowNode} data-state="active">
                <span>1</span>
                <strong>NOTICE</strong>
              </div>
              <i aria-hidden="true" />
              <div className={styles.questFlowNode} data-state={text.trim() ? 'active' : 'waiting'}>
                <span>2</span>
                <strong>BUILD</strong>
              </div>
              <i aria-hidden="true" />
              <div className={styles.questFlowNode} data-state={complete ? 'done' : 'waiting'}>
                <span>3</span>
                <strong>FINISH</strong>
              </div>
            </div>
          </div>
        </div>

        <YEPGuide
          prompt={guidePrompt}
          step={guideStep}
          onHear={hearGuide}
          actionLabel={
            complete
              ? 'Go To S.T.E.M.Sin'
              : guideStep === 2
                ? 'Build My Idea'
                : guideStep === 3 && text.trim()
                  ? 'Check My Idea'
                  : guideStep === 4 && text.trim()
                    ? 'Finish & Save'
                    : null
          }
          onAction={advanceGuide}
        />

        {guideStep === 1 && (
          <>
            <div className={styles.dailyQuestPromptCard}>
              <div className={styles.dailyQuestPromptIcon} aria-hidden="true">
                <Lightbulb size={34} strokeWidth={2.1} />
              </div>
              <div className={styles.dailyQuestPromptCopy}>
                <span>TODAY'S QUEST</span>
                <h2>{dailyQuest.title}</h2>
                <p>{dailyQuest.prompt}</p>
              </div>
              <div className={styles.dailyQuestFocus}>
                <span>FINISHER FOCUS</span>
                <strong>{dailyQuest.finisher}</strong>
              </div>
            </div>

            <VisualScenario mode={mode} selectedIndex={selectedProblem} onSelect={chooseProblem} />
          </>
        )}

        {selected && guideStep === 2 && (
          <section className={styles.dailyQuestWhoStage}>
            <span>NOTICE</span>
            <h2>Who does this affect?</h2>
            <div className={styles.dailyQuestWhoChoices}>
              <button type="button" onClick={() => setGuideStep(3)}>Me</button>
              <button type="button" onClick={() => setGuideStep(3)}>Other people</button>
              <button type="button" onClick={() => setGuideStep(3)}>Both</button>
            </div>
          </section>
        )}

        {selected && guideStep >= 3 && (
          <section className={styles.dailyQuestResponseStage}>
            <div className={styles.dailyQuestResponseLead}>
              <span>{guideStep >= 4 ? 'FINISH' : 'BUILD'}</span>
              <h2>{guideStep >= 4 ? 'Read it back. Does it say what you mean?' : 'What could you try?'}</h2>
              <p>
                {guideStep >= 4
                  ? 'When it sounds right, save it as your proof and keep moving.'
                  : selected.label + ' — ' + selected.detail}
              </p>
            </div>

            <div className={styles.dailyQuestResponseBox}>
              <textarea
                id="daily-quest-answer"
                className={styles.dailyQuestTextarea}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (guideStep < 3) setGuideStep(3);
                }}
                placeholder={copy.placeholder}
              />
              <VoiceCapture
                prompt={dailyQuest.prompt}
                currentValue={text}
                onConfirm={(value) => {
                  setText(value);
                  setGuideStep(3);
                }}
                buttonLabel="Talk To YEP"
                confirmLabel="Use As My Answer"
              />
            </div>

            {guideStep >= 4 && (
              <button
                className={styles.dailyQuestSubmit}
                disabled={!text.trim()}
                onClick={saveQuest}
              >
                {complete ? 'Update My Proof' : 'Finish & Save My Proof'}
              </button>
            )}

            {complete && (
              <div className={styles.dailyQuestSavedProof}>
                <CheckCircle2 size={20} aria-hidden="true" />
                <span>Daily Quest proof saved on this tablet.</span>
              </div>
            )}
          </section>
        )}

        <div className={styles.dailyQuestWorkbook}>
          <BookOpenCheck size={20} aria-hidden="true" />
          <div>
            <strong>Workbook + App</strong>
            <span>Use the workbook to think, write, and discuss. Use the app to see, interact, respond, and save proof.</span>
          </div>
        </div>

        <nav className={styles.dailyQuestNextRail} aria-label="Continue through the YEP process">
          <div className={styles.dailyQuestNextIntro}>
            <strong>Keep moving through YEP</strong>
            <span>Daily Quest is the first lane. Your next work stays connected.</span>
          </div>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className={styles.dailyQuestNextCurrent}>
            <Sparkles size={18} aria-hidden="true" />
            <span>Daily Quest</span>
          </button>
          <button type="button" onClick={() => navigate('stemSin')} className={styles.dailyQuestNextButton}>
            <FlaskConical size={18} aria-hidden="true" />
            <span>S.T.E.M.Sin</span>
          </button>
          <button type="button" onClick={() => navigate('mirrorIntro')} className={styles.dailyQuestNextButton}>
            <ScanFace size={18} aria-hidden="true" />
            <span>Mirror Results</span>
          </button>
          <button type="button" onClick={() => navigate('mission')} className={styles.dailyQuestNextButton}>
            <Flag size={18} aria-hidden="true" />
            <span>FINISHER Mission</span>
          </button>
        </nav>

        <div className={styles.actions}>
          <BackHome />
        </div>
      </section>
    </Shell>
  );
}

export function WeeklyModule() {
  const { pilotProgress, toggleWeeklyActivity, mode } = useYEP();
  const { weeklyModule } = getProgramContent(mode);
  const allDone = weeklyModule.activities.every((a) => pilotProgress.weeklyCompleted.includes(a.id));

  return (
    <Shell>
      <ScreenHead eyebrow={`${MODES[mode]?.program || 'YEP'} · Weekly Module`} title={weeklyModule.title} sub={weeklyModule.description} />
      <LaneGuidance />
      <WorkbookCallout text="Work each matching workbook activity first. Mark it complete here only after the participant has actually done the corresponding work." />
      <div className={styles.stack}>
        {weeklyModule.activities.map((activity) => {
          const done = pilotProgress.weeklyCompleted.includes(activity.id);
          return (
            <button key={activity.id} className={styles.activity} onClick={() => toggleWeeklyActivity(activity.id)}>
              <span className={`${styles.check} ${done ? styles.checkDone : ''}`}>{done ? '✓' : ''}</span>
              <span>
                <span className={styles.cardTitle}>{activity.title}</span>
                <span className={styles.cardText}>{activity.text}</span>
              </span>
            </button>
          );
        })}
      </div>
      <div className={styles.note}>{allDone ? 'Week 1 proof module complete. Work saved on this tablet.' : 'Complete all three activities to finish this proof module.'}</div>
      <div className={styles.actions}><BackHome /></div>
    </Shell>
  );
}

export function StemSinQuest() {
  const { pilotProgress, completeStemSin, mode, navigate } = useYEP();
  const { stemSin } = getProgramContent(mode);
  const lab = STEM_LABS[mode] || STEM_LABS.builder;
  const savedToolIndex = pilotProgress.stemSinChoice
    ? lab.tools.findIndex((tool) => tool.label === pilotProgress.stemSinChoice)
    : -1;
  const [text, setText] = useState(pilotProgress.stemSinText);
  const [selectedTool, setSelectedTool] = useState(savedToolIndex >= 0 ? savedToolIndex : null);
  const [prediction, setPrediction] = useState(null);
  const [demoRan, setDemoRan] = useState(pilotProgress.stemSinComplete);
  const [guideStep, setGuideStep] = useState(pilotProgress.stemSinComplete ? 6 : 1);
  const complete = pilotProgress.stemSinComplete;
  const tool = selectedTool === null ? null : lab.tools[selectedTool];

  const guidePrompt = complete
    ? 'You saved your S.T.E.M.Sin proof. Now use what you learned when you look at your Mirror Results.'
    : guideStep === 1
      ? 'Look at the challenge. Choose one tool you would test first. There is not one perfect answer.'
      : guideStep === 2
        ? 'You chose ' + (tool?.label || 'a tool') + '. Before we test it, what do you predict it will improve?'
        : guideStep === 3
          ? 'Prediction locked: ' + (prediction || 'you expect a change') + '. Run the practice test and watch what changes.'
          : guideStep === 4
            ? 'The practice result is visible now. Do not just accept it. Explain what changed and what you would still need to test in real life.'
            : guideStep === 5 && !text.trim()
              ? 'Use your own words. What happened in the practice test, and what would you test or improve next?'
              : 'Read your explanation back. If it matches what you saw, save it as your S.T.E.M.Sin proof.';

  function hearGuide() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(guidePrompt);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    window.speechSynthesis.speak(utterance);
  }

  function chooseTool(index) {
    if (complete) return;
    setSelectedTool(index);
    setPrediction(null);
    setDemoRan(false);
    setGuideStep(2);
  }

  function choosePrediction(value) {
    if (complete) return;
    setPrediction(value);
    setGuideStep(3);
  }

  function advanceGuide() {
    if (complete) {
      navigate('mirrorIntro');
      return;
    }
    if (guideStep === 3 && prediction) {
      setDemoRan(true);
      setGuideStep(4);
      return;
    }
    if (guideStep === 4) {
      setGuideStep(5);
      window.setTimeout(() => document.getElementById('stem-sin-answer')?.focus(), 40);
      return;
    }
    if (guideStep === 5 && text.trim()) saveProof();
  }

  function saveProof() {
    if (!tool) return;
    const saved = completeStemSin(text, tool.label);
    if (saved) setGuideStep(6);
  }

  return (
    <Shell>
      <section className={styles.stemLabStage} data-lane={mode}>
        <ScreenHead eyebrow={`${MODES[mode]?.program || 'YEP'} · S.T.E.M.Sin`} title={stemSin.title} sub={stemSin.challengeTitle} />

        <YEPGuide
          prompt={guidePrompt}
          step={guideStep}
          onHear={hearGuide}
          actionLabel={
            complete
              ? 'Go To Mirror Results'
              : guideStep === 3 && prediction
                ? 'Run Practice Test'
                : guideStep === 4
                  ? 'Explain What Happened'
                  : guideStep === 5 && text.trim()
                    ? 'Finish & Save My Proof'
                    : null
          }
          onAction={advanceGuide}
        />

        <div className={styles.stemLabFlow} aria-label="S.T.E.M.Sin visual learning flow">
          <span data-active={selectedTool !== null}>1 · CHOOSE TOOL</span>
          <i aria-hidden="true">→</i>
          <span data-active={!!prediction}>2 · PREDICT</span>
          <i aria-hidden="true">→</i>
          <span data-active={demoRan}>3 · TEST</span>
          <i aria-hidden="true">→</i>
          <span data-active={guideStep >= 5}>4 · EXPLAIN</span>
          <i aria-hidden="true">→</i>
          <span data-active={complete}>5 · PROVE</span>
        </div>

        <section className={styles.stemLabScene} aria-label="S.T.E.M.Sin practice challenge">
          <div className={styles.stemLabSceneIcon} aria-hidden="true"><FlaskConical size={34} /></div>
          <div>
            <span>{lab.eyebrow}</span>
            <h2>{lab.title}</h2>
            <p>{lab.scene}</p>
            <small><strong>WHO THIS HELPS:</strong> {lab.user}</small>
          </div>
          <div className={styles.stemLabFocus}>
            <span>FINISHER FOCUS</span>
            <strong>{stemSin.finisher}</strong>
          </div>
        </section>

        {guideStep === 1 && (
          <section className={styles.stemLabTools} aria-label="Choose a tool to test">
            <div className={styles.stemLabSectionHead}>
              <span>STEP 1</span>
              <h2>Which tool would you test first?</h2>
            </div>
            <div className={styles.stemLabToolGrid}>
              {lab.tools.map(({ icon: Icon, label, detail }, index) => (
                <button
                  type="button"
                  key={label}
                  className={styles.stemLabTool}
                  onClick={() => chooseTool(index)}
                >
                  <Icon size={26} aria-hidden="true" />
                  <strong>{label}</strong>
                  <span>{detail}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {guideStep === 2 && tool && (
          <section className={styles.stemLabPrediction}>
            <div className={styles.stemLabSectionHead}>
              <span>STEP 2</span>
              <h2>What do you predict will improve?</h2>
            </div>
            <div className={styles.stemLabPredictionGrid}>
              {lab.predictions.map((item) => (
                <button
                  type="button"
                  key={item}
                  className={prediction === item ? styles.stemLabPredictionSelected : styles.stemLabPredictionButton}
                  aria-pressed={prediction === item}
                  onClick={() => choosePrediction(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </section>
        )}

        {guideStep === 3 && tool && prediction && (
          <section className={styles.stemLabReadyStage}>
            <span>READY TO TEST</span>
            <h2>{tool.label}</h2>
            <p>You predict: <strong>{prediction}</strong></p>
            <small>Run the guided practice test, then look for what changes.</small>
          </section>
        )}

        {guideStep === 4 && demoRan && tool && (
          <section className={styles.stemLabResult} aria-live="polite">
            <div className={styles.stemLabResultBadge}><CheckCircle2 size={22} aria-hidden="true" /> PRACTICE RESULT</div>
            <h2>{tool.label}</h2>
            <p>{tool.result}</p>
            <div>
              <strong>Your prediction:</strong>
              <span>{prediction || 'Saved proof from an earlier practice test.'}</span>
            </div>
            <small>This is guided app practice. A real-world test still belongs in the workbook/facilitator process with appropriate permission.</small>
          </section>
        )}

        {(guideStep === 5 || complete) && (
          <section className={styles.stemLabExplain}>
            <div className={styles.stemLabSectionHead}>
              <span>STEP 4</span>
              <h2>{complete ? 'Your saved explanation' : 'Explain what happened'}</h2>
            </div>
            <textarea
              id="stem-sin-answer"
              className={styles.dailyQuestTextarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="I tested... I noticed... Next I would..."
              disabled={complete}
            />
            {!complete && (
              <VoiceCapture
                prompt={stemSin.prompt}
                currentValue={text}
                onConfirm={(value) => {
                  setText(value);
                  setGuideStep(5);
                }}
                buttonLabel="Talk To YEP"
                confirmLabel="Use As My Answer"
              />
            )}
            {!complete && (
              <button
                className={styles.stemLabSave}
                disabled={!text.trim() || !tool}
                onClick={saveProof}
              >
                Finish & Save My Proof
              </button>
            )}
          </section>
        )}

        {complete && (
          <section className={styles.stemLabComplete}>
            <CheckCircle2 size={28} aria-hidden="true" />
            <div>
              <strong>S.T.E.M.Sin proof saved on this tablet.</strong>
              <span>{pilotProgress.stemSinChoice ? `Tool tested: ${pilotProgress.stemSinChoice}` : 'Practice tool saved with this proof.'}</span>
            </div>
            <button type="button" onClick={() => navigate('mirrorIntro')}>Continue To Mirror Results <ChevronRight size={17} /></button>
          </section>
        )}

        <WorkbookCallout text="Use the workbook to plan, write, and discuss the real test. Use the app to choose, predict, practice, explain, and save proof." />

        <div className={styles.actions}><BackHome /></div>
      </section>
    </Shell>
  );
}

export function BossChallenge() {
  const { pilotProgress, completeBossChallenge, mode } = useYEP();
  const { bossChallenge } = getProgramContent(mode);
  const [text, setText] = useState(pilotProgress.bossText);

  return (
    <Shell>
      <ScreenHead eyebrow={`${MODES[mode]?.program || 'YEP'} · Boss Challenge`} title={bossChallenge.title} sub={bossChallenge.prompt} />
      <LaneGuidance />
      <WorkbookCallout text="Draft the challenge in the workbook, practice it out loud, then save the core points here as the digital proof step." />
      <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder={bossChallenge.prompt} />
      <VoiceCapture prompt={bossChallenge.prompt} currentValue={text} onConfirm={setText} buttonLabel="Talk To YEP" confirmLabel="Use As My Challenge" />
      <div className={styles.actions}>
        <button className={ui.btnPrimary} disabled={!text.trim()} onClick={() => completeBossChallenge(text)}>
          {pilotProgress.bossComplete ? 'Update Boss Challenge' : 'Complete Boss Challenge'}
        </button>
        <BackHome />
      </div>
    </Shell>
  );
}

export function MentorSpotlight() {
  const { pilotProgress, saveMentorQuestion, mode } = useYEP();
  const { mentorSpotlight } = getProgramContent(mode);
  const [question, setQuestion] = useState(pilotProgress.mentorQuestion);

  return (
    <Shell>
      <ScreenHead eyebrow={`${MODES[mode]?.program || 'YEP'} · Mentor Spotlight`} title={mentorSpotlight.title} sub={mentorSpotlight.body} />
      <LaneGuidance />
      <WorkbookCallout text="Write the mentor question in the workbook, then save the same question here so it appears in the participant proof record." />
      <div className={styles.card}>
        <div className={styles.cardTitle}>Your Mentor Question</div>
        <div className={styles.cardText}>{mentorSpotlight.challenge}</div>
      </div>
      <textarea className={styles.textarea} value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What would you ask a mentor?" />
      <VoiceCapture prompt={mentorSpotlight.challenge} currentValue={question} onConfirm={setQuestion} buttonLabel="Talk To YEP" confirmLabel="Use As My Question" />
      <div className={styles.actions}>
        <button className={ui.btnPrimary} disabled={!question.trim()} onClick={() => saveMentorQuestion(question)}>Save Mentor Question</button>
        <BackHome />
      </div>
    </Shell>
  );
}

export function Profile() {
  const { powerName, track, mirrorResult, pilotProgress, mode } = useYEP();
  const weeklyDone = pilotProgress.weeklyCompleted.length;
  const program = MODES[mode] || MODES.builder;
  const { weeklyModule } = getProgramContent(mode);

  return (
    <Shell>
      <ScreenHead eyebrow={`${program.program} · Participant Profile`} title={powerName || 'Your Process Profile'} sub="This is the digital My Process proof page for the tablet pilot. Use sample/non-sensitive data only." />
      <div className={styles.profileGrid}>
        <div className={styles.card}><div className={styles.label}>Program</div><div className={styles.value}>{program.program}</div></div>
        <div className={styles.card}><div className={styles.label}>Age Pathway</div><div className={styles.value}>{program.label}</div></div>
        <div className={styles.card}><div className={styles.label}>Power Name</div><div className={styles.value}>{powerName || 'Not set'}</div></div>
        <div className={styles.card}><div className={styles.label}>Track</div><div className={styles.value}>{track?.name || 'Not set'}</div></div>
        <div className={styles.card}><div className={styles.label}>Anchor</div><div className={styles.value}>{mirrorResult?.Anchor || 'Not completed'}</div></div>
        <div className={styles.card}><div className={styles.label}>S.T.E.M.Sin</div><div className={styles.value}>{pilotProgress.stemSinComplete ? 'Complete' : 'Open'}</div></div>
        <div className={styles.card}><div className={styles.label}>Weekly Activities</div><div className={styles.value}>{weeklyDone} / {weeklyModule.activities.length}</div></div>
      </div>
      <div className={styles.actions}><BackHome /></div>
    </Shell>
  );
}

export function AdminReview() {
  const { activeYouth, pilotProgress, navigate, mode } = useYEP();
  const program = MODES[mode] || MODES.builder;
  const { weeklyModule } = getProgramContent(mode);
  const weeklyComplete = pilotProgress.weeklyCompleted.length >= weeklyModule.activities.length;

  return (
    <Shell>
      <ScreenHead eyebrow="Admin Review" title="Workbook + Tablet Proof Readout" sub="This screen reviews the active device proof record. It is not the final source-of-truth backend." />
      <div className={styles.profileGrid}>
        <div className={styles.card}><div className={styles.label}>Program</div><div className={styles.value}>{program.program}</div></div>
        <div className={styles.card}><div className={styles.label}>Pathway</div><div className={styles.value}>{program.label}</div></div>
        <div className={styles.card}><div className={styles.label}>Participant</div><div className={styles.value}>{activeYouth.name}</div></div>
        <div className={styles.card}><div className={styles.label}>Daily Quest</div><div className={styles.value}>{pilotProgress.dailyQuestComplete ? 'Complete' : 'Open'}</div></div>
        <div className={styles.card}><div className={styles.label}>Weekly Module</div><div className={styles.value}>{weeklyComplete ? 'Complete' : `${pilotProgress.weeklyCompleted.length}/${weeklyModule.activities.length}`}</div></div>
        <div className={styles.card}><div className={styles.label}>S.T.E.M.Sin</div><div className={styles.value}>{pilotProgress.stemSinComplete ? 'Complete' : 'Open'}</div></div>
        <div className={styles.card}><div className={styles.label}>Boss Challenge</div><div className={styles.value}>{pilotProgress.bossComplete ? 'Complete' : 'Open'}</div></div>
        <div className={styles.card}><div className={styles.label}>Mentor Question</div><div className={styles.value}>{pilotProgress.mentorQuestion ? 'Saved' : 'Open'}</div></div>
        <div className={styles.card}><div className={styles.label}>Mirror / FINISHER Loop</div><div className={styles.value}>{activeYouth.reflectionSubmitted ? 'Complete' : 'Not complete'}</div></div>
      </div>
      <div className={styles.note}>Proof standard: workbook entry → matching app action → saved progress → facilitator/admin review. YEP ages 7–17 and Y.A.E.P. ages 18–24 stay separate while sharing the same Process spine.</div>
      <div className={styles.actions}>
        <button className={ui.btnPrimary} onClick={() => navigate('dashboard')}>Open Facilitator Demo</button>
        <BackHome />
      </div>
    </Shell>
  );
}
