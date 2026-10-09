import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DIMENSIONS, mirrorQuestions } from '../data/mirrorQuestions';
import { dimensionToStyle } from '../data/mirrorProfiles';
import { getMission } from '../data/missions';
import { demoYouth as baseDemoYouth } from '../data/demoYouth';
import { DEFAULT_MODE, isValidMode } from '../data/modes';
import { EMPTY_PILOT_PROGRESS, migrateLaneProgress } from '../data/laneProgress';

const YEPContext = createContext(null);


const SCREENS = [
  'track', 'home', 'a1Guide', 'uncHub', 'privacySafeguards', 'myDirection', 'exposurePassport', 'finisherFocus', 'dailyQuest', 'weeklyModule', 'stemSin', 'bossChallenge',
  'mentorSpotlight', 'profile', 'adminReview', 'resetDemo', 'mirrorIntro', 'mirror',
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
  const [missionStepsDone, setMissionStepsDone] = useState(saved.missionStepsDone ?? {});
  const [missionComplete, setMissionComplete] = useState(saved.missionComplete ?? false);
  const [reflection, setReflection] = useState(saved.reflection ?? '');
  const [reflectionSubmitted, setReflectionSubmitted] = useState(saved.reflectionSubmitted ?? false);
  const [finisherLetter, setFinisherLetter] = useState(saved.finisherLetter ?? '');
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
        missionStepsDone, missionComplete, reflection, reflectionSubmitted, finisherLetter, mode, pilotProgress, laneProgress,
      }));
    } catch {
      /* storage blocked/full */
    }
  }, [screen, track, youthName, powerName, directionProfile, exposureLog, mirrorScores, mirrorResult, currentMission,
    missionStepsDone, missionComplete, reflection, reflectionSubmitted, finisherLetter, mode, pilotProgress, laneProgress]);

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

  function saveLessonDraft(kind, draft) {
    if (!['dailyQuest', 'stemSin'].includes(kind)) return;
    setPilotProgress((progress) => ({ ...progress, [`${kind}Draft`]: draft }));
  }

  function saveMirrorDraft(draft) {
    setPilotProgress((progress) => ({ ...progress, mirrorDraft: draft }));
  }

  function submitMirror(answers) {
    if (!mirrorQuestions.every((question) => [1, 2, 3, 4].includes(answers[question.id]))) return;
    saveMirrorDraft(null);
    const { scores, anchor, edge, style } = scoreMirror(answers);
    const mission = getMission(edge, style);
    setMirrorScores(scores);
    setMirrorResult({ Anchor: anchor, Edge: edge, Style: style, Focus: mission ? mission.focus : '', MissionID: mission ? mission.id : null });
    setCurrentMission(mission);
    setMissionStepsDone({});
    setMissionComplete(false);
    setReflection('');
    setReflectionSubmitted(false);
    setFinisherLetter('');
    setScreen('results');
  }

  function toggleMissionStep(index) {
    if (!currentMission || !Number.isInteger(index) || index < 0 || index >= currentMission.steps.length) return;
    if (missionStepsDone[index] && missionComplete) {
      setMissionComplete(false);
      setReflectionSubmitted(false);
      setFinisherLetter('');
    }
    setMissionStepsDone((current) => ({ ...current, [index]: !current[index] }));
  }

  function completeMission() {
    if (!currentMission || !currentMission.steps.every((_, index) => missionStepsDone[index])) return;
    if (!missionComplete) {
      setMissionComplete(true);
      if (currentMission) setFinisherLetter(currentMission.finisherLetter);
    }
    setScreen('reflection');
  }

  function submitReflection(text) {
    if (!missionComplete || !currentMission || text.trim().length < 12) return;
    setReflection(text.trim());
    if (!reflectionSubmitted) {
      setReflectionSubmitted(true);
    }
    setScreen('progress');
  }

  function completeDailyQuest(text, choiceProof = null, questId = null) {
    const cleaned = text.trim();
    const choices = choiceProof?.problem && choiceProof?.who && choiceProof?.action ? choiceProof : null;
    if (!cleaned && !choices) return false;
    setPilotProgress((p) => ({ ...p, dailyQuestText: cleaned, dailyQuestComplete: true, dailyQuestDraft: null, dailyQuestQuestId: questId || p.dailyQuestQuestId || null, dailyQuestChoiceProof: choices, dailyQuestEvidenceType: cleaned ? (choices ? 'words_and_choices' : 'written') : 'choices' }));
    return true;
  }

  function toggleWeeklyActivity(id) {
    setPilotProgress((p) => {
      if (p.weeklyCompleted.includes(id)) return p;
      return { ...p, weeklyCompleted: [...p.weeklyCompleted, id] };
    });
  }

  function completeStemSin(text, choice = '', choiceProof = null) {
    const cleaned = text.trim();
    const choices = choice && choiceProof?.prediction && choiceProof?.nextTest ? { tool: choice, ...choiceProof } : null;
    if (!cleaned && !choices) return false;
    setPilotProgress((p) => ({ ...p, stemSinText: cleaned, stemSinDraft: null, stemSinChoice: choice || p.stemSinChoice || '', stemSinComplete: true, stemSinChoiceProof: choices, stemSinEvidenceType: cleaned ? (choices ? 'words_and_choices' : 'written') : 'choices' }));
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
    setMissionStepsDone({});
    setMissionComplete(false);
    setReflection('');
    setReflectionSubmitted(false);
    setFinisherLetter('');
    setModeState(DEFAULT_MODE);
    setLaneProgress({});
  }


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
    finisherLetter: finisherLetter || '—',
    missionTitle: currentMission ? currentMission.title : '—',
    missionComplete,
    reflectionSubmitted,
    reflection,
    isActive: true,
  }), [powerName, youthName, track, directionProfile, exposureLog, mirrorResult, finisherLetter, currentMission, missionComplete, reflectionSubmitted, reflection]);

  const demoYouth = useMemo(() => [...baseDemoYouth, activeYouth], [activeYouth]);

  const value = {
    screen, track, youthName, powerName, directionProfile, exposureLog, mirrorScores, mirrorResult, currentMission,
    missionStepsDone, missionComplete, reflection, reflectionSubmitted, finisherLetter, mode,
    pilotProgress, demoYouth, activeYouth, selectTrack, saveDirectionProfile, saveExposureReaction, saveLessonDraft, saveMirrorDraft, submitMirror,
    toggleMissionStep, completeMission, submitReflection, completeDailyQuest, toggleWeeklyActivity,
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
