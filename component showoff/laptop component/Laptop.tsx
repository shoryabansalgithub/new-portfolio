import React, { useState, useEffect } from 'react';
import { Keyboard } from './Keyboard';
import { Trackpad } from './Trackpad';
import { Minus, Plus } from 'lucide-react';

const Screw: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`
    w-3 h-3 
    rounded-full 
    bg-gradient-to-br from-[#d4d4d4] via-[#c0c0c0] to-[#a0a0a0]
    shadow-screw
    flex items-center justify-center
    ${className}
  `}>
    {/* Machined Cross-Slot */}
    <div className="relative w-full h-full rotate-45 opacity-80">
      <div className="
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        w-[60%] h-[12%] 
        bg-[#888] 
        shadow-[inset_0_1px_1px_rgba(0,0,0,0.6),0_0.5px_0_rgba(255,255,255,0.2)] 
        rounded-[1px]
      "></div>
      <div className="
        absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
        h-[60%] w-[12%] 
        bg-[#888] 
        shadow-[inset_0_1px_1px_rgba(0,0,0,0.6),0_0.5px_0_rgba(255,255,255,0.2)] 
        rounded-[1px]
      "></div>
    </div>
  </div>
);

interface ScreenProps {
  isOpen: boolean;
  isPowered: boolean;
  onDoubleTap: () => void;
  text: string;
  cursorPos: { x: number, y: number };
}

const Screen: React.FC<ScreenProps> = ({ isOpen, isPowered, onDoubleTap, text, cursorPos }) => {
  return (
    <div 
      className={`
        relative w-full max-w-5xl 
        transition-all duration-1000 ease-lid-close
        preserve-3d origin-bottom
        cursor-pointer
        ${!isOpen ? 'z-50' : 'z-20'}
      `}
      style={{
        transform: !isOpen ? 'rotateX(-179.5deg) translateY(2px)' : 'rotateX(0deg)',
      }}
      onDoubleClick={onDoubleTap}
    >
      {/* 
        FRONT FACE (The Display) 
        Visible when open. Hidden when closed due to backface-visibility.
      */}
      <div className="
        backface-hidden
        relative w-full
        bg-bezel 
        rounded-[2.5rem] 
        p-4 sm:p-5
        shadow-screen
        flex flex-col
      ">
        {/* Rubber bumper edge simulation */}
        <div className="absolute inset-0 rounded-[2.5rem] border border-white/5 pointer-events-none"></div>

        {/* Screen Panel (Glossy) */}
        <div className="
          relative
          w-full h-0 pb-[67%]
          bg-display-off
          rounded-[1.5rem]
          overflow-hidden
          shadow-[inset_0_0_20px_rgba(0,0,0,0.8)]
          group
        ">
          
          {/* Actual Screen Content */}
          <div className={`
            absolute inset-0 
            bg-[#111]
            flex flex-col
            transition-all duration-200 
            ${isPowered ? 'opacity-100' : 'opacity-0 brightness-0'}
            p-8 sm:p-12
            font-mono text-gray-200
            overflow-hidden
            cursor-none
          `}>
             {/* Virtual Cursor */}
             <div 
               className="absolute w-3 h-3 bg-white/90 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.5)] pointer-events-none z-50 mix-blend-difference"
               style={{ 
                 left: `${cursorPos.x}%`, 
                 top: `${cursorPos.y}%`,
                 transform: 'translate(-50%, -50%)',
                 transition: 'all 0.05s linear' // Slight smoothing
               }}
             ></div>

             {/* Simple Terminal UI */}
             <div className="flex gap-2 text-xs text-gray-500 mb-4 select-none">
                <span>NOTHING OS 1.0</span>
                <span>—</span>
                <span>TTY1</span>
             </div>
             
             <div className="flex-grow whitespace-pre-wrap break-words text-sm sm:text-lg leading-relaxed opacity-90">
               {text}
               <span className="inline-block w-2.5 h-5 bg-white/80 animate-pulse align-middle ml-1"></span>
             </div>

             {text.length === 0 && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-gray-700 select-none">
                   <div className="text-4xl mb-2">Hello.</div>
                   <div className="text-xs tracking-widest uppercase">Start typing</div>
                </div>
             )}
          </div>

          {/* Glass Reflection Overlay (Always visible on glass) */}
          <div className="absolute inset-0 glass-reflection pointer-events-none z-20"></div>

          {/* Top Shine (Simulated light source reflection) */}
          <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 opacity-30 pointer-events-none"></div>
        </div>

        {/* Webcam & Sensors */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-2 items-center">
           {/* Camera Lens */}
           <div className="w-1.5 h-1.5 rounded-full bg-[#050505] ring-1 ring-white/10 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1)] relative">
              <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] bg-blue-900/60 rounded-full"></div>
           </div>
           {/* IR Sensor (barely visible) */}
           <div className="w-1 h-1 rounded-full bg-black/50"></div>
        </div>
      </div>

      {/* 
        BACK FACE (The Lid) 
        Visible when rotated 180deg (Closed).
      */}
      <div className="
        absolute inset-0 
        backface-hidden rotate-x-180
        bg-chassis
        rounded-[2.5rem]
        shadow-[0_20px_50px_-10px_rgba(0,0,0,0.2),inset_0_-1px_1px_rgba(255,255,255,0.6),inset_0_2px_4px_rgba(0,0,0,0.05)]
        flex items-center justify-center
      ">
          {/* Engraved Logo */}
          <div className="
            text-chassis
            text-4xl font-bold tracking-widest
            shadow-[inset_1px_2px_3px_rgba(0,0,0,0.15),1px_1px_0_rgba(255,255,255,0.8)]
            rounded-xl px-6 py-2
          ">
            NOTHING
          </div>
          
          <div className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-tr from-black/5 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
};

const Hinge: React.FC = () => (
  <div className="w-full max-w-[40rem] mx-auto h-3 sm:h-4 flex items-stretch px-4 relative z-30">
    <div className="
      flex-grow 
      bg-gradient-to-b from-[#d8d8d4] to-[#c4c4c0]
      rounded-sm
      shadow-[inset_0_2px_4px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.2)]
      border-t border-white/40
    "></div>
  </div>
);

const Laptop: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isPowered, setIsPowered] = useState(true);
  const [scale, setScale] = useState(0.85);
  const [text, setText] = useState("");
  const [activeCodes, setActiveCodes] = useState<string[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: 50, y: 50 });

  const toggleLaptopState = () => {
    if (isOpen) {
      setIsPowered(false);
      setTimeout(() => {
        setIsOpen(false);
      }, 350); 
    } else {
      setIsOpen(true);
      setTimeout(() => {
        setIsPowered(true);
      }, 600); 
    }
  };

  const handleZoomIn = () => setScale(prev => Math.min(prev + 0.05, 1.5));
  const handleZoomOut = () => setScale(prev => Math.max(prev - 0.05, 0.4));

  // Handle typing simulation
  const handleVirtualKeyPress = (key: string) => {
    if (!isPowered || !isOpen) return;

    if (key === 'BACKSPACE') {
      setText(prev => prev.slice(0, -1));
    } else if (key === 'SPACE') {
      setText(prev => prev + ' ');
    } else if (key === 'ENTER') {
      setText(prev => prev + '\n');
    } else if (key === 'TAB') {
      setText(prev => prev + '  ');
    } else if (key.length === 1) {
      setText(prev => prev + key.toLowerCase());
    }
  };

  // Handle real keyboard input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      setActiveCodes(prev => [...prev, e.code]);
      
      // Map basic keys to typing
      if (!isPowered || !isOpen) return;
      
      // Prevent default for some keys to avoid browser scrolling
      if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.code)) {
        e.preventDefault();
      }

      if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
        setText(prev => prev + e.key);
      } else if (e.key === 'Backspace') {
        setText(prev => prev.slice(0, -1));
      } else if (e.key === 'Enter') {
        setText(prev => prev + '\n');
      } else if (e.key === 'Tab') {
        e.preventDefault();
        setText(prev => prev + '  ');
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setActiveCodes(prev => prev.filter(c => c !== e.code));
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen, isPowered]);

  // Handle trackpad movement
  const handleTrackpadMove = (dx: number, dy: number) => {
    if (!isPowered || !isOpen) return;
    setCursorPos(prev => ({
      x: Math.min(100, Math.max(0, prev.x + dx * 0.2)), // Sensitivity factor 0.2
      y: Math.min(100, Math.max(0, prev.y + dy * 0.2))
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-8 md:px-12 overflow-hidden perspective-3000 bg-[#f0f0f0]">
      
      {/* 
        Main Scalable Wrapper 
      */}
      <div 
        className="will-change-contents transition-all duration-200 ease-out origin-center"
        style={{ 
          // @ts-ignore
          zoom: scale,
          MozTransform: `scale(${scale})`,
          MozTransformOrigin: 'center center'
        }}
      >
        <div className="flex flex-col items-center gap-1 w-full max-w-5xl preserve-3d">
          
          <Screen 
            isOpen={isOpen} 
            isPowered={isPowered}
            onDoubleTap={toggleLaptopState} 
            text={text}
            cursorPos={cursorPos}
          />

          <Hinge />

          {/* Base/Chassis Section */}
          <div className="
            relative
            w-full
            bg-chassis
            rounded-[2.5rem]
            shadow-chassis
            p-4 sm:p-5
            transition-all duration-500 ease-in-out
            z-10
          ">
            
            <Screw className="absolute top-6 left-6" />
            <Screw className="absolute top-6 right-6" />
            <Screw className="absolute bottom-6 left-6" />
            <Screw className="absolute bottom-6 right-6" />

            {/* Top Groove / Slot */}
            <div className="
              relative
              w-full h-3 sm:h-4
              mb-4
              rounded-full
              bg-[#e8e8e2]
              shadow-slot
              flex items-center justify-between px-3 sm:px-6
            ">
              <div className="w-8"></div>
              <div className="text-[0.55rem] font-bold text-gray-400 tracking-widest uppercase absolute left-1/2 -translate-x-1/2">
                  Model N-1
              </div>
              <button 
                onClick={toggleLaptopState}
                className={`
                  group relative h-2 w-8 sm:w-10 rounded-full transition-all duration-200
                  ${isPowered 
                    ? 'bg-[#e0e0dc] shadow-[inset_0_1px_2px_rgba(0,0,0,0.1),0_1px_0_rgba(255,255,255,0.8)]' 
                    : 'bg-[#d8d8d4] shadow-[inset_0_1px_3px_rgba(0,0,0,0.15)] translate-y-[0.5px]'}
                  flex items-center justify-center cursor-pointer hover:bg-[#ebebeb]
                `}
                aria-label={isOpen ? "Close Laptop" : "Open Laptop"}
              >
                  <div className={`
                    w-1 h-1 rounded-full transition-all duration-500
                    ${isPowered ? 'bg-accent shadow-[0_0_4px_rgba(227,72,26,0.5)]' : 'bg-gray-400'}
                  `}></div>
              </button>
            </div>

            <div className="flex flex-col items-center">
              <Keyboard 
                onKey={handleVirtualKeyPress} 
                activeCodes={activeCodes}
              />
              <Trackpad onMove={handleTrackpadMove} />
              <div className="absolute bottom-5 left-12 text-gray-300 font-bold tracking-widest opacity-40 select-none text-xs">
                NOTHING
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`
        fixed bottom-8 text-xs font-mono text-gray-400 tracking-widest uppercase pointer-events-none transition-opacity duration-500
        ${isOpen ? 'opacity-50' : 'opacity-100'}
      `}>
        {isOpen ? "Tap button to close" : "Tap to open"}
      </div>

      <div className="fixed right-6 bottom-6 flex flex-col gap-2 z-50 bg-white/80 backdrop-blur-md p-2 rounded-xl shadow-lg border border-white/20">
        <div className="text-[10px] font-bold text-gray-400 text-center uppercase tracking-widest">Scale</div>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleZoomOut}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors active:scale-95"
          >
            <Minus size={14} />
          </button>
          
          <div className="w-12 text-center font-mono text-xs font-medium text-gray-600">
            {Math.round(scale * 100)}%
          </div>

          <button 
            onClick={handleZoomIn}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors active:scale-95"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

    </div>
  );
};

export default Laptop;
