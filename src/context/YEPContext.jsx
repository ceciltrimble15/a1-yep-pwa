import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DIMENSIONS, mirrorQuestions } from '../data/mirrorQuestions';
import { dimensionToStyle } from '../data/mirrorProfiles';
import { getMission } from '../data/missions';
import { demoYouth as baseDemoYouth } from '../data/demoYouth';
import { DEFAULT_MODE, isValidMode } from '../data/modes';
import { getModeCopy } from '../data/modeCopy';

/* ═══════════════════════════════════════════════════════════
   YEP GLOBAL STATE
   `screen` drives all navigation. XP is awarded once per action.
   ═══════════════════════════════════════════════════════════ */

const YEPContext = createContext(null);

// XP rules — award ONLY for these actions.
export const XP = {
  MIRROR: 50,
  MISSION: 75,
  REFLECTION: 25,
};

const SCREENS = [
  'track',
  'home',
  'mirrorIntro',
  'mirror',
  'results',
  'mission',
  'reflection',
  'progress',
  'dashboard',
];

// ── Persistence ────────────────────────────────────────────
// All session state is mirrored to localStorage so a refresh or PWA
// cold-start restores the youth exactly where they left off.
const STORAGE_KEY = 'yep_session_v1';

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore corrupt/blocked storage — fall back to defaults */
  }
  return {};
}

// Resolve the starting mode: ?mode=<id> (safe test/gating hook) > persisted
// > default (builder). No UI is required to set a mode.
function resolveInitialMode(savedMode) {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('mode');
    if (fromUrl && isValidMode(fromUrl)) return fromUrl;
  } catch {
    /* ignore */
  }
  return isValidMode(savedMode) ? savedMode : DEFAULT_MODE;
}

/**
 * Score the Mirror.
 * @returns { scores, anchor, edge, style }
 */
function scoreMirror(answers) {
  const scores = {};
  DIMENSIONS.forEach((d) => (scores[d] = 0));
  mirrorQuestions.forEach((q) => {
    scores[q.dimension] += answers[q.id] || 0;
  });

  // Highest = Anchor, Lowest = Growth Edge. Ties resolve by DIMENSIONS order.
  let anchor = DIMENSIONS[0];
  let edge = DIMENSIONS[0];
  DIMENSIONS.forEach((d) => {
    if (scores[d] > scores[anchor]) anchor = d;
    if (scores[d] < scores[edge]) edge = d;
  });

  // Edge must differ from Anchor — if all-equal, pick a distinct lowest.
  if (edge === anchor) {
    const alt = DIMENSIONS.find((d) => d !== anchor);
    if (alt) edge = alt;
  }

  const style = dimensionToStyle[anchor] || 'Hands-On';
  return { scores, anchor, edge, style };
}

