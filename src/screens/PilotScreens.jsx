import { useState } from 'react';
import { Sparkles, Lightbulb, Target, BriefcaseBusiness, Eye, PenLine, CheckCircle2, Flag, BookOpenCheck, FlaskConical, ScanFace } from 'lucide-react';
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
    helper: 'Big ideas can start with one small problem. Notice it, think about who it affects, and tell us one way you could help.',
    placeholder: 'I see a problem with… I could help by…',
    action: 'Finish My Quest',
  },
  builder: {
    kicker: 'Daily Challenge',
    title: 'Spot It. Think It Through. Try Something.',
    helper: 'Find a real problem, name who has it, and choose one change you could test.',
    placeholder: 'The problem is… It affects… One thing I could test is…',
    action: 'Complete Daily Quest',
  },
  leader: {
    kicker: 'Daily Quest',
    title: 'Find the Need Behind the Problem',
    helper: 'Use evidence, not guesses. Define who experiences the problem and one assumption you need to test.',
    placeholder: 'The need is… My evidence is… I still need to test…',
    action: 'Complete Daily Quest',
  },
  yaep: {
    kicker: 'Opportunity Scan',
    title: 'Identify Value Worth Testing',
    helper: 'Define the user, the current workaround, evidence of demand, and the value you could test.',
    placeholder: 'The opportunity is… The user is… The current workaround is…',
    action: 'Complete Opportunity Quest',
  },
};

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
