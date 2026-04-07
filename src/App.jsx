import { useState, useEffect, useCallback } from 'react';

/* ═══════════════════════════════════════════════════════════
   A/1 SUPPLIERS — YOUNG ENTREPRENEURS PROCESS (YEP)
   Phase 1 MVP — Avondale Pilot Cohort
   ═══════════════════════════════════════════════════════════ */

// ── Constants ────────────────────────────────────────────
const FINISHER_LETTERS = [
  { letter: 'F', word: 'Focus' },
  { letter: 'I', word: 'Identity' },
  { letter: 'N', word: 'Network' },
  { letter: 'I', word: 'Innovation' },
  { letter: 'S', word: 'Strategy' },
  { letter: 'H', word: 'Hustle' },
  { letter: 'E', word: 'Execution' },
  { letter: 'R', word: 'Resilience' },
];

const WEEKS = [
  {
    num: 1,
    title: 'Focus & Identity',
    letters: [0, 1],
    description: 'Who are you? What drives you? This week you define yourself before the world does.',
    activities: [
      { id: 'w1a1', title: 'Write your Power Name', desc: 'Choose a name that represents who you are becoming.' },
      { id: 'w1a2', title: 'Define your "Why"', desc: 'What problem do you want to solve? Write it in one sentence.' },
      { id: 'w1a3', title: 'Identity Map', desc: 'Draw your skills, interests, and values on one page.' },
    ],
    aiTip: 'Focus is not about doing more. It is about knowing what matters.',
  },
  {
    num: 2,
    title: 'Network & Innovation',
    letters: [2, 3],
    description: 'Ideas without people go nowhere. People without ideas go in circles.',
    activities: [
      { id: 'w2a1', title: 'Map your network', desc: 'List 5 people who could help your idea — and what you can offer them.' },
      { id: 'w2a2', title: 'Problem-Solution fit', desc: 'Interview one real person about the problem you want to solve.' },
      { id: 'w2a3', title: 'Prototype sketch', desc: 'Draw your solution on paper. It does not need to be perfect.' },
    ],
    aiTip: 'Your network is not who you know. It is who knows what you can do.',
  },
  {
    num: 3,
    title: 'Strategy & Hustle',
    letters: [4, 5],
    description: 'Strategy is the plan. Hustle is the proof you mean it.',
    activities: [
      { id: 'w3a1', title: 'Build your pitch', desc: 'Write a 60-second pitch for your idea. Practice it out loud.' },
      { id: 'w3a2', title: 'Revenue brainstorm', desc: 'List 3 ways your idea could make money. Pick the most realistic one.' },
      { id: 'w3a3', title: 'Hustle log', desc: 'Document every action you took this week toward your goal.' },
    ],
    aiTip: 'Strategy without hustle is a wish list. Hustle without strategy is just noise.',
  },
  {
    num: 4,
    title: 'Execution & Resilience',
    letters: [6, 7],
    description: 'Everyone has a plan until it gets hard. FINISHERS keep going.',
    activities: [
      { id: 'w4a1', title: 'Ship something', desc: 'Launch one version of your idea. Post it, share it, sell it.' },
      { id: 'w4a2', title: 'Collect feedback', desc: 'Ask 3 people what they think. Write down what they said — not what you wanted to hear.' },
      { id: 'w4a3', title: 'Reflection letter', desc: 'Write a letter to yourself about what you learned in 4 weeks.' },
    ],
    aiTip: 'Resilience is not avoiding failure. It is deciding that failure does not decide.',
  },
];

const BADGE_DEFS = [
  { id: 'first_step', name: 'First Step', desc: 'Completed the Assessment', icon: '🎯' },
  { id: 'week_1', name: 'Week 1 Clear', desc: 'Finished all Week 1 activities', icon: '📘' },
  { id: 'week_2', name: 'Week 2 Clear', desc: 'Finished all Week 2 activities', icon: '📗' },
  { id: 'week_3', name: 'Week 3 Clear', desc: 'Finished all Week 3 activities', icon: '📙' },
  { id: 'week_4', name: 'Week 4 Clear', desc: 'Finished all Week 4 activities', icon: '📕' },
  { id: 'streak_3', name: '3-Day Streak', desc: 'Opened the app 3 days in a row', icon: '🔥' },
  { id: 'full_finisher', name: 'FINISHER', desc: 'All 8 letters unlocked', icon: '🏆' },
];

const ASSESSMENT_QUESTIONS = [
  { id: 'q1', text: 'I have an idea for something I want to build or sell.', options: ['Yes', 'Sort of', 'Not yet'] },
  { id: 'q2', text: 'I know what I am good at.', options: ['Yes', 'I think so', 'Still figuring it out'] },
  { id: 'q3', text: 'I can talk about my idea for 60 seconds.', options: ['Easily', 'With help', 'Not yet'] },
  { id: 'q4', text: 'I have people I can go to for advice.', options: ['Yes', 'A few', 'Not really'] },
  { id: 'q5', text: 'When something gets hard, I usually...', options: ['Push through', 'Take a break', 'Stop'] },
];

