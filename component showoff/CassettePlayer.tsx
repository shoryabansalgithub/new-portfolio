import React, { useState, useEffect, useRef } from 'react';

/**
 * CassettePlayer Component
 * 
 * A hyper-realistic retro cassette tape player with:
 * - Physical tape reels that spin with variable speed
 * - Magnetic tape that transfers between reels
 * - Bouncing VU meters with peak hold
 * - Mechanical button clicks with travel
 * - Tape counter that increments
 * - Worn metal textures and realistic shadows
 * - Head gap glow when playing
 * 
 * Inspired by Sony Walkman WM-D6C Professional
 * @version 1.0.0
 */

interface Track {
  name: string;
  artist: string;
  duration: number;
}

const PLAYLIST: Track[] = [
  { name: "Bohemian Rhapsody", artist: "Queen", duration: 354 },
  { name: "Take On Me", artist: "a-ha", duration: 225 },
  { name: "Sweet Child O' Mine", artist: "Guns N' Roses", duration: 356 },
  { name: "Billie Jean", artist: "Michael Jackson", duration: 294 },
  { name: "Don't Stop Believin'", artist: "Journey", duration: 250 },
];

const CassettePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [progress, setProgress] = useState(0);
  const [tapeCounter, setTapeCounter] = useState(0);
  const [vuLeft, setVuLeft] = useState(0);
  const [vuRight, setVuRight] = useState(0);
  const [peakLeft, setPeakLeft] = useState(0);
  const [peakRight, setPeakRight] = useState(0);
  const [cassetteEjected, setCassetteEjected] = useState(false);
  const [buttonPressed, setButtonPressed] = useState<string | null>(null);

  const animationRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);

  // Simulate VU meter bouncing
  useEffect(() => {
    if (!isPlaying || isPaused) {
      // Decay VU meters when stopped
      const decay = setInterval(() => {
        setVuLeft(v => Math.max(0, v - 5));
        setVuRight(v => Math.max(0, v - 5));
        setPeakLeft(v => Math.max(0, v - 2));
        setPeakRight(v => Math.max(0, v - 2));
      }, 50);
      return () => clearInterval(decay);
    }

    const vuInterval = setInterval(() => {
      // Simulate audio levels with some randomness
      const baseLevel = 45 + Math.sin(Date.now() / 500) * 15;
      const leftLevel = baseLevel + Math.random() * 30;
      const rightLevel = baseLevel + Math.random() * 30;
      
      setVuLeft(Math.min(100, leftLevel));
      setVuRight(Math.min(100, rightLevel));
      
      // Peak hold
      setPeakLeft(p => Math.max(p - 1, leftLevel));
      setPeakRight(p => Math.max(p - 1, rightLevel));
    }, 80);

    return () => clearInterval(vuInterval);
  }, [isPlaying, isPaused]);

  // Progress and tape counter
  useEffect(() => {
    if (!isPlaying || isPaused) return;

    const progressInterval = setInterval(() => {
      setProgress(p => {
        const newProgress = p + (100 / PLAYLIST[currentTrack].duration);
        if (newProgress >= 100) {
          // Next track
          if (currentTrack < PLAYLIST.length - 1) {
            setCurrentTrack(c => c + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return 100;
          }
        }
        return newProgress;
      });
      setTapeCounter(c => c + 1);
    }, 1000);

    return () => clearInterval(progressInterval);
  }, [isPlaying, isPaused, currentTrack]);

  const handlePlay = () => {
    if (cassetteEjected) return;
    setButtonPressed('play');
    setTimeout(() => setButtonPressed(null), 150);
    
    if (isPlaying && !isPaused) return;
    setIsPlaying(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    if (!isPlaying) return;
    setButtonPressed('pause');
    setTimeout(() => setButtonPressed(null), 150);
    setIsPaused(!isPaused);
  };

  const handleStop = () => {
    setButtonPressed('stop');
    setTimeout(() => setButtonPressed(null), 150);
    setIsPlaying(false);
    setIsPaused(false);
    setProgress(0);
  };

  const handleRewind = () => {
    setButtonPressed('rewind');
    setTimeout(() => setButtonPressed(null), 300);
    setProgress(p => Math.max(0, p - 10));
    setTapeCounter(c => Math.max(0, c - 30));
  };

  const handleFastForward = () => {
    setButtonPressed('ff');
    setTimeout(() => setButtonPressed(null), 300);
    setProgress(p => Math.min(100, p + 10));
    setTapeCounter(c => c + 30);
  };

  const handleEject = () => {
    setButtonPressed('eject');
    setTimeout(() => setButtonPressed(null), 150);
    if (isPlaying) {
      setIsPlaying(false);
      setIsPaused(false);
    }
    setCassetteEjected(!cassetteEjected);
    if (!cassetteEjected) {
      setProgress(0);
      setTapeCounter(0);
    }
  };

  const handlePrevTrack = () => {
    if (currentTrack > 0) {
      setCurrentTrack(c => c - 1);
      setProgress(0);
    }
  };

  const handleNextTrack = () => {
    if (currentTrack < PLAYLIST.length - 1) {
      setCurrentTrack(c => c + 1);
      setProgress(0);
    }
  };

  // Calculate tape reel sizes based on progress
  const leftReelSize = 35 - (progress / 100) * 15;
  const rightReelSize = 20 + (progress / 100) * 15;

  const formatCounter = (num: number) => {
    return num.toString().padStart(4, '0');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-neutral-900 to-stone-900 flex items-center justify-center p-8">
      {/* Ambient lighting */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/3 w-[500px] h-[500px] bg-orange-500/5 rounded-full blur-[120px]" />
      </div>

      {/* Main Player Unit */}
      <div className="relative">
        {/* Player Body */}
        <div 
          className="relative w-[580px] rounded-[20px] overflow-hidden"
          style={{
            background: 'linear-gradient(180deg, #2a2a2a 0%, #1a1a1a 100%)',
            boxShadow: `
              0 50px 100px -20px rgba(0,0,0,0.8),
              0 30px 60px -15px rgba(0,0,0,0.6),
              inset 0 1px 0 rgba(255,255,255,0.1),
              inset 0 -1px 0 rgba(0,0,0,0.5),
              0 0 0 1px rgba(0,0,0,0.5)
            `,
          }}
        >
          {/* Brushed metal texture */}
          <div 
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `repeating-linear-gradient(
                90deg,
                transparent,
                transparent 1px,
                rgba(255,255,255,0.1) 1px,
                rgba(255,255,255,0.1) 2px
              )`,
            }}
          />

          {/* Top Section - Display and VU */}
          <div className="p-6 pb-4">
            {/* Brand and Model */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div 
                  className="text-2xl font-bold tracking-wider"
                  style={{
                    color: '#c4a265',
                    textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                    fontFamily: 'Arial Black, sans-serif',
                  }}
                >
                  SONY
                </div>
                <div className="text-[10px] text-zinc-500 tracking-[0.2em] mt-0.5">
                  WALKMAN PROFESSIONAL
                </div>
              </div>
              
              {/* Tape Counter */}
              <div 
                className="px-3 py-1.5 rounded"
                style={{
                  background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                <div className="text-[10px] text-zinc-500 mb-0.5 text-center">COUNTER</div>
                <div 
                  className="font-mono text-lg tracking-widest"
                  style={{
                    color: '#ff6b35',
                    textShadow: '0 0 10px rgba(255,107,53,0.5)',
                    fontFamily: '"LCD", "Courier New", monospace',
                  }}
                >
                  {formatCounter(tapeCounter)}
                </div>
              </div>
            </div>

            {/* VU Meters */}
            <div className="flex gap-4 mb-4">
              {/* Left VU */}
              <VUMeter level={vuLeft} peak={peakLeft} label="L" />
              {/* Right VU */}
              <VUMeter level={vuRight} peak={peakRight} label="R" />
            </div>

            {/* Track Display */}
            <div 
              className="p-3 rounded-lg mb-4"
              style={{
                background: 'linear-gradient(180deg, #0f1612 0%, #1a2420 100%)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.03)',
              }}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div 
                    className="text-sm font-medium truncate"
                    style={{
                      color: '#4ade80',
                      textShadow: '0 0 10px rgba(74,222,128,0.3)',
                    }}
                  >
                    {cassetteEjected ? '-- NO TAPE --' : PLAYLIST[currentTrack].name}
                  </div>
                  <div className="text-xs text-emerald-600/60 truncate">
                    {cassetteEjected ? '' : PLAYLIST[currentTrack].artist}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div 
                    className="text-xs"
                    style={{ color: '#4ade80' }}
                  >
                    {isPlaying && !isPaused ? '▶ PLAY' : isPaused ? '❚❚ PAUSE' : '■ STOP'}
                  </div>
                  <div className="text-[10px] text-emerald-600/50">
                    TRACK {currentTrack + 1}/{PLAYLIST.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cassette Window */}
          <div className="px-6">
            <div 
              className="relative h-[180px] rounded-xl overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)',
                boxShadow: `
                  inset 0 4px 8px rgba(0,0,0,0.8),
                  inset 0 -2px 4px rgba(0,0,0,0.4),
                  0 1px 0 rgba(255,255,255,0.05)
                `,
              }}
            >
              {/* Cassette Tape */}
              <div 
                className="absolute inset-2 rounded-lg transition-transform duration-500 ease-out"
                style={{
                  transform: cassetteEjected ? 'translateY(-60px)' : 'translateY(0)',
                  background: 'linear-gradient(180deg, #2d2d2d 0%, #1f1f1f 50%, #2d2d2d 100%)',
                  boxShadow: cassetteEjected ? '0 20px 40px rgba(0,0,0,0.5)' : 'none',
                }}
              >
                {/* Cassette Label */}
                <div 
                  className="absolute top-2 left-4 right-4 h-12 rounded"
                  style={{
                    background: 'linear-gradient(180deg, #f5e6d3 0%, #e8d5be 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.5), 0 2px 4px rgba(0,0,0,0.3)',
                  }}
                >
                  <div className="p-2">
                    <div className="text-[9px] text-amber-900/60 font-bold tracking-wider">MAXELL XLII 90</div>
                    <div className="text-[11px] text-amber-900 font-medium truncate mt-0.5">
                      {cassetteEjected ? 'MIX TAPE VOL. 1' : PLAYLIST[currentTrack].artist + ' - Greatest Hits'}
                    </div>
                  </div>
                  {/* Cassette writing lines */}
                  <div className="absolute bottom-1 left-2 right-2 flex flex-col gap-[2px]">
                    {[1,2].map(i => (
                      <div key={i} className="h-[1px] bg-amber-900/20" />
                    ))}
                  </div>
                </div>

                {/* Tape Reels Window */}
                <div 
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 w-[320px] h-[80px] rounded-lg flex items-center justify-between px-8"
                  style={{
                    background: 'linear-gradient(180deg, #0a0a0a 0%, #151515 100%)',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
                  }}
                >
                  {/* Left Reel */}
                  <TapeReel 
                    size={leftReelSize} 
                    isSpinning={isPlaying && !isPaused && !cassetteEjected}
                    direction="ccw"
                  />
                  
                  {/* Tape between reels */}
                  <div className="flex-1 mx-4 relative h-[40px]">
                    {/* Tape path */}
                    <div 
                      className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2"
                      style={{
                        background: 'linear-gradient(180deg, #2a1810 0%, #1a0f0a 100%)',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.5)',
                      }}
                    />
                    
                    {/* Tape head gap (glows when playing) */}
                    <div 
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-6 rounded"
                      style={{
                        background: '#0a0a0a',
                        boxShadow: isPlaying && !isPaused && !cassetteEjected
                          ? '0 0 15px rgba(255,100,50,0.4), inset 0 0 10px rgba(255,100,50,0.2)'
                          : 'inset 0 1px 2px rgba(0,0,0,0.5)',
                      }}
                    >
                      {/* Head gap indicator */}
                      <div 
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-[2px] rounded-full transition-all duration-300"
                        style={{
                          background: isPlaying && !isPaused && !cassetteEjected 
                            ? '#ff6b35' 
                            : '#333',
                          boxShadow: isPlaying && !isPaused && !cassetteEjected 
                            ? '0 0 8px rgba(255,107,53,0.8)' 
                            : 'none',
                        }}
                      />
                    </div>

                    {/* Guide rollers */}
                    {[-1, 1].map((side) => (
                      <div 
                        key={side}
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-4 rounded-full"
                        style={{
                          [side === -1 ? 'left' : 'right']: '20%',
                          background: 'linear-gradient(90deg, #444 0%, #666 50%, #444 100%)',
                          boxShadow: 'inset 0 0 2px rgba(0,0,0,0.5)',
                        }}
                      />
                    ))}
                  </div>

                  {/* Right Reel */}
                  <TapeReel 
                    size={rightReelSize} 
                    isSpinning={isPlaying && !isPaused && !cassetteEjected}
                    direction="ccw"
                  />
                </div>

                {/* Cassette screw holes */}
                {[[20, 20], [20, 'auto'], ['auto', 20], ['auto', 'auto']].map((pos, i) => (
                  <div 
                    key={i}
                    className="absolute w-3 h-3 rounded-full"
                    style={{
                      top: typeof pos[0] === 'number' ? pos[0] : 'auto',
                      bottom: pos[0] === 'auto' ? 8 : 'auto',
                      left: typeof pos[1] === 'number' ? pos[1] : 'auto',
                      right: pos[1] === 'auto' ? 20 : 'auto',
                      background: 'linear-gradient(135deg, #333 0%, #1a1a1a 100%)',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.5)',
                    }}
                  >
                    <div className="absolute inset-[3px] rounded-full bg-gradient-to-br from-zinc-600 to-zinc-800" />
                  </div>
                ))}
              </div>

              {/* Window reflection */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%)',
                }}
              />
            </div>
          </div>

          {/* Control Buttons */}
          <div className="p-6 pt-5">
            {/* Transport Controls */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <TransportButton 
                icon="⏮" 
                label="REW"
                isPressed={buttonPressed === 'rewind'}
                onClick={handleRewind}
                width={60}
              />
              <TransportButton 
                icon="▶" 
                label="PLAY"
                isPressed={buttonPressed === 'play'}
                onClick={handlePlay}
                active={isPlaying && !isPaused}
                width={70}
                primary
              />
              <TransportButton 
                icon="❚❚" 
                label="PAUSE"
                isPressed={buttonPressed === 'pause'}
                onClick={handlePause}
                active={isPaused}
                width={70}
              />
              <TransportButton 
                icon="■" 
                label="STOP"
                isPressed={buttonPressed === 'stop'}
                onClick={handleStop}
                width={60}
              />
              <TransportButton 
                icon="⏭" 
                label="FF"
                isPressed={buttonPressed === 'ff'}
                onClick={handleFastForward}
                width={60}
              />
              <TransportButton 
                icon="⏏" 
                label="EJECT"
                isPressed={buttonPressed === 'eject'}
                onClick={handleEject}
                active={cassetteEjected}
                width={70}
              />
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div 
                className="h-2 rounded-full overflow-hidden"
                style={{
                  background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)',
                }}
              >
                <div 
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${progress}%`,
                    background: cassetteEjected 
                      ? '#333' 
                      : 'linear-gradient(90deg, #ff6b35 0%, #ff8c5a 100%)',
                    boxShadow: cassetteEjected 
                      ? 'none' 
                      : '0 0 10px rgba(255,107,53,0.4)',
                  }}
                />
              </div>
            </div>

            {/* Track Navigation */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handlePrevTrack}
                disabled={currentTrack === 0}
                className="px-3 py-1.5 rounded text-xs text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                style={{
                  background: 'linear-gradient(180deg, #2a2a2a 0%, #1f1f1f 100%)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                ◀ PREV
              </button>
              
              <div className="text-center">
                <div className="text-[10px] text-zinc-500 tracking-wider">NOW PLAYING</div>
                <div className="text-xs text-zinc-300 font-medium mt-0.5">
                  {cassetteEjected ? 'INSERT TAPE' : `SIDE A • ${Math.floor(PLAYLIST[currentTrack].duration / 60)}:${(PLAYLIST[currentTrack].duration % 60).toString().padStart(2, '0')}`}
                </div>
              </div>

              <button 
                onClick={handleNextTrack}
                disabled={currentTrack === PLAYLIST.length - 1}
                className="px-3 py-1.5 rounded text-xs text-zinc-400 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                style={{
                  background: 'linear-gradient(180deg, #2a2a2a 0%, #1f1f1f 100%)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)',
                }}
              >
                NEXT ▶
              </button>
            </div>
          </div>

          {/* Bottom ventilation grille */}
          <div className="px-6 pb-4">
            <div className="flex justify-center gap-[3px]">
              {Array.from({ length: 40 }).map((_, i) => (
                <div 
                  key={i}
                  className="w-[6px] h-[3px] rounded-full"
                  style={{
                    background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
                    boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.5)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Device shadow */}
        <div 
          className="mt-8 mx-auto w-[520px] h-[40px] rounded-[100%]"
          style={{
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.5) 0%, transparent 70%)',
            filter: 'blur(15px)',
          }}
        />
      </div>
    </div>
  );
};

// VU Meter Component
const VUMeter: React.FC<{ level: number; peak: number; label: string }> = ({ level, peak, label }) => {
  const segments = 20;
  
  return (
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[10px] text-zinc-500 font-medium">{label}</span>
        <div className="flex-1 flex items-end gap-[2px] h-8">
          {Array.from({ length: segments }).map((_, i) => {
            const threshold = (i / segments) * 100;
            const isActive = level >= threshold;
            const isPeak = Math.abs(peak - threshold) < 5;
            
            // Color gradient: green -> yellow -> red
            let color = '#22c55e';
            if (i >= segments * 0.6) color = '#facc15';
            if (i >= segments * 0.8) color = '#ef4444';
            
            return (
              <div 
                key={i}
                className="flex-1 rounded-sm transition-all duration-75"
                style={{
                  height: `${60 + (i / segments) * 40}%`,
                  background: isActive || isPeak 
                    ? color 
                    : 'rgba(255,255,255,0.05)',
                  boxShadow: isActive 
                    ? `0 0 6px ${color}40` 
                    : 'none',
                  opacity: isActive ? 1 : isPeak ? 0.7 : 0.3,
                }}
              />
            );
          })}
        </div>
        <span className="text-[8px] text-zinc-600 w-8 text-right">
          {Math.round(level)}%
        </span>
      </div>
      {/* dB scale */}
      <div className="flex justify-between px-6 text-[7px] text-zinc-600">
        <span>-20</span>
        <span>-10</span>
        <span>-5</span>
        <span>0</span>
        <span>+3</span>
      </div>
    </div>
  );
};

// Tape Reel Component
const TapeReel: React.FC<{ size: number; isSpinning: boolean; direction: 'cw' | 'ccw' }> = ({ 
  size, 
  isSpinning,
  direction 
}) => {
  return (
    <div 
      className="relative rounded-full"
      style={{
        width: size * 2,
        height: size * 2,
        background: 'linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%)',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Tape spool */}
      <div 
        className="absolute inset-1 rounded-full"
        style={{
          background: `conic-gradient(from 0deg, #2a1810, #1a0f0a, #2a1810, #1a0f0a, #2a1810)`,
          animation: isSpinning 
            ? `spin-${direction} ${3 - (size / 35) * 1.5}s linear infinite` 
            : 'none',
        }}
      >
        {/* Spool center hub */}
        <div 
          className="absolute inset-[30%] rounded-full"
          style={{
            background: 'linear-gradient(180deg, #404040 0%, #2a2a2a 100%)',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.5)',
          }}
        >
          {/* Hub spokes */}
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <div 
              key={angle}
              className="absolute top-1/2 left-1/2 w-[2px] h-[45%] origin-bottom"
              style={{
                background: '#1a1a1a',
                transform: `translate(-50%, -100%) rotate(${angle}deg)`,
              }}
            />
          ))}
          {/* Center hole */}
          <div 
            className="absolute inset-[35%] rounded-full"
            style={{
              background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a1a 100%)',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)',
            }}
          />
        </div>
      </div>
      
      <style>{`
        @keyframes spin-cw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-ccw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

// Transport Button Component
const TransportButton: React.FC<{
  icon: string;
  label: string;
  isPressed: boolean;
  onClick: () => void;
  active?: boolean;
  width?: number;
  primary?: boolean;
}> = ({ icon, label, isPressed, onClick, active, width = 50, primary }) => {
  return (
    <button
      onClick={onClick}
      className="relative group"
      style={{ width }}
    >
      <div 
        className="py-2.5 rounded-lg transition-all duration-75 relative overflow-hidden"
        style={{
          background: active 
            ? 'linear-gradient(180deg, #ff6b35 0%, #e05a2b 100%)'
            : primary
            ? 'linear-gradient(180deg, #3a3a3a 0%, #2a2a2a 100%)'
            : 'linear-gradient(180deg, #2a2a2a 0%, #1f1f1f 100%)',
          boxShadow: isPressed 
            ? 'inset 0 2px 4px rgba(0,0,0,0.5)'
            : `
              0 4px 8px rgba(0,0,0,0.4),
              0 2px 4px rgba(0,0,0,0.3),
              inset 0 1px 0 rgba(255,255,255,0.1),
              inset 0 -1px 0 rgba(0,0,0,0.2)
            `,
          transform: isPressed ? 'translateY(2px)' : 'translateY(0)',
        }}
      >
        <div 
          className="text-center"
          style={{
            color: active ? '#fff' : '#888',
            textShadow: active ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
          }}
        >
          <div className="text-base leading-none">{icon}</div>
          <div className="text-[8px] mt-1 tracking-wider font-medium">{label}</div>
        </div>
      </div>
    </button>
  );
};

export default CassettePlayer;
