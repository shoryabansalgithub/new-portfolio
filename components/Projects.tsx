import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, GitHubIcon, LinkIcon } from './Icons';

const Projects: React.FC = () => {
  return (
    <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
      <div className="flex items-baseline justify-between mb-6 border-b pb-2 transition-colors duration-300 border-zinc-300 dark:border-zinc-800">
         <h3 className="font-serif text-2xl italic transition-colors duration-300 text-zinc-900 dark:text-zinc-100">Featured Works</h3>
         <a href="/projects" className="group flex items-center gap-1 font-mono text-[10px] uppercase text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors">
             View All Projects
             <ArrowUpRight className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
         </a>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
        {PROJECTS.map((project, index) => (
          <article 
            key={index} 
            className="group flex flex-col h-full justify-between"
          >
            <div>
                <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-bold group-hover:underline decoration-1 underline-offset-4 transition-all duration-300 text-zinc-800 decoration-zinc-400 dark:text-zinc-200 dark:decoration-zinc-500">
                        {project.title}
                    </h4>
                </div>
                
                <p className="text-sm font-serif leading-relaxed mb-3 h-16 line-clamp-3 transition-colors duration-300 text-zinc-600 dark:text-zinc-400">
                    {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                        <span key={tag} className="font-mono text-[9px] uppercase text-zinc-500 dark:text-zinc-600">#{tag}</span>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 border-t pt-3 mt-auto transition-colors duration-300 border-zinc-300 dark:border-zinc-800/50">
                {project.link && (
                    <a href={project.link} className="flex items-center gap-1 text-[10px] font-mono uppercase transition-colors text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                        <LinkIcon className="w-3 h-3" /> Live
                    </a>
                )}
                {project.github && (
                    <a href={project.github} className="flex items-center gap-1 text-[10px] font-mono uppercase transition-colors text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100">
                        <GitHubIcon className="w-3 h-3" /> Github
                    </a>
                )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Projects;