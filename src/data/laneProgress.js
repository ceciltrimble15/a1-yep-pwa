import { DEFAULT_MODE, isValidMode } from './modes.js';

export const EMPTY_PILOT_PROGRESS = {
  dailyQuestText: '', dailyQuestComplete: false, weeklyCompleted: [],
  stemSinText: '', stemSinComplete: false, bossText: '', bossComplete: false,
  mentorQuestion: '',
};

// Retain legacy proof only in its saved lane, never in a URL-selected new lane.
export function migrateLaneProgress(saved) {
  if (saved.laneProgress) return saved.laneProgress;
  const owner = isValidMode(saved.mode) ? saved.mode : DEFAULT_MODE;
  return saved.pilotProgress
    ? { [owner]: { ...EMPTY_PILOT_PROGRESS, ...saved.pilotProgress } }
    : {};
}
