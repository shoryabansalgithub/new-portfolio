import React from 'react';
import { NOW_PLAYING } from '../constants';

const SpotifyCard: React.FC = () => {
  return (
    <div className="border p-3 animate-fade-in flex items-start gap-3 transition-colors duration-300 border-zinc-300 bg-white/40 dark:border-zinc-800 dark:bg-zinc-900/30">
        <img 
          src={NOW_PLAYING.cover} 
          alt="Album Art" 
          className="w-12 h-12 grayscale contrast-125 border border-zinc-400 dark:border-zinc-700"
        />
        <div className="flex flex-col justify-between h-12 py-0.5">
             <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">On Air Now</span>
             <div className="leading-tight">
                 <div className="text-xs font-bold truncate max-w-[120px] transition-colors duration-300 text-zinc-900 dark:text-zinc-200">{NOW_PLAYING.song}</div>
                 <div className="text-[10px] font-serif italic truncate max-w-[120px] transition-colors duration-300 text-zinc-600 dark:text-zinc-400">{NOW_PLAYING.artist}</div>
             </div>
        </div>
    </div>
  );
};

export default SpotifyCard;