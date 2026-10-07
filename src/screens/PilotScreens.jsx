import { useEffect, useState } from 'react';
import { Sparkles, Lightbulb, Target, BriefcaseBusiness, Eye, PenLine, CheckCircle2, Flag, BookOpenCheck, FlaskConical, ScanFace, PackageOpen, Trash2, UsersRound, Clock3, Smartphone, MessageCircle, Store, Wrench, Volume2, ChevronRight } from 'lucide-react';
import { getProgramContent } from '../data/pilotContent';
import { MODES } from '../data/modes';
import { useYEP } from '../context/YEPContext';
import Shell from '../components/Shell';
import VoiceCapture from '../components/VoiceCapture';
import YEPGuide from '../components/YEPGuide';
import PictureExample, { LearningPicture } from '../components/LearningPicture';
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
    kicker: "Today's Quest",
    title: 'Look Around You',
    helper: 'Look around. Real ideas start with real problems. Spot one, think about who it affects, and tell us one way you could help.',
    placeholder: 'I see a problem with… I could help by…',
    action: 'Finish My Quest',
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
    eyebrow: 'LOOK AT THE SCENE',
    title: 'What do you notice?',
    lead: 'You do not need the perfect answer. Start by seeing what is right in front of you.',
    items: [
      { icon: PackageOpen, label: 'Supplies everywhere', detail: 'Things are hard to find.' },
      { icon: Trash2, label: 'Trash is piling up', detail: 'The space gets harder to use.' },
      { icon: UsersRound, label: 'Someone needs help', detail: 'A person is stuck or waiting.' },
    ],
    footer: 'Pick one thing you notice. Who does it affect? What could make it better?',
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

const IDEA_CHOICES = {
  explorer: ['Put things in order', 'Show a helpful step', 'Make taking turns easier'],
  builder: ['Organize the materials', 'Make directions clearer', 'Make waiting easier'],
  leader: ['Try a small prototype', 'Ask the people affected', 'Compare two approaches'],
  yaep: ['Test a clearer workflow', 'Ask the customer', 'Compare time or cost'],
};
const LAB_PICTURES = { explorer: ['supplies', 'labels', 'holder'], builder: ['supplies', 'checklist', 'reach'], leader: ['form', 'status', 'reminder'], yaep: ['form', 'status', 'reminder'] };
const IDEA_KINDS = ['supplies', 'help', 'waiting'];
const NEXT_TESTS = ['Try it with a person', 'Compare before and after', 'Change the tool'];

const SCENE_KINDS = { explorer: ['supplies', 'trash', 'help'], builder: ['waiting', 'supplies', 'help'], leader: ['help', 'waiting', 'workaround'], yaep: ['help', 'workflow', 'waiting'] };

