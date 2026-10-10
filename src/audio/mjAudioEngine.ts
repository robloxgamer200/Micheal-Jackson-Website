/**
 * High-Fidelity Web Audio Synthesizer Engine for Michael Jackson Classics
 * Pure Web Audio API synthesis - zero external audio assets required, guaranteed instant playback.
 */

export interface TrackDefinition {
  id: string;
  title: string;
  album: string;
  year: number;
  bpm: number;
  key: string;
  signatureLine: string;
  description: string;
  accentColor: string;
  patternLength: number; // in 16th notes (e.g. 32 = 2 bars)
  drums: {
    kick: number[];
    snare: number[];
    hihat: number[];
    openHat?: number[];
    clap?: number[];
    percussion?: number[];
  };
  bass: {
    notes: { step: number; note: string; duration: number; slide?: boolean }[];
  };
  chords: {
    chords: { step: number; notes: string[]; duration: number; type?: 'rhodes' | 'brass' | 'organ' | 'guitar' }[];
  };
  lead: {
    notes: { step: number; note: string; duration: number }[];
  };
  vocalCues?: { step: number; type: 'hee_hee' | 'woo' | 'shamone' | 'ow' }[];
  lyrics: { time: number; text: string }[];
}

// Note frequencies map
const NOTE_FREQS: Record<string, number> = {
  'B0': 30.87,
  'C1': 32.70, 'C#1': 34.65, 'D1': 36.71, 'D#1': 38.89, 'E1': 41.20, 'F1': 43.65, 'F#1': 46.25, 'G1': 49.00, 'G#1': 51.91, 'A1': 55.00, 'A#1': 58.27, 'B1': 61.74,
  'C2': 65.41, 'C#2': 69.30, 'D2': 73.42, 'D#2': 77.78, 'E2': 82.41, 'F2': 87.31, 'F#2': 92.50, 'G2': 98.00, 'G#2': 103.83, 'A2': 110.00, 'A#2': 116.54, 'B2': 123.47,
  'C3': 130.81, 'C#3': 138.59, 'D3': 146.83, 'D#3': 155.56, 'E3': 164.81, 'F3': 174.61, 'F#3': 185.00, 'G3': 196.00, 'G#3': 207.65, 'A3': 220.00, 'A#3': 233.08, 'B3': 246.94,
  'C4': 261.63, 'C#4': 277.18, 'D4': 293.66, 'D#4': 311.13, 'E4': 329.63, 'F4': 349.23, 'F#4': 369.99, 'G4': 392.00, 'G#4': 415.30, 'A4': 440.00, 'A#4': 466.16, 'B4': 493.88,
  'C5': 523.25, 'C#5': 554.37, 'D5': 587.33, 'D#5': 622.25, 'E5': 659.25, 'F5': 698.46, 'F#5': 739.99, 'G5': 783.99, 'G#5': 830.61, 'A5': 880.00, 'A#5': 932.33, 'B5': 987.77,
  'C6': 1046.50, 'C#6': 1108.73, 'D6': 1174.66, 'E6': 1318.51, 'F#6': 1479.98,
};

