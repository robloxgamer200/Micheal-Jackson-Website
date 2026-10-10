import React, { useMemo } from 'react';

interface MoonwalkerSilhouetteProps {
  isPlaying: boolean;
  bpm: number;
  currentStep: number;
  accentColor: string;
}

export const MoonwalkerSilhouette: React.FC<MoonwalkerSilhouetteProps> = ({
  isPlaying,
  currentStep,
  accentColor,
}) => {
  // Moonwalk sliding offset: 0 to 100% across the floor
  // Calculate a smooth cyclic slide based on currentStep (0 to 31)
  const slidePercent = useMemo(() => {
    // 32-step cycle slides from right to left smoothly (authentic moonwalk slides backward)
    return ((currentStep % 32) / 32) * 100;
  }, [currentStep]);

  const isBassHit = currentStep % 2 === 0;

  return (
    <div className="relative w-full h-80 rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900 via-neutral-950 to-black border border-neutral-800 shadow-2xl flex flex-col justify-end">
      {/* Background concert haze and atmospheric glow */}
      <div
        className="absolute inset-0 opacity-40 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 50% 30%, ${accentColor}33, transparent 70%)`,
        }}
      />

      {/* Twin Dynamic Stage Spotlights */}
      <div
        className={`absolute -top-10 left-1/4 w-32 h-[450px] origin-top pointer-events-none transition-transform duration-700 ease-out ${
          isPlaying ? 'opacity-35 rotate-[-15deg]' : 'opacity-10 rotate-[-8deg]'
        }`}
        style={{
          background:
            'conic-gradient(from 180deg at 50% 0%, rgba(255,255,255,0.7) 0deg, rgba(251,191,36,0.3) 25deg, transparent 40deg)',
          filter: 'blur(12px)',
        }}
      />
      <div
        className={`absolute -top-10 right-1/4 w-32 h-[450px] origin-top pointer-events-none transition-transform duration-700 ease-out ${
          isPlaying ? 'opacity-35 rotate-[15deg]' : 'opacity-10 rotate-[8deg]'
        }`}
        style={{
          background:
            'conic-gradient(from 180deg at 50% 0%, rgba(255,255,255,0.7) 0deg, rgba(56,189,248,0.3) 25deg, transparent 40deg)',
          filter: 'blur(12px)',
        }}
      />

      {/* Arena Stage Floor line */}
      <div className="absolute bottom-0 inset-x-0 h-16 bg-neutral-950 border-t border-neutral-700/60 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
        {/* Subtle stage floor plank lines */}
        <div className="w-full h-full flex divide-x divide-neutral-900 opacity-40">
          {Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="flex-1" />
          ))}
        </div>
      </div>

      {/* Animated Moonwalk Silhouette Container */}
      <div
        className="relative z-10 w-full h-64 flex items-end justify-center pointer-events-none transition-all duration-150"
        style={{
          transform: isPlaying
            ? `translateX(${20 - (slidePercent * 0.4)}%)`
            : 'translateX(0%)',
        }}
      >
        {/* Floor reflection halo */}
        <div
          className={`absolute bottom-2 w-32 h-6 rounded-full blur-md transition-all duration-150 ${
            isPlaying && isBassHit ? 'bg-amber-400/40 scale-125' : 'bg-white/10 scale-100'
          }`}
        />

        {/* SVG Silhouette of Michael Jackson in iconic pose with Fedora & Sequin Glove */}
        <svg
          viewBox="0 0 200 320"
          className={`h-56 w-auto transition-transform duration-100 filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.9)] ${
            isPlaying && isBassHit ? 'scale-[1.01]' : 'scale-100'
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle rim light silhouette glow */}
          <defs>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <linearGradient id="silverGlove" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#94a3b8" />
            </linearGradient>
            <linearGradient id="fedoraBand" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
          </defs>

          {/* Shadow */}
          <ellipse cx="100" cy="305" rx="55" ry="8" fill="rgba(0,0,0,0.7)" />

          {/* Loafers and sparkling white socks */}
          {/* Left leg & shoe (front foot sliding back) */}
          <path
            d="M 85 240 L 78 285 L 60 295 L 82 298 L 92 285 Z"
            fill="#0f172a"
          />
          {/* White sock left */}
          <rect x="75" y="278" width="9" height="9" fill="#f8fafc" />

          {/* Right leg & shoe (back foot propped on toe tip) */}
          <path
            d="M 105 240 L 115 282 L 125 300 L 120 300 L 110 282 Z"
            fill="#0f172a"
          />
          {/* White sock right */}
          <rect x="110" y="276" width="9" height="9" fill="#f8fafc" />

          {/* Ankle-length cropped trousers with sleek crease */}
          <path
            d="M 80 160 L 98 165 L 110 245 L 98 250 L 95 195 L 85 245 L 75 242 Z"
            fill="#171717"
            stroke="#262626"
            strokeWidth="1.5"
          />

          {/* Slim black jacket & white V-neck undershirt */}
          <path
            d="M 72 105 L 122 105 L 116 168 L 78 168 Z"
            fill="#0a0a0a"
          />
          {/* White undershirt V */}
          <path
            d="M 92 105 L 102 105 L 97 130 Z"
            fill="#f8fafc"
          />

          {/* Silver armband on right sleeve */}
          <rect x="114" y="118" width="8" height="6" rx="1" fill="#e2e8f0" />

          {/* Left Arm resting casually / bent */}
          <path
            d="M 73 108 L 52 145 L 62 170 L 68 166 L 58 146 L 76 112 Z"
            fill="#0a0a0a"
          />

          {/* Right Arm raised with the ICONIC GLITTERING WHITE GLOVE */}
          <path
            d="M 120 108 L 145 88 L 158 55 L 164 58 L 152 92 L 124 116 Z"
            fill="#0a0a0a"
          />

          {/* The Sparkling White Glove */}
          <g filter="url(#glow)">
            <circle cx="160" cy="50" r="7" fill="url(#silverGlove)" />
            {/* Extended fingers */}
            <path
              d="M 160 45 L 166 38 M 162 44 L 169 42 M 163 47 L 171 47 M 158 52 L 165 56"
              stroke="#ffffff"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Glove sparkle sparkles */}
            <circle cx="165" cy="42" r="1.5" fill="#fef08a" />
            <circle cx="158" cy="48" r="1.2" fill="#ffffff" />
          </g>

          {/* Neck and Head Silhouette */}
          <path
            d="M 94 90 L 102 90 L 102 105 L 94 105 Z"
            fill="#1e293b"
          />
          {/* Profile tilted down */}
          <circle cx="98" cy="82" r="14" fill="#0f172a" />

          {/* The Iconic Black Fedora Hat tilted forward */}
          <g>
            {/* Brim tilted */}
            <ellipse
              cx="98"
              cy="76"
              rx="28"
              ry="7"
              fill="#09090b"
              transform="rotate(-8 98 76)"
            />
            {/* Crown */}
            <path
              d="M 83 75 C 83 60, 90 54, 98 54 C 106 54, 113 60, 113 75 Z"
              fill="#18181b"
              transform="rotate(-8 98 76)"
            />
            {/* White/Silver Fedora Ribbon Band */}
            <path
              d="M 84 72 L 112 72 L 112 75 L 84 75 Z"
              fill="url(#fedoraBand)"
              transform="rotate(-8 98 76)"
            />
          </g>
        </svg>
      </div>

      {/* Floating Concert Badges / Indicator */}
      <div className="absolute top-4 left-5 z-20 flex items-center gap-2">
        <span className="text-xs font-mono text-neutral-400">
          STAGE 01 <span className="text-neutral-600">/</span> LIVE ARENA
        </span>
      </div>

      <div className="absolute top-4 right-5 z-20 flex items-center gap-2">
        {isPlaying ? (
          <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            MOONWALKING IN SYNC
          </span>
        ) : (
          <span className="text-xs font-mono text-neutral-500">
            PRESS START TO DANCE
          </span>
        )}
      </div>
    </div>
  );
};
