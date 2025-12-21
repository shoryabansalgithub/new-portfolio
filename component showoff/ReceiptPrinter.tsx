import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { RefreshCw, Printer, Wifi, Power, Zap } from 'lucide-react';

/**
 * ReceiptPrinter Component
 * 
 * A hyper-realistic skeuomorphic thermal receipt printer simulation.
 * Demonstrates advanced CSS techniques, animations, and attention to detail.
 * 
 * Features:
 * - Physically accurate thermal printer design (EPSON TM-T88VI inspired)
 * - Real printer behavior: paper feeds bottom-first
 * - GPU-accelerated CSS transitions
 * - Micro-interactions and state feedback
 * - Accessible and performant
 * 
 * @author Your Name
 * @version 2.0.0
 */
const ReceiptPrinter: React.FC = () => {
  const [isPrinting, setIsPrinting] = useState(false);
  const [isDone, setIsDone] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [printProgress, setPrintProgress] = useState(0);
  const receiptRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const animationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Configuration constants
  const RECEIPT_LENGTH = 520;
  const ANIMATION_DURATION = 4000;

  const handlePrint = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    if (isPrinting || isDone) return;
    
    setIsPrinting(true);
    setShowReceipt(true);
    setPrintProgress(0);
    
    // Animate progress for visual feedback
    progressIntervalRef.current = setInterval(() => {
      setPrintProgress(prev => {
        if (prev >= 100) {
          if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
          return 100;
        }
        return prev + (100 / (ANIMATION_DURATION / 50));
      });
    }, 50);
    
    timeoutRef.current = setTimeout(() => {
      if (receiptRef.current) {
        receiptRef.current.style.height = `${RECEIPT_LENGTH}px`;
      }
    }, 50);
    
    animationTimeoutRef.current = setTimeout(() => {
      setIsPrinting(false);
      setIsDone(true);
      setPrintProgress(100);
    }, ANIMATION_DURATION + 100);
  };

  const handleReset = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
    if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    
    if (receiptRef.current) {
      receiptRef.current.style.height = '0px';
    }
    
    setIsDone(false);
    setIsPrinting(false);
    setPrintProgress(0);
    
    setTimeout(() => {
      setShowReceipt(false);
    }, 400);
  };
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  // Generate thermal print "burn" effect coordinates
  const generateThermalNoise = () => {
    const dots: { x: number; y: number; opacity: number }[] = [];
    for (let i = 0; i < 50; i++) {
      dots.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        opacity: Math.random() * 0.03
      });
    }
    return dots;
  };

  const thermalDots = useRef(generateThermalNoise());

  return (
    <div 
      className="flex flex-col items-center justify-center h-full overflow-visible select-none" 
      style={{ perspective: '1200px' }}
    >
      {/* ═══════════════════════════════════════════════════════════════
          PRINTER BODY - Main Container
          ═══════════════════════════════════════════════════════════════ */}
      <div 
        className="relative w-[380px] h-[280px] flex flex-col items-center overflow-visible"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: 'rotateX(8deg)'
        }}
      >
        {/* ─────────────────────────────────────────────────────────────
            CHASSIS - Multi-layer realistic body
            ───────────────────────────────────────────────────────────── */}
        
        {/* Layer 1: Deep shadow base */}
        <div 
          className="absolute inset-0 rounded-[28px]"
          style={{
            background: '#0a0a0a',
            transform: 'translateZ(-4px)',
            boxShadow: '0 40px 80px -20px rgba(0,0,0,0.8)'
          }}
        />

        {/* Layer 2: Main body with premium matte finish */}
        <div 
          className="absolute inset-0 rounded-[26px]"
          style={{
            background: `
              linear-gradient(165deg, 
                #2a2a2a 0%, 
                #1f1f1f 15%,
                #1a1a1a 40%, 
                #151515 70%,
                #101010 100%
              )
            `,
            boxShadow: `
              0 25px 50px -12px rgba(0,0,0,0.7),
              0 12px 24px -8px rgba(0,0,0,0.5),
              inset 0 1px 0 rgba(255,255,255,0.07),
              inset 0 -1px 0 rgba(0,0,0,0.3)
            `
          }}
        />

        {/* Layer 3: Brushed metal texture overlay */}
        <div 
          className="absolute inset-0 rounded-[26px] pointer-events-none"
          style={{
            opacity: 0.4,
            backgroundImage: `
              repeating-linear-gradient(
                90deg,
                transparent 0px,
                transparent 1px,
                rgba(255,255,255,0.01) 1px,
                rgba(255,255,255,0.01) 2px
              )
            `,
            backgroundSize: '2px 100%'
          }}
        />

        {/* Layer 4: Subtle noise texture for premium feel */}
        <div 
          className="absolute inset-0 rounded-[26px] opacity-[0.15] pointer-events-none mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Layer 5: Top highlight edge */}
        <div 
          className="absolute top-0 left-6 right-6 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.12) 30%, rgba(255,255,255,0.18) 50%, rgba(255,255,255,0.12) 70%, transparent 100%)'
          }}
        />

        {/* Layer 6: Side bevels for 3D depth */}
        <div 
          className="absolute top-3 bottom-3 left-0 w-[1px]"
          style={{
            background: 'linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)'
          }}
        />
        <div 
          className="absolute top-3 bottom-3 right-0 w-[1px]"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)'
          }}
        />

        {/* ─────────────────────────────────────────────────────────────
            TOP PANEL - Control interface
            ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full h-[70px] flex items-center justify-between px-5 z-20">
          
          {/* === LEFT: Status indicators & Branding === */}
          <div className="flex items-center gap-4">
            
            {/* Power LED with realistic housing */}
            <div className="flex flex-col items-center gap-1">
              <div 
                className="relative w-[18px] h-[18px] rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.05)'
                }}
              >
                {/* LED lens */}
                <div 
                  className="w-3 h-3 rounded-full transition-all duration-500"
                  style={{
                    backgroundColor: isPrinting ? '#f59e0b' : '#10b981',
                    boxShadow: isPrinting 
                      ? '0 0 12px 4px rgba(245,158,11,0.5), 0 0 24px 8px rgba(245,158,11,0.2), inset 0 -2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.3)' 
                      : '0 0 8px 3px rgba(16,185,129,0.4), 0 0 16px 6px rgba(16,185,129,0.15), inset 0 -2px 4px rgba(0,0,0,0.3), inset 0 1px 2px rgba(255,255,255,0.2)'
                  }}
                />
                {/* Pulse ring animation */}
                {isPrinting && (
                  <motion.div 
                    className="absolute inset-0 rounded-full border-2 border-amber-400/30"
                    animate={{ scale: [1, 1.6, 1.6], opacity: [0.6, 0, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
                  />
                )}
              </div>
              <span className="text-[5px] text-neutral-600 font-medium tracking-wider">PWR</span>
            </div>

            {/* WiFi/Network LED */}
            <div className="flex flex-col items-center gap-1">
              <div 
                className="relative w-[18px] h-[18px] rounded-full flex items-center justify-center"
                style={{
                  background: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.9), 0 1px 0 rgba(255,255,255,0.05)'
                }}
              >
                <Wifi 
                  size={9} 
                  className="text-blue-400"
                  style={{ filter: 'drop-shadow(0 0 4px rgba(96,165,250,0.6))' }}
                />
              </div>
              <span className="text-[5px] text-neutral-600 font-medium tracking-wider">NET</span>
            </div>

            {/* Brand block */}
            <div className="flex flex-col ml-2">
              <span 
                className="text-[11px] font-black text-neutral-300 tracking-[0.25em] uppercase"
                style={{ 
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                  fontFamily: 'system-ui, -apple-system, sans-serif'
                }}
              >
                EPSON
              </span>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="text-[7px] text-neutral-500 tracking-wider font-medium">TM-T88VI</span>
                <div className="w-1 h-1 rounded-full bg-neutral-600" />
                <span className="text-[6px] text-neutral-600 tracking-wide">THERMAL</span>
              </div>
            </div>
          </div>

          {/* === CENTER: LCD Display Module === */}
          <div className="relative">
            {/* Display outer bezel */}
            <div 
              className="relative rounded-xl p-[3px]"
              style={{
                background: 'linear-gradient(145deg, #0a0a0a, #1a1a1a)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 8px rgba(0,0,0,0.5)'
              }}
            >
              {/* Display inner bezel */}
              <div 
                className="rounded-lg px-4 py-2.5 min-w-[120px]"
                style={{
                  background: 'linear-gradient(180deg, #0d0d0d, #111111)',
                  boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.95)'
                }}
              >
                {/* LCD Panel */}
                <div 
                  className="relative overflow-hidden rounded"
                  style={{
                    background: isPrinting 
                      ? 'linear-gradient(180deg, #1a2f1a 0%, #0f1f0f 100%)'
                      : isDone
                        ? 'linear-gradient(180deg, #0f2f2f 0%, #0a1f1f 100%)'
                        : 'linear-gradient(180deg, #1a1f1a 0%, #0f1510 100%)'
                  }}
                >
                  {/* CRT scanline effect */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      backgroundImage: 'repeating-linear-gradient(0deg, transparent 0px, transparent 1px, rgba(0,0,0,0.3) 1px, rgba(0,0,0,0.3) 2px)',
                      backgroundSize: '100% 2px',
                      opacity: 0.5
                    }}
                  />
                  
                  {/* Screen phosphor glow */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: `radial-gradient(ellipse at center, ${
                        isPrinting ? 'rgba(245,158,11,0.2)' : 'rgba(52,211,153,0.15)'
                      } 0%, transparent 70%)`
                    }}
                  />

                  {/* Vignette effect */}
                  <div 
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)'
                    }}
                  />
                  
                  {/* Display content */}
                  <div className="relative px-2 py-1.5 text-center">
                    <div 
                      className={`font-mono text-[12px] font-bold tracking-wider ${isPrinting ? 'animate-pulse' : ''}`}
                      style={{ 
                        color: isPrinting ? '#fbbf24' : isDone ? '#34d399' : '#4ade80',
                        textShadow: isPrinting 
                          ? '0 0 10px rgba(251,191,36,0.9), 0 0 20px rgba(251,191,36,0.5)' 
                          : '0 0 10px rgba(74,222,128,0.7), 0 0 20px rgba(74,222,128,0.3)',
                        fontFamily: '"Courier New", monospace'
                      }}
                    >
                      {isPrinting ? 'PRINTING' : isDone ? 'COMPLETE' : 'READY'}
                    </div>
                    {isPrinting && (
                      <div className="flex justify-center gap-[2px] mt-1">
                        {[0,1,2,3,4,5,6,7].map((i) => (
                          <motion.div
                            key={i}
                            className="w-[6px] h-[3px] rounded-sm"
                            style={{ backgroundColor: '#fbbf24' }}
                            animate={{ 
                              opacity: printProgress > (i * 12.5) ? 1 : 0.2,
                              scaleY: printProgress > (i * 12.5) ? 1 : 0.5
                            }}
                            transition={{ duration: 0.15 }}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* === RIGHT: Ventilation & Details === */}
          <div className="flex items-center gap-4">
            
            {/* Ventilation grille */}
            <div 
              className="flex flex-col gap-[2px] p-2 rounded-lg"
              style={{
                background: 'linear-gradient(180deg, #0a0a0a, #151515)',
                boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.8)'
              }}
            >
              {[0,1,2,3].map((row) => (
                <div key={row} className="flex gap-[2px]">
                  {[0,1,2,3,4,5].map((col) => (
                    <div 
                      key={col}
                      className="w-[3px] h-[3px] rounded-full"
                      style={{
                        background: '#000',
                        boxShadow: 'inset 0 1px 1px rgba(0,0,0,0.8)'
                      }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Phillips head screws */}
            <div className="flex flex-col gap-3">
              {[0,1].map((i) => (
                <div 
                  key={i}
                  className="w-4 h-4 rounded-full"
                  style={{
                    background: 'linear-gradient(145deg, #2a2a2a, #1a1a1a)',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.03)'
                  }}
                >
                  <div 
                    className="w-full h-full rounded-full flex items-center justify-center"
                    style={{
                      background: 'conic-gradient(from 45deg, #333 0deg, #222 90deg, #333 180deg, #222 270deg, #333 360deg)'
                    }}
                  >
                    {/* Phillips cross */}
                    <div className="relative w-2 h-2">
                      <div className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 bg-neutral-600 rounded-full" />
                      <div className="absolute left-1/2 top-0 h-full w-[1px] -translate-x-1/2 bg-neutral-600 rounded-full" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            PAPER FEED SLOT - The main output area
            ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full z-30 flex flex-col items-center mt-1">
          
          {/* Recessed slot housing */}
          <div 
            className="relative w-[320px] h-[60px] rounded-2xl flex flex-col items-center justify-center"
            style={{
              background: 'linear-gradient(180deg, #050505 0%, #0a0a0a 30%, #080808 100%)',
              boxShadow: `
                inset 0 8px 25px rgba(0,0,0,1),
                inset 0 -3px 8px rgba(0,0,0,0.6),
                inset 4px 0 8px rgba(0,0,0,0.4),
                inset -4px 0 8px rgba(0,0,0,0.4)
              `
            }}
          >
            {/* Inner ridge detail */}
            <div 
              className="absolute top-2 inset-x-3 h-[1px]"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, #1a1a1a 15%, #252525 50%, #1a1a1a 85%, transparent 100%)'
              }}
            />

            {/* Thermal head housing (visible inside slot) */}
            <div 
              className="absolute top-3 w-[280px] h-2 rounded-full"
              style={{
                background: 'linear-gradient(180deg, #1a1a1a, #0a0a0a)',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8)'
              }}
            >
              {/* Thermal print head element */}
              <div 
                className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-[2px]"
                style={{
                  background: isPrinting 
                    ? 'linear-gradient(90deg, transparent, #ff6b35, #ff8c42, #ff6b35, transparent)'
                    : 'linear-gradient(90deg, transparent, #333, #444, #333, transparent)',
                  boxShadow: isPrinting ? '0 0 8px rgba(255,107,53,0.5)' : 'none',
                  transition: 'all 0.3s ease'
                }}
              />
            </div>

            {/* Paper exit slit */}
            <div 
              className="relative w-[270px] h-[14px] rounded-full flex items-center justify-center overflow-hidden mt-3"
              style={{
                background: '#000',
                boxShadow: 'inset 0 4px 12px rgba(0,0,0,1), 0 1px 0 rgba(255,255,255,0.02)'
              }}
            >
              {/* Deep inner void */}
              <div className="w-[260px] h-[6px] bg-[#020202] rounded-full" />
              
              {/* Feed roller left */}
              <div 
                className="absolute left-4 w-3 h-3 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #2a2a2a, #0a0a0a)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.9)'
                }}
              >
                {/* Roller texture grooves */}
                <div className="absolute inset-[2px] rounded-full border border-neutral-800/50" />
              </div>
              
              {/* Feed roller right */}
              <div 
                className="absolute right-4 w-3 h-3 rounded-full"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, #2a2a2a, #0a0a0a)',
                  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.9)'
                }}
              >
                <div className="absolute inset-[2px] rounded-full border border-neutral-800/50" />
              </div>

              {/* Center alignment marks */}
              <div className="absolute left-1/2 -translate-x-1/2 flex gap-12">
                <div className="w-[1px] h-2 bg-neutral-800 rounded-full" />
                <div className="w-[1px] h-2 bg-neutral-800 rounded-full" />
              </div>
            </div>

            {/* Auto-cutter blade line */}
            <div 
              className="absolute bottom-2 w-[250px] h-[2px] rounded-full overflow-hidden"
              style={{
                background: 'linear-gradient(180deg, #1a1a1a, #0d0d0d)'
              }}
            >
              <div 
                className="h-full"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(180,180,180,0.15) 20%, rgba(220,220,220,0.25) 50%, rgba(180,180,180,0.15) 80%, transparent 100%)'
                }}
              />
            </div>
          </div>

          {/* Decorative chrome strip */}
          <div 
            className="w-[300px] h-[3px] mt-1 rounded-full"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.03) 20%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 80%, transparent 100%)'
            }}
          />
        </div>

        {/* ═══════════════════════════════════════════════════════════════
            THE RECEIPT - Thermal paper output
            ═══════════════════════════════════════════════════════════════ */}
        {showReceipt && (
          <div className="absolute top-[116px] z-20 w-full flex justify-center pointer-events-none">
            <div
              ref={receiptRef}
              className="relative w-[220px] origin-top overflow-hidden"
              style={{ 
                height: '0px',
                transformStyle: 'preserve-3d',
                transition: `height ${ANIMATION_DURATION}ms cubic-bezier(0.22, 0.61, 0.36, 1)`
              }}
            >
              {/* Receipt paper - positioned at bottom for realistic feed */}
              <div 
                className="absolute bottom-0 left-0 w-full"
                style={{
                  height: `${RECEIPT_LENGTH}px`,
                  background: `linear-gradient(
                    180deg, 
                    #fefdfb 0%, 
                    #fdfcf9 15%,
                    #fcfbf7 40%,
                    #faf9f4 70%,
                    #f8f6f1 100%
                  )`,
                  // Realistic torn edge at bottom
                  maskImage: `
                    linear-gradient(to bottom, black calc(100% - 12px), transparent 100%),
                    radial-gradient(ellipse 6px 4px at 6px calc(100% - 6px), transparent 4px, black 4.5px)
                  `,
                  maskSize: '100% 100%, 12px 100%',
                  maskPosition: '0 0, -3px 0',
                  maskComposite: 'intersect',
                  WebkitMaskImage: `
                    linear-gradient(to bottom, black calc(100% - 12px), transparent 100%),
                    radial-gradient(ellipse 6px 4px at 6px calc(100% - 6px), transparent 4px, black 4.5px)
                  `,
                  WebkitMaskSize: '100% 100%, 12px 100%',
                  WebkitMaskPosition: '0 0, -3px 0',
                  WebkitMaskComposite: 'source-in',
                }}
              >
                {/* Slot shadow on paper */}
                <div 
                  className="absolute top-0 left-0 w-full h-10 pointer-events-none z-30"
                  style={{ 
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.06) 50%, transparent 100%)' 
                  }}
                />

                {/* Paper fiber texture */}
                <div 
                  className="absolute inset-0 opacity-[0.025] pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                  }}
                />

                {/* Thermal print imperfections */}
                {thermalDots.current.map((dot, i) => (
                  <div
                    key={i}
                    className="absolute w-[2px] h-[1px] bg-neutral-400 rounded-full"
                    style={{
                      left: `${dot.x}%`,
                      top: `${dot.y}%`,
                      opacity: dot.opacity
                    }}
                  />
                ))}

                {/* Paper curl shadows */}
                <div 
                  className="absolute top-0 left-0 w-4 h-full pointer-events-none"
                  style={{
                    background: 'linear-gradient(to right, rgba(0,0,0,0.05), transparent)'
                  }}
                />
                <div 
                  className="absolute top-0 right-0 w-4 h-full pointer-events-none"
                  style={{
                    background: 'linear-gradient(to left, rgba(0,0,0,0.05), transparent)'
                  }}
                />

                {/* ═════════ RECEIPT CONTENT ═════════ */}
                <div className="px-4 pt-5 pb-2 flex flex-col items-center gap-2">
                  
                  {/* Store Logo/Header */}
                  <div className="text-center w-full pb-3 border-b border-dashed border-neutral-300/80">
                    <div className="text-lg font-black tracking-tight text-neutral-800 uppercase">
                      ☕ COFFEE HOUSE
                    </div>
                    <div className="font-mono text-[7px] text-neutral-500 mt-1.5 tracking-wide leading-relaxed">
                      123 MAIN STREET, SUITE 100<br/>
                      NEW YORK, NY 10001<br/>
                      TEL: (555) 123-4567
                    </div>
                  </div>

                  {/* Transaction Info */}
                  <div className="w-full flex justify-between font-mono text-[7px] text-neutral-500 py-1">
                    <span>NOV 29, 2024 12:42 PM</span>
                    <span>ORDER #4292</span>
                  </div>

                  {/* Divider */}
                  <div className="w-full border-t border-neutral-200" />

                  {/* Line Items */}
                  <div className="w-full flex flex-col gap-1.5 font-mono text-[8px] text-neutral-700 py-1">
                    <div className="flex justify-between">
                      <span className="flex-1">CAPPUCCINO LARGE</span>
                      <span className="w-12 text-right">$4.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="flex-1">BUTTER CROISSANT</span>
                      <span className="w-12 text-right">$3.75</span>
                    </div>
                    <div className="flex justify-between text-neutral-400 text-[7px] pt-1">
                      <span>SUBTOTAL</span>
                      <span>$8.25</span>
                    </div>
                    <div className="flex justify-between text-neutral-400 text-[7px]">
                      <span>TAX 8.0%</span>
                      <span>$0.66</span>
                    </div>
                  </div>

                  {/* Total Section */}
                  <div className="w-full border-t-2 border-neutral-800 border-dashed pt-2">
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono font-bold text-[10px] text-neutral-800">TOTAL</span>
                      <span className="text-xl font-black text-neutral-900 tracking-tight">$8.91</span>
                    </div>
                  </div>

                  {/* Payment Info */}
                  <div className="w-full border-t border-neutral-200 pt-2 mt-1">
                    <div className="flex justify-between font-mono text-[7px] text-neutral-600">
                      <span>VISA ****4242</span>
                      <span className="text-emerald-700 font-semibold">APPROVED</span>
                    </div>
                    <div className="flex justify-between font-mono text-[7px] text-neutral-400 mt-0.5">
                      <span>AUTH: 847291</span>
                      <span>CHIP READ</span>
                    </div>
                  </div>
                  
                  {/* QR Code */}
                  <div className="w-full mt-3 flex flex-col items-center gap-2">
                    <p className="text-[6px] text-neutral-400 uppercase tracking-wider">Scan for digital receipt</p>
                    
                    {/* QR Code - SVG based for crisp rendering */}
                    <svg width="60" height="60" viewBox="0 0 21 21" className="bg-white p-1">
                      {/* QR Code pattern as rectangles */}
                      {[
                        // Row 0
                        [0,0],[1,0],[2,0],[3,0],[4,0],[5,0],[6,0],[8,0],[10,0],[12,0],[14,0],[15,0],[16,0],[17,0],[18,0],[19,0],[20,0],
                        // Row 1
                        [0,1],[6,1],[9,1],[11,1],[14,1],[20,1],
                        // Row 2
                        [0,2],[2,2],[3,2],[4,2],[6,2],[8,2],[10,2],[12,2],[14,2],[16,2],[17,2],[18,2],[20,2],
                        // Row 3
                        [0,3],[2,3],[3,3],[4,3],[6,3],[9,3],[10,3],[11,3],[14,3],[16,3],[17,3],[18,3],[20,3],
                        // Row 4
                        [0,4],[2,4],[3,4],[4,4],[6,4],[8,4],[11,4],[12,4],[14,4],[16,4],[17,4],[18,4],[20,4],
                        // Row 5
                        [0,5],[6,5],[9,5],[12,5],[14,5],[20,5],
                        // Row 6
                        [0,6],[1,6],[2,6],[3,6],[4,6],[5,6],[6,6],[8,6],[10,6],[12,6],[14,6],[15,6],[16,6],[17,6],[18,6],[19,6],[20,6],
                        // Row 7
                        [9,7],[10,7],
                        // Row 8
                        [0,8],[2,8],[4,8],[5,8],[6,8],[7,8],[8,8],[10,8],[11,8],[13,8],[14,8],[16,8],[19,8],
                        // Row 9
                        [1,9],[3,9],[7,9],[9,9],[11,9],[12,9],[15,9],[17,9],[20,9],
                        // Row 10
                        [0,10],[2,10],[3,10],[5,10],[6,10],[8,10],[9,10],[10,10],[12,10],[14,10],[15,10],[18,10],[19,10],
                        // Row 11
                        [1,11],[4,11],[7,11],[10,11],[11,11],[13,11],[16,11],[18,11],[20,11],
                        // Row 12
                        [0,12],[1,12],[3,12],[4,12],[6,12],[8,12],[11,12],[12,12],[13,12],[15,12],[16,12],[19,12],
                        // Row 13
                        [8,13],[10,13],[11,13],[14,13],[17,13],[19,13],[20,13],
                        // Row 14
                        [0,14],[1,14],[2,14],[3,14],[4,14],[5,14],[6,14],[9,14],[12,14],[14,14],[16,14],[18,14],[19,14],
                        // Row 15
                        [0,15],[6,15],[8,15],[10,15],[11,15],[13,15],[15,15],[19,15],[20,15],
                        // Row 16
                        [0,16],[2,16],[3,16],[4,16],[6,16],[8,16],[9,16],[12,16],[13,16],[16,16],[17,16],
                        // Row 17
                        [0,17],[2,17],[3,17],[4,17],[6,17],[10,17],[12,17],[14,17],[15,17],[17,17],[18,17],[20,17],
                        // Row 18
                        [0,18],[2,18],[3,18],[4,18],[6,18],[8,18],[10,18],[11,18],[15,18],[18,18],[19,18],
                        // Row 19
                        [0,19],[6,19],[9,19],[11,19],[13,19],[14,19],[16,19],[18,19],[20,19],
                        // Row 20
                        [0,20],[1,20],[2,20],[3,20],[4,20],[5,20],[6,20],[8,20],[12,20],[13,20],[15,20],[17,20],[19,20],
                      ].map(([x, y], i) => (
                        <rect key={i} x={x} y={y} width="1" height="1" fill="#1a1a1a" />
                      ))}
                    </svg>
                    
                    <span className="font-mono text-[6px] text-neutral-400 tracking-wider">coffeehouse.com/r/4292</span>
                  </div>

                  {/* Footer Messages */}
                  <div className="text-center mt-2 space-y-1">
                    <p className="text-[8px] text-neutral-600 font-medium">THANK YOU FOR YOUR VISIT!</p>
                    <p className="text-[7px] text-neutral-400">★ You earned 9 rewards points ★</p>
                    <p className="text-[6px] text-neutral-300 mt-2 leading-relaxed">
                      Complete survey for a FREE drink!
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ─────────────────────────────────────────────────────────────
            BOTTOM PANEL - Print button area
            ───────────────────────────────────────────────────────────── */}
        <div className="relative w-full flex-1 z-10 flex justify-center items-center pt-3 pb-4">
          
          {/* Print button assembly */}
          <div className="relative">
            {/* Button socket/depression */}
            <div 
              className="absolute -inset-1.5 rounded-xl"
              style={{
                background: 'linear-gradient(180deg, #050505, #0f0f0f)',
                boxShadow: 'inset 0 3px 6px rgba(0,0,0,0.8)'
              }}
            />
            
            <motion.button
              onClick={handlePrint}
              disabled={isPrinting || isDone}
              whileHover={!isPrinting && !isDone ? { scale: 1.03, y: -1 } : {}}
              whileTap={!isPrinting && !isDone ? { scale: 0.97, y: 3 } : {}}
              className={`
                relative w-44 h-[52px] rounded-xl overflow-hidden
                ${isPrinting || isDone ? 'cursor-not-allowed' : 'cursor-pointer'}
              `}
              style={{
                background: isPrinting || isDone 
                  ? 'linear-gradient(180deg, #151515 0%, #0a0a0a 100%)'
                  : 'linear-gradient(180deg, #333333 0%, #252525 40%, #1a1a1a 100%)',
                boxShadow: isPrinting || isDone
                  ? 'inset 0 3px 8px rgba(0,0,0,0.8)'
                  : `
                    0 6px 0 #0a0a0a,
                    0 8px 25px rgba(0,0,0,0.6),
                    inset 0 1px 0 rgba(255,255,255,0.15),
                    inset 0 -2px 0 rgba(0,0,0,0.3)
                  `,
                transition: 'box-shadow 0.15s ease, background 0.15s ease'
              }}
            >
              {/* Top highlight */}
              <div 
                className="absolute inset-x-0 top-0 h-[1px]"
                style={{ 
                  background: isPrinting || isDone 
                    ? 'transparent' 
                    : 'linear-gradient(90deg, transparent 5%, rgba(255,255,255,0.25) 50%, transparent 95%)' 
                }}
              />
              
              {/* Button content */}
              <div className={`flex items-center justify-center gap-3 h-full transition-all duration-200 ${
                isPrinting || isDone ? 'opacity-40' : 'opacity-100'
              }`}>
                {isPrinting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Zap size={18} className="text-amber-400" strokeWidth={2.5} />
                  </motion.div>
                ) : (
                  <Printer 
                    size={18} 
                    className={isDone ? 'text-neutral-600' : 'text-neutral-300'}
                    strokeWidth={2.5}
                  />
                )}
                <span className={`text-[12px] font-bold tracking-[0.2em] uppercase ${
                  isDone ? 'text-neutral-600' : 'text-neutral-200'
                }`}>
                  {isPrinting ? 'PRINTING' : isDone ? 'PRINTED' : 'PRINT'}
                </span>
              </div>

              {/* Subtle glow when active */}
              {!isPrinting && !isDone && (
                <div 
                  className="absolute inset-0 pointer-events-none opacity-0 hover:opacity-100 transition-opacity"
                  style={{
                    background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.05) 0%, transparent 70%)'
                  }}
                />
              )}
            </motion.button>
          </div>
        </div>

        {/* ───── Bottom decorative elements ───── */}
        
        {/* Rubber feet indicators */}
        <div className="absolute bottom-2 left-5 flex gap-2">
          {[0,1,2].map(i => (
            <div 
              key={i}
              className="w-2 h-2 rounded-full"
              style={{
                background: 'linear-gradient(145deg, #1a1a1a, #0a0a0a)',
                boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.8), 0 1px 0 rgba(255,255,255,0.03)'
              }}
            />
          ))}
        </div>

        {/* Model/Serial info */}
        <div className="absolute bottom-2 right-5 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Power size={6} className="text-neutral-600" />
            <span className="text-[5px] text-neutral-600 font-mono">24V DC</span>
          </div>
          <div className="w-[1px] h-2 bg-neutral-700" />
          <span className="text-[6px] text-neutral-600 font-mono tracking-wider">SN: EPT88VI-2024-SF</span>
        </div>

        {/* Compliance marks */}
        <div className="absolute bottom-6 right-5 flex items-center gap-1.5 opacity-40">
          <div className="text-[5px] text-neutral-600 font-bold border border-neutral-600 rounded px-0.5">CE</div>
          <div className="text-[5px] text-neutral-600 font-bold border border-neutral-600 rounded px-0.5">FCC</div>
          <div className="text-[5px] text-neutral-600">♻️</div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════════════════
          FLOOR SHADOW
          ═══════════════════════════════════════════════════════════════ */}
      <motion.div 
        className="absolute bottom-[-45px] w-[340px] h-[70px] rounded-[100%] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.15) 35%, transparent 70%)',
        }}
        animate={{ 
          opacity: showReceipt ? 1 : 0.7,
          scaleX: showReceipt ? 1.25 : 1,
          scaleY: showReceipt ? 1.2 : 1,
        }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />

      {/* ═══════════════════════════════════════════════════════════════
          RESET BUTTON
          ═══════════════════════════════════════════════════════════════ */}
      {isDone && (
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 25, delay: 0.2 }}
          className="absolute -bottom-28 z-50"
        >
          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.06, y: -3 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 px-7 py-3.5 bg-white hover:bg-neutral-50 rounded-full text-sm font-semibold text-neutral-700 hover:text-neutral-900 transition-all cursor-pointer"
            style={{
              boxShadow: '0 4px 20px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.05)'
            }}
          >
            <motion.div
              whileHover={{ rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <RefreshCw size={16} strokeWidth={2.5} />
            </motion.div>
            <span>Print Again</span>
          </motion.button>
        </motion.div>
      )}
    </div>
  );
};

export default ReceiptPrinter;
