import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DIMENSIONS, mirrorQuestions } from '../data/mirrorQuestions';
import { dimensionToStyle } from '../data/mirrorProfiles';
import { getMission } from '../data/missions';
import { demoYouth as baseDemoYouth } from '../data/demoYouth';
import { DEFAULT_MODE, isValidMode } from '../data/modes';
import { EMPTY_PILOT_PROGRESS, migrateLaneProgress } from '../data/laneProgress';

const YEPContext = createContext(null);

export const XP = {
  MIRROR: 50,
  MISSION: 75,
  REFLECTION: 25,
};

const SCREENS = [
  'track', 'home', 'myDirection', 'finisherFocus', 'dailyQuest', 'weeklyModule', 'stemSin', 'bossChallenge',
  'mentorSpotlight', 'rewards', 'profile', 'adminReview', 'resetDemo', 'mirrorIntro', 'mirror',
  'results', 'mission', 'reflection', 'progress', 'dashboard',
];

const STORAGE_KEY = 'yep_session_v1';

function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* fall back to defaults */
  }
  return {};
}

function resolveInitialMode(savedMode) {
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('mode');
    if (fromUrl && isValidMode(fromUrl)) return fromUrl;
  } catch {
    /* ignore */
  }
  return isValidMode(savedMode) ? savedMode : DEFAULT_MODE;
}

function scoreMirror(answers) {
  const scores = {};
  DIMENSIONS.forEach((d) => (scores[d] = 0));
  mirrorQuestions.forEach((q) => {
    scores[q.dimension] += answers[q.id] || 0;
  });

  let anchor = DIMENSIONS[0];
  let edge = DIMENSIONS[0];
  DIMENSIONS.forEach((d) => {
    if (scores[d] > scores[anchor]) anchor = d;
    if (scores[d] < scores[edge]) edge = d;
  });

  if (edge === anchor) {
    const alt = DIMENSIONS.find((d) => d !== anchor);
    if (alt) edge = alt;
  }

  const style = dimensionToStyle[anchor] || 'Hands-On';
  return { scores, anchor, edge, style };
}

