import { YEPProvider, useYEP } from './context/YEPContext';
import TrackSelector from './screens/TrackSelector';
import Home from './screens/Home';
import FinisherFocus from './screens/FinisherFocus';
import MirrorIntro from './screens/MirrorIntro';
import MirrorAssessment from './screens/MirrorAssessment';
import MirrorResults from './screens/MirrorResults';
import FinisherMission from './screens/FinisherMission';
import Reflection from './screens/Reflection';
import Progress from './screens/Progress';
import FacilitatorDashboard from './screens/FacilitatorDashboard';
import {
  DailyQuest,
  StemSinQuest,
  BossChallenge,
  MentorSpotlight,
  Rewards,
} from './screens/PilotScreens';
import {
  DemoWeeklyModule,
  DemoProfile,
  DemoAdminReview,
  ResetDemo,
} from './screens/DemoB05Screens';

const SCREENS = {
  track: TrackSelector,
  home: Home,
  finisherFocus: FinisherFocus,
  dailyQuest: DailyQuest,
  weeklyModule: DemoWeeklyModule,
  stemSin: StemSinQuest,
  bossChallenge: BossChallenge,
  mentorSpotlight: MentorSpotlight,
  rewards: Rewards,
  profile: DemoProfile,
  adminReview: DemoAdminReview,
  resetDemo: ResetDemo,
  mirrorIntro: MirrorIntro,
  mirror: MirrorAssessment,
  results: MirrorResults,
  mission: FinisherMission,
  reflection: Reflection,
  progress: Progress,
  dashboard: FacilitatorDashboard,
};

function Router() {
  const { screen, mode } = useYEP();
  const Screen = SCREENS[screen] || TrackSelector;
  return <Screen key={`${screen}:${mode}`} />;
}

export default function App() {
  return (
    <YEPProvider>
      <Router />
    </YEPProvider>
  );
}
