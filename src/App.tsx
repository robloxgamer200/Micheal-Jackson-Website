/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { mjEngine, TRACKS, TrackDefinition } from './audio/mjAudioEngine';
import { StageHeader } from './components/StageHeader';
import { HeroStartSection } from './components/HeroStartSection';
import { MoonwalkerSilhouette } from './components/MoonwalkerSilhouette';
import { AudioVisualizer } from './components/AudioVisualizer';
import { IlluminatedFloor } from './components/IlluminatedFloor';
import { Soundboard } from './components/Soundboard';
import { TurntablePlayer } from './components/TurntablePlayer';
import { Disc, Sparkles } from 'lucide-react';

export default function App() {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTrack, setCurrentTrack] = useState<TrackDefinition>(TRACKS[0]);
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [bpm, setBpm] = useState<number>(TRACKS[0].bpm);
  const [volume, setVolume] = useState<number>(0.85);
  const [activeSection, setActiveSection] = useState<string>('stage');
  const [mutes, setMutes] = useState({
    drums: false,
    bass: false,
    chords: false,
    lead: false,
    vocals: false,
  });

  // Connect to the Web Audio engine listeners
  useEffect(() => {
    const unsubStep = mjEngine.onStep((step, track) => {
      setCurrentStep(step);
      setCurrentTrack(track);
    });

    const unsubState = mjEngine.onStateChange((playing) => {
      setIsPlaying(playing);
    });

    return () => {
      unsubStep();
      unsubState();
    };
  }, []);

  const handleStartPlay = async () => {
    await mjEngine.start();
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    mjEngine.togglePlay();
  };

  const handleSelectTrack = (trackId: string) => {
    mjEngine.selectTrack(trackId);
    const selected = TRACKS.find((t) => t.id === trackId);
    if (selected) {
      setCurrentTrack(selected);
      setBpm(selected.bpm);
    }
  };

  const handleVolumeChange = (vol: number) => {
    setVolume(vol);
    mjEngine.setVolume(vol);
  };

  const handleBpmChange = (newBpm: number) => {
    setBpm(newBpm);
    mjEngine.setBpm(newBpm);
  };

  const handleToggleMute = (stem: 'drums' | 'bass' | 'chords' | 'lead' | 'vocals') => {
    const nextVal = !mutes[stem];
    setMutes((prev) => ({ ...prev, [stem]: nextVal }));
    mjEngine.setMute(stem, nextVal);
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-amber-400 selection:text-black flex flex-col font-sans">
      {/* 3-Zone Sticky Navigation */}
      <StageHeader
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        volume={volume}
        onVolumeChange={handleVolumeChange}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
        {/* Main Hero: The Start Michael Jackson Music Call-to-Action */}
        <section id="start">
          <HeroStartSection
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onStartPlay={handleStartPlay}
            onTogglePlay={handleTogglePlay}
            onSelectTrack={handleSelectTrack}
            currentStep={currentStep}
          />
        </section>

        {/* Live Concert Stage & Visualizer */}
        <section id="stage" className="flex flex-col gap-4 scroll-mt-24">
          <div className="flex items-center justify-between">
            <h2
              className="text-2xl font-bold tracking-tight text-white flex items-center gap-2"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Concert Arena Stage
            </h2>
            <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>LIVE AUDIO ANALYSIS & MOTION</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 8 Cols: Moonwalker Silhouette & Stage Spotlights */}
            <div className="lg:col-span-8">
              <MoonwalkerSilhouette
                isPlaying={isPlaying}
                bpm={bpm}
                currentStep={currentStep}
                accentColor={currentTrack.accentColor}
              />
            </div>

            {/* Right 4 Cols: Audio Frequency Visualizer & Now Playing card */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              <AudioVisualizer
                isPlaying={isPlaying}
                accentColor={currentTrack.accentColor}
              />

              {/* Now Playing Stats Card */}
              <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 flex flex-col justify-between flex-1">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono text-neutral-400">
                      CURRENT ARRANGEMENT
                    </span>
                    <span
                      className="text-xs font-mono font-bold px-2 py-0.5 rounded"
                      style={{
                        backgroundColor: `${currentTrack.accentColor}20`,
                        color: currentTrack.accentColor,
                      }}
                    >
                      {currentTrack.key}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight text-white mb-1">
                    {currentTrack.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mb-3">
                    Album: {currentTrack.album} ({currentTrack.year})
                  </p>
                  <p className="text-xs text-neutral-300 leading-relaxed italic">
                    "{currentTrack.signatureLine}"
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs font-mono text-neutral-400">
                  <span>TEMPO: {bpm} BPM</span>
                  <span>TIME: 4/4 SWING</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Billie Jean Illuminated Floor */}
        <section id="floor" className="scroll-mt-24">
          <IlluminatedFloor
            currentStep={currentStep}
            isPlaying={isPlaying}
            accentColor={currentTrack.accentColor}
          />
        </section>

        {/* Vocal Ad-Libs Soundboard */}
        <section id="soundboard" className="scroll-mt-24">
          <Soundboard />
        </section>

        {/* Vinyl Turntable & Master Track Selector / Stem Mixer */}
        <section id="tracks" className="scroll-mt-24">
          <TurntablePlayer
            currentTrack={currentTrack}
            isPlaying={isPlaying}
            onTogglePlay={handleTogglePlay}
            onSelectTrack={handleSelectTrack}
            bpm={bpm}
            onBpmChange={handleBpmChange}
            mutes={mutes}
            onToggleMute={handleToggleMute}
          />
        </section>
      </main>

      {/* Clean Editorial Footer */}
      <footer className="mt-16 border-t border-neutral-800 bg-neutral-950 py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div className="flex items-center gap-2">
            <Disc className="w-4 h-4 text-amber-400" />
            <span className="font-semibold text-neutral-300">
              King of Pop Tribute Studio
            </span>
            <span>—</span>
            <span>Real-Time Web Audio Synthesizer</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Pure Web Audio Synthesis · No External Plugins
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