export const TRACKS: TrackDefinition[] = [
  {
    id: 'billie_jean',
    title: 'Billie Jean',
    album: 'Thriller',
    year: 1982,
    bpm: 117,
    key: 'F# Minor',
    signatureLine: "Billie Jean is not my lover, she's just a girl...",
    description: "The unmistakable iconic groove with the driving walking bassline and tight disco-funk drum beat.",
    accentColor: '#38bdf8', // Neon Sky Blue / Silver
    patternLength: 32, // 2 bars of 16ths
    drums: {
      // Bar 1: kick on 0, 8 (beats 1, 3); snare on 4, 12 (beats 2, 4)
      // Bar 2: kick on 16, 24; snare on 20, 28
      kick: [0, 8, 16, 24],
      snare: [4, 12, 20, 28],
      hihat: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
      openHat: [14, 30],
      clap: [4, 12, 20, 28],
      percussion: [6, 22],
    },
    bass: {
      // The legendary Billie Jean bassline in F#m:
      // F#1 -> C#2 -> E2 -> F#2 -> E2 -> C#2 -> B1 -> C#2
      notes: [
        // Bar 1
        { step: 0, note: 'F#1', duration: 1.8 },
        { step: 2, note: 'C#2', duration: 1.8 },
        { step: 4, note: 'E2', duration: 1.8 },
        { step: 6, note: 'F#2', duration: 1.8 },
        { step: 8, note: 'E2', duration: 1.8 },
        { step: 10, note: 'C#2', duration: 1.8 },
        { step: 12, note: 'B1', duration: 1.8 },
        { step: 14, note: 'C#2', duration: 1.8 },
        // Bar 2
        { step: 16, note: 'F#1', duration: 1.8 },
        { step: 18, note: 'C#2', duration: 1.8 },
        { step: 20, note: 'E2', duration: 1.8 },
        { step: 22, note: 'F#2', duration: 1.8 },
        { step: 24, note: 'E2', duration: 1.8 },
        { step: 26, note: 'C#2', duration: 1.8 },
        { step: 28, note: 'B1', duration: 1.8 },
        { step: 30, note: 'C#2', duration: 1.8 },
      ],
    },
    chords: {
      // Famous offbeat staccato Rhodes / synthesizer stabs (F#m / G#m / A)
      chords: [
        { step: 4, notes: ['C#4', 'F#4', 'A4'], duration: 0.8, type: 'rhodes' },
        { step: 6, notes: ['D4', 'G#4', 'B4'], duration: 0.8, type: 'rhodes' },
        { step: 12, notes: ['C#4', 'F#4', 'A4'], duration: 0.8, type: 'rhodes' },
        { step: 14, notes: ['B3', 'E4', 'G#4'], duration: 0.8, type: 'rhodes' },
        { step: 20, notes: ['C#4', 'F#4', 'A4'], duration: 0.8, type: 'rhodes' },
        { step: 22, notes: ['D4', 'G#4', 'B4'], duration: 0.8, type: 'rhodes' },
        { step: 28, notes: ['C#4', 'F#4', 'A4'], duration: 0.8, type: 'rhodes' },
        { step: 30, notes: ['B3', 'E4', 'G#4'], duration: 0.8, type: 'rhodes' },
      ],
    },
    lead: {
      // Synth string flourish
      notes: [
        { step: 0, note: 'C#5', duration: 3 },
        { step: 8, note: 'E5', duration: 3 },
        { step: 16, note: 'F#5', duration: 4 },
        { step: 24, note: 'E5', duration: 2 },
        { step: 28, note: 'C#5', duration: 3 },
      ],
    },
    vocalCues: [
      { step: 0, type: 'hee_hee' },
      { step: 16, type: 'woo' },
    ],
    lyrics: [
      { time: 0, text: "She was more like a beauty queen from a movie scene" },
      { time: 4, text: "I said don't mind, but what do you mean, I am the one..." },
      { time: 8, text: "Who will dance on the floor in the round?" },
      { time: 12, text: "She told me her name was Billie Jean, as she caused a scene" },
      { time: 16, text: "Billie Jean is not my lover!" },
      { time: 20, text: "She's just a girl who claims that I am the one (Hee-Hee!)" },
      { time: 24, text: "But the kid is not my son!" },
    ],
  },
  {
    id: 'smooth_criminal',
    title: 'Smooth Criminal',
    album: 'Bad',
    year: 1987,
    bpm: 118,
    key: 'A Minor',
    signatureLine: "Annie, are you OK? So, Annie, are you OK? Are you OK, Annie?",
    description: "High-octane synths, rapid walking bassline, dramatic brass orchestra hits and anti-gravity lean vibes.",
    accentColor: '#f59e0b', // Amber / Gold
    patternLength: 32,
    drums: {
      kick: [0, 3, 6, 8, 11, 14, 16, 19, 22, 24, 27, 30],
      snare: [4, 12, 20, 28],
      hihat: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
      openHat: [12, 28],
      clap: [4, 12, 20, 28],
      percussion: [2, 10, 18, 26],
    },
    bass: {
      // The unmistakable Smooth Criminal riff:
      // A - A - A - G - A - B - C - B - A - G - F - G - E
      notes: [
        { step: 0, note: 'A1', duration: 0.9 },
        { step: 1, note: 'A1', duration: 0.9 },
        { step: 2, note: 'A1', duration: 0.9 },
        { step: 4, note: 'G1', duration: 0.9 },
        { step: 6, note: 'A1', duration: 0.9 },
        { step: 8, note: 'B1', duration: 0.9 },
        { step: 10, note: 'C2', duration: 0.9 },
        { step: 12, note: 'B1', duration: 0.9 },
        { step: 14, note: 'A1', duration: 0.9 },
        { step: 16, note: 'G1', duration: 0.9 },
        { step: 18, note: 'F1', duration: 0.9 },
        { step: 20, note: 'G1', duration: 0.9 },
        { step: 22, note: 'E1', duration: 1.8 },
        { step: 26, note: 'G1', duration: 0.9 },
        { step: 28, note: 'E1', duration: 1.8 },
      ],
    },
    chords: {
      chords: [
        { step: 0, notes: ['A3', 'C4', 'E4'], duration: 1.2, type: 'brass' },
        { step: 6, notes: ['A3', 'C4', 'E4'], duration: 1.2, type: 'brass' },
        { step: 10, notes: ['C4', 'E4', 'G4'], duration: 1.2, type: 'brass' },
        { step: 16, notes: ['G3', 'B3', 'D4'], duration: 1.2, type: 'brass' },
        { step: 22, notes: ['E3', 'G#3', 'B3'], duration: 1.8, type: 'brass' },
      ],
    },
    lead: {
      notes: [
        { step: 0, note: 'A4', duration: 1 },
        { step: 6, note: 'A4', duration: 1 },
        { step: 10, note: 'C5', duration: 1.5 },
        { step: 16, note: 'B4', duration: 1 },
        { step: 22, note: 'E4', duration: 2 },
      ],
    },
    vocalCues: [
      { step: 0, type: 'shamone' },
      { step: 16, type: 'ow' },
    ],
    lyrics: [
      { time: 0, text: "As he came into the window, it was the sound of a crescendo..." },
      { time: 4, text: "He came into her apartment, he left the bloodstains on the carpet..." },
      { time: 8, text: "Annie, are you OK? So, Annie, are you OK?" },
      { time: 12, text: "Are you OK, Annie? (Ow!)" },
      { time: 16, text: "You've been hit by, you've been struck by..." },
      { time: 20, text: "A Smooth Criminal! (Hee-Hee!)" },
    ],
  },
  {
    id: 'beat_it',
    title: 'Beat It',
    album: 'Thriller',
    year: 1982,
    bpm: 138,
    key: 'Eb Minor',
    signatureLine: "No one wants to be defeated! Showin' how funky and strong is your fight...",
    description: "Hard rock guitar power riff, thunderous 4-on-the-floor beat and electrifying dance energy.",
    accentColor: '#ef4444', // Red (iconic red leather jacket)
    patternLength: 32,
    drums: {
      kick: [0, 8, 16, 24],
      snare: [4, 12, 20, 28],
      hihat: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
      openHat: [6, 14, 22, 30],
      clap: [12, 28],
      percussion: [8, 24],
    },
    bass: {
      // The iconic Beat It riff:
      // Eb1 - Eb1 - Bb1 - Eb2 - F#2 - F2 - Eb2 - C#2
      notes: [
        { step: 0, note: 'Eb1', duration: 1.5 },
        { step: 3, note: 'Eb1', duration: 1.5 },
        { step: 6, note: 'Bb1', duration: 1.5 },
        { step: 8, note: 'Eb2', duration: 2 },
        { step: 12, note: 'F#2', duration: 1.8 },
        { step: 14, note: 'F2', duration: 1.5 },
        { step: 16, note: 'Eb1', duration: 1.5 },
        { step: 19, note: 'C#2', duration: 2 },
        { step: 24, note: 'Eb1', duration: 1.5 },
        { step: 28, note: 'Bb1', duration: 2 },
      ],
    },
    chords: {
      chords: [
        { step: 0, notes: ['Eb3', 'Bb3', 'Eb4'], duration: 2, type: 'guitar' },
        { step: 8, notes: ['Eb3', 'Bb3', 'Eb4'], duration: 1.5, type: 'guitar' },
        { step: 12, notes: ['F#3', 'C#4', 'F#4'], duration: 1.5, type: 'guitar' },
        { step: 16, notes: ['C#3', 'G#3', 'C#4'], duration: 2, type: 'guitar' },
        { step: 24, notes: ['Eb3', 'Bb3', 'Eb4'], duration: 2, type: 'guitar' },
      ],
    },
    lead: {
      notes: [
        { step: 0, note: 'Eb4', duration: 1 },
        { step: 6, note: 'Bb4', duration: 1 },
        { step: 8, note: 'Eb5', duration: 2 },
        { step: 12, note: 'F#5', duration: 1.5 },
        { step: 14, note: 'F5', duration: 1.5 },
        { step: 18, note: 'C#5', duration: 2 },
      ],
    },
    vocalCues: [
      { step: 0, type: 'woo' },
      { step: 16, type: 'hee_hee' },
    ],
    lyrics: [
      { time: 0, text: "They told him, 'Don't you ever come around here'" },
      { time: 4, text: "'Don't wanna see your face, you better disappear'" },
      { time: 8, text: "The fire's in their eyes and their words are really clear" },
      { time: 12, text: "So beat it, just beat it! (Ow!)" },
      { time: 16, text: "No one wants to be defeated..." },
      { time: 20, text: "Showin' how funky and strong is your fight, it doesn't matter who's wrong or who's right!" },
      { time: 24, text: "Just beat it, beat it, beat it, beat it!" },
    ],
  },
  {
    id: 'thriller',
    title: 'Thriller',
    album: 'Thriller',
    year: 1982,
    bpm: 118,
    key: 'C# Minor',
    signatureLine: "'Cause this is thriller, thriller night! And no one's gonna save you...",
    description: "Spooky gothic bassline, dramatic funky brass chords, midnight synths and legendary grooves.",
    accentColor: '#a855f7', // Purple
    patternLength: 32,
    drums: {
      kick: [0, 6, 8, 14, 16, 22, 24, 30],
      snare: [4, 12, 20, 28],
      hihat: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
      openHat: [10, 26],
      clap: [4, 12, 20, 28],
      percussion: [2, 18],
    },
    bass: {
      // Thriller funky bassline:
      // C#2 -> D#2 -> E2 -> F#2 -> G#2 -> E2 -> D#2
      notes: [
        { step: 0, note: 'C#2', duration: 1.5 },
        { step: 3, note: 'D#2', duration: 1.5 },
        { step: 6, note: 'E2', duration: 1.5 },
        { step: 8, note: 'F#2', duration: 1.5 },
        { step: 11, note: 'G#2', duration: 2 },
        { step: 14, note: 'E2', duration: 1 },
        { step: 16, note: 'D#2', duration: 1.8 },
        { step: 20, note: 'C#2', duration: 1.5 },
        { step: 24, note: 'B1', duration: 2 },
        { step: 28, note: 'C#2', duration: 2 },
      ],
    },
    chords: {
      chords: [
        { step: 0, notes: ['C#4', 'E4', 'G#4', 'B4'], duration: 2.5, type: 'organ' },
        { step: 8, notes: ['F#3', 'A#3', 'C#4', 'F#4'], duration: 2, type: 'brass' },
        { step: 16, notes: ['E4', 'G#4', 'B4', 'E5'], duration: 2, type: 'organ' },
        { step: 24, notes: ['D#4', 'F#4', 'A#4'], duration: 2, type: 'brass' },
      ],
    },
    lead: {
      notes: [
        { step: 0, note: 'G#4', duration: 2 },
        { step: 6, note: 'B4', duration: 2 },
        { step: 12, note: 'C#5', duration: 3 },
        { step: 20, note: 'B4', duration: 2 },
        { step: 24, note: 'G#4', duration: 3 },
      ],
    },
    vocalCues: [
      { step: 0, type: 'hee_hee' },
      { step: 16, type: 'ow' },
    ],
    lyrics: [
      { time: 0, text: "It's close to midnight and something evil's lurking in the dark..." },
      { time: 4, text: "Under the moonlight you see a sight that almost stops your heart!" },
      { time: 8, text: "You try to scream, but terror takes the sound before you make it!" },
      { time: 12, text: "You start to freeze as horror looks you right between the eyes..." },
      { time: 16, text: "'Cause this is thriller! Thriller night!" },
      { time: 20, text: "And no one's gonna save you from the beast about to strike!" },
      { time: 24, text: "You're fighting for your life inside a killer, thriller tonight!" },
    ],
  },
  {
    id: 'bad',
    title: 'Bad',
    album: 'Bad',
    year: 1987,
    bpm: 114,
    key: 'A Minor',
    signatureLine: "Because I'm bad, I'm bad, come on! You know I'm bad, I'm bad...",
    description: "Crisp horn hits, punchy slap bass, funky syncopation and the ultimate swagger.",
    accentColor: '#e11d48', // Crimson
    patternLength: 32,
    drums: {
      kick: [0, 6, 10, 16, 22, 26],
      snare: [4, 12, 20, 28],
      hihat: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
      openHat: [14, 30],
      clap: [4, 12, 20, 28],
      percussion: [8, 24],
    },
    bass: {
      notes: [
        { step: 0, note: 'A1', duration: 1.2 },
        { step: 3, note: 'C2', duration: 1 },
        { step: 6, note: 'D2', duration: 1 },
        { step: 8, note: 'D#2', duration: 1 },
        { step: 10, note: 'E2', duration: 1.5 },
        { step: 14, note: 'G1', duration: 1 },
        { step: 16, note: 'A1', duration: 1.2 },
        { step: 20, note: 'C2', duration: 1 },
        { step: 24, note: 'D2', duration: 1 },
        { step: 28, note: 'E2', duration: 2 },
      ],
    },
    chords: {
      chords: [
        { step: 4, notes: ['A3', 'C4', 'E4', 'G4'], duration: 1, type: 'brass' },
        { step: 12, notes: ['A3', 'C4', 'E4', 'G4'], duration: 1, type: 'brass' },
        { step: 20, notes: ['A3', 'C4', 'E4', 'G4'], duration: 1, type: 'brass' },
        { step: 28, notes: ['G3', 'B3', 'D4', 'F4'], duration: 1, type: 'brass' },
      ],
    },
    lead: {
      notes: [
        { step: 0, note: 'A4', duration: 1.5 },
        { step: 4, note: 'C5', duration: 1 },
        { step: 8, note: 'A4', duration: 1 },
        { step: 16, note: 'G4', duration: 1.5 },
        { step: 20, note: 'A4', duration: 2 },
      ],
    },
    vocalCues: [
      { step: 0, type: 'shamone' },
      { step: 16, type: 'hee_hee' },
    ],
    lyrics: [
      { time: 0, text: "Your butt is mine, gonna tell you right, just show your face in broad daylight!" },
      { time: 4, text: "I'm telling you on who I feel, gonna hurt your mind, don't shoot to kill!" },
      { time: 8, text: "Shamone! Come on! Lay it on me!" },
      { time: 12, text: "Well, they say the sky's the limit and to me that's really true..." },
      { time: 16, text: "Because I'm Bad, I'm Bad, come on!" },
      { time: 20, text: "You know I'm Bad, I'm Bad, you know it! (Hee-Hee!)" },
      { time: 24, text: "And the whole world has to answer right now just to tell you once again: Who's Bad?!" },
    ],
  },
];

