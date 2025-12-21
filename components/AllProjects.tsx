import React from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, GitHubIcon, LinkIcon } from './Icons';

interface AllProjectsProps {
  onBack: () => void;
}

const AllProjects: React.FC<AllProjectsProps> = ({ onBack }) => {
  return (
    <>
      <div className="min-h-screen py-12 px-6 sm:px-8">
        {/* Header */}
        <div className="max-w-4xl mx-auto mb-12">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-mono uppercase mb-8 transition-colors text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
          >
            <ArrowUpRight className="w-4 h-4 rotate-[225deg]" />
            Back to Home
          </button>
          
          <h1 className="font-serif text-4xl sm:text-5xl font-bold mb-4 transition-colors duration-300 text-zinc-900 dark:text-zinc-100">
            All Projects
          </h1>
          <p className="text-base font-sans leading-relaxed transition-colors duration-300 text-zinc-600 dark:text-zinc-400">
            A collection of projects I've worked on, from web apps to browser extensions.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PROJECTS.map((project, index) => (
              <article 
                key={index} 
                className="group p-6 border rounded-lg transition-all duration-300 cursor-pointer border-zinc-300 hover:border-zinc-400 bg-white/50 dark:border-zinc-800 dark:hover:border-zinc-700 dark:bg-zinc-900/30"
              >
                {/* Project Preview */}
                {project.preview && (
                  <div className="w-full h-64 mb-4 rounded-md overflow-hidden border border-zinc-200 dark:border-zinc-800">
                    <img 
                      src={project.preview} 
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold group-hover:underline decoration-1 underline-offset-4 transition-all duration-300 text-zinc-800 decoration-zinc-400 dark:text-zinc-200 dark:decoration-zinc-500">
                    {project.title}
                  </h2>
                </div>
                
                <p className="text-sm font-sans leading-relaxed mb-4 transition-colors duration-300 text-zinc-600 dark:text-zinc-400">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="font-mono text-[10px] uppercase px-2 py-1 rounded transition-colors duration-300 bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-4 pt-4 border-t transition-colors duration-300 border-zinc-200 dark:border-zinc-800">
                  {project.link && (
                    <a 
                      href={project.link} 
                      className="flex items-center gap-1 text-xs font-mono uppercase transition-colors text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <LinkIcon className="w-3.5 h-3.5" /> Live Demo
                    </a>
                  )}
                  {project.github && (
                    <a 
                      href={project.github} 
                      className="flex items-center gap-1 text-xs font-mono uppercase transition-colors text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <GitHubIcon className="w-3.5 h-3.5" /> Source Code
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="max-w-4xl mx-auto mt-16 pt-8 border-t text-center transition-colors duration-300 border-zinc-300 dark:border-zinc-800">
          <p className="font-mono text-xs uppercase text-zinc-400 dark:text-zinc-600">
            More projects coming soon...
          </p>
        </div>
      </div>
    </>
  );
};

export default AllProjects;
