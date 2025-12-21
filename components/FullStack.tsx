import React from 'react';
import { FULL_TECH_STACK } from '../constants';
import { ArrowUpRight } from './Icons';

interface FullStackProps {
  onBack: () => void;
}

export const FullStack: React.FC<FullStackProps> = ({ onBack }) => {
  // Group technologies by category
  const categories = FULL_TECH_STACK.reduce((acc, tech) => {
    const category = tech.category || 'Other';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(tech);
    return acc;
  }, {} as Record<string, typeof FULL_TECH_STACK>);

  const categoryOrder = ['Frontend', 'Backend', 'Database', 'Tools'];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="border-b-2 border-zinc-300 dark:border-zinc-700 pb-4 mb-8">
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-mono mb-4 hover:underline group"
          >
            <ArrowUpRight className="w-4 h-4 rotate-[225deg] group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight">
            Full Tech Stack
          </h1>
          <p className="text-base font-sans leading-relaxed mt-2 text-zinc-600 dark:text-zinc-400">
            Technologies & tools I work with
          </p>
        </div>

        {/* Tech Categories */}
        <div className="space-y-10">
          {categoryOrder.map((category) => (
            categories[category] && (
              <section key={category}>
                <h2 className="font-serif text-2xl font-bold mb-6 border-b border-zinc-300 dark:border-zinc-700 pb-2">
                  {category}
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {categories[category].map((tech) => (
                    <div
                      key={tech.name}
                      className="flex flex-col items-center justify-center p-4 border border-zinc-300 dark:border-zinc-700 rounded-lg hover:border-zinc-500 dark:hover:border-zinc-500 hover:shadow-lg transition-all group bg-white/50 dark:bg-zinc-900/50"
                    >
                      <div className="mb-3 group-hover:scale-110 transition-transform">
                        {tech.icon}
                      </div>
                      <span className="font-mono text-sm text-center">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-6 border-t border-zinc-300 dark:border-zinc-700 text-center">
          <p className="font-mono text-sm text-zinc-500 dark:text-zinc-500">
            Always learning, always building.
          </p>
        </div>
      </div>
    </div>
  );
};
