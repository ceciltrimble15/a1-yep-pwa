import {
  ArrowRight,
  BookOpenCheck,
  Compass,
  Cpu,
  Flag,
  Map,
  RotateCcw,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
} from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { MODES } from '../data/modes';
import { getProgramContent, STEM_SIN_LABEL } from '../data/pilotContent';
import Shell from '../components/Shell';
import styles from './PilotScreens.module.css';

const AGE_PRESENTATION = {
  explorer: {
    label: 'FOUNDATION DISCOVERY ZONE',
    headline: 'Look. Try. Make.',
    laneLead: 'Pick one thing to try next.',
  },
  builder: {
    label: 'BUILDER CHALLENGE LAB',
    headline: 'Build. Test. Improve.',
    laneLead: 'Choose the next challenge and keep building your process.',
  },
  leader: {
    label: 'MOMENTUM OPPORTUNITY STUDIO',
    headline: 'Pitch. Lead. Create Value.',
    laneLead: 'Move from ideas into decisions, leadership, and real-world action.',
  },
  yaep: {
    label: 'Y.A.E.P. EXECUTION STUDIO',
    headline: 'Own. Execute. Build Proof.',
    laneLead: 'Turn direction into professional action and proof you can build on.',
  },
};

function HubCard({ title, text, status, done, onClick, icon: Icon, featured = false }) {
  return (
    <button className={`${styles.card} ${featured ? styles.cardFeatured : ''}`} onClick={onClick}>
      <div className={styles.cardTop}>
        {Icon && (
          <span className={styles.cardIcon} aria-hidden="true">
            <Icon size={20} strokeWidth={2.2} />
          </span>
        )}
        <ArrowRight className={styles.cardArrow} size={18} aria-hidden="true" />
      </div>
      <div className={styles.cardTitle}>{title}</div>
      <div className={styles.cardText}>{text}</div>
      {status && <span className={`${styles.status} ${done ? styles.done : ''}`}>{status}</span>}
    </button>
  );
}

function LaneCard({ number, title, subtitle, status, onClick, icon: Icon, tone = 'blue' }) {
  return (
    <button className={`${styles.laneCard} ${styles[`lane${tone}`]}`} onClick={onClick}>
      <div className={styles.laneTop}>
        <span className={styles.laneNumber}>{number}</span>
        <span className={styles.laneIcon}><Icon size={22} strokeWidth={2.2} /></span>
      </div>
      <div className={styles.laneTitle}>{title}</div>
      <div className={styles.laneSubtitle}>{subtitle}</div>
      <div className={styles.laneStatus}>{status}</div>
    </button>
  );
}

