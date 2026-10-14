import { LearningPicture } from './LearningPicture';

// Demonstrate the vocabulary action itself instead of recycling a generic illustration.
// Decorative scenes are simulated examples; they do not claim verified learner outcomes.
export default function VisualTeachingScene({ kind, label }) {
  if (!['notice', 'sort', 'reflect'].includes(kind)) {
    return <LearningPicture kind={kind} label={label} />;
  }
  return (
    <svg viewBox="0 0 320 200" role="img" aria-label={label}
      style={{ display: 'block', width: '100%', height: 'auto' }}>
      <rect width="320" height="200" rx="18" fill="#e5f4ff" />
      {kind === 'notice' && <>
        <rect x="24" y="95" width="224" height="15" rx="6" fill="#ad7740" />
        <path d="M39 110v68M227 110v68" stroke="#80532e" strokeWidth="9" strokeLinecap="round" />
        <g transform="rotate(-21 98 64)"><rect x="49" y="47" width="15" height="81" rx="4" fill="#fe634b" /><path d="M49 47l7 -16 8 16" fill="#f7ca87" /></g>
        <g transform="rotate(17 148 70)"><rect x="145" y="29" width="15" height="80" rx="4" fill="#297cc9" /><path d="M145 29l7 -16 8 16" fill="#efc082" /></g>
        <g transform="rotate(58 255 135)"><rect x="251" y="95" width="14" height="80" rx="4" fill="#eda628" /><path d="M251 95l7 -15 7 15" fill="#f4c181" /></g>
        <path d="M236 60Q269 82 271 108" fill="none" stroke="#dc5f38" strokeWidth="5" strokeDasharray="6 6" />
        <path d="M257 98l14 13 8 -17" fill="none" stroke="#dc5f38" strokeWidth="5" strokeLinecap="round" />
        <rect x="16" y="147" width="190" height="33" rx="12" fill="#fff" stroke="#80aadb" strokeWidth="2" />
        <text x="111" y="169" textAnchor="middle" fontSize="14" fontWeight="900" fill="#163b79">NOTICE: A PENCIL FELL</text>
      </>}
      {kind === 'sort' && <>
        {[
          {x:14,t:'CRAYONS',color:'#f8c04c',items:['#e9574a','#276cd3','#2daa89']},
          {x:117,t:'MARKERS',color:'#6ac5f3',items:['#813edc','#319966','#f7a723']},
          {x:220,t:'SCISSORS',color:'#90d5ad',items:['#cf4b6b','#276cd3']}
        ].map((group,i)=><g key={group.t}>
          <rect x={group.x} y="74" width="88" height="94" rx="12" fill={group.color} stroke="#1e5281" strokeWidth="3" />
          <rect x={group.x+4} y="134" width="80" height="28" rx="5" fill="#fff" />
          <text x={group.x+44} y="153" textAnchor="middle" fontSize="12" fontWeight="900" fill="#113a72">{group.t}</text>
          {i!==2?group.items.map((co,j)=><g key={co} transform={`translate(${group.x+18+j*22} 84) rotate(${(j-1)*7})`}>
            <rect width="12" height="43" rx="3" fill={co} /><path d="M0 0l6 -11 6 11" fill="#fff0a4" />
          </g>):<>
            <g stroke="#b64552" strokeWidth="5" fill="none"><circle cx="253" cy="107" r="11"/><circle cx="278" cy="107" r="11"/></g>
            <path d="M261 116l-8 -36M270 116l8 -36" stroke="#365977" strokeWidth="6" />
          </>}
        </g>)}
        <text x="160" y="39" textAnchor="middle" fontSize="20" fontWeight="950" fill="#114a9a">SAME THINGS TOGETHER</text>
        <path d="M52 55h216" stroke="#ffc440" strokeWidth="5" strokeLinecap="round" />
      </>}
      {kind === 'reflect' && <>
        {[
          {x:8,title:'I TRIED',text:'MY IDEA',bg:'#ffd77d',shape:'try'},
          {x:116,title:'I SAW',text:'THE RESULT',bg:'#9dddff',shape:'see'},
          {x:224,title:'NEXT TIME',text:'ONE CHANGE',bg:'#b4ebce',shape:'next'}
        ].map((step,i)=><g key={step.title}>
          <rect x={step.x} y="20" width="88" height="155" rx="12" fill="#fff" stroke="#81a5cf" strokeWidth="2" />
          <rect x={step.x+4} y="24" width="80" height="34" rx="9" fill={step.bg} />
          <text x={step.x+44} y="45" textAnchor="middle" fontSize="13" fontWeight="900" fill="#123d76">{step.title}</text>
          {step.shape==='try'?<>
            <path d={`M${step.x+28} 95l13 12 22 -26`} fill="none" stroke="#236ebd" strokeWidth="9" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx={step.x+44} cy="104" r="31" fill="none" stroke="#aacbe6" strokeWidth="4" />
          </>:step.shape==='see'?<>
            <ellipse cx={step.x+44} cy="103" rx="31" ry="22" fill="#d7f3ff" stroke="#2172b6" strokeWidth="5" />
            <circle cx={step.x+44} cy="103" r="13" fill="#1c5190" /><circle cx={step.x+49} cy="99" r="4" fill="#fff" />
          </>:<>
            <path d={`M${step.x+23} 112h38m-13 -13 13 13 -13 13`} stroke="#198d59" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <circle cx={step.x+43} cy="102" r="33" fill="none" stroke="#a7dabd" strokeWidth="4" />
          </>}
          <text x={step.x+44} y="153" textAnchor="middle" fontSize="11" fontWeight="800" fill="#244d7b">{step.text}</text>
          {i<2 && <path d={`M${step.x+92} 92l7 8 -7 8`} stroke="#df9628" strokeWidth="5" fill="none" strokeLinecap="round"/>}
        </g>)}
      </>}
    </svg>
  );
}
