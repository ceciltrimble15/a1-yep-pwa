import { ArrowUpRight, Zap, Cpu, Sprout, Truck } from 'lucide-react';
import styles from './FutureWorlds.module.css';

const worlds = [
  { id: 'power', label: 'ELECTRICAL + ENERGY', title: 'Power the future', description: 'Discover how energy supports homes, businesses and whole neighborhoods.', action: 'Explore a problem', screen: 'dailyQuest', Icon: Zap, accent: '#f2b641' },
  { id: 'ai', label: 'AI + TECHNOLOGY', title: 'Build smarter systems', description: 'Try an idea, make a prediction and learn how useful tools solve problems.', action: 'Try a technology quest', screen: 'stemSin', Icon: Cpu, accent: '#7ecbff' },
  { id: 'green', label: 'LAND + AGRICULTURE', title: 'Grow what matters', description: 'Think about land, food, gardens and caring for resources.', action: 'Explore a problem', screen: 'dailyQuest', Icon: Sprout, accent: '#a8e9aa' },
  { id: 'move', label: 'BUSINESS + LOGISTICS', title: 'Move ideas forward', description: 'Imagine a business that solves a real need and delivers on its promises.', action: 'Build a business idea', screen: 'bossChallenge', Icon: Truck, accent: '#ffb887' },
];