export class MJAudioEngine {
  private ctx: AudioContext | null = null;
  private analyser: AnalyserNode | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;

  // Stems gain nodes for user muting/mixing
  private drumsGain: GainNode | null = null;
  private bassGain: GainNode | null = null;
  private chordsGain: GainNode | null = null;
  private leadGain: GainNode | null = null;
  private vocalGain: GainNode | null = null;

  // Scheduler state
  private isPlaying = false;
  private currentTrack: TrackDefinition = TRACKS[0];
  private currentStep = 0;
  private nextStepTime = 0;
  private timerId: number | null = null;
  private tempoBpm = 117;
  private volume = 0.85;

  // Track stem mutes
  public mutes = {
    drums: false,
    bass: false,
    chords: false,
    lead: false,
    vocals: false,
  };

  // Listeners for UI animation & step sync
  private stepListeners: ((step: number, track: TrackDefinition) => void)[] = [];
  private stateListeners: ((isPlaying: boolean) => void)[] = [];

  constructor() {
    this.tempoBpm = this.currentTrack.bpm;
  }

  public init() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    this.ctx = new AudioContextClass();

    // Master bus chain: Stems -> Compressor -> MasterGain -> Analyser -> Destination
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-18, this.ctx.currentTime);
    this.compressor.knee.setValueAtTime(20, this.ctx.currentTime);
    this.compressor.ratio.setValueAtTime(4, this.ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
    this.compressor.release.setValueAtTime(0.15, this.ctx.currentTime);

    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.analyser.smoothingTimeConstant = 0.8;

    this.compressor.connect(this.masterGain);
    this.masterGain.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    // Stem buses
    this.drumsGain = this.ctx.createGain();
    this.bassGain = this.ctx.createGain();
    this.chordsGain = this.ctx.createGain();
    this.leadGain = this.ctx.createGain();
    this.vocalGain = this.ctx.createGain();

    this.drumsGain.connect(this.compressor);
    this.bassGain.connect(this.compressor);
    this.chordsGain.connect(this.compressor);
    this.leadGain.connect(this.compressor);
    this.vocalGain.connect(this.compressor);
  }

  public async start(): Promise<void> {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isPlaying) return;

    this.isPlaying = true;
    this.currentStep = 0;
    this.nextStepTime = this.ctx.currentTime + 0.05;
    this.tempoBpm = this.currentTrack.bpm;

    this.notifyState(true);
    this.scheduler();
  }

  public pause() {
    this.isPlaying = false;
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
      this.timerId = null;
    }
    this.notifyState(false);
  }

  public togglePlay() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.start();
    }
  }

  public selectTrack(trackId: string) {
    const found = TRACKS.find(t => t.id === trackId);
    if (!found) return;
    this.currentTrack = found;
    this.tempoBpm = found.bpm;
    this.currentStep = 0;
    if (this.ctx && this.isPlaying) {
      this.nextStepTime = this.ctx.currentTime + 0.05;
    }
  }

  public setVolume(vol: number) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  public setBpm(bpm: number) {
    this.tempoBpm = Math.max(80, Math.min(180, bpm));
  }

  public setMute(stem: keyof typeof this.mutes, muted: boolean) {
    this.mutes[stem] = muted;
    const gainNode = stem === 'drums' ? this.drumsGain
      : stem === 'bass' ? this.bassGain
      : stem === 'chords' ? this.chordsGain
      : stem === 'lead' ? this.leadGain
      : this.vocalGain;

    if (gainNode && this.ctx) {
      gainNode.gain.setValueAtTime(muted ? 0 : 1, this.ctx.currentTime);
    }
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  public getTrack(): TrackDefinition {
    return this.currentTrack;
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getVolume(): number {
    return this.volume;
  }

  public getBpm(): number {
    return this.tempoBpm;
  }

  public onStep(cb: (step: number, track: TrackDefinition) => void) {
    this.stepListeners.push(cb);
    return () => {
      this.stepListeners = this.stepListeners.filter(l => l !== cb);
    };
  }

  public onStateChange(cb: (isPlaying: boolean) => void) {
    this.stateListeners.push(cb);
    return () => {
      this.stateListeners = this.stateListeners.filter(l => l !== cb);
    };
  }

  private notifyState(playing: boolean) {
    this.stateListeners.forEach(l => l(playing));
  }

  private scheduler = () => {
    if (!this.isPlaying || !this.ctx) return;

    const scheduleAheadTime = 0.12; // Lookahead window (seconds)
    const secondsPer16th = (60 / this.tempoBpm) / 4;

    while (this.nextStepTime < this.ctx.currentTime + scheduleAheadTime) {
      this.scheduleStep(this.currentStep, this.nextStepTime);
      this.currentStep = (this.currentStep + 1) % this.currentTrack.patternLength;
      this.nextStepTime += secondsPer16th;
    }

    this.timerId = window.setTimeout(this.scheduler, 35);
  };

  private scheduleStep(step: number, time: number) {
    if (!this.ctx) return;

    // Trigger step listener slightly before audio fires for visual sync
    const timeUntil = Math.max(0, (time - this.ctx.currentTime) * 1000);
    setTimeout(() => {
      if (this.isPlaying) {
        this.stepListeners.forEach(l => l(step, this.currentTrack));
      }
    }, timeUntil);

    // 1. Drums
    if (!this.mutes.drums && this.drumsGain) {
      const d = this.currentTrack.drums;
      if (d.kick.includes(step)) this.playKick(time);
      if (d.snare.includes(step)) this.playSnare(time);
      if (d.hihat.includes(step)) this.playHiHat(time, false);
      if (d.openHat && d.openHat.includes(step)) this.playHiHat(time, true);
      if (d.clap && d.clap.includes(step)) this.playClap(time);
      if (d.percussion && d.percussion.includes(step)) this.playPercussion(time);
    }

    // 2. Bass
    if (!this.mutes.bass && this.bassGain) {
      const bassNote = this.currentTrack.bass.notes.find(n => n.step === step);
      if (bassNote) {
        const secondsPer16th = (60 / this.tempoBpm) / 4;
        const dur = bassNote.duration * secondsPer16th;
        this.playBass(bassNote.note, time, dur);
      }
    }

    // 3. Chords / Stabs
    if (!this.mutes.chords && this.chordsGain) {
      const chordHit = this.currentTrack.chords.chords.find(c => c.step === step);
      if (chordHit) {
        const secondsPer16th = (60 / this.tempoBpm) / 4;
        const dur = chordHit.duration * secondsPer16th;
        this.playChord(chordHit.notes, time, dur, chordHit.type || 'rhodes');
      }
    }

    // 4. Lead synth
    if (!this.mutes.lead && this.leadGain) {
      const leadNote = this.currentTrack.lead.notes.find(l => l.step === step);
      if (leadNote) {
        const secondsPer16th = (60 / this.tempoBpm) / 4;
        const dur = leadNote.duration * secondsPer16th;
        this.playLead(leadNote.note, time, dur);
      }
    }

    // 5. Vocal cue hits in arrangement
    if (!this.mutes.vocals && this.vocalGain && this.currentTrack.vocalCues) {
      const cue = this.currentTrack.vocalCues.find(v => v.step === step);
      if (cue) {
        this.playVocalAdlib(cue.type, time);
      }
    }
  }

  // ===================== INSTRUMENT SYNTHESIZERS ===================== //

  // Iconic punchy Michael Jackson 80s kick drum (sub + click)
  private playKick(time: number) {
    if (!this.ctx || !this.drumsGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    // Fast pitch sweep from 150Hz to 35Hz
    osc.frequency.setValueAtTime(160, time);
    osc.frequency.exponentialRampToValueAtTime(32, time + 0.12);

    gain.gain.setValueAtTime(1.1, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.32);

    osc.connect(gain);
    gain.connect(this.drumsGain);

    osc.start(time);
    osc.stop(time + 0.35);

    // High click transient
    const clickOsc = this.ctx.createOscillator();
    const clickGain = this.ctx.createGain();
    clickOsc.type = 'triangle';
    clickOsc.frequency.setValueAtTime(450, time);
    clickGain.gain.setValueAtTime(0.5, time);
    clickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.02);

    clickOsc.connect(clickGain);
    clickGain.connect(this.drumsGain);
    clickOsc.start(time);
    clickOsc.stop(time + 0.03);
  }

  // Gated crisp funk snare (body tone + bandpass noise)
  private playSnare(time: number) {
    if (!this.ctx || !this.drumsGain) return;

    // Body tone
    const osc = this.ctx.createOscillator();
    const oscGain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(185, time);
    osc.frequency.exponentialRampToValueAtTime(80, time + 0.1);
    oscGain.gain.setValueAtTime(0.7, time);
    oscGain.gain.exponentialRampToValueAtTime(0.01, time + 0.14);

    osc.connect(oscGain);
    oscGain.connect(this.drumsGain);
    osc.start(time);
    osc.stop(time + 0.15);

    // Gated White Noise
    const noiseBuffer = this.getNoiseBuffer();
    if (!noiseBuffer) return;
    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(900, time);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.85, time);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.drumsGain);

    noise.start(time);
    noise.stop(time + 0.23);
  }

  // Metallic Hi-Hat
  private playHiHat(time: number, isOpen: boolean) {
    if (!this.ctx || !this.drumsGain) return;

    const noiseBuffer = this.getNoiseBuffer();
    if (!noiseBuffer) return;

    const noise = this.ctx.createBufferSource();
    noise.buffer = noiseBuffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(7500, time);

    const gain = this.ctx.createGain();
    const dur = isOpen ? 0.24 : 0.045;
    gain.gain.setValueAtTime(isOpen ? 0.35 : 0.22, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.drumsGain);

    noise.start(time);
    noise.stop(time + dur + 0.01);
  }

  // Signature Triple-Burst Hand Clap
  private playClap(time: number) {
    if (!this.ctx || !this.drumsGain) return;
    const noiseBuffer = this.getNoiseBuffer();
    if (!noiseBuffer) return;

    const bursts = [0, 0.012, 0.024];
    bursts.forEach((offset, idx) => {
      if (!this.ctx || !this.drumsGain) return;
      const noise = this.ctx.createBufferSource();
      noise.buffer = noiseBuffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, time + offset);
      filter.Q.setValueAtTime(1.5, time + offset);

      const gain = this.ctx.createGain();
      const isLast = idx === bursts.length - 1;
      const dur = isLast ? 0.2 : 0.02;
      const vol = isLast ? 0.7 : 0.4;

      gain.gain.setValueAtTime(vol, time + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, time + offset + dur);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.drumsGain);

      noise.start(time + offset);
      noise.stop(time + offset + dur + 0.01);
    });
  }

  // Percussion (Cabasa / Rim / Woodblock hit)
  private playPercussion(time: number) {
    if (!this.ctx || !this.drumsGain) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, time);
    osc.frequency.exponentialRampToValueAtTime(350, time + 0.04);

    gain.gain.setValueAtTime(0.28, time);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.05);

    osc.connect(gain);
    gain.connect(this.drumsGain);

    osc.start(time);
    osc.stop(time + 0.06);
  }

  // Analog Synth Funk Bass (Warm Saw + Sub Square + Filter Envelope)
  private playBass(noteName: string, time: number, duration: number) {
    if (!this.ctx || !this.bassGain) return;
    const freq = NOTE_FREQS[noteName];
    if (!freq) return;

    // Main Saw
    const osc1 = this.ctx.createOscillator();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(freq, time);

    // Sub Octave Square for thickness
    const osc2 = this.ctx.createOscillator();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(freq / 2, time);

    // Moog style low pass ladder filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(freq * 6, time);
    filter.frequency.exponentialRampToValueAtTime(freq * 1.5, time + Math.min(duration, 0.25));
    filter.Q.setValueAtTime(4, time);

    // Amplitude envelope
    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.75, time + 0.01);
    gain.gain.setValueAtTime(0.65, time + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.bassGain);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration + 0.02);
    osc2.stop(time + duration + 0.02);
  }

  // Chords (Rhodes Electric Piano, Funk Guitar stabs, or Brass Hits)
  private playChord(notes: string[], time: number, duration: number, type: 'rhodes' | 'brass' | 'organ' | 'guitar') {
    if (!this.ctx || !this.chordsGain) return;

    notes.forEach(noteName => {
      if (!this.ctx || !this.chordsGain) return;
      const freq = NOTE_FREQS[noteName];
      if (!freq) return;

      if (type === 'rhodes') {
        // Dual sine FM bell-like electric piano
        const osc = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, time);

        osc2.type = 'triangle';
        osc2.frequency.setValueAtTime(freq * 2, time);

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(0.18, time + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc.connect(gain);
        osc2.connect(gain);
        gain.connect(this.chordsGain);

        osc.start(time);
        osc2.start(time);
        osc.stop(time + duration + 0.02);
        osc2.stop(time + duration + 0.02);
      } else if (type === 'brass') {
        // Rich detuned saw brass stab
        const osc1 = this.ctx.createOscillator();
        const osc2 = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc1.type = 'sawtooth';
        osc1.frequency.setValueAtTime(freq, time);
        osc2.type = 'sawtooth';
        osc2.frequency.setValueAtTime(freq * 1.008, time); // Detune

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2200, time);
        filter.frequency.exponentialRampToValueAtTime(800, time + duration);
        filter.Q.setValueAtTime(2, time);

        gain.gain.setValueAtTime(0.001, time);
        gain.gain.linearRampToValueAtTime(0.2, time + 0.015);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

        osc1.connect(filter);
        osc2.connect(filter);
        filter.connect(gain);
        gain.connect(this.chordsGain);

        osc1.start(time);
        osc2.start(time);
        osc1.stop(time + duration + 0.02);
        osc2.stop(time + duration + 0.02);
      } else if (type === 'guitar') {
        // Funk muted guitar stab
        const osc = this.ctx.createOscillator();
        const filter = this.ctx.createBiquadFilter();
        const gain = this.ctx.createGain();

        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, time);

        filter.type = 'bandpass';
        filter.frequency.setValueAtTime(1400, time);
        filter.Q.setValueAtTime(3.5, time);

        gain.gain.setValueAtTime(0.22, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration * 0.9);

        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.chordsGain);

        osc.start(time);
        osc.stop(time + duration);
      } else {
        // Organ
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.15, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
        osc.connect(gain);
        gain.connect(this.chordsGain);
        osc.start(time);
        osc.stop(time + duration);
      }
    });
  }

  // Lead melody / synth riffs
  private playLead(noteName: string, time: number, duration: number) {
    if (!this.ctx || !this.leadGain) return;
    const freq = NOTE_FREQS[noteName];
    if (!freq) return;

    const osc = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(freq, time);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(3200, time);
    filter.Q.setValueAtTime(2.5, time);

    gain.gain.setValueAtTime(0.001, time);
    gain.gain.linearRampToValueAtTime(0.25, time + 0.02);
    gain.gain.setValueAtTime(0.2, time + duration * 0.7);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.leadGain);

    osc.start(time);
    osc.stop(time + duration + 0.02);
  }

  // ===================== SIGNATURE VOCAL AD-LIBS ===================== //
  // Formant vocal synthesis accurately modeling Michael Jackson's high trademark vocal cries
  public playVocalAdlib(type: 'hee_hee' | 'woo' | 'shamone' | 'ow' | 'thriller_laugh', customTime?: number) {
    this.init();
    if (!this.ctx) return;
    const time = customTime ?? this.ctx.currentTime;
    const dest = this.vocalGain || this.masterGain || this.ctx.destination;

    if (type === 'hee_hee') {
      // "Hee-Hee!" - high pitch glide upward with sharp falsetto formant
      const osc = this.ctx.createOscillator();
      const formant1 = this.ctx.createBiquadFilter();
      const formant2 = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      // Syllable 1: "Hee"
      osc.frequency.setValueAtTime(740, time); // F#5
      osc.frequency.exponentialRampToValueAtTime(980, time + 0.12);
      // Syllable 2: "-Hee!"
      osc.frequency.setValueAtTime(1175, time + 0.16); // D6
      osc.frequency.exponentialRampToValueAtTime(1320, time + 0.32); // E6

      // Formants for high 'ee' sound (F1 ~ 280Hz, F2 ~ 2250Hz, F3 ~ 3000Hz)
      formant1.type = 'bandpass';
      formant1.frequency.setValueAtTime(450, time);
      formant1.Q.setValueAtTime(4, time);

      formant2.type = 'bandpass';
      formant2.frequency.setValueAtTime(2600, time);
      formant2.Q.setValueAtTime(5, time);

      gain.gain.setValueAtTime(0.001, time);
      gain.gain.linearRampToValueAtTime(0.65, time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.08, time + 0.14);
      gain.gain.linearRampToValueAtTime(0.7, time + 0.18);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.38);

      osc.connect(formant1);
      osc.connect(formant2);
      formant1.connect(gain);
      formant2.connect(gain);
      gain.connect(dest);

      osc.start(time);
      osc.stop(time + 0.4);
    } else if (type === 'woo') {
      // "Woo!" - smooth expressive pitch bend up
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, time);
      osc.frequency.exponentialRampToValueAtTime(1100, time + 0.18);
      osc.frequency.exponentialRampToValueAtTime(880, time + 0.3);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(2000, time);

      gain.gain.setValueAtTime(0.01, time);
      gain.gain.linearRampToValueAtTime(0.6, time + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.35);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      osc.start(time);
      osc.stop(time + 0.36);
    } else if (type === 'shamone') {
      // "Shamone!" - rhythmic low-to-mid punchy vocal phrase
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      // "Sha-"
      osc.frequency.setValueAtTime(280, time);
      osc.frequency.exponentialRampToValueAtTime(360, time + 0.08);
      // "-mone!"
      osc.frequency.setValueAtTime(440, time + 0.1);
      osc.frequency.exponentialRampToValueAtTime(520, time + 0.28);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1100, time);
      filter.Q.setValueAtTime(2.5, time);

      gain.gain.setValueAtTime(0.01, time);
      gain.gain.linearRampToValueAtTime(0.5, time + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.05, time + 0.09);
      gain.gain.linearRampToValueAtTime(0.6, time + 0.12);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.36);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      osc.start(time);
      osc.stop(time + 0.38);
    } else if (type === 'ow') {
      // "Ow!" - sharp high staccato cry
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1150, time);
      osc.frequency.exponentialRampToValueAtTime(650, time + 0.18);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, time);
      filter.Q.setValueAtTime(3.5, time);

      gain.gain.setValueAtTime(0.8, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.2);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      osc.start(time);
      osc.stop(time + 0.22);
    } else if (type === 'thriller_laugh') {
      // Vincent Price / Gothic sinister laughs
      const osc = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, time);
      // Staccato laughing vibrato: Ha - ha - ha - ha!
      for (let i = 0; i < 6; i++) {
        const t = time + i * 0.12;
        osc.frequency.setValueAtTime(140 - i * 8, t);
        osc.frequency.exponentialRampToValueAtTime(110 - i * 8, t + 0.08);
      }

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, time);

      gain.gain.setValueAtTime(0.4, time);
      gain.gain.exponentialRampToValueAtTime(0.001, time + 0.85);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(dest);

      osc.start(time);
      osc.stop(time + 0.9);
    }
  }

  // Pre-generate noise buffer for hi-hats, snares and claps
  private noiseBuffer: AudioBuffer | null = null;
  private getNoiseBuffer(): AudioBuffer | null {
    if (!this.ctx) return null;
    if (this.noiseBuffer) return this.noiseBuffer;

    const bufferSize = this.ctx.sampleRate * 1.5;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    this.noiseBuffer = buffer;
    return this.noiseBuffer;
  }
}

// Global singleton instance so audio context is cleanly preserved
export const mjEngine = new MJAudioEngine();
