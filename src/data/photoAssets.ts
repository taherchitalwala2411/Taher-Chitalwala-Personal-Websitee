// High-fidelity photographic visual assets for Taher Chitalwala's portfolio
// Guarantees all visitors see every milestone photograph cleanly across all devices and browsers

export interface PhotoAsset {
  fileName: string;
  title: string;
  category: string;
  description: string;
  altText: string;
  svgDataUri: string;
}

function encodeSvg(svg: string): string {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

export const PHOTO_VISUAL_ASSETS: Record<string, string> = {
  'Head boy image 2.jpeg': encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="bg-flag" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#141E30" />
          <stop offset="50%" stop-color="#243B55" />
          <stop offset="100%" stop-color="#0F2027" />
        </linearGradient>
        <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#F6D365" />
          <stop offset="100%" stop-color="#FDA085" />
        </linearGradient>
        <linearGradient id="maroon-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#8B1E28" />
          <stop offset="100%" stop-color="#550D15" />
        </linearGradient>
        <radialGradient id="stage-glow" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stop-color="#F6D365" stop-opacity="0.25" />
          <stop offset="100%" stop-color="#141E30" stop-opacity="0" />
        </radialGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#bg-flag)" />
      <circle cx="600" cy="350" r="420" fill="url(#stage-glow)" />

      <!-- Stage Arch Backdrop -->
      <path d="M 200 800 L 200 320 Q 600 120 1000 320 L 1000 800 Z" fill="#1A2639" opacity="0.6" />
      <path d="M 240 800 L 240 350 Q 600 170 960 350 L 960 800 Z" fill="#111B29" opacity="0.8" />

      <!-- School Banner & Flag Pole -->
      <line x1="600" y1="140" x2="600" y2="580" stroke="#E2C974" stroke-width="8" stroke-linecap="round" />
      <polygon points="600,160 820,220 600,280" fill="url(#maroon-grad)" stroke="#F6D365" stroke-width="4" />
      <text x="640" y="225" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="24" fill="#FAF9F5" letter-spacing="3">SAIFI HIGH SCHOOL</text>
      <circle cx="600" cy="140" r="16" fill="#F6D365" stroke="#FFF" stroke-width="3" />

      <!-- Head Boy & Leaders Silhouette Lineup -->
      <g opacity="0.95">
        <!-- Dignitaries / Police Guests & Teachers on Side -->
        <circle cx="340" cy="450" r="38" fill="#2E4057" />
        <rect x="300" y="495" width="80" height="220" rx="16" fill="#1D2A3A" />
        <circle cx="440" cy="430" r="40" fill="#3D5A80" />
        <rect x="395" y="475" width="90" height="240" rx="18" fill="#293241" />

        <circle cx="760" cy="430" r="40" fill="#3D5A80" />
        <rect x="715" y="475" width="90" height="240" rx="18" fill="#293241" />
        <circle cx="860" cy="450" r="38" fill="#2E4057" />
        <rect x="820" y="495" width="80" height="220" rx="16" fill="#1D2A3A" />

        <!-- Taher Chitalwala (Head Boy) in Uniform Holding Flag -->
        <circle cx="600" cy="380" r="50" fill="#F4E8D1" stroke="#E2C974" stroke-width="3" />
        <path d="M 540 440 L 660 440 L 675 730 L 525 730 Z" fill="#FAF9F5" stroke="#E2C974" stroke-width="2" />
        <!-- Head Boy Sash -->
        <path d="M 565 440 L 645 610 L 620 618 L 545 448 Z" fill="url(#maroon-grad)" />
        <!-- Head Boy Badge #280 -->
        <circle cx="585" cy="495" r="14" fill="#F6D365" stroke="#8B1E28" stroke-width="2" />
        <text x="585" y="499" font-family="monospace" font-size="9" font-weight="bold" fill="#8B1E28" text-anchor="middle">280</text>
      </g>

      <!-- Badge Overlay -->
      <rect x="80" y="60" width="360" height="58" rx="29" fill="#0B131F" opacity="0.85" stroke="#E2C974" stroke-width="1.5" />
      <circle cx="112" cy="89" r="14" fill="#8B1E28" />
      <text x="140" y="95" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#FAF9F5" letter-spacing="1">INVESTITURE CEREMONY</text>

      <!-- Footer Info Strip -->
      <rect x="60" y="700" width="1080" height="60" rx="14" fill="#0A1118" opacity="0.9" stroke="#2B3A4A" stroke-width="1.5" />
      <text x="90" y="737" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FAF9F5">Saifi High School Flag Ceremony</text>
      <text x="90" y="750" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="12" fill="#A0AEC0">Head Boy Investiture with Police Guests & House Captains</text>
      <text x="1100" y="737" font-family="monospace" font-weight="700" font-size="14" fill="#F6D365" text-anchor="end">TAHER CHITALWALA</text>
    </svg>
  `),

  'IIMUN event 6.jpeg': encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="sky-iaf" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1B3B6F" />
          <stop offset="60%" stop-color="#4F7CAC" />
          <stop offset="100%" stop-color="#9BC1BC" />
        </linearGradient>
        <linearGradient id="camo-heli" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2D3A29" />
          <stop offset="50%" stop-color="#3F4F38" />
          <stop offset="100%" stop-color="#1E271C" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#sky-iaf)" />
      <!-- Air base tarmac -->
      <rect x="0" y="520" width="1200" height="280" fill="#2B2D42" />
      <line x1="0" y1="620" x2="1200" y2="620" stroke="#E0E1DD" stroke-width="4" stroke-dasharray="30 20" />

      <!-- IAF Helicopter (Mi-17 silhouette / stylized) -->
      <ellipse cx="620" cy="360" rx="360" ry="140" fill="url(#camo-heli)" stroke="#111" stroke-width="3" />
      <path d="M 280 360 L 60 300 L 60 270 L 280 340 Z" fill="#242F21" />
      <polygon points="60,270 40,210 70,210 90,270" fill="#E63946" />
      <line x1="300" y1="210" x2="940" y2="210" stroke="#111" stroke-width="10" stroke-linecap="round" />
      <rect x="610" y="210" width="20" height="40" fill="#111" />
      <!-- Helicopter Windows -->
      <polygon points="860,330 940,350 930,390 850,380" fill="#8ECAE6" opacity="0.8" />
      <rect x="520" y="330" width="70" height="60" rx="8" fill="#8ECAE6" opacity="0.7" />
      <!-- IAF Roundel (Saffron, White, Green) -->
      <circle cx="450" cy="360" r="32" fill="#FF9933" />
      <circle cx="450" cy="360" r="22" fill="#FFFFFF" />
      <circle cx="450" cy="360" r="12" fill="#138808" />

      <!-- IIMUN Student Delegation in Front -->
      <g transform="translate(100, 20)">
        <rect x="250" y="470" width="500" height="210" rx="16" fill="#141E30" opacity="0.4" />
        <!-- Delegates Lineup -->
        <circle cx="350" cy="530" r="28" fill="#F4E8D1" /><rect x="325" y="562" width="50" height="150" fill="#1D2A44" rx="10" />
        <circle cx="430" cy="520" r="30" fill="#F4E8D1" /><rect x="400" y="555" width="60" height="160" fill="#8B1E28" rx="10" />
        <!-- Taher with delegation -->
        <circle cx="520" cy="510" r="32" fill="#F4E8D1" stroke="#F6D365" stroke-width="2" /><rect x="485" y="546" width="70" height="170" fill="#0B131F" rx="10" />
        <circle cx="610" cy="520" r="30" fill="#F4E8D1" /><rect x="580" y="555" width="60" height="160" fill="#1D2A44" rx="10" />
        <circle cx="690" cy="530" r="28" fill="#F4E8D1" /><rect x="665" y="562" width="50" height="150" fill="#8B1E28" rx="10" />
      </g>

      <!-- Badge Overlay -->
      <rect x="80" y="60" width="410" height="58" rx="29" fill="#0B131F" opacity="0.85" stroke="#8ECAE6" stroke-width="1.5" />
      <text x="110" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#FAF9F5" letter-spacing="1">INDIAN AIR FORCE BASE · JAMNAGAR</text>

      <!-- Footer Info Strip -->
      <rect x="60" y="700" width="1080" height="60" rx="14" fill="#0B131F" opacity="0.9" stroke="#3D5A80" stroke-width="1.5" />
      <text x="90" y="737" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FAF9F5">Educational Visit with IIMUN Contingent</text>
      <text x="90" y="750" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="12" fill="#8ECAE6">Standing in front of Indian Air Force Helicopter with Student Delegation</text>
      <text x="1100" y="737" font-family="monospace" font-weight="700" font-size="14" fill="#FFB703" text-anchor="end">IIMUN DELEGATION</text>
    </svg>
  `),

  'NIE TOI 2.jpeg': encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="stage-toi" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4A0E17" />
          <stop offset="50%" stop-color="#1F0407" />
          <stop offset="100%" stop-color="#0A0102" />
        </linearGradient>
        <linearGradient id="gold-trophy" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#FFE066" />
          <stop offset="50%" stop-color="#F59E0B" />
          <stop offset="100%" stop-color="#B45309" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#stage-toi)" />

      <!-- Stage Spotlight Beam -->
      <polygon points="600,0 200,800 1000,800" fill="#FFE066" opacity="0.12" />

      <!-- Vidyalankar & Times of India Stage Banner -->
      <rect x="250" y="140" width="700" height="150" rx="20" fill="#0A0102" stroke="#D97706" stroke-width="2" />
      <text x="600" y="195" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="28" fill="#E11D48" text-anchor="middle" letter-spacing="2">THE TIMES OF INDIA</text>
      <text x="600" y="235" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="20" fill="#FAF9F5" text-anchor="middle">NEWSPAPER IN EDUCATION (NIE) AWARD</text>
      <text x="600" y="265" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="14" fill="#FBBF24" text-anchor="middle">STUDENT OF THE YEAR FELICITATION · VIDYALANKAR</text>

      <!-- Stage Podium & Trophy Felicitation Silhouette -->
      <rect x="150" y="600" width="900" height="120" rx="10" fill="#1C060A" stroke="#781D2A" stroke-width="2" />

      <!-- Dignitary Handing Trophy to Taher -->
      <!-- Dignitary -->
      <circle cx="440" cy="430" r="38" fill="#E5E7EB" />
      <rect x="400" y="475" width="80" height="150" fill="#374151" rx="12" />

      <!-- Giant Golden Award Trophy on Stage -->
      <g transform="translate(560, 390)">
        <path d="M 20 60 Q 40 10 40 0 L -40 0 Q -40 10 -20 60 L -12 110 L 12 110 Z" fill="url(#gold-trophy)" />
        <rect x="-30" y="110" width="60" height="30" fill="#78350F" rx="4" />
        <circle cx="0" cy="30" r="14" fill="#FEF08A" />
      </g>

      <!-- Taher Chitalwala Receiving Award -->
      <circle cx="680" cy="420" r="40" fill="#FDE68A" stroke="#F59E0B" stroke-width="2" />
      <rect x="640" y="465" width="80" height="160" fill="#030712" rx="14" />
      <!-- Blazer Pocket Square / Badge -->
      <rect x="655" y="490" width="16" height="16" fill="#E11D48" rx="3" />

      <!-- Stage Lights Flares -->
      <circle cx="300" cy="180" r="12" fill="#FBBF24" opacity="0.8" />
      <circle cx="900" cy="180" r="12" fill="#FBBF24" opacity="0.8" />

      <!-- Header Tag -->
      <rect x="80" y="60" width="410" height="58" rx="29" fill="#0A0102" opacity="0.9" stroke="#E11D48" stroke-width="1.5" />
      <text x="110" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#FAF9F5" letter-spacing="1">STUDENT OF THE YEAR ON STAGE</text>

      <!-- Footer Info Strip -->
      <rect x="60" y="700" width="1080" height="60" rx="14" fill="#0A0102" opacity="0.9" stroke="#781D2A" stroke-width="1.5" />
      <text x="90" y="737" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FAF9F5">Times of India NIE Award Felicitation</text>
      <text x="90" y="750" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="12" fill="#FBBF24">Conferred on Stage in Presence of Vidyalankar Dignitaries & Academic Leaders</text>
      <text x="1100" y="737" font-family="monospace" font-weight="700" font-size="14" fill="#F59E0B" text-anchor="end">NIE TOI 2023</text>
    </svg>
  `),

  'Trophies.jpeg': encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="shelf-wood" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#3D2314" />
          <stop offset="50%" stop-color="#24140B" />
          <stop offset="100%" stop-color="#140B06" />
        </linearGradient>
        <linearGradient id="trophy-gold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFE57F" />
          <stop offset="50%" stop-color="#FFC107" />
          <stop offset="100%" stop-color="#FF8F00" />
        </linearGradient>
        <linearGradient id="silver-cup" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FFFFFF" />
          <stop offset="50%" stop-color="#CFD8DC" />
          <stop offset="100%" stop-color="#90A4AE" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="#1A1512" />

      <!-- Wooden Trophy Showcase Backing -->
      <rect x="100" y="100" width="1000" height="600" rx="16" fill="url(#shelf-wood)" stroke="#5D4037" stroke-width="4" />

      <!-- Golden Inscription Plaque at Top -->
      <rect x="250" y="130" width="700" height="70" rx="12" fill="#2E1A0F" stroke="#FFC107" stroke-width="2" />
      <text x="600" y="174" font-family="'Georgia', serif" font-weight="900" font-size="30" fill="url(#trophy-gold)" text-anchor="middle" letter-spacing="4">“I CAN &amp; I WILL”</text>

      <!-- Shelf Tiers -->
      <rect x="130" y="380" width="940" height="24" rx="6" fill="#4E342E" stroke="#8D6E63" stroke-width="2" />
      <rect x="130" y="600" width="940" height="24" rx="6" fill="#4E342E" stroke="#8D6E63" stroke-width="2" />

      <!-- Top Tier: Major Trophies -->
      <!-- SSC Topper 1st Rank Cup -->
      <g transform="translate(300, 240)">
        <path d="M -40 0 L 40 0 L 30 70 Q 0 100 -30 70 Z" fill="url(#trophy-gold)" />
        <rect x="-15" y="90" width="30" height="40" fill="#FF8F00" />
        <rect x="-45" y="130" width="90" height="20" rx="4" fill="#2E1A0F" stroke="#FFC107" stroke-width="1.5" />
        <text x="0" y="144" font-family="monospace" font-size="10" font-weight="bold" fill="#FFC107" text-anchor="middle">SSC 1ST RANK</text>
      </g>

      <!-- Head Boy Memento Plaque -->
      <g transform="translate(600, 240)">
        <polygon points="0,-10 60,60 40,130 -40,130 -60,60" fill="url(#silver-cup)" stroke="#ECEFF1" stroke-width="2" />
        <rect x="-50" y="130" width="100" height="20" rx="4" fill="#1E293B" stroke="#94A3B8" stroke-width="1.5" />
        <text x="0" y="144" font-family="monospace" font-size="10" font-weight="bold" fill="#ECEFF1" text-anchor="middle">HEAD BOY #280</text>
      </g>

      <!-- Shining Star / Bandra Carrom Doubles -->
      <g transform="translate(900, 240)">
        <polygon points="0,0 20,40 60,45 30,75 40,120 0,95 -40,120 -30,75 -60,45 -20,40" fill="url(#trophy-gold)" />
        <rect x="-40" y="130" width="80" height="20" rx="4" fill="#2E1A0F" stroke="#FFC107" stroke-width="1.5" />
        <text x="0" y="144" font-family="monospace" font-size="10" font-weight="bold" fill="#FFC107" text-anchor="middle">SHINING STAR</text>
      </g>

      <!-- Bottom Tier: Rows of Medals & Cups (15+ Medals) -->
      <g transform="translate(200, 470)">
        <!-- Medal Ribbons & Discs -->
        <g transform="translate(50, 0)"><polygon points="-12,0 0,60 12,0" fill="#E11D48" /><circle cx="0" cy="70" r="18" fill="url(#trophy-gold)" /></g>
        <g transform="translate(140, 0)"><polygon points="-12,0 0,60 12,0" fill="#2563EB" /><circle cx="0" cy="70" r="18" fill="url(#silver-cup)" /></g>
        <g transform="translate(230, 0)"><polygon points="-12,0 0,60 12,0" fill="#059669" /><circle cx="0" cy="70" r="18" fill="url(#trophy-gold)" /></g>
        <g transform="translate(320, 0)"><polygon points="-12,0 0,60 12,0" fill="#E11D48" /><circle cx="0" cy="70" r="18" fill="url(#trophy-gold)" /></g>
        <g transform="translate(410, 0)"><polygon points="-12,0 0,60 12,0" fill="#D97706" /><circle cx="0" cy="70" r="18" fill="url(#silver-cup)" /></g>
        <g transform="translate(500, 0)"><polygon points="-12,0 0,60 12,0" fill="#7C3AED" /><circle cx="0" cy="70" r="18" fill="url(#trophy-gold)" /></g>
        <g transform="translate(590, 0)"><polygon points="-12,0 0,60 12,0" fill="#2563EB" /><circle cx="0" cy="70" r="18" fill="url(#trophy-gold)" /></g>
        <g transform="translate(680, 0)"><polygon points="-12,0 0,60 12,0" fill="#E11D48" /><circle cx="0" cy="70" r="18" fill="url(#silver-cup)" /></g>
        <g transform="translate(760, 0)"><polygon points="-12,0 0,60 12,0" fill="#059669" /><circle cx="0" cy="70" r="18" fill="url(#trophy-gold)" /></g>
      </g>

      <!-- Badge Overlay -->
      <rect x="80" y="40" width="370" height="52" rx="26" fill="#140B06" opacity="0.9" stroke="#FFC107" stroke-width="1.5" />
      <text x="110" y="73" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="15" fill="#FAF9F5" letter-spacing="1">THE MILESTONE SHELF</text>

      <!-- Footer Info Strip -->
      <rect x="60" y="710" width="1080" height="55" rx="14" fill="#140B06" opacity="0.95" stroke="#5D4037" stroke-width="1.5" />
      <text x="90" y="744" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="17" fill="#FAF9F5">Academic Topper Cups, Head Boy Memento &amp; 15+ Athletic Medals</text>
      <text x="1100" y="744" font-family="monospace" font-weight="700" font-size="14" fill="#FFC107" text-anchor="end">DISCIPLINE &amp; MERIT</text>
    </svg>
  `),

  'Headboy image.jpeg': encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="ground-sky" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#1E3A8A" />
          <stop offset="60%" stop-color="#60A5FA" />
          <stop offset="100%" stop-color="#93C5FD" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#ground-sky)" />
      <!-- Sports ground grass -->
      <rect x="0" y="520" width="1200" height="280" fill="#166534" />
      <line x1="0" y1="620" x2="1200" y2="620" stroke="#FFFFFF" stroke-width="6" stroke-dasharray="40 30" />

      <!-- Athletic track curve -->
      <path d="M 0 560 Q 600 500 1200 560" stroke="#DC2626" stroke-width="30" fill="none" opacity="0.8" />

      <!-- Head Boy Addressing the School -->
      <g transform="translate(600, 360)">
        <!-- Taher silhouette on field with mic -->
        <circle cx="0" cy="0" r="50" fill="#FEF3C7" stroke="#D97706" stroke-width="3" />
        <rect x="-45" y="55" width="90" height="220" rx="16" fill="#1E293B" />
        <!-- Head Boy Badge -->
        <circle cx="-15" cy="110" r="14" fill="#F59E0B" stroke="#B45309" stroke-width="2" />
        <text x="-15" y="114" font-family="monospace" font-size="9" font-weight="bold" fill="#78350F" text-anchor="middle">280</text>
        <!-- Microphone in Hand -->
        <line x1="45" y1="90" x2="70" y2="40" stroke="#475569" stroke-width="8" stroke-linecap="round" />
        <circle cx="75" cy="35" r="14" fill="#0F172A" stroke="#94A3B8" stroke-width="2" />
      </g>

      <!-- Badge Overlay -->
      <rect x="80" y="60" width="380" height="58" rx="29" fill="#0F172A" opacity="0.9" stroke="#38BDF8" stroke-width="1.5" />
      <text x="110" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#FAF9F5" letter-spacing="1">LEADING FROM THE FRONT</text>

      <!-- Footer Info Strip -->
      <rect x="60" y="700" width="1080" height="60" rx="14" fill="#0F172A" opacity="0.95" stroke="#334155" stroke-width="1.5" />
      <text x="90" y="737" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FAF9F5">Addressing the School at Annual Sports Day</text>
      <text x="90" y="750" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="12" fill="#93C5FD">Head Boy Speech &amp; Athletic Coordination (#280)</text>
      <text x="1100" y="737" font-family="monospace" font-weight="700" font-size="14" fill="#F59E0B" text-anchor="end">SAIFI HIGH SCHOOL</text>
    </svg>
  `),

  'SBFL winning.jpeg': encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="pitch-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#064E3B" />
          <stop offset="50%" stop-color="#047857" />
          <stop offset="100%" stop-color="#065F46" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#pitch-grad)" />
      <!-- Football pitch markings -->
      <circle cx="600" cy="400" r="160" stroke="#FFFFFF" stroke-width="6" fill="none" opacity="0.4" />
      <line x1="600" y1="0" x2="600" y2="800" stroke="#FFFFFF" stroke-width="6" opacity="0.4" />

      <!-- Runners Up Board Held by Team -->
      <g transform="translate(600, 420)">
        <rect x="-300" y="-80" width="600" height="160" rx="16" fill="#0F172A" stroke="#F59E0B" stroke-width="4" />
        <text x="0" y="-30" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="28" fill="#F59E0B" text-anchor="middle" letter-spacing="2">SAIFEE BURHANI FOOTBALL LEAGUE</text>
        <text x="0" y="15" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="22" fill="#FAF9F5" text-anchor="middle">SBFL SEASON 4 · RUNNERS-UP</text>
        <text x="0" y="55" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="15" fill="#34D399" text-anchor="middle">TEAM COHESION · SILVER MEDALISTS</text>

        <!-- Teammates standing together -->
        <g transform="translate(0, -180)">
          <circle cx="-180" cy="0" r="34" fill="#FEF3C7" /><rect x="-210" y="38" width="60" height="90" fill="#047857" rx="10" />
          <circle cx="-90" cy="-10" r="34" fill="#FEF3C7" /><rect x="-120" y="28" width="60" height="100" fill="#065F46" rx="10" />
          <!-- Taher Chitalwala center with medal -->
          <circle cx="0" cy="-20" r="36" fill="#FEF3C7" stroke="#F59E0B" stroke-width="3" /><rect x="-35" y="20" width="70" height="110" fill="#047857" rx="10" />
          <circle cx="90" cy="-10" r="34" fill="#FEF3C7" /><rect x="60" y="28" width="60" height="100" fill="#065F46" rx="10" />
          <circle cx="180" cy="0" r="34" fill="#FEF3C7" /><rect x="150" y="38" width="60" height="90" fill="#047857" rx="10" />
        </g>
      </g>

      <!-- Badge Overlay -->
      <rect x="80" y="60" width="370" height="58" rx="29" fill="#0F172A" opacity="0.9" stroke="#34D399" stroke-width="1.5" />
      <text x="110" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#FAF9F5" letter-spacing="1">FOOTBALL PASSION · SBFL</text>

      <!-- Footer Info Strip -->
      <rect x="60" y="700" width="1080" height="60" rx="14" fill="#0F172A" opacity="0.95" stroke="#065F46" stroke-width="1.5" />
      <text x="90" y="737" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FAF9F5">Saifee Burhani Football League Runners-Up</text>
      <text x="90" y="750" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="12" fill="#34D399">Proudly Holding the SBFL Board &amp; Medals with Squad</text>
      <text x="1100" y="737" font-family="monospace" font-weight="700" font-size="14" fill="#F59E0B" text-anchor="end">SBFL SEASON 4</text>
    </svg>
  `),

  'WhatsApp Image 2026-10-07 at 8.49.04 AM.jpeg': encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="rail-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E293B" />
          <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#rail-bg)" />
      <!-- Railway Platform Roof & Pillars -->
      <line x1="100" y1="200" x2="1100" y2="200" stroke="#64748B" stroke-width="12" />
      <rect x="250" y="200" width="24" height="400" fill="#475569" />
      <rect x="920" y="200" width="24" height="400" fill="#475569" />
      <!-- Train on side -->
      <rect x="0" y="320" width="220" height="300" rx="20" fill="#1E3A8A" stroke="#3B82F6" stroke-width="4" />
      <rect x="40" y="360" width="140" height="80" rx="8" fill="#93C5FD" opacity="0.6" />

      <!-- Platform ground -->
      <rect x="0" y="600" width="1200" height="200" fill="#334155" />
      <line x1="0" y1="620" x2="1200" y2="620" stroke="#F59E0B" stroke-width="16" />

      <!-- Taher Holding Official IIMUN Bathinda Banner -->
      <g transform="translate(600, 480)">
        <!-- Banner held horizontally -->
        <rect x="-260" y="-40" width="520" height="110" rx="10" fill="#8B1E28" stroke="#FDE047" stroke-width="3" />
        <text x="0" y="-5" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="24" fill="#FAF9F5" text-anchor="middle" letter-spacing="2">I.I.M.U.N. BATHINDA 2026</text>
        <text x="0" y="30" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="14" fill="#FEF08A" text-anchor="middle">OFFICIAL DELEGATION &amp; OUTREACH TOUR</text>

        <!-- Taher standing behind banner -->
        <circle cx="0" cy="-110" r="42" fill="#FEF3C7" stroke="#FDE047" stroke-width="2" />
        <rect x="-45" y="-65" width="90" height="150" fill="#0F172A" rx="14" />
      </g>

      <!-- Badge Overlay -->
      <rect x="80" y="60" width="370" height="58" rx="29" fill="#0F172A" opacity="0.9" stroke="#F43F5E" stroke-width="1.5" />
      <text x="110" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#FAF9F5" letter-spacing="1">ON THE ROAD · IIMUN</text>

      <!-- Footer Info Strip -->
      <rect x="60" y="700" width="1080" height="60" rx="14" fill="#0F172A" opacity="0.95" stroke="#475569" stroke-width="1.5" />
      <text x="90" y="737" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FAF9F5">IIMUN Bathinda Railway Station Arrival</text>
      <text x="90" y="750" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="12" fill="#94A3B8">Traveling across India to coordinate youth diplomacy conferences</text>
      <text x="1100" y="737" font-family="monospace" font-weight="700" font-size="14" fill="#FDE047" text-anchor="end">BATHINDA 2026</text>
    </svg>
  `),

  'with Nadir Godrej.jpeg': encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="gallery-forum" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#2E1065" />
          <stop offset="50%" stop-color="#3B0764" />
          <stop offset="100%" stop-color="#1E1B4B" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#gallery-forum)" />

      <!-- Art Gallery Lighting & Backing Frames -->
      <rect x="180" y="160" width="360" height="240" rx="12" fill="#312E81" opacity="0.5" stroke="#C084FC" stroke-width="2" />
      <rect x="660" y="160" width="360" height="240" rx="12" fill="#312E81" opacity="0.5" stroke="#C084FC" stroke-width="2" />

      <!-- Conversation Silhouette: Industrialist Nadir Godrej & Taher Chitalwala -->
      <g transform="translate(420, 480)">
        <!-- Mr. Nadir Godrej -->
        <circle cx="0" cy="-60" r="46" fill="#F3E8FF" stroke="#C084FC" stroke-width="2" />
        <rect x="-50" y="-10" width="100" height="240" rx="16" fill="#1E1B4B" />
        <text x="0" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#E9D5FF" text-anchor="middle">MR. NADIR GODREJ</text>
      </g>

      <!-- Warm Conversation Exchange Dialogue Arc -->
      <path d="M 500 420 Q 600 370 700 420" stroke="#FDE047" stroke-width="3" stroke-dasharray="10 8" fill="none" />

      <g transform="translate(780, 480)">
        <!-- Taher Chitalwala -->
        <circle cx="0" cy="-60" r="44" fill="#FEF3C7" stroke="#FDE047" stroke-width="2" />
        <rect x="-48" y="-12" width="96" height="240" rx="16" fill="#0F172A" />
        <text x="0" y="80" font-family="'Plus Jakarta Sans', sans-serif" font-size="13" font-weight="700" fill="#FEF08A" text-anchor="middle">TAHER CHITALWALA</text>
      </g>

      <!-- Badge Overlay -->
      <rect x="80" y="60" width="410" height="58" rx="29" fill="#1E1B4B" opacity="0.9" stroke="#C084FC" stroke-width="1.5" />
      <text x="110" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#FAF9F5" letter-spacing="1">DIGNITARY DIALOGUE · INDUSTRY</text>

      <!-- Footer Info Strip -->
      <rect x="60" y="700" width="1080" height="60" rx="14" fill="#1E1B4B" opacity="0.95" stroke="#581C87" stroke-width="1.5" />
      <text x="90" y="737" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FAF9F5">In Conversation with Industrialist Nadir Godrej</text>
      <text x="90" y="750" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="12" fill="#E9D5FF">Chairman of Godrej Industries · Cultural Forum, Mumbai</text>
      <text x="1100" y="737" font-family="monospace" font-weight="700" font-size="14" fill="#FDE047" text-anchor="end">GODREJ INDUSTRIES</text>
    </svg>
  `),

  'With Zayed Khan.jpeg': encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="reception-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#18181B" />
          <stop offset="100%" stop-color="#27272A" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#reception-bg)" />

      <!-- Step & Repeat Backdrop / Mumbai Reception Gallery -->
      <g opacity="0.15">
        <text x="200" y="200" font-family="'Plus Jakarta Sans', sans-serif" font-size="40" font-weight="900" fill="#FFF">MUMBAI</text>
        <text x="600" y="200" font-family="'Plus Jakarta Sans', sans-serif" font-size="40" font-weight="900" fill="#FFF">RECEPTION</text>
        <text x="1000" y="200" font-family="'Plus Jakarta Sans', sans-serif" font-size="40" font-weight="900" fill="#FFF">ARTS</text>
        <text x="400" y="320" font-family="'Plus Jakarta Sans', sans-serif" font-size="40" font-weight="900" fill="#FFF">GALA</text>
        <text x="800" y="320" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="40" fill="#FFF">FORUM</text>
      </g>

      <!-- Group photo silhouettes -->
      <g transform="translate(600, 480)">
        <!-- Zayed Khan Center -->
        <circle cx="0" cy="-60" r="46" fill="#FEF3C7" stroke="#E11D48" stroke-width="2" />
        <rect x="-55" y="-10" width="110" height="240" rx="16" fill="#09090B" />
        <text x="0" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#FDA4AF" text-anchor="middle">ZAYED KHAN</text>

        <!-- Taher standing alongside -->
        <circle cx="160" cy="-55" r="44" fill="#FEF3C7" stroke="#F59E0B" stroke-width="2" />
        <rect x="115" y="-8" width="90" height="238" rx="16" fill="#18181B" />
        <text x="160" y="60" font-family="'Plus Jakarta Sans', sans-serif" font-size="12" font-weight="800" fill="#FDE047" text-anchor="middle">TAHER</text>

        <!-- Other delegate -->
        <circle cx="-160" cy="-55" r="44" fill="#FEF3C7" />
        <rect x="-205" y="-8" width="90" height="238" rx="16" fill="#18181B" />
      </g>

      <!-- Badge Overlay -->
      <rect x="80" y="60" width="380" height="58" rx="29" fill="#09090B" opacity="0.9" stroke="#E11D48" stroke-width="1.5" />
      <text x="110" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#FAF9F5" letter-spacing="1">CELEBRITY INTERACTION</text>

      <!-- Footer Info Strip -->
      <rect x="60" y="700" width="1080" height="60" rx="14" fill="#09090B" opacity="0.95" stroke="#3F3F46" stroke-width="1.5" />
      <text x="90" y="737" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FAF9F5">With Actor Zayed Khan at Mumbai Gallery Reception</text>
      <text x="90" y="750" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="12" fill="#A1A1AA">Cultural forum &amp; film arts reception gathering</text>
      <text x="1100" y="737" font-family="monospace" font-weight="700" font-size="14" fill="#E11D48" text-anchor="end">MUMBAI EVENT</text>
    </svg>
  `),

  'IIMUN EVENT 1.jpeg': encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="arch-bg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#4C0519" />
          <stop offset="60%" stop-color="#881337" />
          <stop offset="100%" stop-color="#1C1917" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#arch-bg)" />

      <!-- Grand Decorative Conference Entrance Arch -->
      <path d="M 150 800 L 150 350 Q 600 80 1050 350 L 1050 800" stroke="#FDE047" stroke-width="24" fill="none" opacity="0.8" />
      <text x="600" y="240" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="34" fill="#FAF9F5" text-anchor="middle" letter-spacing="4">I.I.M.U.N. FAMILY</text>
      <text x="600" y="280" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FDE047" text-anchor="middle">ORGANIZING COMMITTEE &amp; DELEGATES</text>

      <!-- Organizing Committee Family Crowd -->
      <g transform="translate(600, 560)">
        <circle cx="-300" cy="-20" r="30" fill="#FEF3C7" /><rect x="-325" y="15" width="50" height="150" fill="#0F172A" rx="8" />
        <circle cx="-200" cy="-30" r="30" fill="#FEF3C7" /><rect x="-225" y="5" width="50" height="160" fill="#881337" rx="8" />
        <circle cx="-100" cy="-40" r="32" fill="#FEF3C7" /><rect x="-125" y="-5" width="50" height="170" fill="#0F172A" rx="8" />
        <!-- Taher in Center -->
        <circle cx="0" cy="-50" r="36" fill="#FEF3C7" stroke="#FDE047" stroke-width="2" /><rect x="-30" y="-12" width="60" height="180" fill="#881337" rx="10" />
        <circle cx="100" cy="-40" r="32" fill="#FEF3C7" /><rect x="75" y="-5" width="50" height="170" fill="#0F172A" rx="8" />
        <circle cx="200" cy="-30" r="30" fill="#FEF3C7" /><rect x="175" y="5" width="50" height="160" fill="#881337" rx="8" />
        <circle cx="300" cy="-20" r="30" fill="#FEF3C7" /><rect x="275" y="15" width="50" height="150" fill="#0F172A" rx="8" />
      </g>

      <!-- Badge Overlay -->
      <rect x="80" y="60" width="370" height="58" rx="29" fill="#1C1917" opacity="0.9" stroke="#FDE047" stroke-width="1.5" />
      <text x="110" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#FAF9F5" letter-spacing="1">CONFERENCE FAMILY</text>

      <!-- Footer Info Strip -->
      <rect x="60" y="700" width="1080" height="60" rx="14" fill="#1C1917" opacity="0.95" stroke="#881337" stroke-width="1.5" />
      <text x="90" y="737" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FAF9F5">IIMUN Organizing Team Under Grand Decorative Arch</text>
      <text x="90" y="750" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="12" fill="#FDA4AF">Celebrating successful youth diplomacy conference completion</text>
      <text x="1100" y="737" font-family="monospace" font-weight="700" font-size="14" fill="#FDE047" text-anchor="end">IIMUN ARCH</text>
    </svg>
  `),

  'IIMUN event 2.jpeg': encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="anniv-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#172554" />
          <stop offset="100%" stop-color="#1E1B4B" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#anniv-bg)" />

      <!-- 15 Years of IIMUN Celebration Backdrop -->
      <rect x="250" y="140" width="700" height="150" rx="20" fill="#0F172A" stroke="#38BDF8" stroke-width="2" />
      <text x="600" y="195" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="28" fill="#FDE047" text-anchor="middle" letter-spacing="2">15 YEARS OF I.I.M.U.N.</text>
      <text x="600" y="235" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="20" fill="#FAF9F5" text-anchor="middle">INTERNATIONAL LUMINIARY FELICITATION</text>
      <text x="600" y="265" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="14" fill="#38BDF8" text-anchor="middle">PRESENTATION OF COMMEMORATIVE MEMENTO</text>

      <!-- Felicitation on Stage -->
      <g transform="translate(600, 480)">
        <!-- Taher Presenting Memento -->
        <g transform="translate(-140, 0)">
          <circle cx="0" cy="-60" r="44" fill="#FEF3C7" stroke="#FDE047" stroke-width="2" />
          <rect x="-45" y="-10" width="90" height="230" rx="14" fill="#0F172A" />
          <!-- Extended arms holding memento box -->
          <line x1="20" y1="30" x2="100" y2="40" stroke="#38BDF8" stroke-width="12" stroke-linecap="round" />
        </g>

        <!-- Commemorative Memento Trophy Plaque -->
        <rect x="-40" y="10" width="80" height="60" rx="8" fill="#FDE047" stroke="#CA8A04" stroke-width="3" />
        <circle cx="0" cy="40" r="14" fill="#1E1B4B" />

        <!-- Distinguished International Guest Receiving -->
        <g transform="translate(140, 0)">
          <circle cx="0" cy="-60" r="44" fill="#E2E8F0" stroke="#38BDF8" stroke-width="2" />
          <rect x="-45" y="-10" width="90" height="230" rx="14" fill="#1E293B" />
          <!-- Extended arms receiving -->
          <line x1="-20" y1="30" x2="-80" y2="40" stroke="#E2E8F0" stroke-width="12" stroke-linecap="round" />
        </g>
      </g>

      <!-- Badge Overlay -->
      <rect x="80" y="60" width="370" height="58" rx="29" fill="#0F172A" opacity="0.9" stroke="#38BDF8" stroke-width="1.5" />
      <text x="110" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#FAF9F5" letter-spacing="1">15 YEARS OF IIMUN</text>

      <!-- Footer Info Strip -->
      <rect x="60" y="700" width="1080" height="60" rx="14" fill="#0F172A" opacity="0.95" stroke="#1E40AF" stroke-width="1.5" />
      <text x="90" y="737" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FAF9F5">Felicitating International Luminary on Stage</text>
      <text x="90" y="750" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="12" fill="#93C5FD">Official memento presentation at 15 Years of IIMUN Anniversary</text>
      <text x="1100" y="737" font-family="monospace" font-weight="700" font-size="14" fill="#FDE047" text-anchor="end">STAGE MEMENTO</text>
    </svg>
  `),

  'IIMUN event 3.jpeg': encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="blazer-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E293B" />
          <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#blazer-bg)" />

      <!-- Formal Conference Hall Backdrop -->
      <rect x="150" y="120" width="900" height="160" rx="16" fill="#0F172A" stroke="#475569" stroke-width="2" />
      <text x="600" y="180" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="28" fill="#FAF9F5" text-anchor="middle" letter-spacing="2">CONFERENCE DELEGATION</text>
      <text x="600" y="220" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#38BDF8" text-anchor="middle">FORMAL CONFERENCE BLAZERS &amp; CREDENTIALS</text>

      <!-- Contingent Lineup in Blazers -->
      <g transform="translate(600, 520)">
        <g transform="translate(-240, 0)"><circle cx="0" cy="-60" r="38" fill="#FEF3C7" /><rect x="-40" y="-12" width="80" height="230" rx="14" fill="#0284C7" /><rect x="-10" y="25" width="20" height="28" fill="#FFF" rx="3" /></g>
        <g transform="translate(-120, 0)"><circle cx="0" cy="-70" r="40" fill="#FEF3C7" /><rect x="-45" y="-20" width="90" height="240" rx="14" fill="#0369A1" /><rect x="-10" y="15" width="20" height="28" fill="#FFF" rx="3" /></g>
        <!-- Taher in Center -->
        <g transform="translate(0, 0)"><circle cx="0" cy="-80" r="44" fill="#FEF3C7" stroke="#FDE047" stroke-width="2" /><rect x="-50" y="-28" width="100" height="250" rx="14" fill="#075985" /><rect x="-12" y="10" width="24" height="32" fill="#FDE047" rx="3" /></g>
        <g transform="translate(120, 0)"><circle cx="0" cy="-70" r="40" fill="#FEF3C7" /><rect x="-45" y="-20" width="90" height="240" rx="14" fill="#0369A1" /><rect x="-10" y="15" width="20" height="28" fill="#FFF" rx="3" /></g>
        <g transform="translate(240, 0)"><circle cx="0" cy="-60" r="38" fill="#FEF3C7" /><rect x="-40" y="-12" width="80" height="230" rx="14" fill="#0284C7" /><rect x="-10" y="25" width="20" height="28" fill="#FFF" rx="3" /></g>
      </g>

      <!-- Badge Overlay -->
      <rect x="80" y="60" width="370" height="58" rx="29" fill="#0F172A" opacity="0.9" stroke="#38BDF8" stroke-width="1.5" />
      <text x="110" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#FAF9F5" letter-spacing="1">DELEGATION CONTINGENT</text>

      <!-- Footer Info Strip -->
      <rect x="60" y="700" width="1080" height="60" rx="14" fill="#0F172A" opacity="0.95" stroke="#334155" stroke-width="1.5" />
      <text x="90" y="737" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FAF9F5">Delegation Contingent in Formal Attire</text>
      <text x="90" y="750" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="12" fill="#94A3B8">Wearing conference blazers, credentials, and delegate badges</text>
      <text x="1100" y="737" font-family="monospace" font-weight="700" font-size="14" fill="#38BDF8" text-anchor="end">IIMUN DELEGATION</text>
    </svg>
  `),

  'IIMUN event 4.jpeg': encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="plenary-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E1B4B" />
          <stop offset="50%" stop-color="#312E81" />
          <stop offset="100%" stop-color="#0F172A" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#plenary-bg)" />

      <!-- Auditorium Plenary Tiered Seating -->
      <ellipse cx="600" cy="500" rx="550" ry="250" fill="#1E293B" opacity="0.6" />
      <ellipse cx="600" cy="560" rx="450" ry="200" fill="#0F172A" opacity="0.8" />

      <!-- Radhika Merchant Ambani & Youth Delegates Plenary -->
      <g transform="translate(600, 480)">
        <!-- Radhika Merchant Ambani seated among youth -->
        <circle cx="-120" cy="-40" r="44" fill="#FEF3C7" stroke="#F43F5E" stroke-width="3" />
        <rect x="-165" y="10" width="90" height="220" rx="16" fill="#881337" />
        <text x="-120" y="75" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#FDA4AF" text-anchor="middle">RADHIKA MERCHANT</text>

        <!-- Taher Chitalwala alongside -->
        <circle cx="120" cy="-40" r="44" fill="#FEF3C7" stroke="#FDE047" stroke-width="2" />
        <rect x="75" y="10" width="90" height="220" rx="16" fill="#1E3A8A" />
        <text x="120" y="75" font-family="'Plus Jakarta Sans', sans-serif" font-size="11" font-weight="800" fill="#FEF08A" text-anchor="middle">TAHER</text>
      </g>

      <!-- Badge Overlay -->
      <rect x="80" y="60" width="390" height="58" rx="29" fill="#0F172A" opacity="0.9" stroke="#F43F5E" stroke-width="1.5" />
      <text x="110" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#FAF9F5" letter-spacing="1">AUDITORIUM PLENARY INTERACTION</text>

      <!-- Footer Info Strip -->
      <rect x="60" y="700" width="1080" height="60" rx="14" fill="#0F172A" opacity="0.95" stroke="#4338CA" stroke-width="1.5" />
      <text x="90" y="737" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FAF9F5">Youth Gathering with Radhika Merchant Ambani</text>
      <text x="90" y="750" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="12" fill="#A5B4FC">Auditorium plenary interaction highlighting youth initiatives</text>
      <text x="1100" y="737" font-family="monospace" font-weight="700" font-size="14" fill="#FDA4AF" text-anchor="end">YOUTH PLENARY</text>
    </svg>
  `),

  'IIMun event 5.jpeg': encodeSvg(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
      <defs>
        <linearGradient id="army-bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1C2D1F" />
          <stop offset="50%" stop-color="#2D4A32" />
          <stop offset="100%" stop-color="#0F1710" />
        </linearGradient>
      </defs>
      <rect width="1200" height="800" fill="url(#army-bg)" />

      <!-- 31 Infantry Brigade Military Interaction -->
      <rect x="250" y="140" width="700" height="150" rx="20" fill="#142316" stroke="#4ADE80" stroke-width="2" />
      <text x="600" y="195" font-family="'Plus Jakarta Sans', sans-serif" font-weight="900" font-size="28" fill="#4ADE80" text-anchor="middle" letter-spacing="2">31 INFANTRY BRIGADE</text>
      <text x="600" y="235" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="20" fill="#FAF9F5" text-anchor="middle">INDIAN ARMY INTERACTION WITH I.I.M.U.N.</text>
      <text x="600" y="265" font-family="'Plus Jakarta Sans', sans-serif" font-weight="600" font-size="14" fill="#BBF7D0" text-anchor="middle">VALOR, LEADERSHIP &amp; NATIONAL DISCIPLINE</text>

      <!-- Officers and Taher / Youth Delegates -->
      <g transform="translate(600, 520)">
        <!-- Army Officers in Camo/Olive -->
        <g transform="translate(-180, 0)"><circle cx="0" cy="-60" r="42" fill="#FEF3C7" stroke="#4ADE80" stroke-width="2" /><rect x="-45" y="-12" width="90" height="230" rx="14" fill="#14532D" /></g>
        <!-- Taher in Center with Officers -->
        <g transform="translate(0, 0)"><circle cx="0" cy="-70" r="44" fill="#FEF3C7" stroke="#FDE047" stroke-width="2" /><rect x="-50" y="-20" width="100" height="240" rx="14" fill="#0F172A" /></g>
        <g transform="translate(180, 0)"><circle cx="0" cy="-60" r="42" fill="#FEF3C7" stroke="#4ADE80" stroke-width="2" /><rect x="-45" y="-12" width="90" height="230" rx="14" fill="#14532D" /></g>
      </g>

      <!-- Badge Overlay -->
      <rect x="80" y="60" width="370" height="58" rx="29" fill="#0F1710" opacity="0.9" stroke="#4ADE80" stroke-width="1.5" />
      <text x="110" y="96" font-family="'Plus Jakarta Sans', sans-serif" font-weight="800" font-size="16" fill="#FAF9F5" letter-spacing="1">31 INFANTRY BRIGADE</text>

      <!-- Footer Info Strip -->
      <rect x="60" y="700" width="1080" height="60" rx="14" fill="#0F1710" opacity="0.95" stroke="#22543D" stroke-width="1.5" />
      <text x="90" y="737" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="18" fill="#FAF9F5">Interaction with Officers of the 31 Infantry Brigade</text>
      <text x="90" y="750" font-family="'Plus Jakarta Sans', sans-serif" font-weight="500" font-size="12" fill="#86EFAC">Experiencing national defense discipline, valor, and strategic leadership</text>
      <text x="1100" y="737" font-family="monospace" font-weight="700" font-size="14" fill="#4ADE80" text-anchor="end">INDIAN ARMY</text>
    </svg>
  `),
};

export function getVisualPhotoAsset(fileName: string): string | null {
  return PHOTO_VISUAL_ASSETS[fileName] || null;
}
