import React from 'react';

// Generates a mock contribution graph
const GithubActivity: React.FC = () => {
  // Create an array of 52 weeks (columns) x 7 days (rows)
  const weeks = 52;
  const days = 7;
  
  // deterministic pseudorandom for visual consistency
  const getContributionLevel = (idx: number) => {
    const r = Math.sin(idx * 0.5) * 100;
    if (r > 80) return 4;
    if (r > 50) return 3;
    if (r > 0) return 2;
    if (r > -50) return 1;
    return 0;
  };

  const getCellColor = (level: number) => {
    // Uses CSS variables or class logic handled by parent, but Tailwind specific classes need dynamic composition
    // Since we need to switch colors based on dark mode class on parent, we use dark: modifier
    switch (level) {
        case 4: return 'bg-green-600 dark:bg-green-500';
        case 3: return 'bg-green-500/80 dark:bg-green-600/80';
        case 2: return 'bg-green-400/60 dark:bg-green-800/60';
        case 1: return 'bg-zinc-300 dark:bg-zinc-800';
        default: return 'bg-zinc-200/50 dark:bg-zinc-900/50';
    }
  };

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold transition-colors duration-300 text-zinc-900 dark:text-zinc-100">GitHub Contributions</h3>
        <span className="text-xs text-zinc-500">Last Year</span>
      </div>
      
      <div className="w-full overflow-hidden p-4 rounded-xl border transition-colors duration-300 border-zinc-300 bg-white/40 dark:border-zinc-800 dark:bg-zinc-900/20">
        <div className="flex gap-[3px] justify-between">
           {Array.from({ length: weeks }).map((_, wIndex) => (
             <div key={wIndex} className="flex flex-col gap-[3px]">
               {Array.from({ length: days }).map((_, dIndex) => {
                 const level = getContributionLevel(wIndex * 7 + dIndex);
                 return (
                   <div 
                     key={`${wIndex}-${dIndex}`}
                     className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-sm transition-colors hover:ring-1 hover:ring-zinc-400 dark:hover:ring-white/20 ${getCellColor(level)}`}
                     title="Contribution"
                   ></div>
                 );
               })}
             </div>
           ))}
        </div>
        
        <div className="flex items-center justify-end gap-2 mt-4 text-xs text-zinc-500">
           <span>Less</span>
           <div className="flex gap-1">
             <div className="w-2.5 h-2.5 rounded-sm bg-zinc-200/50 dark:bg-zinc-900/50"></div>
             <div className="w-2.5 h-2.5 rounded-sm bg-zinc-300 dark:bg-zinc-800"></div>
             <div className="w-2.5 h-2.5 rounded-sm bg-green-400/60 dark:bg-green-800/60"></div>
             <div className="w-2.5 h-2.5 rounded-sm bg-green-600 dark:bg-green-500"></div>
           </div>
           <span>More</span>
        </div>
      </div>
    </section>
  );
};

export default GithubActivity;