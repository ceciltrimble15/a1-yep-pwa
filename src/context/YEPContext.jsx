import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { REFLECTION_PROMPTS, getExposureMissions } from '../data/exposureProcess';
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


export function YEPProvider({ children }) {
  const [saved] = useState(loadSession);
  const [storageError, setStorageError] = useState(false);
  // Earlier POC records used unvalidated style labels and assigned adult missions.
  // Migrate only those Mirror/mission fields; preserve Daily Quest and S.T.E.M.Sin work.
  const savedMode = resolveInitialMode(saved.mode);
  const compatibleMirror = saved.mirrorResult?.kind === 'exposure-reflection-v1' && saved.mirrorResult?.mode === savedMode;
  const validMissionIds = getExposureMissions(savedMode).map((item) => item.id);
  // Learners can choose a current, age-appropriate action before taking a Mirror.
  // Restore that action independently; retired or cross-pathway missions stay excluded.
  const compatibleMission = saved.currentMission?.mode === savedMode && validMissionIds.includes(saved.currentMission?.id);
  const [screen, setScreen] = useState(saved.screen ?? 'track');
  const [track, setTrack] = useState(saved.track ?? null);
  const [youthName, setYouthName] = useState(saved.youthName ?? '');
  const [powerName, setPowerName] = useState(saved.powerName ?? '');
  const [directionProfile, setDirectionProfile] = useState(saved.directionProfile ?? { interest: '', why: '' });
  const [exposureLog, setExposureLog] = useState(Array.isArray(saved.exposureLog) ? saved.exposureLog : []);
  const [mirrorScores, setMirrorScores] = useState(null);
  const [mirrorResult, setMirrorResult] = useState(compatibleMirror ? saved.mirrorResult : null);
  const [currentMission, setCurrentMission] = useState(compatibleMission ? getExposureMissions(savedMode).find((m) => m.id === saved.currentMission.id) : null);
  const [missionStepsDone, setMissionStepsDone] = useState(compatibleMission ? (saved.missionStepsDone ?? {}) : {});
  const [missionComplete, setMissionComplete] = useState(compatibleMission ? !!saved.missionComplete : false);
  const [reflection, setReflection] = useState(compatibleMission ? (saved.reflection ?? '') : '');
  const [reflectionSubmitted, setReflectionSubmitted] = useState(compatibleMission ? !!saved.reflectionSubmitted : false);
  const [finisherLetter, setFinisherLetter] = useState(compatibleMission ? (saved.finisherLetter ?? '') : '');
  const [mode, setModeState] = useState(savedMode);
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
      setStorageError(false);
    } catch {
      setStorageError(true);
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
    if (!REFLECTION_PROMPTS.every((prompt) => Number.isInteger(answers[prompt.id])
      && answers[prompt.id] >= 0 && answers[prompt.id] < prompt.options.length)) return false;
    saveMirrorDraft(null);
    setMirrorScores(null);
    setMirrorResult({ kind: 'exposure-reflection-v1', mode, answers });
    setCurrentMission(null);
    setMissionStepsDone({});
    setMissionComplete(false);
    setReflection('');
    setReflectionSubmitted(false);
    setFinisherLetter('');
    setScreen('results');
    return true;
  }

  function selectMission(id) {
    const next = getExposureMissions(mode).find((mission) => mission.id === id);
    if (!next) return false;
    if (currentMission?.id !== next.id || currentMission.mode !== mode) {
      setMissionStepsDone({});
      setMissionComplete(false);
      setReflection('');
      setReflectionSubmitted(false);
      setFinisherLetter('');
    }
    setCurrentMission(next);
    setScreen('mission');
    return true;
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
    if (!isValidMode(next) || next === mode) return;
    // Never carry a mission from an older pathway into Foundation or another age band.
    setModeState(next);
    setMirrorScores(null);
    setMirrorResult(null);
    setCurrentMission(null);
    setMissionStepsDone({});
    setMissionComplete(false);
    setReflection('');
    setReflectionSubmitted(false);
    setFinisherLetter('');
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
    checkIn: mirrorResult ? 'Self-reported reflection saved' : 'Not yet',
    nextStep: currentMission ? currentMission.title : 'Not chosen',
    evidence: missionComplete ? 'Steps marked by participant (unverified)' : 'No steps completed',
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
    pilotProgress, demoYouth, activeYouth, selectTrack, saveDirectionProfile, saveExposureReaction, saveLessonDraft, saveMirrorDraft, submitMirror, selectMission,
    toggleMissionStep, completeMission, submitReflection, completeDailyQuest, toggleWeeklyActivity,
    completeStemSin, completeBossChallenge, saveMentorQuestion, navigate, setScreen,
    setMode, resetSession,
  };

  return <YEPContext.Provider value={value}>
    {storageError && <p className="yep-storage-warning" role="alert">This browser could not save your latest work. Keep this page open and ask a facilitator for help. Refreshing or closing it may lose your changes, even if a lesson says “saved.”</p>}
    {children}
  </YEPContext.Provider>;
}

export function useYEP() {
  const ctx = useContext(YEPContext);
  if (!ctx) throw new Error('useYEP must be used within YEPProvider');
  return ctx;
}
