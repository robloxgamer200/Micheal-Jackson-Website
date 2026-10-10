import React from 'react';
import { TrackDefinition, TRACKS } from '../audio/mjAudioEngine';
import { Play, Pause, Sparkles, Radio, Music } from 'lucide-react';

interface HeroStartSectionProps {
  currentTrack: TrackDefinition;
  isPlaying: boolean;
  onStartPlay: () => void;
  onTogglePlay: () => void;
  onSelectTrack: (trackId: string) => void;
  currentStep: number;
}

export const HeroStartSection: React.FC<HeroStartSectionProps> = ({
  currentTrack,
  isPlaying,
  onStartPlay,
  onTogglePlay,
  onSelectTrack,
  currentStep,
}) => {
  // Find current active lyric line based on current step progress
  const lyricIndex = Math.floor((currentStep / 32) * currentTrack.lyrics.length);
  const currentLyric = currentTrack.lyrics[lyricIndex] || currentTrack.lyrics[0];

  return (
    <div className="relative w-full overflow-hidden rounded-3xl border border-neutral-800 bg-gradient-to-b from-neutral-900/90 via-black to-neutral-950 p-8 sm:p-12 shadow-2xl backdrop-blur-xl">
      {/* Background radial spotlight glow */}
      <div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[350px] rounded-full blur-3xl pointer-events-none opacity-25 transition-all duration-700"
        style={{ backgroundColor: currentTrack.accentColor }}
      />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Editorial Subtitle / Header Contract */}
        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-4 tracking-wider uppercase">
          <span className="text-amber-400 flex items-center gap-1 font-semibold">
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            King of Pop Live Arena
          </span>
          <span className="text-neutral-600">·</span>
          <span>Studio Synthesis</span>
          <span className="text-neutral-600">·</span>
          <span>44.1 kHz Hi-Fi</span>
        </div>

        {/* Main Display Headline */}
        <h1
          className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-4 text-balance"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {isPlaying ? (
            <>
              Now Playing: <span style={{ color: currentTrack.accentColor }}>{currentTrack.title}</span>
            </>
          ) : (
            <>
              Experience <span className="text-amber-400">Michael Jackson</span> Live
            </>
          )}
        </h1>

        <p className="text-base sm:text-lg text-neutral-300 max-w-2xl mb-8 leading-relaxed">
          {isPlaying
            ? currentTrack.description
            : 'Click start to instantly trigger authentic Michael Jackson synth grooves, punchy basslines, illuminated sidewalk tiles, and iconic vocal ad-libs.'}
        </p>

        {/* THE MAIN START BUTTON */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-8">
          <button
            onClick={isPlaying ? onTogglePlay : onStartPlay}
            className={`group relative px-8 py-5 rounded-2xl font-black text-lg sm:text-xl tracking-tight transition-all duration-200 cursor-pointer flex items-center gap-4 select-none ${
              isPlaying
                ? 'bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700 shadow-xl'
                : 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-neutral-950 hover:brightness-110 shadow-[0_0_50px_rgba(251,191,36,0.6)] hover:scale-105 active:scale-95'
            }`}
          >
            {isPlaying ? (
              <>
                <Pause className="w-6 h-6" />
                <span>Pause Music</span>
              </>
            ) : (
              <>
                <span className="w-10 h-10 rounded-full bg-black flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <Play className="w-5 h-5 fill-amber-400 text-amber-400 ml-0.5" />
                </span>
                <span className="flex flex-col text-left">
                  <span className="text-xs font-mono uppercase tracking-wider text-neutral-900 font-bold">
                    Click to Begin
                  </span>
                  <span className="text-xl sm:text-2xl font-black tracking-tight">
                    START MICHAEL JACKSON MUSIC
                  </span>
                </span>
                <Sparkles className="w-5 h-5 text-neutral-900 animate-spin" />
              </>
            )}
          </button>
        </div>

        {/* Interactive Track Selector Pills / Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <span className="text-xs font-mono text-neutral-400 mr-2 flex items-center gap-1">
            <Music className="w-3.5 h-3.5" /> Fast Select:
          </span>
          {TRACKS.map((track) => {
            const isActive = track.id === currentTrack.id;
            return (
              <button
                key={track.id}
                onClick={() => onSelectTrack(track.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-neutral-100 text-neutral-950 font-semibold shadow-sm'
                    : 'bg-neutral-900/90 text-neutral-400 hover:text-white hover:bg-neutral-800 border border-neutral-800'
                }`}
              >
                <span
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: track.accentColor }}
                />
                <span>{track.title}</span>
              </button>
            );
          })}
        </div>

        {/* Live Synchronized Lyric Bar */}
        <div className="w-full max-w-2xl bg-neutral-950/80 border border-neutral-800/80 rounded-xl px-5 py-3.5 flex items-center justify-between gap-4 backdrop-blur-sm">
          <div className="flex items-center gap-3 overflow-hidden text-left">
            <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-ping" />
            <div className="truncate">
              <span className="text-[11px] font-mono text-neutral-400 block uppercase tracking-wider">
                Synchronized Vocal Line
              </span>
              <span className="text-sm font-semibold text-white tracking-wide">
                "{currentLyric?.text || currentTrack.signatureLine}"
              </span>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <span className="text-[10px] font-mono text-neutral-400 block">TEMPO</span>
            <span className="text-xs font-mono font-bold text-amber-400">
              {currentTrack.bpm} BPM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