function WorldScene({ kind }) {
  return <svg className={styles.scene} viewBox="0 0 480 225" preserveAspectRatio="xMidYMid slice" role="img" aria-label={kind === 'power' ? 'Illustrated neighborhood energy grid and power station' : kind === 'ai' ? 'Illustrated computer interface with connected technology nodes' : kind === 'green' ? 'Illustrated community greenhouse and growing garden' : 'Illustrated delivery warehouse and transport network'}>
    <defs>
      <linearGradient id={`sky-${kind}`} x1="0" x2="1" y1="0" y2="1"><stop stopColor="#102B59"/><stop offset="1" stopColor={kind === 'green' ? '#237E6A' : kind === 'power' ? '#6C5482' : '#235FA7'}/></linearGradient>
      <linearGradient id={`ground-${kind}`} x1="0" x2="0" y1="0" y2="1"><stop stopColor="#437B9A"/><stop offset="1" stopColor="#132E51"/></linearGradient>
    </defs>
    <rect width="480" height="225" fill={`url(#sky-${kind})`}/>
    <circle cx="404" cy="35" r="58" fill="#F9CE79" opacity=".19"/>
    <path d="M0 185Q120 160 260 180T480 170V225H0Z" fill={`url(#ground-${kind})`}/>
    {kind === 'power' && <>
      {[35,125,345,430].map((x,i)=><g key={x} stroke="#B9E7FF" strokeWidth="4" fill="none"><path d={`M${x} 164l22 -115 22 115M${x+9} 120h27M${x+5} 143h35M${x+17} 79h13`}/><circle cx={x+22} cy="48" r="5" fill="#F6DC7C" /></g>)}
      <path d="M57 77Q106 97 147 77T368 77Q410 92 453 77" fill="none" stroke="#E2E9FA" strokeWidth="2.4"/>
      <path d="M205 154V94h79v60M220 94V75h49v19" fill="#B2D5ED" stroke="#86BDDE" strokeWidth="5"/>
      <path d="M256 96l-19 28h15l-9 19 28 -33h-17l9 -14" fill="#FCE474"/>
      <g fill="#F1D073">{[212,249,275].map((x)=><rect key={x} x={x} y="147" width="9" height="13" rx="2"/>)}</g>
    </>}
    {kind === 'ai' && <>
      <rect x="77" y="28" width="327" height="165" rx="19" fill="#D5F2FC" stroke="#90CBE7" strokeWidth="5"/>
      <rect x="96" y="47" width="289" height="123" rx="10" fill="#0A2956"/>
      <path d="M126 111l40 -33 42 33 48 -36 48 36 42 -31" fill="none" stroke="#83D3FB" strokeWidth="5" strokeLinecap="round"/>
      {[126,166,208,256,304,346].map((x,i)=><circle key={x} cx={x} cy={[111,78,111,75,111,80][i]} r="9" fill="#F8CE79" stroke="#fff" strokeWidth="2"/>)}
      <rect x="171" y="176" width="138" height="10" rx="5" fill="#7DB9D1"/><path d="M216 193h50l17 12h-83Z" fill="#C9E6F1"/>
      <rect x="125" y="131" width="156" height="9" rx="4" fill="#4A88B7"/><rect x="125" y="148" width="103" height="6" rx="3" fill="#2D709E"/>
    </>}
    {kind === 'green' && <>
      <path d="M90 165V79l146 -64 146 64v86Z" fill="#B0E9DA" fillOpacity=".3" stroke="#D6F7E9" strokeWidth="6"/>
      <path d="M236 16v152M90 79h292M135 59v108M339 59v108" stroke="#D6F7E9" strokeWidth="3"/>
      {[123,188,251,314,366].map((x,i)=><g key={x}><rect x={x-14} y="162" width="29" height="22" rx="3" fill="#9C613F"/><path d={`M${x} 162v-44m0 22q-32 -12 -28 -32 21 -5 28 32m0 -8q8 -24 28 -24 5 26 -28 24`} fill="#6EC28B" stroke="#83E3A3" strokeWidth="3"/></g>)}
      <path d="M0 204H480" stroke="#97B883" strokeWidth="7"/>
    </>}
    {kind === 'move' && <>
      <rect x="45" y="66" width="255" height="113" rx="8" fill="#AACEE7" stroke="#DFEFFE" strokeWidth="5"/>
      <path d="M45 97h255M112 66v113M221 66v113" stroke="#6BA0BE" strokeWidth="5"/>
      <rect x="118" y="109" width="89" height="70" fill="#345A8C"/><path d="M130 126h65M130 140h65M130 155h65" stroke="#7AB6DB" strokeWidth="4"/>
      <path d="M266 130h79l42 28v24H266Z" fill="#F8BC58"/><rect x="346" y="145" width="28" height="13" rx="3" fill="#B5ECFA"/>
      <circle cx="291" cy="183" r="19" fill="#1A3151" stroke="#F7F8FF" strokeWidth="5"/><circle cx="364" cy="183" r="19" fill="#1A3151" stroke="#F7F8FF" strokeWidth="5"/>
      {[70,88,244].map(x=><rect key={x} x={x} y="110" width="18" height="26" fill="#E8B36B"/>)}
    </>}
    <path d="M0 215h480" stroke="#B8E3F8" strokeOpacity=".45" strokeWidth="5"/>
  </svg>;
}

export default function FutureWorlds({ navigate }) {
  return <section className={styles.wrap} aria-label="Explore future careers and business worlds">
    <div className={styles.intro}>
      <div><span className={styles.overline}>THE WORLD IS BIGGER THAN ONE BUSINESS</span><h2>See the future. <em>Build your place in it.</em></h2></div>
      <p>Explore big ideas through the quests already in your YEP Process. These worlds are inspiration, not separate finished lessons.</p>
    </div>
    <div className={styles.grid}>
      {worlds.map(({ id,label,title,description,action,screen,Icon,accent }) => <button className={styles.card} key={id} data-world={id} type="button" onClick={() => navigate(screen)} aria-label={`${title}. ${action}`}>
        <div className={styles.art}><WorldScene kind={id}/><span className={styles.roundIcon} style={{ color: accent }}><Icon size={26} aria-hidden="true"/></span></div>
        <div className={styles.copy}>
          <span className={styles.label}>{label}</span>
          <h3>{title}</h3>
          <p>{description}</p>
          <span className={styles.action}>{action}<ArrowUpRight size={21} aria-hidden="true"/></span>
        </div>
      </button>)}
    </div>
  </section>;
}