export default function Home() {
  const {
    powerName,
    directionProfile,
    exposureLog,
    navigate,
    pilotProgress,
    pilotBadges,
    mirrorResult,
    mode,
  } = useYEP();

  const program = MODES[mode] || MODES.builder;
  const ageView = AGE_PRESENTATION[mode] || AGE_PRESENTATION.builder;

  const {
    weeklyModule,
    bossChallenge,
    mentorSpotlight,
    instructions,
  } = getProgramContent(mode);

  const weeklyDone = pilotProgress.weeklyCompleted.length >= weeklyModule.activities.length;
  const directionSaved = !!directionProfile?.interest;
  const exposureCount = exposureLog?.length || 0;

  return (
    <Shell>
      <section className={styles.homeHero} data-age-mode={mode}>
        <div className={styles.heroCopy}>
          <div className={styles.heroEyebrow}>{ageView.label}</div>
          <h1 className={styles.heroTitle}>
            {powerName
              ? <>Welcome back, <span>{powerName}.</span></>
              : <>{ageView.headline.split('. ').map((part, i, arr) => (
                  <span key={part} className={i === arr.length - 1 ? styles.heroAgeAccent : undefined}>
                    {part}{i < arr.length - 1 ? '. ' : ''}
                  </span>
                ))}</>}
          </h1>
          <p className={styles.heroText}>{instructions}</p>

          <div className={styles.heroMeta}>
            <div>
              <span>ACTIVE PATHWAY</span>
              <strong>{program.label}</strong>
            </div>
            <div>
              <span>ENTREPRENEUR FOCUS</span>
              <strong>{program.entrepreneurCue.replace('Entrepreneur skill: ', '')}</strong>
            </div>
            <div>
              <span>PROOF SAVED</span>
              <strong>{pilotBadges.length} / 3</strong>
            </div>
          </div>

          <button className={styles.heroAction} onClick={() => navigate('myDirection')}>
            <Compass size={19} />
            {directionSaved ? (mode === 'explorer' ? 'Keep Exploring' : 'Continue My Direction') : (mode === 'explorer' ? 'Show Me My Path' : 'Start My Direction')}
            <ArrowRight size={18} />
          </button>
        </div>

        <div className={styles.processVisual} aria-label="YEP process visual" data-age-mode={mode}>
          <div className={styles.processGlow} />
          <div className={styles.processCenter}>
            <img src="/a1-suppliers-logo.png" alt="" />
            <strong>{program.program}</strong>
            <span>{program.tier}</span>
          </div>
          <div className={`${styles.processNode} ${styles.nodeOne}`}>
            <Sparkles size={17} />
            <span>QUEST</span>
          </div>
          <div className={`${styles.processNode} ${styles.nodeTwo}`}>
            <Cpu size={17} />
            <span>S.T.E.M.Sin</span>
          </div>
          <div className={`${styles.processNode} ${styles.nodeThree}`}>
            <ScanFace size={17} />
            <span>MIRROR</span>
          </div>
          <div className={`${styles.processNode} ${styles.nodeFour}`}>
            <Flag size={17} />
            <span>FINISHER</span>
          </div>
        </div>
      </section>

      <section className={styles.laneSection} data-age-mode={mode}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.sectionEyebrow}>{ageView.label}</div>
            <h2 className={styles.sectionTitle}>{ageView.laneLead}</h2>
          </div>
          <div className={styles.sectionHint}>Same four lanes · age-aware experience</div>
        </div>

        <div className={styles.laneRail}>
          <LaneCard
            number="01"
            title="Daily Quest"
            subtitle={mode === 'explorer' ? 'Spot it. Try it.' : mode === 'yaep' ? 'Execute one focused move.' : 'Take one focused action.'}
            status={pilotProgress.dailyQuestComplete ? 'Complete' : 'Start here'}
            icon={Sparkles}
            tone="Blue"
            onClick={() => navigate('dailyQuest')}
          />
          <LaneCard
            number="02"
            title={STEM_SIN_LABEL}
            subtitle={mode === 'explorer' ? 'Use a tool. Solve it.' : mode === 'leader' ? 'Use technology to solve a real problem.' : 'Technology + problem-solving.'}
            status={pilotProgress.stemSinComplete ? 'Complete' : 'Open quest'}
            icon={Cpu}
            tone="Electric"
            onClick={() => navigate('stemSin')}
          />
          <LaneCard
            number="03"
            title="Mirror Results"
            subtitle={mode === 'explorer' ? 'What happened?' : mode === 'yaep' ? 'Assess choices, habits, and growth edges.' : 'Reflect on choices and growth.'}
            status={mirrorResult ? 'View result' : 'Run mirror'}
            icon={ScanFace}
            tone="Silver"
            onClick={() => navigate(mirrorResult ? 'results' : 'mirrorIntro')}
          />
          <LaneCard
            number="04"
            title="FINISHER Mission"
            subtitle={mode === 'explorer' ? 'Finish your mission.' : mode === 'yaep' ? 'Convert reflection into measurable action.' : 'Turn reflection into action.'}
            status={mirrorResult ? 'Mission ready' : 'Unlock through Mirror'}
            icon={Flag}
            tone="Gold"
            onClick={() => navigate(mirrorResult ? 'mission' : 'mirrorIntro')}
          />
        </div>
      </section>

      <section className={styles.startSection}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.sectionEyebrow}>START HERE</div>
            <h2 className={styles.sectionTitle}>Know your path. Build your proof.</h2>
          </div>
        </div>

        <div className={styles.primaryGrid}>
          <HubCard
            icon={Compass}
            featured
            title="My Direction"
            text={directionSaved
              ? `Current interest: ${directionProfile.interest}. Keep opening doors around the work, money, technology, people, and adjacent opportunities.`
              : 'Start with what you are curious about, then open doors to skills, people, technology, money, and opportunities you may not know yet.'}
            status={directionSaved ? 'Direction Saved' : 'Explore'}
            done={directionSaved}
            onClick={() => navigate('myDirection')}
          />
          <HubCard
            icon={Map}
            featured
            title="Exposure Passport"
            text="Track what you have seen, what you want to try, what did not fit, and what door you should open next."
            status={exposureCount ? `${exposureCount} Worlds Logged` : 'Start Exploring'}
            done={exposureCount > 0}
            onClick={() => navigate('exposurePassport')}
          />
          <HubCard
            icon={Target}
            featured
            title="FINISHER Focus"
            text="See Focus, Innovation, Growth Edge, and your mission direction together."
            status="View Focus"
            onClick={() => navigate('finisherFocus')}
          />
        </div>
      </section>

      <section className={styles.toolsSection}>
        <div className={styles.sectionHead}>
          <div>
            <div className={styles.sectionEyebrow}>PROCESS TOOLS</div>
            <h2 className={styles.sectionTitle}>Learn. Build. Review.</h2>
          </div>
        </div>

        <div className={styles.grid}>
          <HubCard icon={ShieldCheck} title="Privacy + Safeguards" text="Review tablet rules for privacy, youth data, microphone use, consent boundaries, device handling, and incident response." status="Required Safeguard" onClick={() => navigate('privacySafeguards')} />
          <HubCard icon={BookOpenCheck} title="A/1 Learning Guide" text="Understand A/1 Suppliers, how YEP / Y.A.E.P. fit, what The Process teaches, and how the tablet experience works." status="Learn The Organization" onClick={() => navigate('a1Guide')} />
          <HubCard icon={Users} title="Choose Age Pathway" text={`Current pathway: ${program.label}. Choose Foundation, Builder, Momentum, or Y.A.E.P.`} status="Change Pathway" onClick={() => navigate('track')} />
          <HubCard icon={Sparkles} title="Weekly Module" text={`Run the ${weeklyModule.title} demo module.`} status={weeklyDone ? 'Complete' : `${pilotProgress.weeklyCompleted.length}/${weeklyModule.activities.length} Done`} done={weeklyDone} onClick={() => navigate('weeklyModule')} />
          <HubCard icon={Target} title="Boss Challenge" text={bossChallenge.prompt} status={pilotProgress.bossComplete ? 'Complete' : 'Open'} done={pilotProgress.bossComplete} onClick={() => navigate('bossChallenge')} />
          <HubCard icon={Users} title="Mentor Spotlight" text={mentorSpotlight.challenge} status={pilotProgress.mentorQuestion ? 'Question Saved' : 'Open'} done={!!pilotProgress.mentorQuestion} onClick={() => navigate('mentorSpotlight')} />
          <HubCard icon={Sparkles} title="Rewards / Badges" text="See which demo badges were earned from completed actions." status={`${pilotBadges.length}/3 Unlocked`} done={pilotBadges.length === 3} onClick={() => navigate('rewards')} />
          <HubCard icon={ScanFace} title="My Process / Profile" text="See your pathway, direction, Mirror result, FINISHER direction, completion status, badges, and Mirror XP." status="View" onClick={() => navigate('profile')} />
          <HubCard icon={BookOpenCheck} title="Admin Review" text="Review the active tablet demo record and the proof actually saved on this device." status="Review" onClick={() => navigate('adminReview')} />
          <HubCard icon={Users} title="Unc's Operations Hub" text="Private leadership working guide for meeting prep, field notes, proof/sample log, and next moves." status="Internal Leadership" onClick={() => navigate('uncHub')} />
          <HubCard icon={RotateCcw} title="Reset Demo Participant" text="Clear this tablet's local demo participant and prepare a clean start for the next tester." status="Safety Gate" onClick={() => navigate('resetDemo')} />
        </div>
      </section>

      <div className={styles.demoGuardrail}>
        <ShieldCheck size={18} />
        <div>
          <strong>Weekend pilot rule</strong>
          <span>Use sample or non-sensitive information only until intake, consent, privacy, and permissions are approved for real participant data.</span>
        </div>
      </div>
    </Shell>
  );
}
