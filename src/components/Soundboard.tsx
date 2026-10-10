import React, { useState, useEffect } from 'react';
import { mjEngine } from '../audio/mjAudioEngine';
import { Mic, Volume2 } from 'lucide-react';

interface SoundboardItem {
  id: 'hee_hee' | 'shamone' | 'woo' | 'ow' | 'thriller_laugh';
  title: string;
  subtitle: string;
  key: string;
  color: string;
}

const SOUNDS: SoundboardItem[] = [
  {
    id: 'hee_hee',
    title: 'Hee-Hee!',
    subtitle: 'Signature falsetto high cry',
    key: '1',
    color: '#38bdf8',
  },
  {
    id: 'shamone',
    title: 'Shamone!',
    subtitle: 'Rhythmic swagger call',
    key: '2',
    color: '#f59e0b',
  },
  {
    id: 'woo',
    title: 'Woo-Hoo!',
    subtitle: 'High energy vocal cheer',
    key: '3',
    color: '#10b981',
  },
  {
    id: 'ow',
    title: 'Ow!',
    subtitle: 'Staccato punch accent',
    key: '4',
    color: '#ef4444',
  },
  {
    id: 'thriller_laugh',
    title: 'Thriller Laugh',
    subtitle: 'Gothic Vincent Price cadence',
    key: '5',
    color: '#a855f7',
  },
];

export const Soundboard: React.FC = () => {
  const [activeSound, setActiveSound] = useState<string | null>(null);

  const triggerSound = (id: SoundboardItem['id']) => {
    mjEngine.playVocalAdlib(id);
    setActiveSound(id);
    setTimeout(() => {
      setActiveSound(null);
    }, 450);
  };

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      const found = SOUNDS.find((s) => s.key === e.key);
      if (found) {
        e.preventDefault();
        triggerSound(found.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full bg-neutral-900/60 border border-neutral-800 rounded-2xl p-6 backdrop-blur-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5 text-amber-400" />
            <h3
              className="text-xl font-bold tracking-tight text-white"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Vocal Soundboard
            </h3>
          </div>
          <p className="text-sm text-neutral-400 mt-1">
            Tap buttons or press number keys (1–5) on your keyboard to drop signature vocal hits over the music.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Volume2 className="w-4 h-4 text-neutral-500" />
          <span>REAL-TIME FORMANT SYNTH</span>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {SOUNDS.map((sound) => {
          const isActive = activeSound === sound.id;
          return (
            <button
              key={sound.id}
              onClick={() => triggerSound(sound.id)}
              className={`relative p-4 rounded-xl border text-left transition-all duration-150 cursor-pointer overflow-hidden group select-none ${
                isActive
                  ? 'scale-105 border-white bg-white text-black shadow-xl'
                  : 'border-neutral-800 bg-neutral-950/80 hover:border-neutral-700 hover:bg-neutral-900 text-white'
              }`}
              style={{
                boxShadow: isActive ? `0 0 30px ${sound.color}` : undefined,
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <span
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                    isActive
                      ? 'border-black/30 bg-black/10 text-black'
                      : 'border-neutral-800 bg-neutral-900 text-neutral-400'
                  }`}
                >
                  KEY {sound.key}
                </span>

                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: sound.color }}
                />
              </div>

              <div className="text-base font-bold tracking-tight mb-1">
                {sound.title}
              </div>

              <div
                className={`text-[11px] leading-tight ${
                  isActive ? 'text-neutral-700' : 'text-neutral-400'
                }`}
              >
                {sound.subtitle}
              </div>

              {/* Tap wave ripple */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent pointer-events-none animate-pulse" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
