import React, { useState } from 'react';
import { mjEngine } from '../audio/mjAudioEngine';

interface IlluminatedFloorProps {
  currentStep: number;
  isPlaying: boolean;
  accentColor: string;
}

const TILE_NOTES = [
  'F#2', 'G#2', 'A2', 'B2',
  'C#3', 'D3', 'E3', 'F#3',
  'G#3', 'A3', 'B3', 'C#4',
  'D4', 'E4', 'F#4', 'A4'
];

export const IlluminatedFloor: React.FC<IlluminatedFloorProps> = ({
  currentStep,
  isPlaying,
  accentColor,
}) => {
  const [clickedTile, setClickedTile] = useState<number | null>(null);

  // Determine active illuminated tile from the step pattern (e.g. 16 tiles)
  // Step is 0 to 31 -> map to 0 to 15
  const activeTileIndex = isPlaying ? Math.floor(currentStep / 2) % 16 : null;

  const handleTileClick = (index: number) => {
    setClickedTile(index);
    // Play a funky synth stab on manual tile tap
    mjEngine.init();
    // Also trigger soundboard ad-lib if tapped on corner
    if (index === 0) mjEngine.playVocalAdlib('hee_hee');
    else if (index === 3) mjEngine.playVocalAdlib('shamone');
    else if (index === 12) mjEngine.playVocalAdlib('woo');
    else if (index === 15) mjEngine.playVocalAdlib('ow');

    setTimeout(() => {
      setClickedTile(null);
    }, 400);
  };

  return (
    <div className="w-full bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h3
            className="text-xl font-bold tracking-tight text-white flex items-center gap-2"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Billie Jean Illuminated Sidewalk
          </h3>
          <p className="text-sm text-neutral-400 mt-0.5">
            Pavement tiles light up with footsteps and bass notes — click any tile to trigger step lights & ad-libs.
          </p>
        </div>

        <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
          <span>STEP {isPlaying ? `${currentStep + 1}/32` : 'IDLE'}</span>
          <span className="text-neutral-600">·</span>
          <span>16 TILES ACTIVE</span>
        </div>
      </div>

      {/* Grid of 16 Illuminated Sidewalk Paving Tiles (4x4) */}
      <div className="grid grid-cols-4 sm:grid-cols-8 gap-3 sm:gap-4 perspective-1000">
        {Array.from({ length: 16 }).map((_, idx) => {
          const isSteppedOn = activeTileIndex === idx;
          const isClicked = clickedTile === idx;
          const isLit = isSteppedOn || isClicked;

          return (
            <button
              key={idx}
              onClick={() => handleTileClick(idx)}
              className={`relative h-20 sm:h-24 rounded-xl border transition-all duration-150 cursor-pointer flex flex-col justify-between p-2.5 overflow-hidden select-none group text-left ${
                isLit
                  ? 'border-white bg-gradient-to-t from-white via-amber-100 to-amber-300 text-neutral-950 scale-105 shadow-[0_0_35px_rgba(251,191,36,0.85)] z-10'
                  : 'border-neutral-800/80 bg-neutral-950/80 hover:border-neutral-600 hover:bg-neutral-900 text-neutral-400'
              }`}
              style={{
                boxShadow: isLit
                  ? `0 0 40px ${accentColor}, 0 0 15px rgba(255,255,255,0.9)`
                  : undefined,
              }}
            >
              {/* Tile specular flare */}
              {isLit && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent pointer-events-none animate-pulse" />
              )}

              {/* Tile label / note index */}
              <div className="flex items-center justify-between w-full z-10">
                <span
                  className={`text-[10px] font-mono tracking-wider ${
                    isLit ? 'text-neutral-900 font-bold' : 'text-neutral-500'
                  }`}
                >
                  0{idx + 1}
                </span>

                <span
                  className={`text-[10px] font-mono ${
                    isLit ? 'text-amber-900 font-bold' : 'text-neutral-500'
                  }`}
                >
                  {TILE_NOTES[idx]}
                </span>
              </div>

              {/* Sidewalk pavement texture lines */}
              <div className="z-10 flex items-end justify-between w-full">
                <span
                  className={`text-xs font-semibold tracking-tight transition-colors ${
                    isLit ? 'text-black' : 'text-neutral-400 group-hover:text-white'
                  }`}
                >
                  {idx === 0
                    ? 'Hee-Hee'
                    : idx === 3
                    ? 'Shamone'
                    : idx === 12
                    ? 'Woo!'
                    : idx === 15
                    ? 'Ow!'
                    : 'Tile'}
                </span>

                {/* Status indicator dot */}
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    isLit ? 'bg-amber-600 animate-ping' : 'bg-neutral-700'
                  }`}
                />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
