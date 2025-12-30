import React, { useRef, useEffect, useCallback } from 'react';
import { BIO, SOCIAL_LINKS } from '../constants';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLImageElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const blobPosRef = useRef({ x: 0, y: 0 });
  const mousePosRef = useRef({ x: 0, y: 0 });
  const isHoveringRef = useRef(false);
  const animationFrameRef = useRef<number>();

  const BLOB_SIZE = 80;
  const LAG_FACTOR = 0.15;

  const animate = useCallback(() => {
    // Smooth interpolation
    blobPosRef.current.x += (mousePosRef.current.x - blobPosRef.current.x) * LAG_FACTOR;
    blobPosRef.current.y += (mousePosRef.current.y - blobPosRef.current.y) * LAG_FACTOR;

    // Update DOM directly without React re-render
    if (overlayRef.current) {
      const x = blobPosRef.current.x - 4;
      const y = blobPosRef.current.y - 4;
      overlayRef.current.style.clipPath = isHoveringRef.current
        ? `circle(${BLOB_SIZE / 2}px at ${x}px ${y}px)`
        : 'circle(0px at 50% 50%)';
    }

    if (cursorRef.current) {
      cursorRef.current.style.left = `${blobPosRef.current.x - 8}px`;
      cursorRef.current.style.top = `${blobPosRef.current.y - 8}px`;
      cursorRef.current.style.opacity = isHoveringRef.current ? '1' : '0';
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    animationFrameRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [animate]);

  const updatePosition = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mousePosRef.current.x = clientX - rect.left;
    mousePosRef.current.y = clientY - rect.top;
  }, []);

  // Mouse events
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    updatePosition(e.clientX, e.clientY);
  }, [updatePosition]);

  const handleMouseEnter = useCallback(() => {
    isHoveringRef.current = true;
  }, []);

  const handleMouseLeave = useCallback(() => {
    isHoveringRef.current = false;
  }, []);

  // Touch events for mobile
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      isHoveringRef.current = true;
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [updatePosition]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length > 0) {
      updatePosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, [updatePosition]);

  const handleTouchEnd = useCallback(() => {
    isHoveringRef.current = false;
  }, []);

  return (
    <div className="flex flex-col gap-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-8 items-start">
        <div className="flex-1">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold leading-[1.1] mb-6 uppercase tracking-tight transition-colors duration-300 text-zinc-900 dark:text-zinc-100 whitespace-pre-line">
            {BIO.headline}
          </h2>
          <p className="text-sm sm:text-base font-sans leading-relaxed text-justify transition-colors duration-300 text-zinc-700 dark:text-zinc-400">
            {BIO.description}
          </p>

          <div className="flex gap-4 mt-8">
            <a href="#" className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-black px-4 py-2 text-xs font-bold uppercase tracking-wide hover:opacity-80 transition-opacity">
              Read Resume
            </a>
            <a href="#" className="border px-4 py-2 text-xs font-bold uppercase tracking-wide transition-colors duration-300 border-zinc-400 text-zinc-700 hover:border-zinc-900 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-white">
              Contact
            </a>
          </div>
        </div>

        <div className="w-full sm:w-48 shrink-0 flex flex-col gap-4">
          <div
            ref={containerRef}
            className="relative border p-1 border-zinc-400 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden cursor-none touch-none"
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Image wrapper */}
            <div className="relative w-full aspect-square overflow-hidden">
              {/* Base grayscale image */}
              <img
                src={BIO.avatar}
                alt="Profile"
                className="w-full h-full object-cover grayscale"
                draggable={false}
              />

              {/* new-header.png overlay with clip-path reveal */}
              <img
                ref={overlayRef}
                src="/new-header.png"
                alt="Profile Reveal"
                className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                style={{ clipPath: 'circle(0px at 50% 50%)' }}
                draggable={false}
              />

              {/* Custom cursor dot */}
              <div
                ref={cursorRef}
                className="absolute pointer-events-none w-2 h-2 rounded-full bg-white mix-blend-difference"
                style={{ opacity: 0 }}
              />
            </div>
          </div>

          <p className="font-mono text-[9px] text-center uppercase border-b pb-2 transition-colors duration-300 text-zinc-500 border-zinc-300 dark:text-zinc-600 dark:border-zinc-800">
            Fig A. The Developer
          </p>

          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] uppercase transition-colors duration-300 text-zinc-500">Connect</span>
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-mono uppercase transition-colors group text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                <link.icon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110" />
                <span>{link.name}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;