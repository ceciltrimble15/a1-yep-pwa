// Authored illustrations show possibilities, never measured learner outcomes.
export function LearningPicture({ kind = 'supplies', changed = false, label = 'Learning example' }) {
  const person = (x, y, color = '#2259a7') => <g key={`${x}:${y}`}><circle cx={x} cy={y} r="14" fill="#9c6343" /><path d={`M${x-18} ${y+25} Q${x} ${y+9} ${x+18} ${y+25} L${x+16} ${y+65} H${x-16} Z`} fill={color} /><path d={`M${x-9} ${y+62} V${y+84} M${x+9} ${y+62} V${y+84}`} stroke="#17325b" strokeWidth="10" strokeLinecap="round" /></g>;
  return <svg viewBox="0 0 320 200" role="img" aria-label={label} style={{ display: 'block', width: '100%', height: 'auto', maxHeight: 210 }}>
    <rect width="320" height="200" rx="18" fill="#e8f1ff" />
    <path d="M0 163H320V200H0Z" fill="#bdd3ef" />
    {['supplies', 'labels', 'holder'].includes(kind) ? <>
      <rect x="30" y="130" width="260" height="14" rx="5" fill="#bd8c52" /><path d="M47 144v39M273 144v39" stroke="#77502a" strokeWidth="10" />
      {changed && kind !== 'holder' && [45,125,205].map((x,i)=><g key={x}><rect x={x} y="64" width="70" height="67" rx="7" fill={['#77c7b3','#ffcf72','#83aaf1'][i]} /><rect x={x+12} y="106" width="46" height="15" rx="3" fill="#fff" />{kind === 'labels' && <path d={`M${x+23} 110h23`} stroke={['#cc4444','#345dab','#297e68'][i]} strokeWidth="7" strokeLinecap="round" />}</g>)}
      {changed && kind === 'holder' && <rect x="101" y="85" width="112" height="48" rx="9" fill="#70bda9" stroke="#205c50" strokeWidth="4" />}
      {(changed && kind === 'holder' ? [111,131,151,171,191] : [62,89,145,185,236]).map((x,i)=><g key={x} transform={`rotate(${changed ? 0 : [25,-35,70,-45,15][i]} ${x} 90)`}><rect x={x} y={changed ? 33 : 57} width="9" height="55" rx="3" fill={['#e65551','#3f6fcc','#e2ad28','#297e68','#874da2'][i]} /><path d={`M${x} ${changed?33:57}l4.5 -12 4.5 12`} fill="#bc8954" /></g>)}
      <g transform={changed?'translate(158 45) rotate(0)':'translate(107 100) rotate(-25)'} stroke="#344c6c" strokeWidth="5" fill="none"><circle cx="0" cy="0" r="9" stroke="#d84647" /><circle cx="23" cy="0" r="9" stroke="#d84647" /><path d="M7 -6l24 -35M16 -6L-6 -41" /></g>
    </> : kind === 'checklist' ? <>
      <rect x="23" y="123" width="146" height="15" rx="4" fill="#bd8c52" />
      <rect x="43" y="77" width="15" height="47" rx="4" fill="#d95c4f" /><rect x="80" y="65" width="15" height="59" rx="4" fill="#497dcc" />
      <rect x="117" y="70" width="20" height="53" rx="4" fill="none" stroke={changed?'#c44b43':'#7992b5'} strokeWidth="4" strokeDasharray="5 5" />
      {changed && <><rect x="191" y="27" width="99" height="146" rx="8" fill="#fff" stroke="#385d8d" strokeWidth="4" />{[51,90,129].map((y,i)=><g key={y}><rect x="204" y={y} width="18" height="21" rx="3" fill={['#d95c4f','#497dcc','#e2b442'][i]} /><path d={`M${235} ${y+7}h35`} stroke="#aec2df" strokeWidth="4" />{i<2?<path d={`M236 ${y+18}l7 6 14 -15`} fill="none" stroke="#26725d" strokeWidth="4" />:<circle cx="248" cy={y+21} r="12" fill="none" stroke="#c44b43" strokeWidth="4" />}</g>)}</>}
    </> : kind === 'reach' ? <>
      {person(50,55)}<rect x="105" y="128" width="194" height="16" rx="5" fill="#bd8c52" /><path d="M118 144v40M284 144v40" stroke="#77502a" strokeWidth="9" />
      <rect x={changed?125:254} y="84" width="14" height="43" rx="4" fill="#d75847" /><rect x={changed?147:275} y="90" width="13" height="37" rx="4" fill="#387bc3" />
      <path d={changed?'M76 107H112':'M76 107H240'} stroke="#d49422" strokeWidth="7" strokeDasharray="9 6" /><path d={changed?'M102 97l12 10 -12 10':'M230 97l12 10 -12 10'} stroke="#d49422" strokeWidth="6" fill="none" />
    </> : kind === 'trash' ? <>
      <path d="M174 65h79l-9 95h-60Z" fill="#3a8190" /><path d="M169 60h89M187 53h52" stroke="#173e5b" strokeWidth="10" strokeLinecap="round" /><path d="M195 84v52M215 84v52M235 84v52" stroke="#c2eee8" strokeWidth="5" />
      {(changed ? [190,218] : [45,85,114,166,221]).map((x,i)=><path key={x} d={`M${x} ${changed?80+i*17:139+i%2*19}l23 8 -9 14 -21 -9Z`} fill={['#fff','#efd273','#a0bfec'][i%3]} stroke="#536d8f" strokeWidth="2" />)}
      {person(75,62,changed?'#2d947b':'#d05d4c')}
    </> : kind === 'waiting' ? <>
      {[65,126,187].map((x,i)=>person(x,changed?52+i%2*8:62,['#2259a7','#d79e29','#358873'][i]))}
      <circle cx="266" cy="48" r="27" fill="#fff" stroke="#34577f" strokeWidth="5" /><path d="M266 29v20l12 7" stroke="#34577f" strokeWidth="5" fill="none" strokeLinecap="round" />
      {changed ? [43,108,173].map(x=><rect key={x} x={x} y="142" width="44" height="26" rx="5" fill="#77c7b3" stroke="#256955" strokeWidth="3" />) : <><rect x="233" y="119" width="53" height="52" rx="6" fill="#bd8c52" /><path d="M77 173H225" stroke="#c3652b" strokeWidth="5" strokeDasharray="8 5" /></>}
    </> : ['workflow','workaround','form','status','reminder'].includes(kind) ? <>
      <rect x="26" y="28" width="70" height="140" rx="12" fill="#274b7b" /><rect x="34" y="45" width="54" height="99" rx="4" fill="#fff" /><path d="M45 63h30M45 77h22M45 91h29" stroke="#6d91c2" strokeWidth="5" />
      {(changed && kind === 'reminder' ? [1] : [0,1,2]).map(i=><g key={i} transform={`translate(${changed?125+i*59:130+i*45} ${changed?62:38+i*29}) rotate(${changed?0:[-13,14,-8][i]})`}><rect width="50" height="82" rx="6" fill={['#fff0bc','#bee4d5','#cfdef7'][i]} stroke="#3b608d" strokeWidth={changed && kind === 'reminder' ? 6 : 3} /><circle cx="25" cy="21" r="9" fill={['#e7ae30','#428c73','#4f7bbb'][i]} /><path d={kind === 'form' && !changed ? ['M9 43h12M9 60h31','M9 40h28','M9 45h20M9 65h14'][i] : 'M9 43h32M9 55h24'} stroke="#3b608d" strokeWidth="4" />{changed&&<path d="M15 68l7 5 13 -13" fill="none" stroke="#2d765e" strokeWidth="4" />}</g>)}
      {changed && kind === 'reminder' && <g transform="translate(251 51)"><circle r="28" fill="#ffda78" stroke="#ab7620" strokeWidth="3" /><path d="M-13 9h26l-4 -7v-9a9 9 0 0 0-18 0v9Z" fill="#285790" /><circle cy="15" r="4" fill="#285790" /></g>}
    </> : <>
      {person(72,65)}<rect x="159" y="36" width="116" height="120" rx="12" fill="#fff" stroke="#406798" strokeWidth="5" />
      {changed ? <><path d="M180 65h61M180 93h61M180 121h61" stroke="#62a38d" strokeWidth="9" strokeLinecap="round" /><path d="M123 100h23m-10 -10 10 10 -10 10" stroke="#cc8c18" strokeWidth="6" fill="none" /></> : <><path d="M200 69c0 -24 37 -23 37 0 0 12 -20 12 -20 30" stroke="#cc8c18" strokeWidth="10" fill="none" strokeLinecap="round" /><circle cx="217" cy="123" r="6" fill="#cc8c18" /><path d="M61 31q18 -20 33 0" stroke="#527bac" strokeWidth="4" fill="none" /></>}
    </>}
  </svg>;
}

export default function PictureExample({ kind }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(190px,1fr))', gap: 14, margin: '12px 0' }}>
    <div><strong>Before</strong><LearningPicture kind={kind} label="Illustrated starting problem" /></div>
    <div><strong>One possible change</strong><LearningPicture kind={kind} changed label="Illustrated possible change, not a measured result" /></div>
  </div>;
}
