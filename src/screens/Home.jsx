import {
  ArrowRight,
  BookOpenCheck,
  Camera,
  ClipboardList,
  Compass,
  Cpu,
  FileText,
  Flag,
  Map,
  MapPin,
  Mic,
  RotateCcw,
  ScanFace,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Volume2,
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

function JourneyStep({ number, title, short, status, state = 'ready', attention = false, onClick, icon: Icon, tone = 'Blue' }) {
  return (
    <button
      type="button"
      className={`${styles.journeyStep} ${styles[`journey${tone}`]} ${styles[`journey${state}`]} ${attention ? styles.journeyAttention : ''}`}
      onClick={onClick}
      aria-label={`${title}: ${status}`}
    >
      <span className={styles.journeyNumber}>{number}</span>
      <span className={styles.journeyIcon} aria-hidden="true"><Icon size={24} strokeWidth={2.25} /></span>
      <span className={styles.journeyCopy}>
        <strong>{title}</strong>
        <small>{short}</small>
      </span>
      <span className={styles.journeyStatus}>{status}</span>
    </button>
  );
}

function FoundationHeroArt() {
  return (
    <div className={styles.foundationHeroArt} aria-label="YEP Foundation illustrated community scene">
      <svg viewBox="0 0 620 390" role="img" aria-label="Young YEP explorer in a city community learning scene">
        <defs>
          <linearGradient id="foundationSky" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#63B7FF" />
            <stop offset="58%" stopColor="#1D69C8" />
            <stop offset="100%" stopColor="#0B2B62" />
          </linearGradient>
          <linearGradient id="foundationGround" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#28548A" />
            <stop offset="100%" stopColor="#102C56" />
          </linearGradient>
          <filter id="foundationShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="10" stdDeviation="8" floodOpacity=".22" />
          </filter>
        </defs>
        <rect width="620" height="390" rx="32" fill="url(#foundationSky)" />
        <circle cx="514" cy="67" r="40" fill="#F8DE8E" opacity=".9" />
        <path d="M0 255 Q110 205 218 248 T430 232 T620 246 V390 H0Z" fill="url(#foundationGround)" />
        <g opacity=".92">
          <rect x="30" y="146" width="66" height="120" rx="5" fill="#163D78" />
          <rect x="108" y="114" width="72" height="152" rx="5" fill="#204D8B" />
          <rect x="192" y="165" width="58" height="101" rx="5" fill="#123666" />
          <rect x="478" y="126" width="54" height="140" rx="5" fill="#173B71" />
          <rect x="543" y="98" width="46" height="168" rx="5" fill="#214E8C" />
          <g fill="#9FD7FF" opacity=".55">
            <rect x="43" y="160" width="12" height="10" /><rect x="70" y="160" width="12" height="10" />
            <rect x="121" y="128" width="12" height="10" /><rect x="148" y="128" width="12" height="10" />
            <rect x="121" y="151" width="12" height="10" /><rect x="148" y="151" width="12" height="10" />
            <rect x="493" y="141" width="10" height="10" /><rect x="518" y="141" width="10" height="10" />
            <rect x="555" y="114" width="10" height="10" /><rect x="576" y="114" width="10" height="10" />
          </g>
        </g>
        <g filter="url(#foundationShadow)">
          <rect x="260" y="218" width="170" height="86" rx="10" fill="#F7F9FF" />
          <rect x="280" y="191" width="130" height="34" rx="8" fill="#D4A017" />
          <text x="345" y="214" textAnchor="middle" fontSize="15" fontWeight="900" fill="#0F2460">A/1 SUPPLIERS</text>
          <rect x="282" y="238" width="44" height="38" rx="5" fill="#1C77F0" />
          <rect x="338" y="238" width="44" height="38" rx="5" fill="#D4DAE6" />
          <rect x="394" y="238" width="18" height="38" rx="5" fill="#D4A017" />
        </g>
        <g transform="translate(102 94)" filter="url(#foundationShadow)">
          <ellipse cx="110" cy="276" rx="94" ry="22" fill="#081A38" opacity=".3" />
          <path d="M52 183 Q106 146 166 184 L187 273 Q118 305 42 271Z" fill="#111827" />
          <path d="M61 191 Q113 161 164 190 L158 268 Q112 288 61 268Z" fill="#0F2460" />
          <path d="M76 197 Q111 177 150 197" fill="none" stroke="#D4A017" strokeWidth="6" strokeLinecap="round" />
          <circle cx="111" cy="107" r="62" fill="#70462F" />
          <path d="M53 107 Q50 39 112 29 Q169 30 174 99 Q154 77 129 73 Q92 70 53 107Z" fill="#080A0E" />
          <circle cx="86" cy="108" r="6" fill="#111827" /><circle cx="137" cy="108" r="6" fill="#111827" />
          <path d="M88 137 Q111 154 137 137" fill="none" stroke="#2B1710" strokeWidth="6" strokeLinecap="round" />
          <path d="M43 85 Q26 111 47 126" fill="#111827" /><path d="M177 85 Q194 111 174 126" fill="#111827" />
          <path d="M58 207 L16 251" stroke="#111827" strokeWidth="22" strokeLinecap="round" />
          <path d="M166 207 L207 240" stroke="#111827" strokeWidth="22" strokeLinecap="round" />
          <circle cx="16" cy="252" r="13" fill="#70462F" /><circle cx="208" cy="241" r="13" fill="#70462F" />
          <path d="M85 269 L72 340" stroke="#111827" strokeWidth="30" strokeLinecap="round" /><path d="M140 269 L158 340" stroke="#111827" strokeWidth="30" strokeLinecap="round" />
          <path d="M52 342 Q74 328 92 343 L91 352 L47 352Z" fill="#F8DE8E" /><path d="M147 343 Q165 328 182 343 L186 352 L142 352Z" fill="#F8DE8E" />
          <path d="M74 89 Q110 56 151 87" fill="none" stroke="#D4A017" strokeWidth="7" strokeLinecap="round" />
          <path d="M109 84 L109 174" stroke="#D4A017" strokeWidth="5" /><path d="M109 174 L130 194" stroke="#D4A017" strokeWidth="5" />
          <circle cx="109" cy="174" r="8" fill="#D4A017" />
        </g>
        <g transform="translate(450 27)">
          <circle cx="48" cy="48" r="46" fill="#0F2460" stroke="#F8DE8E" strokeWidth="4" />
          <circle cx="48" cy="47" r="23" fill="#70462F" />
          <path d="M26 45 Q28 17 48 16 Q71 17 72 43 Q60 31 47 32 Q36 31 26 45Z" fill="#080A0E" />
          <circle cx="40" cy="48" r="2.5" fill="#111827" /><circle cx="56" cy="48" r="2.5" fill="#111827" />
          <path d="M41 59 Q48 64 56 59" fill="none" stroke="#2B1710" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M22 78 Q48 64 75 78" fill="#2A4EAF" />
        </g>
        <g transform="translate(24 24)">
          <rect width="118" height="42" rx="12" fill="#FFF" opacity=".96" />
          <text x="59" y="18" textAnchor="middle" fontSize="10" fontWeight="900" fill="#0F2460">REAL PROBLEMS</text>
          <text x="59" y="33" textAnchor="middle" fontSize="9" fontWeight="900" fill="#D4A017">REAL SOLUTIONS</text>
        </g>
      </svg>
    </div>
  );
}

function FoundationStartHere({ powerName, navigate, pilotProgress, mirrorResult }) {
  const explorerName = powerName || 'Explorer';
  const completed = [pilotProgress.dailyQuestComplete, pilotProgress.stemSinComplete, !!mirrorResult].filter(Boolean).length;
  return (
    <div className={styles.foundationStart}>
      <section className={styles.foundationWelcome}>
        <div className={styles.foundationWelcomeCopy}>
          <span className={styles.foundationEyebrow}>FOUNDATION · AGES 7–10</span>
          <h1>Welcome to YEP!<br /><em>Start Here.</em></h1>
          <p className={styles.foundationTagline}>See it. Hear it. Do it. Reflect. Finish.</p>
          <p className={styles.foundationIntro}>Hey {explorerName}! We are going to look at real things, try ideas, learn from what happens, and build something you can show.</p>
          <div className={styles.foundationMeta}>
            <div><span>YOUR PATH</span><strong>Foundation</strong></div>
            <div><span>PROCESS</span><strong>Look · Try · Make</strong></div>
            <div><span>WORK SAVED</span><strong>{completed} steps</strong></div>
          </div>
          <button className={styles.foundationPrimary} type="button" onClick={() => navigate('myDirection')}>
            <Compass size={20} /> Start Here <ArrowRight size={19} />
          </button>
        </div>
        <FoundationHeroArt />
      </section>

      <section className={styles.foundationMainGrid}>
        <div className={styles.foundationQuestColumn}>
          <article className={styles.foundationQuestCard}>
            <div className={styles.foundationQuestTop}>
              <div>
                <span>TODAY'S DAILY QUEST</span>
                <h2>A Better Lunch Line</h2>
                <p>The lunch line at school is long. People wait, get frustrated, and sometimes skip lunch.</p>
              </div>
              <button type="button" onClick={() => navigate('dailyQuest')} aria-label="Open today's Daily Quest"><ArrowRight size={26} /></button>
            </div>
            <div className={styles.foundationLunchScene} aria-label="Illustrated school lunch line">
              <div className={styles.lunchCounter}><span>CAFETERIA</span><i /><i /><i /></div>
              <div className={styles.lunchPeople}><span /><span /><span /><span /><span /><span /></div>
              <div className={styles.lunchGuide}><div className={styles.lunchGuideHead} /><div className={styles.lunchGuideBody} /><span>YEP</span></div>
              <div className={styles.lunchProblem}>TOO MUCH WAITING</div>
            </div>
            <button type="button" className={styles.foundationListen} onClick={() => {
              if (typeof window === 'undefined' || !window.speechSynthesis) return;
              window.speechSynthesis.cancel();
              window.speechSynthesis.speak(new SpeechSynthesisUtterance('Look at the lunch line. What do you notice?'));
            }}><Volume2 size={18} /> Listen to the scenario <ArrowRight size={17} /></button>
            <div className={styles.foundationThreeSteps}>
              <button type="button" onClick={() => navigate('dailyQuest')}><b>1</b><strong>Notice</strong><span>Look closer. What do you see?</span></button>
              <button type="button" onClick={() => navigate('dailyQuest')}><b>2</b><strong>Build</strong><span>Think it through. What could help?</span></button>
              <button type="button" onClick={() => navigate('dailyQuest')}><b>3</b><strong>Finish</strong><span>Share your idea.</span></button>
            </div>
          </article>

          <article className={styles.foundationTogether}>
            <div><Users size={25} /><strong>You’re Not Doing This Alone</strong><p>The app, workbook, and facilitator work together to support every step of the Process.</p></div>
            <div className={styles.foundationTogetherItems}>
              <span><Sparkles size={18} /><b>App</b><small>See + interact</small></span>
              <span><BookOpenCheck size={18} /><b>Workbook</b><small>Think + write</small></span>
              <span><Users size={18} /><b>Facilitator</b><small>Support + coach</small></span>
            </div>
          </article>
        </div>

        <aside className={styles.foundationSide}>
          <article className={styles.foundationCheckIn}>
            <div className={styles.foundationSideHeader}><span>FIRST CHECK-IN</span><ClipboardList size={22} /></div>
            <h2>Let's get to know you.</h2>
            <p>Start with what you like, what you are good at, how you learn, and where you want to go.</p>
            <button type="button" onClick={() => navigate('myDirection')}><span><Compass size={18} /><b>My Interests</b><small>What excites you?</small></span><ArrowRight size={18} /></button>
            <button type="button" onClick={() => navigate('mirrorIntro')}><span><Sparkles size={18} /><b>My Strengths</b><small>What are you good at?</small></span><ArrowRight size={18} /></button>
            <button type="button" onClick={() => navigate('mirrorIntro')}><span><Cpu size={18} /><b>My Learning Style</b><small>How do you learn best?</small></span><ArrowRight size={18} /></button>
            <button type="button" onClick={() => navigate('myDirection')}><span><Target size={18} /><b>My Goals + Direction</b><small>Where do you want to go?</small></span><ArrowRight size={18} /></button>
          </article>

          <article className={styles.foundationRealLife}>
            <div className={styles.foundationSideHeader}><span>REAL-LIFE QUEST</span><MapPin size={22} /></div>
            <h2>Take it into the real world.</h2>
            <p>Some quests take you outside the tablet to look, listen, and learn from real people and places.</p>
            <div className={styles.foundationRealLifeList}>
              <span><MapPin size={16} />Visit a local business</span>
              <span><ScanFace size={16} />Observe a real problem</span>
              <span><Camera size={16} />Document what you learn</span>
              <span><FileText size={16} />Take a photo or notes</span>
            </div>
          </article>
        </aside>
      </section>

      <section className={styles.foundationJourneyBar} aria-label="Your YEP journey">
        <div className={styles.foundationJourneyLabel}>YOUR YEP JOURNEY</div>
        <button className={styles.foundationJourneyActive} onClick={() => navigate('home')}><Compass size={20} /><span><b>Start Here</b><small>Get oriented</small></span></button>
        <button onClick={() => navigate('dailyQuest')}><Sparkles size={20} /><span><b>Daily Quest</b><small>Explore · Think · Create</small></span></button>
        <button onClick={() => navigate('stemSin')}><Cpu size={20} /><span><b>S.T.E.M.Sin</b><small>Skills · Experiment</small></span></button>
        <button onClick={() => navigate(mirrorResult ? 'results' : 'mirrorIntro')}><ScanFace size={20} /><span><b>Mirror Results</b><small>See · Learn · Grow</small></span></button>
        <button onClick={() => navigate(mirrorResult ? 'mission' : 'mirrorIntro')}><Flag size={20} /><span><b>FINISHER Mission</b><small>Take action · Make an impact</small></span></button>
      </section>

      <section className={styles.foundationSupportRow}>
        <button onClick={() => navigate('profile')}><FileText size={18} /> My Work</button>
        <button onClick={() => navigate('privacySafeguards')}><Mic size={18} /> Voice Help</button>
        <button onClick={() => navigate('privacySafeguards')}><ShieldCheck size={18} /> Settings + Safety</button>
      </section>
    </div>
  );
}

export default function Home() {
  const {
    powerName,
    directionProfile,
    exposureLog,
    navigate,
    pilotProgress,
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


  if (mode === 'explorer') {
    return (
      <Shell>
        <FoundationStartHere
          powerName={powerName}
          navigate={navigate}
          pilotProgress={pilotProgress}
          mirrorResult={mirrorResult}
        />
      </Shell>
    );
  }

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
              <span>WORK SAVED</span>
              <strong>{[
                pilotProgress.dailyQuestComplete,
                pilotProgress.stemSinComplete,
                !!mirrorResult,
              ].filter(Boolean).length} completed</strong>
            </div>
          </div>

          <button className={styles.heroAction} onClick={() => navigate('myDirection')}>
            <Compass size={19} />
            {directionSaved ? (mode === 'explorer' ? 'Keep Exploring' : 'Continue My Direction') : (mode === 'explorer' ? 'Show Me My Path' : 'Start My Direction')}
            <ArrowRight size={18} />
          </button>
        </div>

        <aside className={styles.journeyPanel} aria-label={`${program.program} four-lane journey`} data-age-mode={mode}>
          <div className={styles.journeyPanelTop}>
            <div>
              <span className={styles.journeyEyebrow}>YOUR {program.program} JOURNEY</span>
              <strong>Four lanes. One process.</strong>
            </div>
            <div className={styles.journeyProgram} aria-label={`${program.program} ${program.tier}`}>
              <img src="/a1-suppliers-logo.png" alt="" />
              <span>{program.program}</span>
            </div>
          </div>

          {mode === 'explorer' && (
            <div
              className={`${styles.processVisual} ${styles.foundationVisual}`}
              data-age-mode={mode}
              aria-label="Foundation Discovery Zone visual: look, try, solve, reflect, and finish"
            >
              <div className={styles.processGlow} aria-hidden="true" />
              <div className={`${styles.processNode} ${styles.nodeOne}`}>
                <Sparkles size={18} aria-hidden="true" />
                <span>LOOK + TRY</span>
              </div>
              <div className={`${styles.processNode} ${styles.nodeTwo}`}>
                <Cpu size={18} aria-hidden="true" />
                <span>SOLVE</span>
              </div>
              <div className={`${styles.processNode} ${styles.nodeThree}`}>
                <Flag size={18} aria-hidden="true" />
                <span>FINISH</span>
              </div>
              <div className={`${styles.processNode} ${styles.nodeFour}`}>
                <ScanFace size={18} aria-hidden="true" />
                <span>REFLECT</span>
              </div>
              <div className={styles.processCenter}>
                <img src="/a1-suppliers-logo.png" alt="" />
                <strong>YEP</strong>
                <span>DISCOVERY ZONE</span>
              </div>
            </div>
          )}

          <div className={styles.journeySteps}>
            <JourneyStep
              number="01"
              title="Daily Quest"
              short={mode === 'explorer' ? 'Try one thing.' : 'Take one focused action.'}
              status={pilotProgress.dailyQuestComplete ? 'Complete' : 'Start'}
              state={pilotProgress.dailyQuestComplete ? 'done' : 'ready'}
              attention={!pilotProgress.dailyQuestComplete}
              icon={Sparkles}
              tone="Blue"
              onClick={() => navigate('dailyQuest')}
            />
            <JourneyStep
              number="02"
              title="S.T.E.M.Sin"
              short={mode === 'explorer' ? 'Use a tool. Solve it.' : 'Use technology to solve.'}
              status={pilotProgress.stemSinComplete ? 'Complete' : 'Open'}
              state={pilotProgress.stemSinComplete ? 'done' : 'ready'}
              attention={pilotProgress.dailyQuestComplete && !pilotProgress.stemSinComplete}
              icon={Cpu}
              tone="Electric"
              onClick={() => navigate('stemSin')}
            />
            <JourneyStep
              number="03"
              title="Mirror Results"
              short={mode === 'explorer' ? 'See what happened.' : 'Reflect and learn.'}
              status={mirrorResult ? 'Ready' : 'Run Mirror'}
              state={mirrorResult ? 'done' : 'ready'}
              attention={pilotProgress.dailyQuestComplete && pilotProgress.stemSinComplete && !mirrorResult}
              icon={ScanFace}
              tone="Silver"
              onClick={() => navigate(mirrorResult ? 'results' : 'mirrorIntro')}
            />
            <JourneyStep
              number="04"
              title="FINISHER Mission"
              short={mode === 'explorer' ? 'Finish your mission.' : 'Turn reflection into action.'}
              status={mirrorResult ? 'Mission Ready' : 'After Mirror'}
              state={mirrorResult ? 'ready' : 'locked'}
              attention={!!mirrorResult}
              icon={Flag}
              tone="Gold"
              onClick={() => navigate(mirrorResult ? 'mission' : 'mirrorIntro')}
            />
          </div>

          <div className={styles.journeyFlow} aria-hidden="true">
            <span>TRY</span><b>→</b><span>SOLVE</span><b>→</b><span>REFLECT</span><b>→</b><span>FINISH</span>
          </div>
        </aside>
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
            status={mirrorResult ? 'Mission ready' : 'Complete Mirror first'}
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
          <HubCard icon={ScanFace} title="My Process / Profile" text="See your pathway, direction, Mirror result, FINISHER direction, completed work, and saved responses." status="View" onClick={() => navigate('profile')} />
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
