import { useMemo, useState } from 'react';
import { Compass, Lightbulb, Network, BadgeDollarSign, Cpu, Shuffle, ArrowLeft, Target } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { MODES } from '../data/modes';
import { EXPOSURE_WORLDS, getDirectionGuide } from '../data/directionGuidance';
import Shell from '../components/Shell';
import VoiceCapture from '../components/VoiceCapture';
import styles from './PilotScreens.module.css';
import ui from '../styles/ui.module.css';

function GuideCard({ icon: Icon, title, children }) {
  return (
    <div className={styles.card}>
      <div className={styles.cardTitle} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Icon size={20} /> {title}
      </div>
      <div className={styles.cardText}>{children}</div>
    </div>
  );
}

const FOUNDATION_INTAKE = [
  {
    key: 'interest',
    eyebrow: 'FIRST CHECK-IN · 1 OF 4',
    title: 'What pulls your attention?',
    prompt: 'There is no wrong answer. Tap the kind of thing you want to explore first.',
    options: ['Building things', 'Helping people', 'Technology + games', 'Art + design', 'Money + business', 'Solving problems'],
  },
  {
    key: 'strength',
    eyebrow: 'FIRST CHECK-IN · 2 OF 4',
    title: 'What feels like a strength?',
    prompt: 'Pick the one that sounds most like you today. You can grow every one of these.',
    options: ['I notice things', 'I make things', 'I explain ideas', 'I help people', 'I keep trying', 'I organize things'],
  },
  {
    key: 'learning',
    eyebrow: 'FIRST CHECK-IN · 3 OF 4',
    title: 'How do you like to learn?',
    prompt: 'Choose the way that usually helps something click for you.',
    options: ['Seeing it', 'Hearing it', 'Trying it', 'Doing it with someone'],
  },
  {
    key: 'goal',
    eyebrow: 'FIRST CHECK-IN · 4 OF 4',
    title: 'What do you want to do first?',
    prompt: 'This is just a starting direction, not a permanent choice.',
    options: ['Build something', 'Solve a problem', 'Learn a new skill', 'Help somebody', 'Make money from an idea', 'Learn what I am good at'],
  },
];

