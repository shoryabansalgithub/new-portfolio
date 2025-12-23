import React, { useState } from 'react';
import { PROJECTS } from '../constants';
import { ArrowUpRight, GitHubIcon, LinkIcon } from './Icons';

interface ProjectsProps {
  onViewAll?: () => void;
}

const Projects: React.FC<ProjectsProps> = ({ onViewAll }) => {
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <>
      {/* Floating preview image - rendered at root level */}
      {hoveredProject !== null && PROJECTS[hoveredProject]?.preview && (
        <div
          className="fixed pointer-events-none"
          style={{
            left: mousePos.x + 20,
            top: mousePos.y + 20,
            zIndex: 9999,
          }}
        >
          <div className="w-52 h-40 rounded-lg overflow-hidden shadow-2xl border-2 border-zinc-300 dark:border-zinc-700 bg-zinc-100 dark:bg-zinc-900">
            <img
              src={PROJECTS[hoveredProject].preview}
              alt={PROJECTS[hoveredProject].title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      <section className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-baseline justify-between mb-6 border-b pb-2 -mx-4 sm:-mx-8 px-4 sm:px-8 transition-colors duration-300 border-zinc-300 dark:border-zinc-800">
          <h3 className="font-serif font-bold text-2xl transition-colors duration-300 text-zinc-900 dark:text-zinc-100">Featured Works</h3>
          <button
            onClick={onViewAll}
            className="group flex items-center gap-1 font-mono text-[10px] uppercase text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-200 transition-colors"
          >
            View All Projects
            <ArrowUpRight className="w-3 h-3 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-10">
          {PROJECTS.map((project, index) => (
            <article
              key={index}
              className="group flex flex-col h-full justify-between cursor-pointer"
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              onMouseMove={handleMouseMove}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-bold group-hover:underline decoration-1 underline-offset-4 transition-all duration-300 text-zinc-800 decoration-zinc-400 dark:text-zinc-200 dark:decoration-zinc-500">
                    {project.title}
                  </h4>
                </div>

                <p className="text-sm font-sans leading-relaxed mb-3 h-16 line-clamp-3 transition-colors duration-300 text-zinc-600 dark:text-zinc-400">
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
    </>
  );
};

export default Projects;