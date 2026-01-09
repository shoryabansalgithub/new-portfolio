import React, { useRef, useState, useCallback } from 'react';
import { BIO, SOCIAL_LINKS } from '../constants';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [showSecondImage, setShowSecondImage] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Handle click to toggle between images with smooth erase effect
  const handleClick = useCallback(() => {
    if (isAnimating) return;

    setIsAnimating(true);

    // Toggle after a brief delay for the animation to start
    setTimeout(() => {
      setShowSecondImage(prev => !prev);
    }, 150);

    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  }, [isAnimating]);

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
            className="relative border p-1 border-zinc-400 bg-white dark:border-zinc-800 dark:bg-zinc-900/50 overflow-hidden cursor-pointer group"
            onClick={handleClick}
          >
            {/* Image wrapper */}
            <div className="relative w-full aspect-square overflow-hidden">
              {/* First image (grayscale - shown by default) */}
              <img
                src={BIO.avatar}
                alt="Profile"
                className="absolute inset-0 w-full h-full object-cover grayscale transition-all duration-500 ease-out"
                draggable={false}
                style={{
                  opacity: showSecondImage ? 0 : 1,
                  transform: showSecondImage ? 'scale(1.1)' : 'scale(1)',
                  filter: showSecondImage ? 'grayscale(100%) blur(4px)' : 'grayscale(100%) blur(0px)',
                }}
              />

              {/* Second image (revealed on click) */}
              <img
                src="/new-header.png"
                alt="Profile Reveal"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-500 ease-out"
                draggable={false}
                style={{
                  opacity: showSecondImage ? 1 : 0,
                  transform: showSecondImage ? 'scale(1)' : 'scale(0.95)',
                  filter: showSecondImage ? 'blur(0px)' : 'blur(4px)',
                }}
              />

              {/* Clean swipe/wipe transition overlay */}
              <div
                className="absolute inset-0 pointer-events-none transition-transform duration-500 ease-out"
                style={{
                  background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.95) 45%, rgba(255,255,255,0.95) 55%, transparent 100%)',
                  transform: isAnimating
                    ? 'translateX(0%)'
                    : (showSecondImage ? 'translateX(150%)' : 'translateX(-150%)'),
                }}
              />

              {/* Subtle sparkle during transition */}
              {isAnimating && (
                <div className="absolute inset-0 pointer-events-none">
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.4) 0%, transparent 50%)',
                      animation: 'pulse 0.3s ease-out',
                    }}
                  />
                </div>
              )}

              {/* Click hint overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/10 transition-all duration-300">
                <div className="bg-black/70 backdrop-blur-sm px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-100 scale-95">
                  <span className="text-white text-[10px] font-mono uppercase tracking-wider">
                    {showSecondImage ? 'Click to go back' : 'Click to reveal'}
                  </span>
                </div>
              </div>
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