export function YEPProvider({ children }) {
  const [saved] = useState(loadSession);
  const [screen, setScreen] = useState(saved.screen ?? 'track');
  const [track, setTrack] = useState(saved.track ?? null);
  const [youthName, setYouthName] = useState(saved.youthName ?? '');
  const [powerName, setPowerName] = useState(saved.powerName ?? '');
  const [directionProfile, setDirectionProfile] = useState(saved.directionProfile ?? { interest: '', why: '' });
  const [exposureLog, setExposureLog] = useState(Array.isArray(saved.exposureLog) ? saved.exposureLog : []);
  const [mirrorScores, setMirrorScores] = useState(saved.mirrorScores ?? null);
  const [mirrorResult, setMirrorResult] = useState(saved.mirrorResult ?? null);
  const [currentMission, setCurrentMission] = useState(saved.currentMission ?? null);
  const [missionComplete, setMissionComplete] = useState(saved.missionComplete ?? false);
  const [reflection, setReflection] = useState(saved.reflection ?? '');
  const [reflectionSubmitted, setReflectionSubmitted] = useState(saved.reflectionSubmitted ?? false);
  const [finisherLetter, setFinisherLetter] = useState(saved.finisherLetter ?? '');
  const [xp, setXp] = useState(saved.xp ?? 0);
  const [mode, setModeState] = useState(() => resolveInitialMode(saved.mode));
  const [laneProgress, setLaneProgress] = useState(() => migrateLaneProgress(saved));
  const pilotProgress = laneProgress[mode] || EMPTY_PILOT_PROGRESS;

  function setPilotProgress(update) {
    setLaneProgress((all) => ({ ...all, [mode]: update(all[mode] || EMPTY_PILOT_PROGRESS) }));
  }

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        screen, track, youthName, powerName, directionProfile, exposureLog, mirrorScores, mirrorResult, currentMission,
        missionComplete, reflection, reflectionSubmitted, finisherLetter, xp, mode, pilotProgress, laneProgress,
      }));
    } catch {
      /* storage blocked/full */
    }
  }, [screen, track, youthName, powerName, directionProfile, exposureLog, mirrorScores, mirrorResult, currentMission,
    missionComplete, reflection, reflectionSubmitted, finisherLetter, xp, mode, pilotProgress, laneProgress]);

  function selectTrack(trackObj, name, selectedPowerName) {
    setTrack(trackObj);
    if (name) setYouthName(name);
    if (selectedPowerName) setPowerName(selectedPowerName);
    setScreen('home');
  }

  function saveDirectionProfile(update) {
    setDirectionProfile((current) => ({ ...current, ...update }));
  }

  function saveExposureReaction(world, reaction) {
    if (!world?.id || !reaction) return;
    setExposureLog((current) => {
      const next = current.filter((entry) => entry.worldId !== world.id);
      return [...next, { worldId: world.id, label: world.label, reaction }];
    });
  }

  function submitMirror(answers) {
    const { scores, anchor, edge, style } = scoreMirror(answers);
    const mission = getMission(edge, style);
    setMirrorScores(scores);
    setMirrorResult({ Anchor: anchor, Edge: edge, Style: style, Focus: mission ? mission.focus : '', MissionID: mission ? mission.id : null });
    setCurrentMission(mission);
    if (mirrorScores === null) setXp((x) => x + XP.MIRROR);
    setScreen('results');
  }

  function completeMission() {
    if (!missionComplete) {
      setMissionComplete(true);
      setXp((x) => x + XP.MISSION);
      if (currentMission) setFinisherLetter(currentMission.finisherLetter);
    }
    setScreen('reflection');
  }

  function submitReflection(text) {
    setReflection(text);
    if (!reflectionSubmitted) {
      setReflectionSubmitted(true);
      setXp((x) => x + XP.REFLECTION);
    }
    setScreen('progress');
  }

  function completeDailyQuest(text) {
    const cleaned = text.trim();
    if (!cleaned) return false;
    setPilotProgress((p) => ({ ...p, dailyQuestText: cleaned, dailyQuestComplete: true }));
    return true;
  }

  function toggleWeeklyActivity(id) {
    setPilotProgress((p) => {
      if (p.weeklyCompleted.includes(id)) return p;
      return { ...p, weeklyCompleted: [...p.weeklyCompleted, id] };
    });
  }

  function completeStemSin(text) {
    const cleaned = text.trim();
    if (!cleaned) return false;
    setPilotProgress((p) => ({ ...p, stemSinText: cleaned, stemSinComplete: true }));
    return true;
  }

  function completeBossChallenge(text) {
    const cleaned = text.trim();
    if (!cleaned) return false;
    setPilotProgress((p) => ({ ...p, bossText: cleaned, bossComplete: true }));
    return true;
  }

  function saveMentorQuestion(text) {
    setPilotProgress((p) => ({ ...p, mentorQuestion: text.trim() }));
  }

  function navigate(next) {
    if (SCREENS.includes(next)) setScreen(next);
  }

  function setMode(next) {
    if (isValidMode(next)) setModeState(next);
  }

  function resetSession() {
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    setScreen('track');
    setTrack(null);
    setYouthName('');
    setPowerName('');
    setDirectionProfile({ interest: '', why: '' });
    setExposureLog([]);
    setMirrorScores(null);
    setMirrorResult(null);
    setCurrentMission(null);
    setMissionComplete(false);
    setReflection('');
    setReflectionSubmitted(false);
    setFinisherLetter('');
    setXp(0);
    setModeState(DEFAULT_MODE);
    setLaneProgress({});
  }

  const pilotBadges = useMemo(() => {
    const badges = [];
    if (pilotProgress.dailyQuestComplete) badges.push('daily-quest');
    if (pilotProgress.weeklyCompleted.length >= 3) badges.push('weekly-module');
    if (pilotProgress.bossComplete) badges.push('boss-challenge');
    return badges;
  }, [pilotProgress]);

  const activeYouth = useMemo(() => ({
    id: 'active',
    name: powerName || youthName || 'You',
    legalName: youthName || '',
    powerName: powerName || '—',
    track: track ? track.name : '—',
    directionInterest: directionProfile.interest || '—',
    directionWhy: directionProfile.why || '',
    exposureCount: exposureLog.length,
    anchor: mirrorResult ? mirrorResult.Anchor : '—',
    edge: mirrorResult ? mirrorResult.Edge : '—',
    style: mirrorResult ? mirrorResult.Style : '—',
    xp,
    finisherLetter: finisherLetter || '—',
    missionTitle: currentMission ? currentMission.title : '—',
    missionComplete,
    reflectionSubmitted,
    reflection,
    pilotBadges,
    isActive: true,
  }), [powerName, youthName, track, directionProfile, exposureLog, mirrorResult, xp, finisherLetter, currentMission, missionComplete, reflectionSubmitted, reflection, pilotBadges]);

  const demoYouth = useMemo(() => [...baseDemoYouth, activeYouth], [activeYouth]);

  const value = {
    screen, track, youthName, powerName, directionProfile, exposureLog, mirrorScores, mirrorResult, currentMission,
    missionComplete, reflection, reflectionSubmitted, finisherLetter, xp, mode,
    pilotProgress, pilotBadges, demoYouth, activeYouth, selectTrack, saveDirectionProfile, saveExposureReaction, submitMirror,
    completeMission, submitReflection, completeDailyQuest, toggleWeeklyActivity,
    completeStemSin, completeBossChallenge, saveMentorQuestion, navigate, setScreen,
    setMode, resetSession,
  };

  return <YEPContext.Provider value={value}>{children}</YEPContext.Provider>;
}

export function useYEP() {
  const ctx = useContext(YEPContext);
  if (!ctx) throw new Error('useYEP must be used within YEPProvider');
  return ctx;
}
