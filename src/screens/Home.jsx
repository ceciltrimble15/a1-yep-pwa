import { ArrowRight, BookOpenCheck, Compass, Flag, ShieldCheck, Sparkles, Target, Users, RotateCcw } from 'lucide-react';
import { useYEP } from '../context/YEPContext';
import { MODES } from '../data/modes';
import { getProgramContent } from '../data/pilotContent';
import { hasLegacyFoundationQuest, LEGACY_FOUNDATION_QUEST } from '../data/foundationQuest';
import Shell from '../components/Shell';
import YEPGuide from '../components/YEPGuide';
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
  return (
    <Shell showAudio={false}>
      <header className={styles.hero} data-lane={mode}>
        <p>{program.program} · {program.tier} · Ages {program.ageRange}</p>
        <h1>{powerName ? `Welcome back, ${powerName}.` : program.visualTitle}</h1>
      </header>
      <YEPGuide step={next.step} title={next.title} prompt={next.prompt} example={next.example} actionLabel={next.action} onAction={() => navigate(next.screen)} />
      <div className={styles.saved} role="status">Your sample work stays on this tablet. Use the four-step rail to revisit an activity.</div>
      <details className={styles.section}>
        <summary>Explore more activities</summary>
        <div className={styles.grid}>
          {activities.map(([title, detail, screen, Icon]) => <button key={screen} onClick={() => navigate(screen)}><Icon size={25} aria-hidden="true" /><span><strong>{title}</strong><small>{detail}</small></span><ArrowRight size={23} aria-hidden="true" /></button>)}
        </div>
      </details>
      <details className={styles.section}>
        <summary>My work and pathway</summary>
        <div className={styles.grid}>
          <button onClick={() => navigate('profile')}><BookOpenCheck size={25} /><span><strong>My Process / Profile</strong><small>Review the work saved on this tablet.</small></span></button>
          <button onClick={() => navigate('track')}><Users size={25} /><span><strong>Choose Age Pathway</strong><small>Foundation, Builder, Momentum, or Y.A.E.P.</small></span></button>
          <button onClick={() => navigate('a1Guide')}><Compass size={25} /><span><strong>A/1 Learning Guide</strong><small>Learn how the Process works.</small></span></button>
          <button onClick={() => navigate('privacySafeguards')}><ShieldCheck size={25} /><span><strong>Privacy + Safeguards</strong><small>Sample data and safe tablet use.</small></span></button>
        </div>
      </details>
      <details className={styles.section}>
        <summary>Facilitator tools · this tablet only</summary>
        <div className={styles.grid}>
          <button onClick={() => navigate('adminReview')}><BookOpenCheck size={25} /><span><strong>Admin Review</strong><small>Read the sample proof saved on this device.</small></span></button>
          <button onClick={() => navigate('uncHub')}><Users size={25} /><span><strong>Unc's Operations Hub</strong><small>Existing leadership working guide.</small></span></button>
          <button onClick={() => navigate('resetDemo')}><RotateCcw size={25} /><span><strong>Reset Demo Participant</strong><small>Review the reset warning before clearing work.</small></span></button>
        </div>
      </details>
    </Shell>
  );
}
