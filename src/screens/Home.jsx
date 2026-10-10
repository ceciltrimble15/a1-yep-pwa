import { ArrowRight, BookOpenCheck, Compass, Flag, ShieldCheck, Sparkles, Target, Users, RotateCcw, FlaskConical, ScanFace, ArrowUpRight, Volume2 } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { MODES } from '../data/modes';
import { getProgramContent } from '../data/pilotContent';
import { hasLegacyFoundationQuest, LEGACY_FOUNDATION_QUEST } from '../data/foundationQuest';
import Shell from '../components/Shell';
import YEPGuide from '../components/YEPGuide';
import { LearningPicture } from '../components/LearningPicture';
import styles from './Home.module.css';

export default function Home() {
  const { mode, powerName, directionProfile, pilotProgress, mirrorResult, currentMission, missionComplete, reflectionSubmitted, navigate } = useYEP();
  const program = MODES[mode] || MODES.builder;
  const content = getProgramContent(mode);
  const legacyFoundation = mode === 'explorer' && hasLegacyFoundationQuest(pilotProgress);
  const dailyContent = legacyFoundation ? LEGACY_FOUNDATION_QUEST : content.dailyQuest;
  const needsFirstCheckIn = !legacyFoundation && mode === 'explorer' && !['interest', 'strength', 'learning', 'goal'].every((key) => directionProfile?.[key]) && !pilotProgress.dailyQuestComplete && pilotProgress.dailyQuestDraft?.selectedProblem == null && !pilotProgress.dailyQuestDraft?.text;
  const next = needsFirstCheckIn
    ? { step: 'WELCOME', title: 'Your first YEP check-in', prompt: 'Choose what catches your attention, a strength, how you like to learn, and something you want to try. Your answers can change as you grow.', action: 'Continue My First Check-In', screen: 'myDirection' }
    : !pilotProgress.dailyQuestComplete
    ? { step: 1, title: dailyContent.title, prompt: dailyContent.prompt, example: dailyContent.example || content.example, action: 'Continue Daily Quest', screen: 'dailyQuest' }
    : !pilotProgress.stemSinComplete
      ? { step: 2, title: content.stemSin.challengeTitle, prompt: content.stemSin.prompt, example: content.example, action: 'Continue S.T.E.M.Sin', screen: 'stemSin' }
      : !mirrorResult
        ? { step: 3, title: 'Look at your growth', prompt: 'Answer one question at a time. Choose what feels true for you today, then see a strength and something to practice.', example: 'Think about the last time you tried something difficult. Use what actually happened to choose your answer.', action: 'Start My Mirror', screen: 'mirrorIntro' }
        : !missionComplete
          ? { step: 4, title: currentMission?.title || 'Your FINISHER mission', prompt: 'Use your strength in a real action. Your guide will point to one mission step at a time. Mark only the work you have done.', example: currentMission?.activeApproach, action: 'Continue FINISHER Mission', screen: 'mission' }
          : !reflectionSubmitted
            ? { step: 4, title: content.reflection.title, prompt: content.reflection.prompt, example: 'I tried one step, noticed what happened, and chose something to improve next.', action: 'Continue My Reflection', screen: 'reflection' }
            : { step: 'SAVED', title: 'Your work is here', prompt: 'You have saved this learning loop. Revisit your work, discuss it with your facilitator, or choose another activity below.', example: 'Use your saved response to explain what you tried, what you noticed, and your next question.', action: 'View My Work', screen: 'profile' };
  const activities = [
    ['My Direction', 'Explore what interests you.', 'myDirection', Compass],
    ['Exposure Passport', 'Review the worlds you have explored.', 'exposurePassport', Sparkles],
    ['FINISHER Focus', 'Connect your saved ideas and next action.', 'finisherFocus', Target],
    ['Weekly Module', content.weeklyModule.title, 'weeklyModule', BookOpenCheck],
    ['Boss Challenge', content.bossChallenge.title, 'bossChallenge', Flag],
    ['Mentor Spotlight', content.mentorSpotlight.title, 'mentorSpotlight', Users],
  ];

  const finished = [pilotProgress.dailyQuestComplete, pilotProgress.stemSinComplete, !!mirrorResult, missionComplete && reflectionSubmitted].filter(Boolean).length;
  const welcome = mode === 'explorer'
    ? { title: 'Hey, Explorer!', sub: "Look around. Try something. Your ideas matter.", eyebrow: 'YOUR YEP ADVENTURE' }
    : mode === 'builder'
      ? { title: "What's up, Builder?", sub: 'See a problem. Build an idea. Test what works.', eyebrow: 'YOUR NEXT BIG IDEA' }
      : mode === 'leader'
        ? { title: 'Ready to lead?', sub: 'Spot opportunities. Test ideas. Make a difference.', eyebrow: 'YOUR NEXT MOVE' }
        : { title: 'Create your next move.', sub: 'Find the need. Test the value. Build your proof.', eyebrow: 'YOUR Y.A.E.P. JOURNEY' };
  const lanes = [
    { id: 'daily', icon: Sparkles, title: 'Daily Quest', tagline: 'Spot something you could improve.', prompt: 'See the problem', picture: 'waiting', screen: 'dailyQuest', done: pilotProgress.dailyQuestComplete },
    { id: 'stem', icon: FlaskConical, title: 'S.T.E.M.Sin', tagline: 'Test an idea and see what changes.', prompt: 'Try a helpful tool', picture: 'supplies', screen: 'stemSin', done: pilotProgress.stemSinComplete },
    { id: 'mirror', icon: ScanFace, title: 'Mirror Results', tagline: 'Get to know your strengths.', prompt: 'See your growth', picture: 'help', screen: mirrorResult ? 'results' : 'mirrorIntro', done: !!mirrorResult },
    { id: 'finisher', icon: Flag, title: 'FINISHER Mission', tagline: 'Put your learning into action.', prompt: 'Make your next move', picture: 'reach', screen: 'mission', done: missionComplete && reflectionSubmitted },
  ];
  return (
    <Shell showAudio={false} visualHome>
      <div className={styles.dashboard} data-lane={mode}>
        <section className={styles.welcome} aria-label="YEP welcome">
          <div className={styles.welcomeCopy}>
            <span className={styles.welcomeEyebrow}>{welcome.eyebrow} · {program.tier} · AGES {program.ageRange}</span>
            <h1>{powerName ? \`Hey, \${powerName}!\` : welcome.title}</h1>
            <p>{welcome.sub}</p>
            <button type="button" className={styles.welcomeAction} onClick={() => navigate(next.screen)}>
              {next.action} <ArrowRight size={22} aria-hidden="true"/>
            </button>
          </div>
          <svg className={styles.welcomeArt} viewBox="0 0 530 330" role="img" aria-label="Illustration of a smiling young YEP learner discovering ideas in a sunny neighborhood">
            <defs>
              <linearGradient id="yepSky" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#B8E7FF"/><stop offset="1" stopColor="#E9F9FF"/></linearGradient>
              <linearGradient id="yepJacket" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#1A62B7"/><stop offset="1" stopColor="#092A60"/></linearGradient>
              <radialGradient id="yepFace"><stop offset="0" stopColor="#B77850"/><stop offset="1" stopColor="#865234"/></radialGradient>
            </defs>
            <rect x="0" y="0" width="530" height="330" fill="url(#yepSky)"/>
            <circle cx="427" cy="70" r="37" fill="#FFD45F" opacity=".8"/>
            <path d="M0 220q160 -45 284 0t246 -19v129H0Z" fill="#B9E4D8"/>
            <g opacity=".75"><rect x="10" y="116" width="92" height="115" rx="8" fill="#8DC6EF"/><rect x="104" y="82" width="84" height="145" rx="8" fill="#A3CCEB"/><rect x="394" y="137" width="70" height="96" rx="8" fill="#7AB0D5"/><rect x="466" y="114" width="52" height="123" rx="7" fill="#9DC4E7"/>{[20,55,121,155,413,446,477].map((x,i)=><rect key={x} x={x} y={160+(i%3)*15} width="18" height="23" rx="4" fill="#F2FCFF" opacity=".85"/>)}</g>
            <path d="M10 303q94 -52 196 -18t205 -9q60 -17 119 -11v65H0Z" fill="#75BAA8"/>
            <g transform="translate(146 38)">
              <ellipse cx="118" cy="260" rx="116" ry="26" fill="#356789" opacity=".17"/>
              <path d="M35 254q0 -104 84 -104 90 0 100 104Z" fill="url(#yepJacket)"/>
              <path d="M87 178l32 28 30 -28-6 78H98Z" fill="#FFD357"/>
              <path d="M97 177h43v40H97Z" fill="#8B5437"/>
              <ellipse cx="119" cy="116" rx="69" ry="83" fill="url(#yepFace)"/>
              <ellipse cx="49" cy="131" rx="13" ry="20" fill="#9C6244"/><ellipse cx="189" cy="131" rx="13" ry="20" fill="#9C6244"/>
              <path d="M53 92Q46 26 111 21Q181 15 189 91Q159 65 121 67Q79 68 53 92Z" fill="#172034"/>
              {[[-49,8,16],[-22,-11,22],[10,-23,20],[42,-14,24],[69,-5,19],[89,21,15],[-53,39,16],[96,46,17]].map(([x,y,r],i)=><circle key={i} cx={117+x} cy={55+y} r={r} fill="#192133"/>)}
              <path d="M84 117q14 -10 27 -2M136 115q16 -8 27 3" fill="none" stroke="#352317" strokeWidth="5" strokeLinecap="round"/>
              <ellipse cx="99" cy="129" rx="6" ry="8" fill="#202233"/><ellipse cx="151" cy="129" rx="6" ry="8" fill="#202233"/>
              <circle cx="101" cy="126" r="2" fill="#fff"/><circle cx="153" cy="126" r="2" fill="#fff"/>
              <path d="M122 133q-8 15 0 20" fill="none" stroke="#674029" strokeWidth="4" strokeLinecap="round"/>
              <path d="M95 163q26 28 52 0" fill="#fff" stroke="#713D32" strokeWidth="4" strokeLinecap="round"/>
              <path d="M47 213q-21 12 -28 40M193 211q29 3 38 39" stroke="#174A93" strokeWidth="35" strokeLinecap="round"/>
              <path d="M17 252q-5 -23 11 -31 20 -3 24 11" fill="#A66A46"/>
              <path d="M119 230l9 10 -9 10 -9 -10Z" fill="#F7F9FF"/>
            </g>
            <g transform="translate(29 50)"><path d="M0 27h36M18 9v36" stroke="#FFE36E" strokeWidth="8" strokeLinecap="round"/><circle cx="18" cy="27" r="31" stroke="#fff" strokeWidth="3" fill="none" opacity=".65"/></g>
            <g transform="translate(415 189)"><rect width="89" height="72" rx="16" fill="#FFF5C7" stroke="#EFC158" strokeWidth="3"/><path d="M24 39l12 12 28 -31" fill="none" stroke="#1A955F" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round"/></g>
          </svg>
        </section>

        <div className={styles.welcomeBottom}>
          <span><Sparkles size={18} aria-hidden="true"/> Same Process. Different Stage of Life.</span>
          <span>{finished} of 4 learning lanes have saved work</span>
        </div>

        <div className={styles.sectionIntro}><div><span>WHERE WILL YOU GO?</span><h2>Choose what you want to explore.</h2></div><p>See it. Hear it. Try it. Reflect. Finish.</p></div>

        <div className={styles.laneGrid} aria-label="The four YEP learning lanes">
          {lanes.map(({ id, icon: Icon, title, tagline, prompt, picture, screen, done }, index) => (
            <button type="button" key={id} className={styles.laneCard} data-kind={id} onClick={() => navigate(screen)} aria-label={\`\${title}. \${prompt}\`}>
              <span className={styles.laneTop}><Icon size={27} aria-hidden="true"/><strong>{done ? 'WORK SAVED' : \`EXPLORE \${index + 1}\`}</strong></span>
              <span className={styles.laneTitle}>{title}</span>
              <span className={styles.laneTagline}>{tagline}</span>
              <span className={styles.lanePicture}><LearningPicture kind={picture} label={\`Illustrated \${title} learning scene\`} /></span>
              <span className={styles.laneBottom}><b>{prompt}</b><span><ArrowUpRight size={24} aria-hidden="true"/></span></span>
            </button>
          ))}
        </div>

        <div className={styles.guideSection}>
          <div className={styles.guideLabel}><Volume2 size={20} aria-hidden="true"/><strong>YOUR YEP GUIDE</strong><span>Here when you need help.</span></div>
          <YEPGuide step={next.step} title={next.title} prompt={next.prompt} example={next.example} actionLabel={next.action} onAction={() => navigate(next.screen)} />
        </div>

        <p className={styles.saved}>Your practice work is saved on this tablet. This is a demonstration, not a shared student record.</p>

        <details className={styles.section}>
          <summary>Explore more activities</summary>
          <div className={styles.grid}>
            {activities.map(([title, detail, screen, Icon]) => <button key={screen} onClick={() => navigate(screen)}><Icon size={25} aria-hidden="true"/><span><strong>{title}</strong><small>{detail}</small></span><ArrowRight size={23} aria-hidden="true"/></button>)}
          </div>
        </details>
        <details className={styles.section}>
          <summary>My work and pathway</summary>
          <div className={styles.grid}>
            <button onClick={() => navigate('profile')}><BookOpenCheck size={25}/><span><strong>My Process / Profile</strong><small>Review the work saved on this tablet.</small></span></button>
            <button onClick={() => navigate('track')}><Users size={25}/><span><strong>Choose Age Pathway</strong><small>Foundation, Builder, Momentum, or Y.A.E.P.</small></span></button>
            <button onClick={() => navigate('a1Guide')}><Compass size={25}/><span><strong>A/1 Learning Guide</strong><small>Learn how the Process works.</small></span></button>
            <button onClick={() => navigate('privacySafeguards')}><ShieldCheck size={25}/><span><strong>Privacy + Safeguards</strong><small>Sample data and safe tablet use.</small></span></button>
          </div>
        </details>
        <details className={styles.section}>
          <summary>Facilitator tools · this tablet only</summary>
          <div className={styles.grid}>
            <button onClick={() => navigate('adminReview')}><BookOpenCheck size={25}/><span><strong>Admin Review</strong><small>Read the sample proof saved on this device.</small></span></button>
            <button onClick={() => navigate('uncHub')}><Users size={25}/><span><strong>Unc's Operations Hub</strong><small>Existing leadership working guide.</small></span></button>
            <button onClick={() => navigate('resetDemo')}><RotateCcw size={25}/><span><strong>Reset Demo Participant</strong><small>Review the reset warning before clearing work.</small></span></button>
          </div>
        </details>
      </div>
    </Shell>
  );
}
