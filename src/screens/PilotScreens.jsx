import { useState } from 'react';
import { Sparkles, Lightbulb, Target, BriefcaseBusiness, Eye, PenLine, CheckCircle2, Flag, BookOpenCheck, FlaskConical, ScanFace, PackageOpen, Trash2, UsersRound, Clock3, Smartphone, MessageCircle, Store, Wrench } from 'lucide-react';
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

function VisualScenario({ mode }) {
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

          <g filter="url(#softGlow)">
            <circle cx="525" cy="176" r="58" fill="none" stroke="#d4a017" strokeWidth="7" />
            <circle cx="525" cy="176" r="46" fill="none" stroke="#d4a017" strokeOpacity=".35" strokeWidth="3" />
            <circle cx="525" cy="89" r="25" fill="#d4a017" />
            <text x="525" y="98" textAnchor="middle" fill="#0f2460" fontSize="26" fontWeight="900">1</text>
          </g>

          <g filter="url(#softGlow)">
            <circle cx="154" cy="332" r="61" fill="none" stroke="#d4a017" strokeWidth="7" />
            <circle cx="154" cy="332" r="49" fill="none" stroke="#d4a017" strokeOpacity=".35" strokeWidth="3" />
            <circle cx="89" cy="270" r="25" fill="#d4a017" />
            <text x="89" y="279" textAnchor="middle" fill="#0f2460" fontSize="26" fontWeight="900">2</text>
          </g>

          <g filter="url(#softGlow)">
            <circle cx="846" cy="244" r="76" fill="none" stroke="#d4a017" strokeWidth="7" />
            <circle cx="846" cy="244" r="64" fill="none" stroke="#d4a017" strokeOpacity=".35" strokeWidth="3" />
            <circle cx="915" cy="157" r="25" fill="#d4a017" />
            <text x="915" y="166" textAnchor="middle" fill="#0f2460" fontSize="26" fontWeight="900">3</text>
          </g>

          <path d="M582 93 C650 61 732 61 805 100" fill="none" stroke="#d4a017" strokeWidth="3" strokeDasharray="10 10" opacity=".85" />
          <path d="M214 283 C300 245 367 224 447 211" fill="none" stroke="#d4a017" strokeWidth="3" strokeDasharray="10 10" opacity=".85" />
          <path d="M879 313 C905 334 924 349 944 370" fill="none" stroke="#d4a017" strokeWidth="3" strokeDasharray="10 10" opacity=".85" />
        </svg>

        <div className={styles.broadcastOverlay} aria-label="Three things to notice in the visual scene">
          {scenario.items.map(({ icon: Icon, label, detail }, index) => (
            <div key={label} className={styles.broadcastCallout}>
              <div className={styles.broadcastCalloutNumber}>{index + 1}</div>
              <Icon size={23} strokeWidth={2.15} aria-hidden="true" />
              <div>
                <strong>{label}</strong>
                <small>{detail}</small>
              </div>
            </div>
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
  const { dailyQuest, instructions, example, expectations } = getProgramContent(mode);
  const copy = QUEST_LABELS[mode] || QUEST_LABELS.builder;
  const [text, setText] = useState(pilotProgress.dailyQuestText);
  const complete = pilotProgress.dailyQuestComplete;
  const program = MODES[mode] || MODES.builder;

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

        <VisualScenario mode={mode} />

        <div className={styles.dailyQuestWorkbench}>
          <article className={styles.dailyQuestStep}>
            <div className={styles.dailyQuestStepHead}>
              <span className={styles.dailyQuestStepNumber}>1</span>
              <Eye size={22} aria-hidden="true" />
              <div>
                <strong>Notice & Think</strong>
                <small>See the problem before you solve it.</small>
              </div>
            </div>
            <p>{instructions}</p>
            <div className={styles.dailyQuestExample}>
              <span>EXAMPLE</span>
              <strong>{example}</strong>
            </div>
          </article>

          <article className={styles.dailyQuestStep}>
            <div className={styles.dailyQuestStepHead}>
              <span className={styles.dailyQuestStepNumber}>2</span>
              <PenLine size={22} aria-hidden="true" />
              <div>
                <strong>Your Turn</strong>
                <small>Put your idea into your own words.</small>
              </div>
            </div>
            <textarea
              className={styles.dailyQuestTextarea}
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={copy.placeholder}
            />
            <VoiceCapture
              prompt={dailyQuest.prompt}
              currentValue={text}
              onConfirm={setText}
              buttonLabel="Talk To YEP"
              confirmLabel="Use As My Answer"
            />
          </article>

          <article className={styles.dailyQuestStep + ' ' + styles.dailyQuestFinish}>
            <div className={styles.dailyQuestStepHead}>
              <span className={styles.dailyQuestStepNumber}>3</span>
              <CheckCircle2 size={22} aria-hidden="true" />
              <div>
                <strong>Finish & Save</strong>
                <small>Save proof that you completed today's quest.</small>
              </div>
            </div>
            <p>{expectations}</p>
            <button
              className={styles.dailyQuestSubmit}
              disabled={!text.trim()}
              onClick={() => completeDailyQuest(text)}
            >
              {complete ? 'Update Completed Quest' : copy.action}
            </button>
            <span className={styles.dailyQuestSaveState}>
              {complete ? 'Quest saved on this tablet.' : 'Your answer stays on this tablet when you save it.'}
            </span>
          </article>
        </div>

        <div className={styles.dailyQuestWorkbook}>
          <BookOpenCheck size={20} aria-hidden="true" />
          <div>
            <strong>Workbook ↔ App</strong>
            <span>Complete the matching Daily Quest page, then save the same core response here as proof of work.</span>
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
  const { pilotProgress, completeStemSin, mode } = useYEP();
  const { stemSin } = getProgramContent(mode);
  const [text, setText] = useState(pilotProgress.stemSinText);

  return (
    <Shell>
      <ScreenHead eyebrow={`${MODES[mode]?.program || 'YEP'} · S.T.E.M.Sin`} title={stemSin.title} sub={stemSin.prompt} />
      <LaneGuidance />
      <WorkbookCallout text="Use the workbook S.T.E.M.Sin page to think it through on paper, then record the tested idea here so the proof trail is visible on the tablet." />
      <div className={styles.card}>
        <div className={styles.label}>FINISHER Focus</div>
        <div className={styles.value}>{stemSin.finisher}</div>
        <p>{stemSin.challengeTitle}</p>
      </div>
      <textarea className={styles.textarea} value={text} onChange={(e) => setText(e.target.value)} placeholder="Describe the tool, user, problem, and result you would test..." />
      <VoiceCapture prompt={stemSin.prompt} currentValue={text} onConfirm={setText} buttonLabel="Talk To YEP" confirmLabel="Use As My Answer" />
      <div className={styles.actions}>
        <button className={ui.btnPrimary} disabled={!text.trim()} onClick={() => completeStemSin(text)}>
          {pilotProgress.stemSinComplete ? 'Update S.T.E.M.Sin Quest' : 'Complete S.T.E.M.Sin Quest'}
        </button>
        <BackHome />
      </div>
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
