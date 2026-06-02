import { createContext, useContext, useMemo, useState } from 'react';
import { DIMENSIONS, mirrorQuestions } from '../data/mirrorQuestions';
import { dimensionToStyle } from '../data/mirrorProfiles';
import { getMission } from '../data/missions';
import { demoYouth as baseDemoYouth } from '../data/demoYouth';

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
  'mirror',
  'results',
  'mission',
  'reflection',
  'progress',
  'dashboard',
];

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
  const [screen, setScreen] = useState('track');
  const [track, setTrack] = useState(null);
  const [youthName, setYouthName] = useState('');

  const [mirrorScores, setMirrorScores] = useState(null);
  const [mirrorResult, setMirrorResult] = useState(null);
  const [currentMission, setCurrentMission] = useState(null);

  const [missionComplete, setMissionComplete] = useState(false);
  const [reflection, setReflection] = useState('');
  const [reflectionSubmitted, setReflectionSubmitted] = useState(false);
  const [finisherLetter, setFinisherLetter] = useState('');

  const [xp, setXp] = useState(0);

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

  function resetSession() {
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
    demoYouth,
    activeYouth,
    // actions
    selectTrack,
    submitMirror,
    completeMission,
    submitReflection,
    navigate,
    setScreen,
    resetSession,
  };

  return <YEPContext.Provider value={value}>{children}</YEPContext.Provider>;
}

export function useYEP() {
  const ctx = useContext(YEPContext);
  if (!ctx) throw new Error('useYEP must be used within YEPProvider');
  return ctx;
}
