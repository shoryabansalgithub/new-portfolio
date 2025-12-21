import React from 'react';
import { EDUCATION } from '../constants';

const AcademicRecords: React.FC = () => {
  return (
    <section className="animate-fade-in -mt-[4px]" style={{ animationDelay: '0.5s' }}>
      <h3 className="font-serif font-bold text-2xl mb-[24.5px] border-b pb-[16px] px-6 transition-colors duration-300 text-zinc-900 border-zinc-300 dark:text-zinc-100 dark:border-zinc-800">Education</h3>
      
      <div className="flex flex-col gap-6 px-6">
          {EDUCATION.map((edu, idx) => (
             <div key={idx} className="group relative">
                <div className="flex items-baseline justify-between mb-1 flex-wrap gap-2">
                     <h4 className="text-sm font-bold uppercase tracking-wide transition-colors duration-300 text-zinc-800 dark:text-zinc-200">
                        {edu.institution}
                     </h4>
                     <span className="font-mono text-[9px] text-zinc-500">{edu.period}</span>
                </div>

                <div className="text-xs font-sans italic mb-2 transition-colors duration-300 text-zinc-600 dark:text-zinc-400">
                    {edu.degree}
                </div>
                
                 <div className="flex justify-between items-center transition-colors">
                    <span className="font-mono text-[9px] uppercase text-zinc-500 dark:text-zinc-600">{edu.location}</span>
                    <span className="font-mono text-[9px] border px-1 rounded-sm transition-colors duration-300 border-zinc-400 text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
                        {edu.grade}
                    </span>
                 </div>
             </div>
          ))}
      </div>
    </section>
  );
};

export default AcademicRecords;