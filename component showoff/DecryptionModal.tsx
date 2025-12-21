import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, Unlock, Wifi } from 'lucide-react';
import CodeStream from './CodeStream';

interface DecryptionModalProps {
  onComplete: () => void;
}

const DecryptionModal: React.FC<DecryptionModalProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  // Simulate the decryption progress
  useEffect(() => {
    const duration = 2000; // Updated to 2 seconds
    const intervalTime = 20; 
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 200);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50, rotateX: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 50, rotateX: -10 }}
      transition={{ 
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
      className="absolute bottom-6 z-50 pointer-events-auto"
      style={{ transformPerspective: 1000 }}
    >
      <div className="relative w-80 bg-[#121212] backdrop-blur-xl border border-white/10 rounded-xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden p-4 flex flex-col gap-3">
        
        {/* Top Glint */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/5 pb-2">
          <div className="flex items-center gap-2">
            <div className={`p-1 rounded-md transition-colors duration-200 ${progress === 100 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                {progress === 100 ? <Unlock size={12} /> : <Lock size={12} />}
            </div>
            <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">
              {progress === 100 ? 'KEY_FOUND' : 'DECRYPTING...'}
            </span>
          </div>
          <Wifi size={12} className={`text-neutral-600 ${progress < 100 ? 'animate-pulse' : ''}`} />
        </div>

        {/* The Matrix/Code Stream Effect */}
        <div className="relative h-20 bg-black/40 rounded-lg overflow-hidden border border-white/5 p-2 font-mono text-[10px]">
          <CodeStream isDone={progress === 100} />
          
          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_3px] pointer-events-none opacity-30" />
        </div>

        {/* Progress Bar */}
        <div className="space-y-1">
            <div className="flex justify-between text-[9px] font-mono text-neutral-500 font-medium">
                <span>BUFFER: OPTIMAL</span>
                <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                <motion.div 
                    className="h-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                    style={{ width: `${progress}%` }}
                    initial={{ width: 0 }}
                />
            </div>
        </div>

      </div>
    </motion.div>
  );
};

export default DecryptionModal;
