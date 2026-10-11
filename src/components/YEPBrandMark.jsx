// Shared, vector YEP identity based on the approved gold-and-blue opening concept.
// Genuine accessible logo text, not a static screenshot with invented achievements.
export default function YEPBrandMark({ className = '', dark = false, compact = false }) {
  const ink = dark ? '#FFFFFF' : '#0B2F70';
  return (
    <svg className={className} viewBox={compact ? '0 10 640 270' : '0 0 640 314'} xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="A/1 Suppliers presents YEP, Young Entrepreneurs Process. Build Your Mind. Build Your Future."
      preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="yepBrandGold" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFF9AE" />
          <stop offset="43%" stopColor="#FFE056" />
          <stop offset="100%" stopColor="#F1A800" />
        </linearGradient>
        <linearGradient id="yepBrandBlue" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#287CFF" />
          <stop offset="100%" stopColor="#051E69" />
        </linearGradient>
        <filter id="yepBrandLift" x="-20%" y="-20%" width="140%" height="155%">
          <feDropShadow dx="8" dy="10" stdDeviation="4" floodColor="#072052" floodOpacity=".65" />
        </filter>
      </defs>
      <text x="322" y="46" textAnchor="middle" fill={ink} fontSize="36"
        fontWeight="950" fontFamily="Arial Black, Arial, sans-serif" letterSpacing="-.8">A/1 Suppliers</text>
      <path d="M264 93l-13 -29 22 12 13 -31 18 29 28 -22 -11 37z" fill="#FFD433" stroke="#B86F00" strokeWidth="3" />
      <circle cx="251" cy="62" r="5" fill="#FFD433" /><circle cx="285" cy="44" r="5" fill="#FFD433" /><circle cx="333" cy="51" r="5" fill="#FFD433" />
      <path d="M263 94l60 -5" stroke="#FFF1A2" strokeWidth="5" strokeLinecap="round" />
      <g filter="url(#yepBrandLift)">
        <text x="323" y="207" textAnchor="middle"
          paintOrder="stroke fill" stroke="#05216D" strokeWidth="27" strokeLinejoin="round"
          fill="url(#yepBrandBlue)" fontSize="182" fontWeight="1000"
          fontFamily="Arial Black, Impact, Arial, sans-serif" letterSpacing="-8">YEP</text>
        <text x="323" y="207" textAnchor="middle"
          paintOrder="stroke fill" stroke="#2586FF" strokeWidth="12" strokeLinejoin="round"
          fill="url(#yepBrandGold)" fontSize="182" fontWeight="1000"
          fontFamily="Arial Black, Impact, Arial, sans-serif" letterSpacing="-8">YEP</text>
      </g>
      <text x="320" y="243" textAnchor="middle" fill={ink}
        fontSize="26" fontWeight="950" fontFamily="Arial Black, Arial, sans-serif" letterSpacing=".1">YOUNG ENTREPRENEURS PROCESS</text>
      <path d="M81 257Q328 243 560 259L548 300Q303 286 92 302Z" fill="#FFCE2B" />
      <path d="M92 269Q320 254 545 268" fill="none" stroke="#FFF3A0" strokeWidth="4" opacity=".8" />
      <text x="321" y="284" textAnchor="middle" fontSize="23" fontWeight="900"
        fontStyle="italic" fontFamily="Arial, sans-serif" fill="#092756">Build Your Mind. Build Your Future.</text>
    </svg>
  );
}
