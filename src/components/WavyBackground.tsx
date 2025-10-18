interface WavyBackgroundProps {
  darkMode?: boolean;
}

export function WavyBackground({ darkMode = false }: WavyBackgroundProps) {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden">
      <svg
        className="absolute w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgb(151, 223, 252)', stopOpacity: 0.4 }} />
            <stop offset="100%" style={{ stopColor: 'rgb(173, 252, 146)', stopOpacity: 0.3 }} />
          </linearGradient>
          
          <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgb(173, 252, 146)', stopOpacity: 0.35 }} />
            <stop offset="100%" style={{ stopColor: 'rgb(15, 255, 149)', stopOpacity: 0.25 }} />
          </linearGradient>
          
          <linearGradient id="wave-gradient-3" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{ stopColor: 'rgb(239, 208, 202)', stopOpacity: 0.3 }} />
            <stop offset="100%" style={{ stopColor: 'rgb(151, 223, 252)', stopOpacity: 0.25 }} />
          </linearGradient>

          <linearGradient id="wave-gradient-4" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'rgb(15, 255, 149)', stopOpacity: 0.2 }} />
            <stop offset="100%" style={{ stopColor: 'rgb(173, 252, 146)', stopOpacity: 0.15 }} />
          </linearGradient>
        </defs>

        {/* Base background */}
        <rect width="1440" height="800" fill={darkMode ? "rgb(114, 120, 141)" : "#ffffff"} />

        {/* Wave 1 - Bottom flowing wave */}
        <path
          d="M0,400 C240,320 480,320 720,400 C960,480 1200,480 1440,400 L1440,800 L0,800 Z"
          fill="url(#wave-gradient-1)"
        >
          <animate
            attributeName="d"
            dur="20s"
            repeatCount="indefinite"
            values="
              M0,400 C240,320 480,320 720,400 C960,480 1200,480 1440,400 L1440,800 L0,800 Z;
              M0,450 C240,370 480,370 720,450 C960,530 1200,530 1440,450 L1440,800 L0,800 Z;
              M0,400 C240,320 480,320 720,400 C960,480 1200,480 1440,400 L1440,800 L0,800 Z
            "
          />
        </path>

        {/* Wave 2 - Middle flowing wave */}
        <path
          d="M0,300 C360,220 600,280 900,240 C1200,200 1320,280 1440,220 L1440,800 L0,800 Z"
          fill="url(#wave-gradient-2)"
        >
          <animate
            attributeName="d"
            dur="25s"
            repeatCount="indefinite"
            values="
              M0,300 C360,220 600,280 900,240 C1200,200 1320,280 1440,220 L1440,800 L0,800 Z;
              M0,350 C360,270 600,330 900,290 C1200,250 1320,330 1440,270 L1440,800 L0,800 Z;
              M0,300 C360,220 600,280 900,240 C1200,200 1320,280 1440,220 L1440,800 L0,800 Z
            "
          />
        </path>

        {/* Wave 3 - Top wave from right */}
        <path
          d="M0,150 C480,100 720,180 1080,120 C1260,90 1380,140 1440,100 L1440,800 L0,800 Z"
          fill="url(#wave-gradient-3)"
        >
          <animate
            attributeName="d"
            dur="30s"
            repeatCount="indefinite"
            values="
              M0,150 C480,100 720,180 1080,120 C1260,90 1380,140 1440,100 L1440,800 L0,800 Z;
              M0,200 C480,150 720,230 1080,170 C1260,140 1380,190 1440,150 L1440,800 L0,800 Z;
              M0,150 C480,100 720,180 1080,120 C1260,90 1380,140 1440,100 L1440,800 L0,800 Z
            "
          />
        </path>

        {/* Wave 4 - Subtle top wave */}
        <path
          d="M0,80 C300,40 600,100 900,60 C1200,20 1320,80 1440,50 L1440,800 L0,800 Z"
          fill="url(#wave-gradient-4)"
        >
          <animate
            attributeName="d"
            dur="35s"
            repeatCount="indefinite"
            values="
              M0,80 C300,40 600,100 900,60 C1200,20 1320,80 1440,50 L1440,800 L0,800 Z;
              M0,120 C300,80 600,140 900,100 C1200,60 1320,120 1440,90 L1440,800 L0,800 Z;
              M0,80 C300,40 600,100 900,60 C1200,20 1320,80 1440,50 L1440,800 L0,800 Z
            "
          />
        </path>

        {/* Accent circles for depth */}
        <circle cx="200" cy="600" r="120" fill="rgb(151, 223, 252)" opacity="0.2">
          <animate attributeName="cy" dur="40s" repeatCount="indefinite" values="600;550;600" />
        </circle>
        
        <circle cx="1200" cy="500" r="150" fill="rgb(173, 252, 146)" opacity="0.18">
          <animate attributeName="cy" dur="35s" repeatCount="indefinite" values="500;450;500" />
        </circle>

        <circle cx="700" cy="650" r="100" fill="rgb(15, 255, 149)" opacity="0.15">
          <animate attributeName="cy" dur="45s" repeatCount="indefinite" values="650;600;650" />
        </circle>
      </svg>
    </div>
  );
}
