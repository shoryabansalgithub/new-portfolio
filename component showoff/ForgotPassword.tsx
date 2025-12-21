import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Fingerprint } from 'lucide-react';
import DecryptionModal from './DecryptionModal';

type InteractionStatus = 'idle' | 'decrypting' | 'sent';

const ForgotPasswordInteraction: React.FC = () => {
  const [status, setStatus] = useState<InteractionStatus>('idle');

  const handleStartRecovery = () => {
    if (status !== 'idle') return;
    setStatus('decrypting');
  };

  const handleDecryptionComplete = () => {
    setStatus('sent');

    // Reset to idle after a few seconds so user can try again
    setTimeout(() => {
        setStatus('idle');
    }, 4500);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-12 pt-10">
      
      {/* The Popup Modal Area */}
      <div className="relative w-[320px] h-[180px] flex items-center justify-center pointer-events-none z-20">
        <AnimatePresence mode="wait">
          {status === 'decrypting' && (
            <DecryptionModal onComplete={handleDecryptionComplete} />
          )}
        </AnimatePresence>
      </div>

      {/* The Trigger Button */}
      <motion.button
        layout
        onClick={handleStartRecovery}
        disabled={status !== 'idle'}
        className={`
          relative group px-1 py-1 rounded-2xl
          transition-all duration-300
          ${status === 'sent' ? 'cursor-default' : 'cursor-pointer'}
        `}
        whileHover={status === 'idle' ? { scale: 1.01 } : {}}
        whileTap={status === 'idle' ? { scale: 0.96 } : {}}
      >
        {/* Button Background & Borders */}
        <div className={`
            absolute inset-0 rounded-2xl transition-all duration-500
            ${status === 'sent' 
                ? 'bg-emerald-600 shadow-[0_10px_30px_-10px_rgba(16,185,129,0.4)]' 
                : 'bg-neutral-900 shadow-[0_20px_40px_-12px_rgba(0,0,0,0.25)]'
            }
        `} />
        
        {/* Inner Border/Glint */}
        <div className={`
            absolute inset-[1px] rounded-[15px] border-t border-white/20 border-b border-black/20
            transition-all duration-500
            ${status === 'sent' ? 'opacity-0' : 'opacity-100'}
        `} />

        {/* Content Container */}
        <div className={`
            relative flex items-center justify-between gap-4 px-6 h-14 min-w-[260px] rounded-[13px]
            overflow-hidden transition-all duration-500
            ${status === 'sent' ? 'bg-emerald-600' : 'bg-[#171717]'}
        `}>
            
            {/* Ambient Shine on Idle */}
            {status === 'idle' && (
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            )}

            <AnimatePresence mode="wait" initial={false}>
              {status === 'idle' && (
                <motion.div
                  key="idle"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-between w-full"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-white/10 rounded-full ring-1 ring-white/10 group-hover:bg-white/20 transition-colors">
                        <Fingerprint className="w-4 h-4 text-neutral-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="font-medium text-neutral-300 group-hover:text-white transition-colors">Recover Password</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-neutral-500 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              )}

              {status === 'decrypting' && (
                <motion.div
                  key="decrypting"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -20, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center justify-center w-full gap-3"
                >
                   <div className="w-4 h-4 border-2 border-neutral-500 border-t-white rounded-full animate-spin" />
                   <span className="text-neutral-300 font-mono text-xs tracking-wider">AUTHORIZING...</span>
                </motion.div>
              )}

              {status === 'sent' && (
                <motion.div
                  key="sent"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="flex items-center justify-center w-full gap-2"
                >
                  <div className="bg-white/20 rounded-full p-1">
                    <Check className="w-3 h-3 text-white stroke-[3]" />
                  </div>
                  <span className="font-semibold text-white tracking-wide">Recovery Sent</span>
                </motion.div>
              )}
            </AnimatePresence>
        </div>
      </motion.button>
      
      {/* Shadow Reflection on Floor (Light Mode) */}
      <div className={`
        h-3 w-40 mx-auto rounded-[100%] blur-xl transition-all duration-500
        ${status === 'sent' ? 'bg-emerald-500/30' : 'bg-black/10'}
      `} />

    </div>
  );
};

export default ForgotPasswordInteraction;