// ── Storage helpers ──────────────────────────────────────
const STORAGE_KEY = 'a1_yep_data';

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return {
    name: '',
    powerName: '',
    assessmentDone: false,
    assessmentAnswers: {},
    completedActivities: [],
    unlockedLetters: [],
    badges: [],
    streak: 0,
    lastOpenDate: null,
    onboardingDone: false,
    parentFormSubmitted: false,
  };
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

// ── Sync status ──────────────────────────────────────────
function getSyncStatus() {
  if (!navigator.onLine) return 'waiting';
  return 'saved';
}

// ═══════════════════════════════════════════════════════════
//  MAIN APP COMPONENT
// ═══════════════════════════════════════════════════════════
export default function App() {
  const [screen, setScreen] = useState('splash');
  const [data, setData] = useState(loadData);
  const [syncStatus, setSyncStatus] = useState(getSyncStatus);
  const [toast, setToast] = useState(null);
  const [dismissedAi, setDismissedAi] = useState({});

  // Persist on change
  useEffect(() => { saveData(data); }, [data]);

  // Online/offline listener
  useEffect(() => {
    const update = () => setSyncStatus(getSyncStatus());
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  // Streak tracking
  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    if (data.lastOpenDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    const newStreak = data.lastOpenDate === yesterday ? data.streak + 1 : 1;
    const updates = { lastOpenDate: today, streak: newStreak };
    if (newStreak >= 3 && !data.badges.includes('streak_3')) {
      updates.badges = [...data.badges, 'streak_3'];
      setTimeout(() => showToast('3-Day Streak earned!'), 1000);
    }
    update(updates);
  }, []);

  // Splash auto-advance
  useEffect(() => {
    if (screen === 'splash') {
      const t = setTimeout(() => {
        setScreen(data.onboardingDone ? 'dashboard' : 'welcome');
      }, 2200);
      return () => clearTimeout(t);
    }
  }, [screen]);

  const update = useCallback((changes) => {
    setData((prev) => ({ ...prev, ...changes }));
  }, []);

  const showToast = useCallback((msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const completeActivity = useCallback((actId) => {
    if (data.completedActivities.includes(actId)) return;
    const newCompleted = [...data.completedActivities, actId];
    const newLetters = [...data.unlockedLetters];
    let newBadges = [...data.badges];

    // Check week completions
    WEEKS.forEach((week) => {
      const allDone = week.activities.every((a) => newCompleted.includes(a.id));
      if (allDone) {
        week.letters.forEach((li) => {
          if (!newLetters.includes(li)) newLetters.push(li);
        });
        const badgeId = `week_${week.num}`;
        if (!newBadges.includes(badgeId)) {
          newBadges.push(badgeId);
          showToast(`Week ${week.num} Clear!`);
        }
      }
    });

    // Full FINISHER check
    if (newLetters.length === 8 && !newBadges.includes('full_finisher')) {
      newBadges.push('full_finisher');
      setTimeout(() => showToast('FINISHER unlocked!'), 1500);
    }

    update({ completedActivities: newCompleted, unlockedLetters: newLetters, badges: newBadges });
    setSyncStatus('saved');
    setTimeout(() => setSyncStatus(getSyncStatus()), 1500);
  }, [data, update, showToast]);

  // ── Render ─────────────────────────────────────────────
  return (
    <div className="relative min-h-screen bg-white flex flex-col">
      {/* Toast */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-a1-blue text-white px-5 py-3 rounded-card shadow-card-hover animate-toast font-semibold text-sm tracking-wide max-w-[90%]">
          {toast}
        </div>
      )}

      {screen === 'splash' && <SplashScreen />}
      {screen === 'welcome' && <WelcomeScreen setScreen={setScreen} data={data} update={update} />}
      {screen === 'finisher-intro' && <FinisherIntroScreen setScreen={setScreen} data={data} />}
      {screen === 'assessment' && <AssessmentScreen setScreen={setScreen} data={data} update={update} showToast={showToast} />}
      {screen === 'dashboard' && <DashboardScreen setScreen={setScreen} data={data} syncStatus={syncStatus} dismissedAi={dismissedAi} setDismissedAi={setDismissedAi} />}
      {screen === 'week1' && <WeekScreen week={WEEKS[0]} setScreen={setScreen} data={data} completeActivity={completeActivity} syncStatus={syncStatus} dismissedAi={dismissedAi} setDismissedAi={setDismissedAi} />}
      {screen === 'week2' && <WeekScreen week={WEEKS[1]} setScreen={setScreen} data={data} completeActivity={completeActivity} syncStatus={syncStatus} dismissedAi={dismissedAi} setDismissedAi={setDismissedAi} />}
      {screen === 'week3' && <WeekScreen week={WEEKS[2]} setScreen={setScreen} data={data} completeActivity={completeActivity} syncStatus={syncStatus} dismissedAi={dismissedAi} setDismissedAi={setDismissedAi} />}
      {screen === 'week4' && <WeekScreen week={WEEKS[3]} setScreen={setScreen} data={data} completeActivity={completeActivity} syncStatus={syncStatus} dismissedAi={dismissedAi} setDismissedAi={setDismissedAi} />}
      {screen === 'rewards' && <RewardsScreen setScreen={setScreen} data={data} syncStatus={syncStatus} />}
      {screen === 'progress' && <ProgressScreen setScreen={setScreen} data={data} syncStatus={syncStatus} />}
      {screen === 'parent' && <ParentInterestScreen setScreen={setScreen} data={data} update={update} showToast={showToast} />}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  SHARED COMPONENTS
// ═══════════════════════════════════════════════════════════

function Logo({ size = 'md' }) {
  const s = size === 'lg' ? 'w-16 h-16 text-2xl' : size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';
  return (
    <div className={`${s} bg-a1-blue rounded-[22%] flex items-center justify-center font-extrabold text-white tracking-tight flex-shrink-0`}>
      A/1
    </div>
  );
}

function Header({ title, syncStatus, onBack, setScreen }) {
  return (
    <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-a1-silver-light safe-top">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {onBack && (
            <button onClick={onBack} className="text-a1-text-secondary p-1 -ml-1" aria-label="Back">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
          )}
          <Logo size="sm" />
          <span className="font-bold text-sm text-a1-text">{title}</span>
        </div>
        <SyncPill status={syncStatus} />
      </div>
    </div>
  );
}

function SyncPill({ status }) {
  if (status === 'waiting') {
    return <span className="text-[11px] font-semibold text-a1-alert animate-pulse-amber px-2 py-1 rounded-full bg-orange-50">Waiting to sync</span>;
  }
  if (status === 'synced') {
    return <span className="text-[11px] font-semibold text-a1-success px-2 py-1 rounded-full bg-green-50">Synced</span>;
  }
  return <span className="text-[11px] font-semibold text-a1-silver px-2 py-1 rounded-full bg-a1-surface">Saved on device</span>;
}

function FinisherBar({ unlockedLetters, onTap }) {
  const allUnlocked = unlockedLetters.length === 8;
  return (
    <button
      onClick={onTap}
      className="w-full flex items-center justify-center gap-[6px] py-3 px-4 bg-a1-surface border-t border-a1-silver-light active:bg-a1-silver-light transition-colors"
      aria-label="View FINISHER progress"
    >
      {FINISHER_LETTERS.map((fl, i) => {
        const unlocked = unlockedLetters.includes(i);
        return (
          <div key={i} className="flex items-center gap-[6px]">
            <span
              className={`text-sm font-extrabold tracking-wide transition-all duration-300 ${
                allUnlocked ? 'text-a1-gold' : unlocked ? 'text-a1-blue' : 'text-a1-silver opacity-40'
              }`}
            >
              {fl.letter}
            </span>
            {i < 7 && <span className="text-a1-silver-light text-[10px]">—</span>}
          </div>
        );
      })}
    </button>
  );
}

function BottomNav({ screen, setScreen }) {
  const items = [
    { id: 'dashboard', label: 'Home', icon: <HomeIcon /> },
    { id: 'progress', label: 'Progress', icon: <ChartIcon /> },
    { id: 'rewards', label: 'Rewards', icon: <BadgeIcon /> },
    { id: 'parent', label: 'Parent', icon: <UserIcon /> },
  ];
  return (
    <div className="sticky bottom-0 z-30 bg-white border-t border-a1-silver-light safe-bottom">
      <div className="flex justify-around py-2">
        {items.map((item) => (
          <button
            key={item.id}
            onClick={() => setScreen(item.id)}
            className={`flex flex-col items-center gap-0.5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest transition-colors ${
              screen === item.id ? 'text-a1-blue' : 'text-a1-silver'
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function AiSuggestion({ tip, id, dismissedAi, setDismissedAi }) {
  if (dismissedAi[id]) return null;
  return (
    <div className="mx-4 mt-3 mb-1 bg-blue-50 border border-a1-blue/10 rounded-xl px-4 py-3 flex items-start gap-3 animate-fade-in">
      <span className="text-[10px] font-bold text-a1-blue bg-a1-blue/10 rounded-md px-1.5 py-0.5 flex-shrink-0 mt-0.5 uppercase tracking-widest">A.Ai</span>
      <p className="text-[13px] text-a1-text-secondary leading-relaxed flex-1">{tip}</p>
      <button onClick={() => setDismissedAi((p) => ({ ...p, [id]: true }))} className="text-a1-silver hover:text-a1-text-secondary flex-shrink-0 mt-0.5" aria-label="Dismiss">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 3L11 11M11 3L3 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
      </button>
    </div>
  );
}

function Card({ children, className = '', onClick }) {
  return (
    <div onClick={onClick} className={`bg-white rounded-card shadow-card p-5 ${onClick ? 'cursor-pointer active:shadow-card-hover active:scale-[0.99] transition-all' : ''} ${className}`}>
      {children}
    </div>
  );
}

function Btn({ children, variant = 'primary', onClick, className = '', disabled }) {
  const base = 'w-full py-3.5 rounded-[10px] font-bold text-[14px] uppercase tracking-[1.5px] transition-all duration-200 min-h-[48px] flex items-center justify-center';
  const styles = {
    primary: `${base} bg-a1-blue text-white active:bg-a1-blue-light disabled:opacity-40`,
    secondary: `${base} bg-white text-a1-blue border-2 border-a1-blue active:bg-a1-surface disabled:opacity-40`,
    ghost: `${base} bg-transparent text-a1-text-secondary active:bg-a1-surface`,
  };
  return <button onClick={onClick} className={`${styles[variant]} ${className}`} disabled={disabled}>{children}</button>;
}

function ScreenShell({ title, syncStatus, setScreen, onBack, children, showFinisher = true, showNav = true, data }) {
  return (
    <>
      <Header title={title} syncStatus={syncStatus} onBack={onBack} setScreen={setScreen} />
      <div className="flex-1 overflow-y-auto pb-4">
        {children}
      </div>
      {showFinisher && data && <FinisherBar unlockedLetters={data.unlockedLetters} onTap={() => setScreen('finisher-intro')} />}
      {showNav && <BottomNav screen={title === 'Dashboard' ? 'dashboard' : title === 'Progress' ? 'progress' : title === 'Rewards' ? 'rewards' : title === 'Parent' ? 'parent' : ''} setScreen={setScreen} />}
    </>
  );
}

// ── Icons ────────────────────────────────────────────────
function HomeIcon() { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 8L10 2L17 8V17H12V12H8V17H3V8Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>; }
function ChartIcon() { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><rect x="3" y="10" width="3" height="7" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="8.5" y="6" width="3" height="11" rx="1" stroke="currentColor" strokeWidth="1.5"/><rect x="14" y="3" width="3" height="14" rx="1" stroke="currentColor" strokeWidth="1.5"/></svg>; }
function BadgeIcon() { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="8" r="5" stroke="currentColor" strokeWidth="1.5"/><path d="M7 13L6 18L10 16L14 18L13 13" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>; }
function UserIcon() { return <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="7" r="3.5" stroke="currentColor" strokeWidth="1.5"/><path d="M3 17C3 14 6 12 10 12C14 12 17 14 17 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>; }
function CheckIcon({ size = 16 }) { return <svg width={size} height={size} viewBox="0 0 16 16" fill="none"><path d="M3 8.5L6.5 12L13 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>; }

// ═══════════════════════════════════════════════════════════
//  SCREEN: SPLASH
// ═══════════════════════════════════════════════════════════
function SplashScreen() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-a1-blue min-h-screen">
      <div className="animate-logo flex flex-col items-center gap-4">
        <div className="w-20 h-20 bg-white rounded-[22%] flex items-center justify-center">
          <span className="text-a1-blue font-extrabold text-3xl tracking-tight">A/1</span>
        </div>
        <div className="text-center">
          <p className="text-white/90 text-[11px] font-semibold uppercase tracking-[3px]">Young Entrepreneurs Process</p>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  SCREEN: WELCOME
// ═══════════════════════════════════════════════════════════
function WelcomeScreen({ setScreen, data, update }) {
  const [name, setName] = useState(data.name);
  const canContinue = name.trim().length >= 2;

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white">
      <div className="flex-1 flex flex-col justify-center px-6 py-12">
        <div className="animate-slide-up">
          <Logo size="lg" />
          <h1 className="text-[28px] font-extrabold text-a1-text mt-6 leading-tight">
            This is not a program.<br />It is a Process.
          </h1>
          <p className="text-a1-text-secondary mt-4 text-[15px] leading-relaxed">
            Welcome to the Young Entrepreneurs Process. Over the next 4 weeks, you will build identity, discipline, and real skills.
          </p>
          <p className="text-a1-text-secondary mt-3 text-[15px] leading-relaxed">
            You were not chosen because you are perfect. You were chosen because you are ready.
          </p>

          <div className="mt-8">
            <label className="text-[12px] font-semibold uppercase tracking-[1.5px] text-a1-silver mb-2 block">Your First Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full px-4 py-3.5 rounded-[10px] border-2 border-a1-silver-light text-a1-text font-semibold text-[16px] focus:border-a1-blue focus:outline-none transition-colors bg-white placeholder:text-a1-silver"
            />
          </div>
        </div>
      </div>

      <div className="px-6 pb-8">
        <Btn
          disabled={!canContinue}
          onClick={() => {
            update({ name: name.trim() });
            setScreen('finisher-intro');
          }}
        >
          Continue
        </Btn>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  SCREEN: FINISHER INTRO
// ═══════════════════════════════════════════════════════════
function FinisherIntroScreen({ setScreen, data }) {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white">
      <Header title="FINISHER" onBack={() => setScreen(data.onboardingDone ? 'dashboard' : 'welcome')} />

      <div className="flex-1 overflow-y-auto px-6 py-6">
        <div className="animate-slide-up">
          <h2 className="text-[24px] font-extrabold text-a1-text leading-tight">
            Train your mind to become a FINISHER.
          </h2>
          <p className="text-a1-text-secondary mt-3 text-[14px] leading-relaxed">
            FINISHER is not a title. It is a discipline. Each letter represents a skill you will build — and prove — during the Process.
          </p>

          <div className="mt-6 space-y-3">
            {FINISHER_LETTERS.map((fl, i) => {
              const unlocked = data.unlockedLetters.includes(i);
              const allDone = data.unlockedLetters.length === 8;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-4 p-4 rounded-card border transition-all ${
                    allDone ? 'border-a1-gold/30 bg-yellow-50/50' : unlocked ? 'border-a1-blue/20 bg-blue-50/50' : 'border-a1-silver-light bg-white'
                  }`}
                  style={{ animationDelay: `${i * 60}ms` }}
                >
                  <span className={`text-xl font-extrabold w-8 text-center ${allDone ? 'text-a1-gold' : unlocked ? 'text-a1-blue' : 'text-a1-silver opacity-40'}`}>
                    {fl.letter}
                  </span>
                  <div>
                    <p className={`font-bold text-[14px] ${unlocked || allDone ? 'text-a1-text' : 'text-a1-silver'}`}>{fl.word}</p>
                  </div>
                  {unlocked && <span className="ml-auto text-a1-success"><CheckIcon /></span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {!data.onboardingDone && (
        <div className="px-6 pb-8">
          <Btn onClick={() => setScreen('assessment')}>
            Start Assessment
          </Btn>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  SCREEN: ASSESSMENT
// ═══════════════════════════════════════════════════════════
function AssessmentScreen({ setScreen, data, update, showToast }) {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(data.assessmentAnswers || {});
  const q = ASSESSMENT_QUESTIONS[current];
  const progress = ((current + 1) / ASSESSMENT_QUESTIONS.length) * 100;

  const selectAnswer = (option) => {
    const newAnswers = { ...answers, [q.id]: option };
    setAnswers(newAnswers);

    setTimeout(() => {
      if (current < ASSESSMENT_QUESTIONS.length - 1) {
        setCurrent(current + 1);
      } else {
        const newBadges = data.badges.includes('first_step') ? data.badges : [...data.badges, 'first_step'];
        update({
          assessmentDone: true,
          assessmentAnswers: newAnswers,
          onboardingDone: true,
          badges: newBadges,
        });
        showToast('First Step badge earned!');
        setScreen('dashboard');
      }
    }, 300);
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-white">
      <Header title="Assessment" onBack={() => setScreen('finisher-intro')} />

      {/* Progress bar */}
      <div className="h-1 bg-a1-surface">
        <div className="h-full bg-a1-blue transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 py-8">
        <div key={current} className="animate-fade-in">
          <p className="text-[11px] font-semibold uppercase tracking-[2px] text-a1-silver mb-4">
            Question {current + 1} of {ASSESSMENT_QUESTIONS.length}
          </p>
          <h2 className="text-[20px] font-bold text-a1-text leading-snug mb-8">
            {q.text}
          </h2>
          <div className="space-y-3">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() => selectAnswer(opt)}
                className={`w-full text-left px-5 py-4 rounded-card border-2 font-semibold text-[15px] transition-all ${
                  answers[q.id] === opt
                    ? 'border-a1-blue bg-a1-blue/5 text-a1-blue'
                    : 'border-a1-silver-light text-a1-text hover:border-a1-blue/30'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════
//  SCREEN: DASHBOARD
// ═══════════════════════════════════════════════════════════
function DashboardScreen({ setScreen, data, syncStatus, dismissedAi, setDismissedAi }) {
  const completedCount = data.completedActivities.length;
  const totalActivities = WEEKS.reduce((sum, w) => sum + w.activities.length, 0);
  const progressPct = totalActivities ? Math.round((completedCount / totalActivities) * 100) : 0;

  return (
    <ScreenShell title="Dashboard" syncStatus={syncStatus} setScreen={setScreen} data={data}>
      {/* Greeting */}
      <div className="px-4 pt-5 pb-2">
        <p className="text-[12px] font-semibold uppercase tracking-[2px] text-a1-silver">Welcome back</p>
        <h1 className="text-[24px] font-extrabold text-a1-text mt-1">{data.name || 'Yepper'}</h1>
      </div>

      <AiSuggestion
        tip={completedCount === 0
          ? 'Start with Week 1. Every FINISHER begins with Focus.'
          : progressPct === 100
            ? 'You finished everything. That is rare. That is discipline.'
            : 'Consistency beats intensity. Keep showing up.'
        }
        id="dashboard"
        dismissedAi={dismissedAi}
        setDismissedAi={setDismissedAi}
      />

      {/* Progress overview */}
      <div className="px-4 mt-4">
        <Card>
          <div className="flex items-center justify-between mb-3">
            <span className="text-[12px] font-semibold uppercase tracking-[1.5px] text-a1-silver">Overall Progress</span>
            <span className="text-[20px] font-extrabold text-a1-blue">{progressPct}%</span>
          </div>
          <div className="h-2 bg-a1-surface rounded-full overflow-hidden">
            <div className="h-full bg-a1-blue rounded-full transition-all duration-700 ease-out" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-[11px] text-a1-silver">{completedCount} of {totalActivities} activities</span>
            <span className="text-[11px] text-a1-silver">{data.unlockedLetters.length}/8 letters</span>
          </div>
        </Card>
      </div>

      {/* Week cards */}
      <div className="px-4 mt-5 space-y-3">
        <p className="text-[12px] font-semibold uppercase tracking-[1.5px] text-a1-silver mb-1">Your Weeks</p>
        {WEEKS.map((week) => {
          const done = week.activities.filter((a) => data.completedActivities.includes(a.id)).length;
          const total = week.activities.length;
          const complete = done === total;
          return (
            <Card key={week.num} onClick={() => setScreen(`week${week.num}`)}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[2px] text-a1-silver">Week {week.num}</p>
                  <p className="font-bold text-[16px] text-a1-text mt-0.5">{week.title}</p>
                  <p className="text-[13px] text-a1-text-secondary mt-1">{done}/{total} activities</p>
                </div>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${complete ? 'bg-a1-success/10 text-a1-success' : 'bg-a1-surface text-a1-silver'}`}>
                  {complete ? <CheckIcon size={20} /> : <span className="text-[13px] font-bold">{done}/{total}</span>}
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Quick links */}
      <div className="px-4 mt-5 mb-4 flex gap-3">
        <button onClick={() => setScreen('rewards')} className="flex-1 bg-a1-surface rounded-card py-3 text-center text-[12px] font-semibold uppercase tracking-[1.5px] text-a1-text-secondary active:bg-a1-silver-light transition-colors">
          Rewards
        </button>
        <button onClick={() => setScreen('parent')} className="flex-1 bg-a1-surface rounded-card py-3 text-center text-[12px] font-semibold uppercase tracking-[1.5px] text-a1-text-secondary active:bg-a1-silver-light transition-colors">
          For Parents
        </button>
      </div>
    </ScreenShell>
  );
}

// ═══════════════════════════════════════════════════════════
//  SCREEN: WEEK (Reusable for Weeks 1–4)
// ═══════════════════════════════════════════════════════════
function WeekScreen({ week, setScreen, data, completeActivity, syncStatus, dismissedAi, setDismissedAi }) {
  return (
    <ScreenShell
      title={`Week ${week.num}`}
      syncStatus={syncStatus}
      setScreen={setScreen}
      onBack={() => setScreen('dashboard')}
      data={data}
    >
      <div className="px-4 pt-5">
        <p className="text-[11px] font-semibold uppercase tracking-[2px] text-a1-silver">Week {week.num}</p>
        <h2 className="text-[22px] font-extrabold text-a1-text mt-1 leading-tight">{week.title}</h2>
        <p className="text-[14px] text-a1-text-secondary mt-2 leading-relaxed">{week.description}</p>
      </div>

      <AiSuggestion tip={week.aiTip} id={`week${week.num}`} dismissedAi={dismissedAi} setDismissedAi={setDismissedAi} />

      {/* FINISHER letters for this week */}
      <div className="px-4 mt-4">
        <div className="flex gap-2">
          {week.letters.map((li) => {
            const unlocked = data.unlockedLetters.includes(li);
            return (
              <div key={li} className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${unlocked ? 'border-a1-blue/20 bg-blue-50' : 'border-a1-silver-light bg-white'}`}>
                <span className={`font-extrabold text-sm ${unlocked ? 'text-a1-blue' : 'text-a1-silver opacity-40'}`}>{FINISHER_LETTERS[li].letter}</span>
                <span className={`text-[12px] font-semibold ${unlocked ? 'text-a1-text' : 'text-a1-silver'}`}>{FINISHER_LETTERS[li].word}</span>
                {unlocked && <span className="text-a1-success ml-auto"><CheckIcon size={14} /></span>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Activities */}
      <div className="px-4 mt-5 space-y-3 pb-2">
        <p className="text-[12px] font-semibold uppercase tracking-[1.5px] text-a1-silver mb-1">Activities</p>
        {week.activities.map((act) => {
          const done = data.completedActivities.includes(act.id);
          return (
            <Card key={act.id}>
              <div className="flex items-start gap-3">
                <button
                  onClick={() => !done && completeActivity(act.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    done ? 'bg-a1-success border-a1-success text-white' : 'border-a1-silver-light text-transparent hover:border-a1-blue'
                  }`}
                  aria-label={done ? 'Completed' : 'Mark complete'}
                >
                  {done && <CheckIcon size={12} />}
                </button>
                <div className="flex-1">
                  <p className={`font-bold text-[15px] ${done ? 'text-a1-text-secondary line-through' : 'text-a1-text'}`}>{act.title}</p>
                  <p className="text-[13px] text-a1-text-secondary mt-1 leading-relaxed">{act.desc}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </ScreenShell>
  );
}

// ═══════════════════════════════════════════════════════════
//  SCREEN: REWARDS
// ═══════════════════════════════════════════════════════════
function RewardsScreen({ setScreen, data, syncStatus }) {
  return (
    <ScreenShell title="Rewards" syncStatus={syncStatus} setScreen={setScreen} data={data}>
      <div className="px-4 pt-5">
        <h2 className="text-[22px] font-extrabold text-a1-text">Your Badges</h2>
        <p className="text-[14px] text-a1-text-secondary mt-1">Earned through action. Not given.</p>
      </div>

      <div className="px-4 mt-5 space-y-3">
        {BADGE_DEFS.map((badge) => {
          const earned = data.badges.includes(badge.id);
          return (
            <Card key={badge.id} className={earned ? '' : 'opacity-50'}>
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                  earned
                    ? badge.id === 'full_finisher' ? 'bg-a1-gold/10' : 'bg-a1-blue/10'
                    : 'bg-a1-surface'
                }`}>
                  {earned ? badge.icon : '🔒'}
                </div>
                <div className="flex-1">
                  <p className={`font-bold text-[15px] ${earned ? 'text-a1-text' : 'text-a1-silver'}`}>{badge.name}</p>
                  <p className="text-[13px] text-a1-text-secondary">{badge.desc}</p>
                </div>
                {earned && <span className="text-a1-success"><CheckIcon size={18} /></span>}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="px-4 mt-6 mb-4">
        <div className="bg-a1-surface rounded-card p-4 text-center">
          <p className="text-[13px] text-a1-text-secondary">
            <span className="font-bold text-a1-text">{data.badges.length}</span> of {BADGE_DEFS.length} badges earned
          </p>
        </div>
      </div>
    </ScreenShell>
  );
}

// ═══════════════════════════════════════════════════════════
//  SCREEN: PROGRESS STATUS
// ═══════════════════════════════════════════════════════════
function ProgressScreen({ setScreen, data, syncStatus }) {
  const totalActivities = WEEKS.reduce((sum, w) => sum + w.activities.length, 0);
  const completedCount = data.completedActivities.length;

  return (
    <ScreenShell title="Progress" syncStatus={syncStatus} setScreen={setScreen} data={data}>
      <div className="px-4 pt-5">
        <h2 className="text-[22px] font-extrabold text-a1-text">Your Progress</h2>
        <p className="text-[14px] text-a1-text-secondary mt-1">Everything you have done. Nothing invented.</p>
      </div>

      {/* Big progress ring (simplified as bar) */}
      <div className="px-4 mt-5">
        <Card>
          <div className="text-center py-4">
            <p className="text-[48px] font-extrabold text-a1-blue leading-none">
              {totalActivities ? Math.round((completedCount / totalActivities) * 100) : 0}%
            </p>
            <p className="text-[12px] font-semibold uppercase tracking-[2px] text-a1-silver mt-2">Overall Complete</p>
          </div>
        </Card>
      </div>

      {/* Per-week breakdown */}
      <div className="px-4 mt-5 space-y-3">
        {WEEKS.map((week) => {
          const done = week.activities.filter((a) => data.completedActivities.includes(a.id)).length;
          const total = week.activities.length;
          const pct = total ? Math.round((done / total) * 100) : 0;
          return (
            <Card key={week.num} onClick={() => setScreen(`week${week.num}`)}>
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[2px] text-a1-silver">Week {week.num}</p>
                  <p className="font-bold text-[15px] text-a1-text">{week.title}</p>
                </div>
                <span className="text-[18px] font-extrabold text-a1-blue">{pct}%</span>
              </div>
              <div className="h-1.5 bg-a1-surface rounded-full overflow-hidden">
                <div className="h-full bg-a1-blue rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
              </div>
            </Card>
          );
        })}
      </div>

      {/* FINISHER status */}
      <div className="px-4 mt-5 mb-4">
        <Card>
          <p className="text-[12px] font-semibold uppercase tracking-[2px] text-a1-silver mb-3">FINISHER Letters</p>
          <div className="flex justify-between">
            {FINISHER_LETTERS.map((fl, i) => {
              const unlocked = data.unlockedLetters.includes(i);
              const allDone = data.unlockedLetters.length === 8;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-extrabold text-sm ${
                    allDone ? 'bg-a1-gold/10 text-a1-gold' : unlocked ? 'bg-a1-blue/10 text-a1-blue' : 'bg-a1-surface text-a1-silver opacity-40'
                  }`}>
                    {fl.letter}
                  </div>
                  <span className={`text-[9px] font-semibold ${unlocked || allDone ? 'text-a1-text-secondary' : 'text-a1-silver opacity-40'}`}>
                    {fl.word.slice(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Streak */}
      <div className="px-4 mb-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[12px] font-semibold uppercase tracking-[2px] text-a1-silver">Current Streak</p>
              <p className="text-[28px] font-extrabold text-a1-text mt-1">{data.streak} day{data.streak !== 1 ? 's' : ''}</p>
            </div>
            <span className="text-3xl">{data.streak >= 3 ? '🔥' : '📅'}</span>
          </div>
        </Card>
      </div>
    </ScreenShell>
  );
}

// ═══════════════════════════════════════════════════════════
//  SCREEN: PARENT INTEREST
// ═══════════════════════════════════════════════════════════
function ParentInterestScreen({ setScreen, data, update, showToast }) {
  const [parentName, setParentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [parentPhone, setParentPhone] = useState('');

  if (data.parentFormSubmitted) {
    return (
      <ScreenShell title="Parent" syncStatus="saved" setScreen={setScreen} data={data}>
        <div className="px-4 pt-12 text-center">
          <div className="w-16 h-16 bg-a1-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-a1-success"><CheckIcon size={32} /></span>
          </div>
          <h2 className="text-[22px] font-extrabold text-a1-text">Thank you.</h2>
          <p className="text-[14px] text-a1-text-secondary mt-2 leading-relaxed px-4">
            Your interest has been recorded. A/1 Suppliers will reach out with more information about the Young Entrepreneurs Process.
          </p>
        </div>
      </ScreenShell>
    );
  }

  const canSubmit = parentName.trim().length >= 2 && (parentEmail.trim().length > 0 || parentPhone.trim().length > 0);

  return (
    <ScreenShell title="Parent" syncStatus="saved" setScreen={setScreen} data={data}>
      <div className="px-4 pt-5">
        <h2 className="text-[22px] font-extrabold text-a1-text">For Parents & Guardians</h2>
        <p className="text-[14px] text-a1-text-secondary mt-2 leading-relaxed">
          Your child is building identity, discipline, and real skills through the A/1 Young Entrepreneurs Process. If you want to learn more or stay connected, fill out this form.
        </p>
      </div>

      <div className="px-4 mt-6 space-y-4">
        <div>
          <label className="text-[12px] font-semibold uppercase tracking-[1.5px] text-a1-silver mb-2 block">Your Name</label>
          <input
            type="text"
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            placeholder="Full name"
            className="w-full px-4 py-3.5 rounded-[10px] border-2 border-a1-silver-light text-a1-text font-semibold text-[16px] focus:border-a1-blue focus:outline-none transition-colors bg-white placeholder:text-a1-silver"
          />
        </div>
        <div>
          <label className="text-[12px] font-semibold uppercase tracking-[1.5px] text-a1-silver mb-2 block">Email</label>
          <input
            type="email"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full px-4 py-3.5 rounded-[10px] border-2 border-a1-silver-light text-a1-text font-semibold text-[16px] focus:border-a1-blue focus:outline-none transition-colors bg-white placeholder:text-a1-silver"
          />
        </div>
        <div>
          <label className="text-[12px] font-semibold uppercase tracking-[1.5px] text-a1-silver mb-2 block">Phone (optional)</label>
          <input
            type="tel"
            value={parentPhone}
            onChange={(e) => setParentPhone(e.target.value)}
            placeholder="(513) 555-0000"
            className="w-full px-4 py-3.5 rounded-[10px] border-2 border-a1-silver-light text-a1-text font-semibold text-[16px] focus:border-a1-blue focus:outline-none transition-colors bg-white placeholder:text-a1-silver"
          />
        </div>
      </div>

      <div className="px-4 mt-8 mb-4">
        <Btn disabled={!canSubmit} onClick={() => {
          update({ parentFormSubmitted: true });
          showToast('Interest form submitted.');
        }}>
          Submit Interest
        </Btn>
      </div>

      <div className="px-4 mb-8">
        <p className="text-[12px] text-a1-text-secondary text-center leading-relaxed">
          A/1 Suppliers is a 501(c)(3) nonprofit based in Avondale, Cincinnati.<br />
          info@a1suppliers.org
        </p>
      </div>
    </ScreenShell>
  );
}
