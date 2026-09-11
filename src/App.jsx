import { YEPProvider, useYEP } from './context/YEPContext';
import TrackSelector from './screens/TrackSelector';
import Home from './screens/Home';
import MirrorIntro from './screens/MirrorIntro';
import MirrorAssessment from './screens/MirrorAssessment';
import MirrorResults from './screens/MirrorResults';
import FinisherMission from './screens/FinisherMission';
import Reflection from './screens/Reflection';
import Progress from './screens/Progress';
import FacilitatorDashboard from './screens/FacilitatorDashboard';

/* `screen` from context drives all navigation — the behavior loop:
   track -> home -> mirrorIntro -> mirror -> results -> mission -> reflection -> progress -> dashboard */
const SCREENS = {
  track: TrackSelector,
  home: Home,
  mirrorIntro: MirrorIntro,
  mirror: MirrorAssessment,
  results: MirrorResults,
  mission: FinisherMission,
  reflection: Reflection,
  progress: Progress,
  dashboard: FacilitatorDashboard,
};

function Router() {
  const { screen } = useYEP();
  const Screen = SCREENS[screen] || TrackSelector;
  return <Screen />;
}

export default function App() {
  return (
    <YEPProvider>
      <Router />
    </YEPProvider>
  );
}