export function YEPProvider({ children }) {
  // Read persisted session once on mount (lazy initializer).
  const [saved] = useState(loadSession);

  const [screen, setScreen] = useState(saved.screen ?? 'track');
  const [track, setTrack] = useState(saved.track ?? null);
  const [youthName, setYouthName] = useState(saved.youthName ?? '');

  const [mirrorScores, setMirrorScores] = useState(saved.mirrorScores ?? null);
  const [mirrorResult, setMirrorResult] = useState(saved.mirrorResult ?? null);
  const [currentMission, setCurrentMission] = useState(saved.currentMission ?? null);

  const [missionComplete, setMissionComplete] = useState(saved.missionComplete ?? false);
  const [reflection, setReflection] = useState(saved.reflection ?? '');
  const [reflectionSubmitted, setReflectionSubmitted] = useState(saved.reflectionSubmitted ?? false);
  const [finisherLetter, setFinisherLetter] = useState(saved.finisherLetter ?? '');

  const [xp, setXp] = useState(saved.xp ?? 0);

  // Age-mode foundation. Default = builder (current live experience).
  const [mode, setModeState] = useState(() => resolveInitialMode(saved.mode));

  // Age-mode copy layer. Pure wording — never affects scoring/XP/flow.
  const copy = useMemo(() => getModeCopy(mode), [mode]);

  // Mirror ALL session state to localStorage on every change. The active
  // youth is fully derived from these fields, so persisting them restores it.
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          screen,
          track,
          youthName,
          mirrorScores,
          mirrorResult,
          currentMission,
          missionComplete,
          reflection,
          reflectionSubmitted,
          finisherLetter,
          xp,
          mode,
        })
      );
    } catch {
      /* storage full or blocked — session simply won't persist */
    }
  }, [
    screen,
    track,
    youthName,
    mirrorScores,
    mirrorResult,
    currentMission,
    missionComplete,
    reflection,
    reflectionSubmitted,
    finisherLetter,
    xp,
    mode,
  ]);

  // ── Actions ──────────────────────────────────────────────

  function selectTrack(trackObj, name) {
    setTrack(trackObj);
    if (name) setYouthName(name);
    setScreen('home');
  }

  // Complete Mirror -> compute result + award +50 (once).
  function submitMirror(answers) {
    const { scores, anchor, edge, style } = scoreMirror(answers);
    const mission = getMission(edge, style);

    setMirrorScores(scores);
    setMirrorResult({
      Anchor: anchor,
      Edge: edge,
      Style: style,
      Focus: mission ? mission.focus : '',
      MissionID: mission ? mission.id : null,
    });
    setCurrentMission(mission);

    if (mirrorScores === null) setXp((x) => x + XP.MIRROR); // guard: award once
    setScreen('results');
  }

  // Complete Mission -> award +75 (once) and grant FINISHER letter.
  function completeMission() {
    if (!missionComplete) {
      setMissionComplete(true);
      setXp((x) => x + XP.MISSION);
      if (currentMission) setFinisherLetter(currentMission.finisherLetter);
    }
    setScreen('reflection');
  }

  // Submit Reflection -> award +25 (once).
  function submitReflection(text) {
    setReflection(text);
    if (!reflectionSubmitted) {
      setReflectionSubmitted(true);
      setXp((x) => x + XP.REFLECTION);
    }
    setScreen('progress');
  }

  function navigate(next) {
    if (SCREENS.includes(next)) setScreen(next);
  }

  // Set the age-mode (validated). No flow/copy/XP changes attached yet —
  // this is the foundation future Explorer audio will gate on.
  function setMode(next) {
    if (isValidMode(next)) setModeState(next);
  }

  function resetSession() {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
    setScreen('track');
    setTrack(null);
    setYouthName('');
    setMirrorScores(null);
    setMirrorResult(null);
    setCurrentMission(null);
    setMissionComplete(false);
    setReflection('');
    setReflectionSubmitted(false);
    setFinisherLetter('');
    setXp(0);
    setModeState(DEFAULT_MODE);
  }

  // ── Derived: the live/active youth record ─────────────────
  const activeYouth = useMemo(
    () => ({
      id: 'active',
      name: youthName || 'You',
      track: track ? track.name : '—',
      anchor: mirrorResult ? mirrorResult.Anchor : '—',
      edge: mirrorResult ? mirrorResult.Edge : '—',
      style: mirrorResult ? mirrorResult.Style : '—',
      xp,
      finisherLetter: finisherLetter || '—',
      missionTitle: currentMission ? currentMission.title : '—',
      missionComplete,
      reflectionSubmitted,
      reflection,
      isActive: true,
    }),
    [youthName, track, mirrorResult, xp, finisherLetter, currentMission, missionComplete, reflectionSubmitted, reflection]
  );

  // demoYouth array = Marcus, Aaliyah, DeShawn + active (live state).
  const demoYouth = useMemo(() => [...baseDemoYouth, activeYouth], [activeYouth]);

  const value = {
    // state
    screen,
    track,
    youthName,
    mirrorScores,
    mirrorResult,
    currentMission,
    missionComplete,
    reflection,
    reflectionSubmitted,
    finisherLetter,
    xp,
    mode,
    copy,
    demoYouth,
    activeYouth,
    // actions
    selectTrack,
    submitMirror,
    completeMission,
    submitReflection,
    navigate,
    setScreen,
    setMode,
    resetSession,
  };

  return <YEPContext.Provider value={value}>{children}</YEPContext.Provider>;
}

export function useYEP() {
  const ctx = useContext(YEPContext);
  if (!ctx) throw new Error('useYEP must be used within YEPProvider');
  return ctx;
}