function VisualScenario({ mode, selectedIndex, onSelect }) {
  const scenario = VISUAL_SCENARIOS[mode] || VISUAL_SCENARIOS.builder;
  return <section className={styles.pictureChoices} aria-label="Choose the problem you notice">
    {scenario.items.map(({ label, detail }, index) => <button type="button" key={label} className={styles.pictureChoice} aria-pressed={selectedIndex === index} onClick={() => onSelect(index)}>
      <span className={styles.pictureNumber}>{index + 1}</span>
      <LearningPicture kind={SCENE_KINDS[mode][index]} label={label} />
      <strong>{label}</strong><span>{detail}</span>
    </button>)}
  </section>;
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
  const { pilotProgress, completeDailyQuest, saveLessonDraft, mode, navigate, mirrorResult } = useYEP();
  const { dailyQuest } = getProgramContent(mode);
  const copy = QUEST_LABELS[mode] || QUEST_LABELS.builder;
  const scenario = VISUAL_SCENARIOS[mode] || VISUAL_SCENARIOS.builder;
  const draft = pilotProgress.dailyQuestDraft;
  const [text, setText] = useState(draft?.text ?? pilotProgress.dailyQuestText);
  const [selectedProblem, setSelectedProblem] = useState(draft?.selectedProblem ?? (pilotProgress.dailyQuestChoiceProof ? scenario.items.findIndex((item) => item.label === pilotProgress.dailyQuestChoiceProof.problem) : null));
  const [who, setWho] = useState(draft?.who || pilotProgress.dailyQuestChoiceProof?.who || '');
  const [tryChoice, setTryChoice] = useState(draft?.tryChoice || pilotProgress.dailyQuestChoiceProof?.action || '');
  const [guideStep, setGuideStep] = useState(draft?.guideStep || (pilotProgress.dailyQuestComplete ? 4 : 1));
  const complete = pilotProgress.dailyQuestComplete;
  const program = MODES[mode] || MODES.builder;

  useEffect(() => {
    if (!complete || text !== pilotProgress.dailyQuestText || tryChoice !== (pilotProgress.dailyQuestChoiceProof?.action || '')) saveLessonDraft('dailyQuest', { text, selectedProblem, who, tryChoice, guideStep });
    else if (pilotProgress.dailyQuestDraft) saveLessonDraft('dailyQuest', null);
  }, [text, selectedProblem, who, tryChoice, guideStep, complete, pilotProgress.dailyQuestText, pilotProgress.dailyQuestChoiceProof?.action]);

  const selected = selectedProblem === null ? null : scenario.items[selectedProblem];
  const canSave = !!text.trim() || !!(selected && who && tryChoice);
  const guidePrompt = complete
    ? 'Your response is saved on this tablet. You can review your choices, add your own words, or continue to S.T.E.M.Sin.'
    : guideStep === 1
      ? 'A useful idea starts with someone having a problem. Look at the scene, then tap one problem you notice below it.'
      : guideStep === 2
        ? 'You spotted "' + (selected?.label || 'a problem') + '." Good. Now ask yourself: who does this affect, and why does it matter?'
        : guideStep === 3 && !text.trim()
          ? 'Choose a change you would try to help someone. You can add your own words if you want. There is more than one useful idea.'
          : guideStep === 3
            ? 'You have an idea. Read it back once and make sure it sounds like you. Then review your own idea.'
            : 'Your idea is ready. Finish and save it as your Daily Quest proof. After that, I will move you into S.T.E.M.Sin.';

  function chooseProblem(index) {
    setSelectedProblem(index);
    setWho('');
    setGuideStep(2);
  }

  function advanceGuide() {
    if (complete) {
      navigate('stemSin');
      return;
    }
    if (guideStep === 1) { document.getElementById('daily-quest-scene')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    if (guideStep === 3 && !canSave) { document.getElementById('daily-idea-choices')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    if (guideStep === 2) {
      document.getElementById('daily-quest-who')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }
    if (guideStep === 3 && canSave) {
      setGuideStep(4);
      return;
    }
    if (guideStep === 4 && canSave) saveQuest();
  }

  function saveQuest() {
    const saved = completeDailyQuest(text, selected && who && tryChoice ? { problem: selected.label, who, action: tryChoice } : null);
    if (saved) setGuideStep(4);
  }

  return (
    <Shell showAudio={false}>
      <section className={styles.dailyQuestStage} data-lane={mode}>
        <div className={styles.dailyQuestMasthead}>
          <div className={styles.dailyQuestTitleBlock}>
            <div className={styles.dailyQuestBadge}>
              <Flag size={18} aria-hidden="true" />
              Daily Quest
            </div>
            <h1>{dailyQuest.title}</h1>
            <p>See the problem. Try an idea. Save your work.</p>
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
          title={complete ? 'Your idea is saved' : ['Look at the scene', 'Who needs help?', 'Try your idea', 'Read it back'][guideStep - 1]}
          example={selected ? `You noticed: ${selected.label}. ${selected.detail} Try one small change, then look again to see what happens. Your idea can be different from the pictured example.` : getProgramContent(mode).example}
          pictureKind={selectedProblem === null ? (mode === 'explorer' || mode === 'builder' ? 'supplies' : 'workflow') : SCENE_KINDS[mode][selectedProblem]}
          narration={guideStep === 1 ? scenario.items.map((item, index) => `Picture ${index + 1}: ${item.label}. ${item.detail}`).join(' ') : guideStep === 2 ? 'Choose Me, Other people, or Both.' : guideStep >= 3 ? `You can choose: ${IDEA_CHOICES[mode].join('. ')}. Your own words are optional.` : ''}
          step={guideStep}
          actionLabel={
            complete
              ? 'Go To S.T.E.M.Sin'
              : guideStep === 2
                ? 'Choose who needs help'
                : guideStep === 3 && canSave
                  ? (text.trim() ? 'Review My Idea' : 'Review My Choices')
                  : guideStep === 4 && canSave
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

            <div id="daily-quest-scene"><VisualScenario mode={mode} selectedIndex={selectedProblem} onSelect={chooseProblem} /></div>
          </>
        )}

        {!complete && guideStep > 1 && <button type="button" className={ui.btnGhost} onClick={() => setGuideStep(1)}>Choose another problem</button>}

        {selected && guideStep === 2 && (
          <section id="daily-quest-who" className={styles.dailyQuestWhoStage}>
            <span>NOTICE</span>
            <h2>Who does this affect?</h2>
            <div className={styles.dailyQuestWhoChoices}>
              <button type="button" onClick={() => { setWho('Me'); setGuideStep(3); }}>Me</button>
              <button type="button" onClick={() => { setWho('Other people'); setGuideStep(3); }}>Other people</button>
              <button type="button" onClick={() => { setWho('Both'); setGuideStep(3); }}>Both</button>
            </div>
          </section>
        )}

        {(complete || (selected && guideStep >= 3)) && (
          <section className={styles.dailyQuestResponseStage}>
            <div className={styles.dailyQuestResponseLead}>
              <span>{guideStep >= 4 ? 'FINISH' : 'BUILD'}</span>
              <h2>{guideStep >= 4 ? 'Read it back. Does it say what you mean?' : 'What could you try?'}</h2>
              <p>
                {guideStep >= 4
                  ? 'When it sounds right, save it as your proof and keep moving.'
                  : selected ? selected.label + ' — ' + selected.detail : 'Review your saved idea in your own words.'}
              </p>
            </div>

            <div id="daily-idea-choices" className={styles.pictureChoices} aria-label="Choose a change to try">
              {IDEA_CHOICES[mode].map((choice, index) => <button type="button" key={choice} className={styles.pictureChoice} aria-pressed={tryChoice === choice} onClick={() => setTryChoice(choice)}><LearningPicture kind={IDEA_KINDS[index]} changed label={choice} /><strong>{choice}</strong></button>)}
            </div>
            <p className={styles.draftNote}>Choose an action, or describe your own idea. The app saves exactly what you choose; it does not grade your understanding. You can ask your facilitator for help.</p>
            <div className={styles.dailyQuestResponseBox}>
              <textarea
                id="daily-quest-answer"
                aria-label="Daily Quest answer, optional when picture choices are complete"
                className={styles.dailyQuestTextarea}
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (guideStep < 3) setGuideStep(3);
                }}
                placeholder={copy.placeholder}
              />
              {complete && text !== pilotProgress.dailyQuestText && <p className={styles.draftNote}>Your changes are kept as a draft. Tap Update My Proof to replace the finished answer.</p>}
              {!complete && <p className={styles.draftNote}>Your draft is kept on this tablet as you go. Save your idea when you are ready.</p>}
              <VoiceCapture
                prompt={dailyQuest.prompt}
                currentValue={text}
                onConfirm={(value) => {
                  setText(value);
                  setGuideStep(complete ? 4 : 3);
                }}
                buttonLabel="Talk To YEP"
                confirmLabel="Use As My Answer"
              />
            </div>

            {guideStep >= 4 && (
              <button
                className={styles.dailyQuestSubmit}
                disabled={!canSave}
                onClick={saveQuest}
              >
                {complete ? 'Update My Proof' : 'Finish & Save My Proof'}
              </button>
            )}

            {complete && <p className={styles.draftNote}>Show your idea to a nearby peer or facilitator. Who could it help, and what small test would you try together?</p>}
            {complete && (
              <div className={styles.dailyQuestSavedProof}>
                <CheckCircle2 size={20} aria-hidden="true" />
                <span>{pilotProgress.dailyQuestEvidenceType === 'choices' ? 'Picture choices saved on this tablet. No written answer was provided.' : 'Daily Quest response saved on this tablet.'}{pilotProgress.dailyQuestChoiceProof && ` Problem: ${pilotProgress.dailyQuestChoiceProof.problem}. Who: ${pilotProgress.dailyQuestChoiceProof.who}. Action: ${pilotProgress.dailyQuestChoiceProof.action}.`}</span>
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
          <button type="button" onClick={() => navigate(mirrorResult ? 'results' : 'mirrorIntro')} className={styles.dailyQuestNextButton}>
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
  const { pilotProgress, completeStemSin, saveLessonDraft, mode, navigate, mirrorResult } = useYEP();
  const { stemSin } = getProgramContent(mode);
  const lab = STEM_LABS[mode] || STEM_LABS.builder;
  const savedToolIndex = pilotProgress.stemSinChoice
    ? lab.tools.findIndex((tool) => tool.label === pilotProgress.stemSinChoice)
    : -1;
  const draft = pilotProgress.stemSinDraft;
  const [text, setText] = useState(draft?.text ?? pilotProgress.stemSinText);
  const [selectedTool, setSelectedTool] = useState(draft?.selectedTool ?? (savedToolIndex >= 0 ? savedToolIndex : null));
  const [prediction, setPrediction] = useState(draft?.prediction ?? pilotProgress.stemSinChoiceProof?.prediction ?? null);
  const [nextTest, setNextTest] = useState(draft?.nextTest || pilotProgress.stemSinChoiceProof?.nextTest || '');
  const [demoRan, setDemoRan] = useState(draft?.demoRan ?? pilotProgress.stemSinComplete);
  const [guideStep, setGuideStep] = useState(draft?.guideStep || (pilotProgress.stemSinComplete ? 6 : 1));
  const complete = pilotProgress.stemSinComplete;
  const tool = selectedTool === null ? null : lab.tools[selectedTool];
  useEffect(() => {
    if (!complete || text !== pilotProgress.stemSinText || nextTest !== (pilotProgress.stemSinChoiceProof?.nextTest || '')) saveLessonDraft('stemSin', { text, selectedTool, prediction, nextTest, demoRan, guideStep });
    else if (pilotProgress.stemSinDraft) saveLessonDraft('stemSin', null);
  }, [text, selectedTool, prediction, nextTest, demoRan, guideStep, complete, pilotProgress.stemSinText, pilotProgress.stemSinChoiceProof?.nextTest]);

  const canSave = !!text.trim() || !!(tool && prediction && nextTest);
  const guidePrompt = complete
    ? 'You saved your S.T.E.M.Sin proof. Now use what you learned when you look at your Mirror Results.'
    : guideStep === 1
      ? 'Look at the challenge. Choose one tool you would test first. There is not one perfect answer.'
      : guideStep === 2
        ? 'You chose ' + (tool?.label || 'a tool') + '. Before we test it, what do you predict it will improve?'
        : guideStep === 3
          ? 'Prediction locked: ' + (prediction || 'you expect a change') + '. Show the example and look for what changes.'
          : guideStep === 4
            ? 'The practice result is visible now. Do not just accept it. Explain what changed and what you would still need to test in real life.'
            : guideStep === 5 && !text.trim()
              ? 'What would you try next? Choose a next test, or explain your own idea. Adding your own words is optional.'
              : 'Read your explanation back. If it matches what you saw, save it as your S.T.E.M.Sin proof.';

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
      navigate(mirrorResult ? 'results' : 'mirrorIntro');
      return;
    }
    if (guideStep <= 2) { document.getElementById(guideStep === 1 ? 'stem-tools' : 'stem-prediction')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
    if (guideStep === 5 && !canSave) { document.getElementById('stem-next-test')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); return; }
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
    if (guideStep === 5 && canSave) saveProof();
  }

  function saveProof() {
    if (!tool && !complete) return;
    const saved = completeStemSin(text, tool?.label || pilotProgress.stemSinChoice || '', prediction && nextTest ? { prediction, nextTest } : null);
    if (saved) setGuideStep(6);
  }

  return (
    <Shell showAudio={false}>
      <section className={styles.stemLabStage} data-lane={mode}>
        <ScreenHead eyebrow={`${MODES[mode]?.program || 'YEP'} · S.T.E.M.Sin`} title={stemSin.challengeTitle} sub={stemSin.title} />

        <YEPGuide
          prompt={guidePrompt}
          title={complete ? 'Your practice is saved' : ['Choose one tool', 'Make a prediction', 'Try the practice test', 'Notice what changed', 'Explain it your way'][guideStep - 1]}
          pictureKind={LAB_PICTURES[mode][selectedTool ?? 0]}
          narration={guideStep === 1 ? lab.tools.map((item, index) => `Tool ${index + 1}: ${item.label}. ${item.detail}`).join(' ') : guideStep === 2 ? `Choose a prediction: ${lab.predictions.join('. ')}.` : guideStep === 5 ? `Choose a next test: ${NEXT_TESTS.join('. ')}. Your own words are optional.` : demoRan && tool ? `${tool.result} This is an illustrated example, not measured real-world evidence.` : ''}
          example={tool ? `${tool.detail} ${tool.result} In a real test, you would still need to check whether that change helps the person.` : `${lab.tools[0].detail} That is one possible tool to try. You can choose another.`}
          step={guideStep}
          actionLabel={
            complete
              ? (mirrorResult ? 'Go To Mirror Results' : 'Start My Mirror')
              : guideStep === 3 && prediction
                ? 'Show What Changes'
                : guideStep === 4
                  ? 'Explain What Happened'
                  : guideStep === 5 && canSave
                    ? 'Save S.T.E.M.Sin Proof'
                    : null
          }
          onAction={advanceGuide}
        />

        {!complete && guideStep > 1 && <button type="button" className={ui.btnGhost} onClick={() => { setGuideStep(1); setPrediction(null); setDemoRan(false); }}>Choose a different tool</button>}

        {!complete && tool && guideStep > 2 && <button type="button" className={ui.btnGhost} onClick={() => { setGuideStep(2); setDemoRan(false); }}>Change prediction</button>}

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

        {guideStep === 1 && <section id="stem-tools" className={styles.stemLabTools} aria-label="Choose a tool to test">
          <div className={styles.stemLabSectionHead}>
            <span>STEP 1</span>
            <h2>Which tool would you test first?</h2>
          </div>
          <div className={styles.stemLabToolGrid}>
            {lab.tools.map(({ icon: Icon, label, detail }, index) => (
              <button
                type="button"
                key={label}
                className={selectedTool === index ? styles.stemLabToolSelected : styles.stemLabTool}
                aria-pressed={selectedTool === index}
                onClick={() => chooseTool(index)}
                disabled={complete}
              >
                <Icon size={26} aria-hidden="true" />
                <strong>{label}</strong>
                <span>{detail}</span>
              </button>
            ))}
          </div>
        </section>}

        {tool && !complete && guideStep === 2 && (
          <section id="stem-prediction" className={styles.stemLabPrediction}>
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

        {demoRan && tool && (
          <section className={styles.stemLabResult} aria-live="polite">
            <div className={styles.stemLabResultBadge}><CheckCircle2 size={22} aria-hidden="true" /> PRACTICE RESULT</div>
            <h2>{tool.label}</h2>
            <PictureExample kind={LAB_PICTURES[mode][selectedTool ?? 0]} />
            <p>{tool.result}</p>
            <div>
              <strong>Your prediction:</strong>
              <span>{prediction || 'Saved proof from an earlier practice test.'}</span>
            </div>
            <small>This is a guided app practice result—not real-world evidence. A real test still requires the workbook/facilitator process and appropriate permission.</small>
          </section>
        )}

        {(guideStep >= 5 || complete) && (
          <section className={styles.stemLabExplain}>
            <div className={styles.stemLabSectionHead}>
              <span>STEP 4</span>
              <h2>Explain what happened</h2>
            </div>
            <div id="stem-next-test" className={styles.stemLabPredictionGrid} aria-label="Choose your next test">{NEXT_TESTS.map((choice) => <button type="button" key={choice} className={nextTest === choice ? styles.stemLabPredictionSelected : styles.stemLabPredictionButton} aria-pressed={nextTest === choice} onClick={() => setNextTest(choice)}>{choice}</button>)}</div>
            <textarea
              id="stem-sin-answer"
              aria-label="S.T.E.M.Sin explanation, optional when choices are complete"
              className={styles.dailyQuestTextarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="I tested... I noticed... Next I would..."
            />
            {complete && text !== pilotProgress.stemSinText && <p className={styles.draftNote}>Your changes are kept as a draft. Tap Update S.T.E.M.Sin Proof to replace the finished answer.</p>}
            {!complete && <p className={styles.draftNote}>Your practice and draft are kept on this tablet as you go.</p>}
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
            {(tool || complete) && (
              <button
                className={styles.stemLabSave}
                disabled={!canSave || (!tool && !complete)}
                onClick={saveProof}
              >
                {complete ? 'Update S.T.E.M.Sin Proof' : 'Save S.T.E.M.Sin Proof'}
              </button>
            )}
          </section>
        )}

        {complete && (
          <section className={styles.stemLabComplete}>
            <CheckCircle2 size={28} aria-hidden="true" />
            <div>
              <strong>{pilotProgress.stemSinEvidenceType === 'choices' ? 'Choice response saved. No written explanation was provided.' : 'S.T.E.M.Sin response saved on this tablet.'}</strong>
              {pilotProgress.stemSinChoiceProof && <span>Prediction: {pilotProgress.stemSinChoiceProof.prediction}. Next test: {pilotProgress.stemSinChoiceProof.nextTest}.</span>}
              <span>{pilotProgress.stemSinChoice ? `Tool tested: ${pilotProgress.stemSinChoice}` : 'Saved explanation; no tool was recorded in this earlier session.'}</span>
            </div>
            <button type="button" onClick={() => navigate(mirrorResult ? 'results' : 'mirrorIntro')}>{mirrorResult ? 'Continue To Mirror Results' : 'Start My Mirror'} <ChevronRight size={17} /></button>
          </section>
        )}

        {complete && <p className={styles.draftNote}>Talk through your next test with a peer or facilitator. A real person's need is what makes the idea useful.</p>}
        <WorkbookCallout text="Use the workbook S.T.E.M.Sin page for the real plan, discussion, and facilitator-supported test. The app demonstrates the thinking rhythm, then saves the youth's explanation as proof." />

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
