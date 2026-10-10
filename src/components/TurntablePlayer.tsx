import React from 'react';
import { TrackDefinition, TRACKS } from '../audio/mjAudioEngine';
import { Disc3, Sliders, Play, Pause, SkipForward, SkipBack, Music2 } from 'lucide-react';

interface TurntablePlayerProps {
  currentTrack: TrackDefinition;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onSelectTrack: (trackId: string) => void;
  bpm: number;
  onBpmChange: (bpm: number) => void;
  mutes: {
    drums: boolean;
    bass: boolean;
    chords: boolean;
    lead: boolean;
    vocals: boolean;
  };
  onToggleMute: (stem: 'drums' | 'bass' | 'chords' | 'lead' | 'vocals') => void;
}

export const TurntablePlayer: React.FC<TurntablePlayerProps> = ({
  currentTrack,
  isPlaying,
  onTogglePlay,
  onSelectTrack,
  bpm,
  onBpmChange,
  mutes,
  onToggleMute,
}) => {
  const currentIdx = TRACKS.findIndex((t) => t.id === currentTrack.id);

  const handleNext = () => {
    const nextIdx = (currentIdx + 1) % TRACKS.length;
    onSelectTrack(TRACKS[nextIdx].id);
  };

  const handlePrev = () => {
    const prevIdx = (currentIdx - 1 + TRACKS.length) % TRACKS.length;
    onSelectTrack(TRACKS[prevIdx].id);
  };

  return (
    <div className="w-full bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Vinyl Turntable Display (Left Column) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center">
          <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full p-2 bg-gradient-to-tr from-neutral-950 via-neutral-900 to-neutral-800 border-4 border-neutral-800 shadow-2xl flex items-center justify-center overflow-hidden">
            {/* Vinyl record disc */}
            <div
              className={`w-full h-full rounded-full relative flex items-center justify-center transition-all ${
                isPlaying ? 'animate-[spin_4s_linear_infinite]' : ''
              }`}
              style={{
                background:
                  'radial-gradient(circle, #171717 0%, #0a0a0a 40%, #1c1917 60%, #0a0a0a 100%)',
                boxShadow: 'inset 0 0 30px rgba(0,0,0,0.9), 0 10px 30px rgba(0,0,0,0.8)',
              }}
            >
              {/* Vinyl grooves rings */}
              <div className="absolute inset-4 rounded-full border border-neutral-800/40 pointer-events-none" />
              <div className="absolute inset-8 rounded-full border border-neutral-800/60 pointer-events-none" />
              <div className="absolute inset-12 rounded-full border border-neutral-800/50 pointer-events-none" />
              <div className="absolute inset-16 rounded-full border border-neutral-800/40 pointer-events-none" />
              <div className="absolute inset-20 rounded-full border border-neutral-800/50 pointer-events-none" />

              {/* Light reflection sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none rounded-full" />

              {/* Center Record Label */}
              <div
                className="w-24 h-24 rounded-full border-2 border-neutral-700 flex flex-col items-center justify-center text-center p-2 z-10 shadow-lg relative overflow-hidden"
                style={{
                  backgroundColor: currentTrack.accentColor,
                  color: '#000000',
                }}
              >
                <div className="text-[9px] font-bold tracking-widest uppercase opacity-80">
                  EPIC RECORDS
                </div>
                <div className="text-xs font-black tracking-tight leading-tight line-clamp-1">
                  {currentTrack.title}
                </div>
                <div className="text-[8px] font-mono opacity-80">
                  {currentTrack.bpm} BPM · 45 RPM
                </div>
                <div className="text-[7px] font-semibold mt-0.5">
                  KING OF POP
                </div>

                {/* Center spindle hole */}
                <div className="w-3.5 h-3.5 rounded-full bg-neutral-900 border border-neutral-600 mt-0.5" />
              </div>
            </div>

            {/* Turntable Tonearm */}
            <div
              className={`absolute top-4 right-4 w-12 h-44 origin-top-right transition-transform duration-700 pointer-events-none z-20 ${
                isPlaying ? 'rotate-[26deg]' : 'rotate-[2deg]'
              }`}
            >
              {/* Pivot base */}
              <div className="absolute top-0 right-0 w-6 h-6 rounded-full bg-neutral-400 border-2 border-neutral-600 shadow-md" />
              {/* Metallic arm bar */}
              <div className="absolute top-3 right-2.5 w-1 h-36 bg-gradient-to-b from-neutral-300 to-neutral-500 rounded-sm" />
              {/* Cartridge & stylus head */}
              <div className="absolute bottom-4 right-0 w-4 h-6 bg-neutral-900 border border-neutral-400 rounded-sm rotate-[-15deg] flex items-center justify-center">
                <div className="w-1 h-2 bg-amber-400" />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
              title="Previous Track"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            <button
              onClick={onTogglePlay}
              className={`px-5 py-2.5 rounded-full font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isPlaying
                  ? 'bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700'
                  : 'bg-amber-400 text-neutral-950 hover:bg-amber-300 shadow-[0_0_20px_rgba(251,191,36,0.5)]'
              }`}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-black" />}
              <span>{isPlaying ? 'Pause' : 'Play Track'}</span>
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full bg-neutral-800 hover:bg-neutral-700 text-white transition-colors cursor-pointer"
              title="Next Track"
            >
              <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tracklist & Stem Mixing Console (Right Column) */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {/* Track Selector List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Disc3 className="w-4 h-4 text-amber-400" />
                Select Michael Jackson Classic
              </span>
              <span className="text-xs text-neutral-500 font-mono">
                {TRACKS.length} MASTER TRACKS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {TRACKS.map((t) => {
                const isSelected = t.id === currentTrack.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => onSelectTrack(t.id)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between group ${
                      isSelected
                        ? 'border-amber-400/80 bg-neutral-900 text-white shadow-lg'
                        : 'border-neutral-800 bg-neutral-950/60 hover:border-neutral-700 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-2.5 h-8 rounded-full shrink-0"
                        style={{ backgroundColor: t.accentColor }}
                      />
                      <div>
                        <div className="text-sm font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
                          {t.title}
                        </div>
                        <div className="text-[11px] text-neutral-400">
                          {t.album} ({t.year}) · {t.bpm} BPM
                        </div>
                      </div>
                    </div>

                    {isSelected && isPlaying ? (
                      <span className="flex gap-0.5 items-end h-3">
                        <span className="w-1 h-full bg-amber-400 animate-[bounce_0.6s_ease-in-out_infinite]" />
                        <span className="w-1 h-2/3 bg-amber-400 animate-[bounce_0.8s_ease-in-out_infinite]" />
                        <span className="w-1 h-4/5 bg-amber-400 animate-[bounce_0.7s_ease-in-out_infinite]" />
                      </span>
                    ) : (
                      <Music2 className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Stem Mixing Desk & Controls */}
          <div className="pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-400" />
                Stem Mixing Consoles (Toggle to Solo/Mute)
              </span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-neutral-400">TEMPO: {bpm} BPM</span>
                <button
                  onClick={() => onBpmChange(currentTrack.bpm)}
                  className="text-[10px] font-mono text-amber-400 hover:underline cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Tempo Slider */}
            <div className="mb-4 flex items-center gap-3">
              <span className="text-xs text-neutral-500 font-mono w-14">80 BPM</span>
              <input
                type="range"
                min="80"
                max="160"
                step="1"
                value={bpm}
                onChange={(e) => onBpmChange(parseInt(e.target.value, 10))}
                className="flex-1 h-1.5 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
              />
              <span className="text-xs text-neutral-500 font-mono w-14 text-right">160 BPM</span>
            </div>

            {/* Stem Mutes Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {(
                [
                  { key: 'drums', label: 'Drums', color: '#f59e0b' },
                  { key: 'bass', label: 'Analog Bass', color: '#38bdf8' },
                  { key: 'chords', label: 'Keys & Stabs', color: '#10b981' },
                  { key: 'lead', label: 'Lead Synth', color: '#e11d48' },
                  { key: 'vocals', label: 'Vocal Hits', color: '#a855f7' },
                ] as const
              ).map((stem) => {
                const isMuted = mutes[stem.key];
                return (
                  <button
                    key={stem.key}
                    onClick={() => onToggleMute(stem.key)}
                    className={`py-2 px-3 rounded-lg border text-center text-xs font-medium transition-all cursor-pointer flex flex-col items-center gap-1 ${
                      isMuted
                        ? 'border-neutral-800 bg-neutral-950 text-neutral-600'
                        : 'border-neutral-700 bg-neutral-800 text-white shadow-sm'
                    }`}
                  >
                    <span className="flex items-center gap-1.5">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isMuted ? 'bg-neutral-700' : 'animate-pulse'
                        }`}
                        style={{ backgroundColor: !isMuted ? stem.color : undefined }}
                      />
                      {stem.label}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400">
                      {isMuted ? 'MUTED' : 'ACTIVE'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