function FoundationIntake({ directionProfile, saveDirectionProfile, setScreen, powerName }) {
  const firstIncomplete = FOUNDATION_INTAKE.findIndex(({ key }) => !directionProfile?.[key]);
  const [step, setStep] = useState(
    firstIncomplete === -1 ? FOUNDATION_INTAKE.length : firstIncomplete === 0 ? -1 : firstIncomplete
  );
  const complete = step >= FOUNDATION_INTAKE.length;
  const current = step >= 0 && !complete ? FOUNDATION_INTAKE[step] : null;
  const explorerName = powerName || 'Explorer';

  const guidePrompt = complete
    ? `Nice work, ${explorerName}. I know a little more about how you want to start. These answers can change as you learn. Now we can begin your first Daily Quest.`
    : step === -1
      ? `Welcome, ${explorerName}. This is your first YEP check-in. I am not testing you. I am learning how you see things so the Process can meet you where you are.`
      : current?.prompt || '';

  function hearGuide() {
    if (typeof window === 'undefined' || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(guidePrompt);
    utterance.rate = 0.94;
    window.speechSynthesis.speak(utterance);
  }

  function choose(value) {
    if (!current) return;
    saveDirectionProfile({ [current.key]: value });
    setStep((currentStep) => currentStep + 1);
  }

  return (
    <Shell>
      <section className={styles.foundationIntake}>
        <div className={styles.foundationIntakeGuide}>
          <div className={styles.foundationIntakeGuideAvatar} aria-hidden="true">
            <span>YEP</span>
          </div>
          <div>
            <span className={styles.foundationIntakeGuideLabel}>YOUR YEP GUIDE</span>
            <h1>{complete ? `You are ready, ${explorerName}.` : step === -1 ? `Welcome, ${explorerName}.` : current?.title}</h1>
            <p>{guidePrompt}</p>
          </div>
          <button type="button" className={styles.foundationIntakeHear} onClick={hearGuide}>
            Hear Guide
          </button>
        </div>

        <div className={styles.foundationIntakeProgress} aria-label="First Check-In progress">
          {FOUNDATION_INTAKE.map(({ key }, index) => (
            <span key={key} data-state={step === -1 ? 'next' : index < step ? 'done' : index === step ? 'active' : 'next'}>
              {index + 1}
            </span>
          ))}
        </div>

        {step === -1 && (
          <div className={styles.foundationIntakeWelcome}>
            <span>THIS IS NOT A TEST</span>
            <h2>YEP starts by learning about you.</h2>
            <p>You will see real situations, hear the Guide, make choices, try ideas, reflect on what happened, and finish something you can be proud of.</p>
            <div className={styles.foundationIntakeRhythm} aria-label="YEP learning rhythm">
              <b>SEE IT</b><i>→</i><b>UNDERSTAND IT</b><i>→</i><b>TRY IT</b><i>→</i><b>REFLECT</b><i>→</i><b>FINISH</b>
            </div>
            <button type="button" className={ui.btnPrimary} onClick={() => setStep(0)}>
              Start My First Check-In
            </button>
          </div>
        )}

        {!complete && current && (
          <div className={styles.foundationIntakeQuestion}>
            <span>{current.eyebrow}</span>
            <h2>{current.title}</h2>
            <p>{current.prompt}</p>
            <div className={styles.foundationIntakeChoices}>
              {current.options.map((option) => (
                <button type="button" key={option} onClick={() => choose(option)}>
                  <strong>{option}</strong>
                  <ArrowRight size={18} aria-hidden="true" />
                </button>
              ))}
            </div>
          </div>
        )}

        {complete && (
          <div className={styles.foundationIntakeReady}>
            <span>YOUR STARTING SNAPSHOT</span>
            <h2>This is where we begin — not where you have to stay.</h2>
            <div className={styles.foundationIntakeSnapshot}>
              <div><small>INTEREST</small><strong>{directionProfile?.interest || 'Still exploring'}</strong></div>
              <div><small>STRENGTH</small><strong>{directionProfile?.strength || 'Still exploring'}</strong></div>
              <div><small>LEARNING</small><strong>{directionProfile?.learning || 'Still exploring'}</strong></div>
              <div><small>FIRST GOAL</small><strong>{directionProfile?.goal || 'Still exploring'}</strong></div>
            </div>
            <p>Nothing here locks you in. YEP will keep exposing you to new choices so you can learn what fits, what does not, and what you want to try next.</p>
            <div className={styles.actions}>
              <button type="button" className={ui.btnPrimary} onClick={() => setScreen('dailyQuest')}>
                Start My First Daily Quest <ArrowRight size={18} />
              </button>
              <button type="button" className={ui.btnGhost} onClick={() => setStep(0)}>
                Review My Check-In
              </button>
            </div>
          </div>
        )}

        <div className={styles.foundationIntakeFooter}>
          <span>FIRST CHECK-IN</span>
          <strong>Interest → Strength → Learning → Goal → First Quest</strong>
          <small>The Mirror comes later. This first check-in only gives YEP a starting point.</small>
        </div>
      </section>
    </Shell>
  );
}

const REACTIONS = [
  { id: 'curious', label: 'I am curious' },
  { id: 'try', label: 'I want to try this' },
  { id: 'not-now', label: 'Not for me right now' },
];

export default function MyDirection() {
  const { directionProfile, exposureLog, saveDirectionProfile, saveExposureReaction, mode, setScreen, powerName } = useYEP();
  const [interest, setInterest] = useState(directionProfile.interest || '');
  const [why, setWhy] = useState(directionProfile.why || '');
  const [saved, setSaved] = useState(false);
  const program = MODES[mode] || MODES.builder;
  const guide = useMemo(() => getDirectionGuide(interest, mode), [interest, mode]);

  if (mode === 'explorer') {
    return (
      <FoundationIntake
        directionProfile={directionProfile}
        saveDirectionProfile={saveDirectionProfile}
        setScreen={setScreen}
        powerName={powerName}
      />
    );
  }

  const exposureSnapshot = useMemo(() => {
    const curious = exposureLog.filter((entry) => entry.reaction === 'curious');
    const wantToTry = exposureLog.filter((entry) => entry.reaction === 'try');
    const notNow = exposureLog.filter((entry) => entry.reaction === 'not-now');
    const priority = wantToTry[0] || curious[0] || null;
    const nextMove = priority
      ? `Take one small real-world step in ${priority.label}: watch the work, try a task, meet someone, or build something small. Then come back and reflect.`
      : `Pick one world that makes you curious. You do not need to know your future. Your job is just to explore one door.`;
    return { curious, wantToTry, notNow, priority, nextMove };
  }, [exposureLog]);

  function save() {
    saveDirectionProfile({ interest: interest.trim(), why: why.trim() });
    setSaved(true);
  }

  function currentReaction(worldId) {
    return exposureLog.find((entry) => entry.worldId === worldId)?.reaction || '';
  }

  return (
    <Shell>
      <div className={styles.head}>
        <div className={styles.eyebrow}>{program.program} · {program.label} · My Direction</div>
        <h1 className={styles.title}>Explore What Could Fit You.</h1>
        <p className={styles.sub}>
          My Direction does not decide your future. It starts with what you are curious about, connects it to real work, money, technology, people, and the FINISHER Process, then deliberately exposes you to other worlds you may not know yet.
        </p>
      </div>

      <div className={styles.note}>
        <strong>V0.5 guidance rule:</strong> this is a structured local exploration guide, not a live AI chat and not a prediction about what you should become. You are allowed to deepen, change, or completely pivot your direction.
      </div>

      <div className={styles.profileGrid} style={{ marginTop: 16 }}>
        <div className={styles.card}>
          <label className={styles.label} htmlFor="direction-interest">What are you curious about right now?</label>
          <textarea
            id="direction-interest"
            className={styles.textarea}
            style={{ minHeight: 110 }}
            value={interest}
            onChange={(e) => { setInterest(e.target.value); setSaved(false); }}
            placeholder="Example: I think I might want to be an architect."
            maxLength={240}
          />
          <VoiceCapture
            prompt="What are you curious about right now?"
            currentValue={interest}
            onConfirm={(answer) => { setInterest(answer); setSaved(false); }}
            buttonLabel="Talk To YEP"
            confirmLabel="Use As My Interest"
          />
        </div>
        <div className={styles.card}>
          <label className={styles.label} htmlFor="direction-why">Why does that interest you?</label>
          <textarea
            id="direction-why"
            className={styles.textarea}
            style={{ minHeight: 110 }}
            value={why}
            onChange={(e) => { setWhy(e.target.value); setSaved(false); }}
            placeholder="What about it catches your attention?"
            maxLength={320}
          />
          <VoiceCapture
            prompt="Why does that interest you?"
            currentValue={why}
            onConfirm={(answer) => { setWhy(answer); setSaved(false); }}
            buttonLabel="Talk To YEP"
            confirmLabel="Use This Reason"
          />
        </div>
      </div>

      <div className={styles.actions}>
        <button className={ui.btnPrimary} onClick={save} disabled={!interest.trim()}>
          <Compass size={20} /> {saved ? 'Direction Saved' : 'Build My Exposure Map'}
        </button>
      </div>

      <div className={styles.note}>
        <strong>{guide.cluster.label}:</strong> {guide.lane.headline}
      </div>

      <div className={styles.grid} style={{ marginTop: 16 }}>
        <GuideCard icon={Lightbulb} title="Try The Work">{guide.cluster.tryIt}</GuideCard>
        <GuideCard icon={BadgeDollarSign} title="Money + Ownership Lens">{guide.cluster.money}</GuideCard>
        <GuideCard icon={Cpu} title="Technology Lens">{guide.cluster.technology}</GuideCard>
        <GuideCard icon={Network} title="People + Network Lens">{guide.cluster.people}</GuideCard>
        <GuideCard icon={Compass} title="Adjacent Doors">{guide.cluster.adjacent.join(' · ')}</GuideCard>
        <GuideCard icon={Shuffle} title="Outside Your Current Interest"><strong>{guide.outside.label}:</strong> {guide.outside.prompt}</GuideCard>
      </div>

      <div className={styles.note}>
        <strong>Questions for this pathway:</strong>
        <ul style={{ margin: '8px 0 0 18px', padding: 0 }}>
          {guide.lane.questions.map((question) => <li key={question}>{question}</li>)}
        </ul>
      </div>

      <div className={styles.head} style={{ marginTop: 28 }}>
        <div className={styles.eyebrow}>Exposure Wheel</div>
        <h2 className={styles.cardTitle}>You Do Not Only Explore One Career.</h2>
        <p className={styles.sub}>YEP / Y.A.E.P. keeps opening doors across these worlds so you can discover interests you did not know you had.</p>
      </div>

      <div className={styles.grid}>
        {EXPOSURE_WORLDS.map((world) => {
          const reaction = currentReaction(world.id);
          return (
            <div className={styles.card} key={world.id}>
              <div className={styles.cardTitle}>{world.label}</div>
              <div className={styles.cardText}>{world.prompt}</div>
              <div className={styles.actions}>
                {REACTIONS.map((option) => (
                  <button
                    key={option.id}
                    className={reaction === option.id ? ui.btnPrimary : ui.btnGhost}
                    onClick={() => saveExposureReaction(world, option.id)}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <div className={styles.head} style={{ marginTop: 28 }}>
        <div className={styles.eyebrow}>Exposure Snapshot</div>
        <h2 className={styles.cardTitle}>What Your Choices Are Starting To Show</h2>
      </div>

      <div className={styles.profileGrid}>
        <div className={styles.card}>
          <div className={styles.label}>Curious About</div>
          <div className={styles.value}>{exposureSnapshot.curious.length}</div>
          <div className={styles.cardText}>{exposureSnapshot.curious.map((entry) => entry.label).join(' · ') || 'Nothing marked yet.'}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>Want To Try</div>
          <div className={styles.value}>{exposureSnapshot.wantToTry.length}</div>
          <div className={styles.cardText}>{exposureSnapshot.wantToTry.map((entry) => entry.label).join(' · ') || 'Nothing marked yet.'}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>Not For Me Right Now</div>
          <div className={styles.value}>{exposureSnapshot.notNow.length}</div>
          <div className={styles.cardText}>{exposureSnapshot.notNow.map((entry) => entry.label).join(' · ') || 'Nothing marked yet.'}</div>
        </div>
        <div className={styles.card}>
          <div className={styles.label}>Current Priority</div>
          <div className={styles.value}>{exposureSnapshot.priority?.label || 'Still exploring'}</div>
          <div className={styles.cardText}>This is not a permanent choice. It is simply the strongest next door based on what you marked.</div>
        </div>
      </div>

      <div className={styles.note}>
        <Target size={18} style={{ verticalAlign: '-3px', marginRight: 6 }} />
        <strong>Your Next Move:</strong> {exposureSnapshot.nextMove}
      </div>

      <div className={styles.note}>
        <strong>Exposure record:</strong> {exposureLog.length} world{exposureLog.length === 1 ? '' : 's'} reacted to. The point is not to pick one forever. The point is to keep learning what fits, what does not, and what you did not know existed.
      </div>

      <div className={styles.note}>
        <strong>The Process stays the same:</strong> Interest → Exposure → Try It → Build Something → Money + Technology + People → Reflect → Deepen or Pivot.
      </div>

      <div className={styles.actions}>
        <button className={ui.btnGhost} onClick={() => setScreen('home')}><ArrowLeft size={18} /> Back To Program Home</button>
      </div>
    </Shell>
  );
}
