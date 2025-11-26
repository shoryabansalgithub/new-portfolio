import React from 'react';
import { TECH_STACK } from '../constants';

const TechStack: React.FC = () => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
      <h3 className="font-serif text-lg mb-4 border-b pb-2 px-6 transition-colors duration-300 text-zinc-900 border-zinc-300 dark:text-zinc-100 dark:border-zinc-800">Tools & Tech</h3>
      <div className="text-xs font-mono leading-6 px-6 transition-colors duration-300 text-zinc-600 dark:text-zinc-400">
        <p className="mb-2 uppercase text-[10px] text-zinc-500 dark:text-zinc-600">For Hire, Skilled In:</p>
        <ul className="list-none space-y-1">
            {TECH_STACK.map((tech) => (
            <li key={tech.name} className="flex items-center justify-between border-b border-dashed py-1 transition-colors duration-300 border-zinc-300 dark:border-zinc-800/50">
                <span>{tech.name}</span>
                <span className="text-[10px] text-zinc-400 dark:text-zinc-600">[EXP]</span>
            </li>
            ))}
        </ul>
      </div>
    </section>
  );
};

export default TechStack;