import React from 'react';
import { EXPERIENCE } from '../constants';

const Experience: React.FC = () => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <h3 className="font-serif font-bold text-2xl mb-8 border-b pb-[8px] px-4 sm:px-6 transition-colors duration-300 text-zinc-900 border-zinc-300 dark:text-zinc-100 dark:border-zinc-800">Professional Experience</h3>
      <div className="flex flex-col gap-8 px-4 sm:px-6">
        {EXPERIENCE.map((job, index) => (
          <div key={index} className="group relative">
            <div className="flex items-baseline justify-between mb-1 flex-wrap gap-2">
              <div className="flex items-center gap-2">
                {job.current && (
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                )}
                <h4 className="text-sm font-bold uppercase tracking-wide transition-colors duration-300 text-zinc-800 dark:text-zinc-200">
                  {job.company}
                </h4>
              </div>
              <span className="font-mono text-[9px] text-zinc-500">{job.period}</span>
            </div>

            <div className="text-xs font-sans italic mb-3 transition-colors duration-300 text-zinc-600 dark:text-zinc-400">
              {job.role}
            </div>

            <p className="text-sm font-sans leading-relaxed transition-colors mb-3 text-zinc-600 dark:text-zinc-500">
              {job.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;