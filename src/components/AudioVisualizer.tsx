import React, { useEffect, useRef } from 'react';
import { mjEngine } from '../audio/mjAudioEngine';

interface AudioVisualizerProps {
  isPlaying: boolean;
  accentColor: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying, accentColor }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const analyser = mjEngine.getAnalyser();

      if (!isPlaying || !analyser) {
        // Subtle resting idle waveform
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        const t = performance.now() * 0.002;
        for (let x = 0; x < width; x += 4) {
          const y = height / 2 + Math.sin(x * 0.03 + t) * 6;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
        animationId = requestAnimationFrame(render);
        return;
      }

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);
      analyser.getByteFrequencyData(dataArray);

      // Draw frequency spectrum bars
      const barCount = 48;
      const barWidth = (width / barCount) - 2;

      for (let i = 0; i < barCount; i++) {
        // Map bar index to frequency bin with log scaling
        const binIndex = Math.floor(Math.pow(i / barCount, 1.4) * (bufferLength / 2));
        const value = dataArray[binIndex] || 0;
        const percent = value / 255;
        const barHeight = Math.max(3, percent * (height * 0.85));

        const x = i * (barWidth + 2);
        const y = height - barHeight;

        // Gradient for bars
        const gradient = ctx.createLinearGradient(0, y, 0, height);
        gradient.addColorStop(0, accentColor);
        gradient.addColorStop(0.6, 'rgba(251, 191, 36, 0.7)'); // Gold
        gradient.addColorStop(1, 'rgba(251, 191, 36, 0.1)');

        ctx.fillStyle = gradient;
        ctx.shadowColor = accentColor;
        ctx.shadowBlur = percent > 0.4 ? 10 : 0;

        // Rounded top for bar
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, [3, 3, 0, 0]);
        ctx.fill();
      }

      ctx.shadowBlur = 0;

      // Draw oscilloscope overlay line across the middle
      const timeData = new Uint8Array(bufferLength);
      analyser.getByteTimeDomainData(timeData);

      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.beginPath();

      const sliceWidth = width / bufferLength;
      let waveX = 0;

      for (let i = 0; i < bufferLength; i++) {
        const v = timeData[i] / 128.0;
        const waveY = (v * height) / 2;

        if (i === 0) {
          ctx.moveTo(waveX, waveY);
        } else {
          ctx.lineTo(waveX, waveY);
        }

        waveX += sliceWidth;
      }

      ctx.lineTo(width, height / 2);
      ctx.stroke();

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, accentColor]);

  return (
    <div className="w-full relative h-28 bg-neutral-950/70 border border-neutral-800/80 rounded-xl overflow-hidden backdrop-blur-sm p-2 flex flex-col justify-end">
      <div className="absolute top-2.5 left-3 text-[11px] font-mono uppercase tracking-wider text-neutral-400 flex items-center gap-1.5">
        <span
          className={`inline-block w-1.5 h-1.5 rounded-full ${
            isPlaying ? 'bg-amber-400 animate-pulse' : 'bg-neutral-600'
          }`}
        />
        <span>Audio Visualizer / Spectrum Output</span>
      </div>

      <canvas
        ref={canvasRef}
        width={680}
        height={100}
        className="w-full h-20 block"
      />
    </div>
  );
};
