import React from 'react';
import { NOW_BUILDING } from '../constants';
import { ArrowUpRight } from './Icons';

const NowBuilding: React.FC = () => {
  return (
    <div className="border p-4 animate-fade-in flex flex-col gap-3 transition-colors duration-300 border-zinc-300 bg-white/40 dark:border-zinc-800 dark:bg-zinc-900/30 group">
        <div className="flex justify-between items-center border-b pb-2 border-dashed border-zinc-300 dark:border-zinc-700/50">
             <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-zinc-500">Active</span>
             </div>
             <a href={NOW_BUILDING.link} className="hover:opacity-60 transition-opacity">
                <ArrowUpRight className="w-3 h-3 text-zinc-400" />
             </a>
        </div>
        
        <div>
             <h4 className="text-sm font-bold leading-tight mb-1 transition-colors duration-300 text-zinc-900 dark:text-zinc-200">
                {NOW_BUILDING.title}
             </h4>
             <p className="text-xs font-sans italic leading-relaxed transition-colors duration-300 text-zinc-600 dark:text-zinc-400">
                 {NOW_BUILDING.description}
             </p>
        </div>
        
        <div className="flex flex-col gap-1 mt-1">
             <div className="h-1.5 w-full bg-zinc-200 dark:bg-zinc-800 rounded-sm overflow-hidden">
                <div className="h-full bg-zinc-800 dark:bg-zinc-200 w-[65%] rounded-sm relative overflow-hidden">
                     <div className="absolute inset-0 bg-white/20 animate-[shimmer_2s_infinite]"></div>
                </div>
             </div>
             <span className="font-mono text-[8px] text-right text-zinc-400">65% Complete</span>
        </div>
    </div>
  );
};

export default NowBuilding;