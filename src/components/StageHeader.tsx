import React from 'react';
import { Volume2, VolumeX, Sparkles } from 'lucide-react';

interface StageHeaderProps {
  isPlaying: boolean;
  onTogglePlay: () => void;
  volume: number;
  onVolumeChange: (vol: number) => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const StageHeader: React.FC<StageHeaderProps> = ({
  isPlaying,
  onTogglePlay,
  volume,
  onVolumeChange,
  activeSection,
  setActiveSection,
}) => {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-black/90 backdrop-blur-md">
      {/* Zone 1: Single text element wordmark */}
      <a
        href="#stage"
        onClick={() => setActiveSection('stage')}
        className="text-lg font-bold tracking-tight text-white flex items-center gap-2"
        style={{ fontFamily: "'Syne', sans-serif" }}
      >
        <span className="text-amber-400">KING OF POP</span>
        <span className="text-xs font-mono text-neutral-400 tracking-wider font-normal">STUDIO</span>
      </a>

      {/* Zone 2: 4-6 clean text navigation links */}
      <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-neutral-400">
        <button
          onClick={() => setActiveSection('stage')}
          className={`hover:text-white transition-colors cursor-pointer ${
            activeSection === 'stage' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Concert Stage
        </button>
        <button
          onClick={() => setActiveSection('floor')}
          className={`hover:text-white transition-colors cursor-pointer ${
            activeSection === 'floor' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Billie Jean Floor
        </button>
        <button
          onClick={() => setActiveSection('tracks')}
          className={`hover:text-white transition-colors cursor-pointer ${
            activeSection === 'tracks' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Tracklist
        </button>
        <button
          onClick={() => setActiveSection('soundboard')}
          className={`hover:text-white transition-colors cursor-pointer ${
            activeSection === 'soundboard' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Soundboard
        </button>
        <button
          onClick={() => setActiveSection('mixer')}
          className={`hover:text-white transition-colors cursor-pointer ${
            activeSection === 'mixer' ? 'text-amber-400 font-semibold' : ''
          }`}
        >
          Stem Mixer
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-4">
        {/* Quick volume control */}
        <div className="hidden sm:flex items-center gap-2 text-neutral-400">
          <button
            onClick={() => onVolumeChange(volume > 0 ? 0 : 0.85)}
            className="hover:text-white transition-colors cursor-pointer"
            aria-label="Toggle Mute"
          >
            {volume === 0 ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="w-20 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            aria-label="Volume Slider"
          />
        </div>

        {/* Start / Toggle Button */}
        <button
          onClick={onTogglePlay}
          className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all duration-200 cursor-pointer flex items-center gap-2 whitespace-nowrap ${
            isPlaying
              ? 'bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700'
              : 'bg-amber-400 text-black hover:bg-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.35)]'
          }`}
        >
          {isPlaying ? (
            <>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Pause Music
            </>
          ) : (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              Start Music
            </>
          )}
        </button>
      </div>
    </header>
  );
};
